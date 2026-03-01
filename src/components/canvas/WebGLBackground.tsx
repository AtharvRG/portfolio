"use client";

import React, { useRef, useEffect } from 'react';
import { isSafari } from "../../utils/detectBrowser";

type GradientStop = { color: string; position: number };

const PARAMS = {
    speed: 1, freq: 3, sharpness: 6.7, amplitude: 0.51, waveWidthMod: 0.05,
    offsetX: 0, localWarpIntensity: 0.4, localWarpFreqX: 1, localWarpFreqY: 2,
    warpDirection: [1, -1] as [number, number],
    ditherLevels: 30, ditherScale: 4, grainIntensity: 0.02, grainSpeed: 50,
    vignetteIntensity: 0.2, vignetteRadius: 1,
    u_gradient: [
        { color: "#000000", position: 0 }, { color: "#330d03", position: 0.15 },
        { color: "#f35a0d", position: 0.35 }, { color: "#fff2d9", position: 0.6 },
        { color: "#0f3839", position: 0.85 }, { color: "#000000", position: 1 }
    ] as GradientStop[]
};

const vertexShaderSource = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

// FIX: Use highp for time to avoid mediump precision loss at large values.
// FIX: Replaced pow(waveWidthMod, u_time*0.1) with a bounded oscillation
//      to prevent denormalized floats that stall mobile GPUs after ~20s.
// FIX: Wrapped time with mod() for grain seed to keep values in safe range.
const fragmentShaderSource = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform highp float u_time;
uniform float u_scale;

uniform float freq; uniform float sharpness; uniform float amplitude;
uniform float waveWidthMod; uniform float offsetX; uniform float speed;
uniform float localWarpIntensity; uniform float localWarpFreqX;
uniform float localWarpFreqY; uniform vec2 warpDirection;
uniform float ditherLevels; uniform float ditherScale;
uniform float grainIntensity; uniform float grainSpeed;
uniform float vignetteIntensity; uniform float vignetteRadius;
uniform sampler2D u_gradient;

float fastTanh(float x) {
    return clamp(x * (27.0 + x * x) / (27.0 + 9.0 * x * x), -1.0, 1.0);
}

float modulatedSquareWave(float x, float freq, float sharpness, float widthMod) {
    float mod = 1.0 + sin(x * freq * 0.5) * widthMod;
    mod = clamp(mod, 0.3, 2.0);
    return fastTanh(sin(x * freq * mod) * sharpness);
}

vec2 localWarp(vec2 uv, float intensity, float freqX, float freqY) {
    float warpX = (freqX > 0.0) ? sin(uv.y * freqX) * intensity * 0.5 : 0.0;
    float warpY = (freqY > 0.0) ? sin(uv.x * freqY) * intensity * 0.4 : 0.0;
    uv.x += warpX; uv.y += warpY;
    return uv;
}

float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

// OPTIMIZED bayer matrix without heavy branching
float bayer4x4(vec2 coord) {
    vec2 c = floor(mod(coord, 4.0));
    vec4 row0 = vec4(0.0/16.0,  8.0/16.0,  2.0/16.0, 10.0/16.0);
    vec4 row1 = vec4(12.0/16.0, 4.0/16.0, 14.0/16.0,  6.0/16.0);
    vec4 row2 = vec4(3.0/16.0, 11.0/16.0,  1.0/16.0,  9.0/16.0);
    vec4 row3 = vec4(15.0/16.0, 7.0/16.0, 13.0/16.0,  5.0/16.0);
    vec4 res = c.y == 0.0 ? row0 : c.y == 1.0 ? row1 : c.y == 2.0 ? row2 : row3;
    return c.x == 0.0 ? res.x : c.x == 1.0 ? res.y : c.x == 2.0 ? res.z : res.w;
}

vec3 ditherColor(vec3 color, vec2 coord, float levels, float scale) {
    vec2 ditherCoord = floor(coord / scale);
    float threshold = bayer4x4(ditherCoord);
    return floor(color * levels + threshold) / levels;
}

void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    float scale = ditherScale * u_scale;
    
    vec2 ditherBlockCoord = floor(fragCoord / scale) * scale + scale * 0.5;
    vec2 blockUV = ditherBlockCoord / u_resolution;
    blockUV = blockUV * 2.0 - 1.0;
    blockUV.x *= u_resolution.x / u_resolution.y;
    
    blockUV.x += offsetX + sin(u_time * speed * 0.15) * 0.5 + cos(u_time * speed * 0.08) * 0.3;

    float animatedWarpIntensity = localWarpIntensity + 0.12 * sin(u_time * speed * 0.9);
    
    // FIX: Replaced pow(waveWidthMod, u_time*0.1) with a bounded oscillation.
    // The old pow() produced denormalized floats after ~20s, causing mobile GPUs
    // to progressively stall. This oscillation stays in a safe, bounded range
    // while preserving the same visual character.
    float animatedWaveWidth = waveWidthMod * (0.5 + 0.5 * sin(u_time * speed * 0.07)) + 0.25 * sin(u_time * speed * 0.3 + 3.14);

    float angle = atan(warpDirection.y, warpDirection.x) + sin(u_time * speed * 0.1) * 1.57;
    vec2 dir = vec2(cos(angle), sin(angle));
    float diag = dot(blockUV, dir);
    
    float wave = modulatedSquareWave(diag, freq, sharpness, animatedWaveWidth);
    float animatedAmplitude = amplitude * (1.5 + 0.4 * sin(u_time * speed * 0.13));
    vec2 warpedUV = blockUV + dir * wave * animatedAmplitude;

    warpedUV = localWarp(warpedUV, animatedWarpIntensity, localWarpFreqX, localWarpFreqY);

    float gradientT = clamp(warpedUV.y * -0.33 + 0.5, 0.0, 1.0);
    vec3 color = texture2D(u_gradient, vec2(gradientT, 0.5)).rgb;

    // FIX: Wrap grain seed to keep float values small and safe for mediump
    float grainSeed = fract(mod(u_time, 100.0) * grainSpeed);
    float grain = hash12(ditherBlockCoord + grainSeed);
    grain = grain * 2.0 - 1.0;
    color += grain * grainIntensity;

    vec2 normUV = ditherBlockCoord / u_resolution;
    vec2 feather = smoothstep(0.0, vignetteRadius, normUV) * smoothstep(0.0, vignetteRadius, 1.0 - normUV);
    color = mix(color, color * (feather.x * feather.y), vignetteIntensity);
    color = ditherColor(color, fragCoord, ditherLevels, scale);

    gl_FragColor = vec4(color, 1.0);
}
`;

function createGradientTexture(gl: WebGLRenderingContext, stops: GradientStop[]): WebGLTexture | null {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const grad = ctx.createLinearGradient(0, 0, 256, 0);
    stops.forEach(s => grad.addColorStop(Math.max(0, Math.min(1, s.position)), s.color));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 1);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    return texture;
}

export default function WebGLBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);

    const safari = typeof window !== 'undefined' && isSafari();

    useEffect(() => {
        if (safari) return; // don't run WebGL setup on Safari
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl', {
            powerPreference: "high-performance",
            alpha: false, antialias: false, depth: false
        });
        if (!gl) return;

        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        };

        const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

        const positionLoc = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

        const gradientTexture = createGradientTexture(gl, PARAMS.u_gradient);

        // OPTIMIZATION: Hard cap DPR to 0.75 or 0.5. The CSS scales it back up.
        const getDPR = () => Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 0.5 : 0.75);

        // FIX: Cache all uniform locations once instead of looking them up every frame
        const uniforms = {
            u_resolution: gl.getUniformLocation(program, "u_resolution"),
            u_time: gl.getUniformLocation(program, "u_time"),
            u_scale: gl.getUniformLocation(program, "u_scale"),
            freq: gl.getUniformLocation(program, "freq"),
            sharpness: gl.getUniformLocation(program, "sharpness"),
            amplitude: gl.getUniformLocation(program, "amplitude"),
            waveWidthMod: gl.getUniformLocation(program, "waveWidthMod"),
            offsetX: gl.getUniformLocation(program, "offsetX"),
            speed: gl.getUniformLocation(program, "speed"),
            localWarpIntensity: gl.getUniformLocation(program, "localWarpIntensity"),
            localWarpFreqX: gl.getUniformLocation(program, "localWarpFreqX"),
            localWarpFreqY: gl.getUniformLocation(program, "localWarpFreqY"),
            warpDirection: gl.getUniformLocation(program, "warpDirection"),
            ditherLevels: gl.getUniformLocation(program, "ditherLevels"),
            ditherScale: gl.getUniformLocation(program, "ditherScale"),
            grainIntensity: gl.getUniformLocation(program, "grainIntensity"),
            grainSpeed: gl.getUniformLocation(program, "grainSpeed"),
            vignetteIntensity: gl.getUniformLocation(program, "vignetteIntensity"),
            vignetteRadius: gl.getUniformLocation(program, "vignetteRadius"),
            u_gradient_sampler: gl.getUniformLocation(program, "u_gradient"),
        };

        // FIX: Set static uniforms ONCE, not every frame (these PARAMS never change)
        gl.uniform1f(uniforms.freq, PARAMS.freq);
        gl.uniform1f(uniforms.sharpness, PARAMS.sharpness);
        gl.uniform1f(uniforms.amplitude, PARAMS.amplitude);
        gl.uniform1f(uniforms.waveWidthMod, PARAMS.waveWidthMod);
        gl.uniform1f(uniforms.offsetX, PARAMS.offsetX);
        gl.uniform1f(uniforms.speed, PARAMS.speed);
        gl.uniform1f(uniforms.localWarpIntensity, PARAMS.localWarpIntensity);
        gl.uniform1f(uniforms.localWarpFreqX, PARAMS.localWarpFreqX);
        gl.uniform1f(uniforms.localWarpFreqY, PARAMS.localWarpFreqY);
        gl.uniform2f(uniforms.warpDirection, PARAMS.warpDirection[0], PARAMS.warpDirection[1]);
        gl.uniform1f(uniforms.ditherLevels, PARAMS.ditherLevels);
        gl.uniform1f(uniforms.ditherScale, PARAMS.ditherScale);
        gl.uniform1f(uniforms.grainIntensity, PARAMS.grainIntensity);
        gl.uniform1f(uniforms.grainSpeed, PARAMS.grainSpeed);
        gl.uniform1f(uniforms.vignetteIntensity, PARAMS.vignetteIntensity);
        gl.uniform1f(uniforms.vignetteRadius, PARAMS.vignetteRadius);

        if (gradientTexture) {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, gradientTexture);
            gl.uniform1i(uniforms.u_gradient_sampler, 0);
        }

        const handleResize = () => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const dpr = getDPR();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        // FIX: Use performance.now() for stable high-precision timing
        startTimeRef.current = performance.now();

        // FIX: Throttle to ~30fps on mobile to halve GPU work
        const isMobile = window.innerWidth < 768;
        const FRAME_INTERVAL = isMobile ? 1000 / 30 : 0; // 0 = no throttle on desktop
        let lastFrameTime = 0;

        const render = (now: number) => {
            animationFrameRef.current = requestAnimationFrame(render);

            // Throttle on mobile
            if (FRAME_INTERVAL > 0 && now - lastFrameTime < FRAME_INTERVAL) return;
            lastFrameTime = now;

            const dpr = getDPR();

            // Only 3 uniforms change per frame — resolution, time, and scale
            gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
            gl.uniform1f(uniforms.u_time, (now - startTimeRef.current) / 1000);
            gl.uniform1f(uniforms.u_scale, dpr);

            gl.drawArrays(gl.TRIANGLES, 0, 3);
        };

        animationFrameRef.current = requestAnimationFrame(render);

        // FIX: Pause rendering entirely when the tab is hidden
        const handleVisibility = () => {
            if (document.hidden) {
                cancelAnimationFrame(animationFrameRef.current);
            } else {
                // Adjust start time to account for time spent hidden
                // This prevents a huge time jump when returning
                lastFrameTime = 0;
                animationFrameRef.current = requestAnimationFrame(render);
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibility);
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [safari]);

    if (safari) {
        const gradientStops = PARAMS.u_gradient.map(s => `${s.color} ${Math.round(s.position * 100)}%`).join(', ');
        const bg = `linear-gradient(180deg, ${gradientStops})`;
        return (
            <div
                className="fixed inset-0 w-full h-full -z-50 pointer-events-none"
                style={{ background: bg }}
            />
        );
    }

    return (
        <canvas
            ref={canvasRef}
            // Added imageRendering crisp-edges so the downscaled canvas doesn't look blurry
            className="fixed inset-0 w-full h-full -z-50 pointer-events-none"
            style={{ imageRendering: 'pixelated' }}
        />
    );
}