'use client';

import React, { useEffect, useRef, useMemo, useState } from 'react';
import { gsap } from 'gsap';

export interface TargetCursorProps {
    targetSelector?: string;
    hideDefaultCursor?: boolean;
    hoverDuration?: number;
    parallaxOn?: boolean;
}

const CustomCursor: React.FC<TargetCursorProps> = ({
    targetSelector = '.cursor-target',
    hideDefaultCursor = true,
    hoverDuration = 0.3,
    parallaxOn = true
}) => {
    const blobRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const rippleRef = useRef<HTMLDivElement>(null);

    const isActiveRef = useRef(false);
    const activeTargetRef = useRef<Element | null>(null);
    const mousePos = useRef({ x: -100, y: -100 });
    const isReady = useRef(false);

    // Fix hydration mismatch by only rendering after mount
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isMobile = useMemo(() => {
        if (typeof window === 'undefined') return true;
        const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 768;
        return (hasTouchScreen && isSmallScreen);
    }, []);

    useEffect(() => {
        if (!mounted || isMobile || !dotRef.current || !blobRef.current || !rippleRef.current) return;

        const originalCursor = document.body.style.cursor;
        if (hideDefaultCursor) {
            document.documentElement.style.cursor = 'none';
            document.body.style.cursor = 'none';
            const style = document.createElement('style');
            style.id = 'target-cursor-style';
            style.innerHTML = `* { cursor: none !important; }`;
            document.head.appendChild(style);
        }

        const dot = dotRef.current;
        const blob = blobRef.current;
        const ripple = rippleRef.current;

        // Initialize completely offscreen so it doesn't flash
        gsap.set([dot, blob, ripple], {
            xPercent: -50,
            yPercent: -50,
            x: -200,
            y: -200,
        });

        gsap.set(blob, {
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "transparent",
            backdropFilter: "none",
            opacity: 0 // Hidden until first mouse move
        });

        gsap.set(ripple, {
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "3px solid rgba(255, 255, 255, 1)", // Thicker and pure white base
            backgroundColor: "transparent",
            opacity: 0
        });

        gsap.set(dot, { opacity: 0 });

        // Create infinite radial wave animation on the ripple layer
        // It expands outward, then recedes (yoyo)
        const waveAnim = gsap.fromTo(ripple, {
            scale: 0.15,
            opacity: 1 // Start fully opaque
        }, {
            scale: 1.5,
            opacity: 0, // Fade out completely as it expands
            duration: 1.2,
            repeat: -1,
            ease: "power1.out"
        });

        // Ticker handles continuous positional logic (allows flawless scrolling and parallax)
        const tickerFn = () => {
            if (!dot || !blob || !isReady.current) return;

            if (activeTargetRef.current) {
                // Determine target bounds
                // Verify if target is still in DOM (handles Modal closing without mouse move)
                if (!document.contains(activeTargetRef.current)) {
                    handleLeave();
                    return;
                }

                const rect = activeTargetRef.current.getBoundingClientRect();

                // Track geometric center of target directly from the live DOM bounds
                const targetX = rect.left + rect.width / 2;
                const targetY = rect.top + rect.height / 2;

                // Parallax subtle sticky effect
                const parallaxDistanceX = parallaxOn ? (mousePos.current.x - targetX) * 0.15 : 0;
                const parallaxDistanceY = parallaxOn ? (mousePos.current.y - targetY) * 0.15 : 0;

                const finalX = targetX + parallaxDistanceX;
                const finalY = targetY + parallaxDistanceY;

                // Instantly sync the box's geometry tracking using a quick duration
                // so it looks completely tethered to the element while you scroll!
                gsap.to(blob, {
                    x: finalX,
                    y: finalY,
                    duration: 0.1,
                    ease: 'power1.out',
                    overwrite: 'auto'
                });
            }
        };

        gsap.ticker.add(tickerFn);

        const handleEnter = (target: Element) => {
            if (activeTargetRef.current === target) return;
            activeTargetRef.current = target;
            isActiveRef.current = true;

            // Dispatch custom enter event to handle wheel scrolling cleanly
            const event = new CustomEvent('cursor-enter', { detail: { x: mousePos.current.x, y: mousePos.current.y }, bubbles: true });
            target.dispatchEvent(event);

            const rect = target.getBoundingClientRect();
            const padding = window.innerWidth > 768 ? 20 : 12;

            // Morph into solid box flawlessly
            gsap.to(blob, {
                width: rect.width + padding,
                height: rect.height + padding,
                borderRadius: "16px",
                backgroundColor: "transparent",
                backdropFilter: "none",
                duration: hoverDuration,
                ease: 'power3.out',
                overwrite: 'auto'
            });

            // Kill wave when hovering a target
            waveAnim.pause();
            gsap.to(ripple, { opacity: 0, duration: 0.2, overwrite: 'auto' });
            gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2, overwrite: 'auto' });
        };

        const handleLeave = () => {
            if (!activeTargetRef.current) return;
            const target = activeTargetRef.current;
            activeTargetRef.current = null;
            isActiveRef.current = false;

            // Dispatch custom leave event to handle wheel scrolling cleanly
            const event = new CustomEvent('cursor-leave', { detail: { x: mousePos.current.x, y: mousePos.current.y }, bubbles: true });
            target.dispatchEvent(event);

            // Morph back to circle
            gsap.to(blob, {
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "transparent",
                backdropFilter: "none",
                duration: 0.4,
                ease: 'power3.out',
                overwrite: 'auto'
            });

            // Resume lagging follow smoothly towards the current mouse position
            gsap.to(blob, {
                x: mousePos.current.x,
                y: mousePos.current.y,
                duration: 0.8, // Slow easing out
                ease: 'power3.out',
                overwrite: 'auto'
            });

            // Restore dot and wave
            gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3, delay: 0.05, overwrite: 'auto', onComplete: () => { waveAnim.play(0); } });
        };

        // Aggressive continuous evaluation catches scrolling and rapid DOM changes flawlessly
        const evaluateCursor = () => {
            if (!isReady.current) return;
            // Native highly-performant DOM lookups 
            const elementsUnder = document.elementsFromPoint(mousePos.current.x, mousePos.current.y);
            const target = elementsUnder.find(el => el.closest(targetSelector) || el.matches(targetSelector));
            const actualTarget = target ? (target.closest(targetSelector) || target) : null;

            if (actualTarget) {
                if (activeTargetRef.current !== actualTarget) {
                    if (activeTargetRef.current) {
                        handleLeave();
                    }
                    handleEnter(actualTarget);
                }
            } else if (activeTargetRef.current) {
                handleLeave();
            }
        };

        // Fast interval to ensure absolute synchronization 
        const evalInterval = setInterval(evaluateCursor, 50);

        const moveHandler = (e: MouseEvent) => {
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;

            if (!isReady.current) {
                isReady.current = true;
                if (!activeTargetRef.current) {
                    gsap.to(dot, { opacity: 1, duration: 0.3 });
                }
                gsap.to(blob, { opacity: 1, duration: 0.3 });
                // Force jump directly to cursor initially
                gsap.set([dot, blob, ripple], { x: e.clientX, y: e.clientY });
            }

            // Move dot completely tight to the cursor, ripple follows dot EXACTLY 
            // so waves always emanate from the very center of the dot
            gsap.to([dot, ripple], { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power3.out', overwrite: 'auto' });

            // If not actively hovering a target, the blob trails with exquisite lag
            if (!activeTargetRef.current) {
                gsap.to(blob, { x: e.clientX, y: e.clientY, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
            }
        };

        const mouseDownHandler = () => {
            if (!dotRef.current) return;
            if (!activeTargetRef.current) {
                gsap.to(dotRef.current, { scale: 0.5, duration: 0.3, overwrite: 'auto' });
            }
            waveAnim.pause();
            gsap.to(ripple, { opacity: 0, duration: 0.2, overwrite: 'auto' });
            if (!activeTargetRef.current && blobRef.current) {
                gsap.to(blobRef.current, { scale: 0.9, duration: 0.2, overwrite: 'auto' });
            } else if (activeTargetRef.current && blobRef.current) {
                // Add a micro-squeeze on targeted buttons when pressed
                gsap.to(blobRef.current, { scale: 0.95, duration: 0.1, overwrite: 'auto' });
            }
        };

        const mouseUpHandler = () => {
            if (!dotRef.current) return;
            if (!activeTargetRef.current) {
                gsap.to(dotRef.current, { scale: 1, duration: 0.3, overwrite: 'auto', onComplete: () => { waveAnim.play(0); } });
            }
            if (blobRef.current) {
                gsap.to(blobRef.current, { scale: 1, duration: 0.4, ease: "back.out(1.5)", overwrite: 'auto' });
            }
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                // If the user navigates away or switches tabs, restore the cursor so it isn't hidden in the new tab.
                document.documentElement.style.cursor = originalCursor;
                document.body.style.cursor = originalCursor;
                const injectedStyle = document.getElementById('target-cursor-style');
                if (injectedStyle) injectedStyle.innerText = '';
                gsap.to([dot, blob, ripple], { opacity: 0, duration: 0.1 });
            } else {
                // Return to purely hidden cursor on focus
                if (hideDefaultCursor) {
                    document.documentElement.style.cursor = 'none';
                    document.body.style.cursor = 'none';
                    const injectedStyle = document.getElementById('target-cursor-style');
                    if (injectedStyle) injectedStyle.innerText = `* { cursor: none !important; }`;
                }
                if (isReady.current) {
                    gsap.to([dot, blob], { opacity: 1, duration: 0.2 });
                }
            }
        };

        window.addEventListener('mousemove', moveHandler, { passive: true });
        window.addEventListener('mousedown', mouseDownHandler);
        window.addEventListener('mouseup', mouseUpHandler);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            waveAnim.kill();
            gsap.ticker.remove(tickerFn);
            clearInterval(evalInterval);
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mousedown', mouseDownHandler);
            window.removeEventListener('mouseup', mouseUpHandler);
            document.removeEventListener('visibilitychange', handleVisibilityChange);

            document.documentElement.style.cursor = originalCursor;
            document.body.style.cursor = originalCursor;
            const injectedStyle = document.getElementById('target-cursor-style');
            if (injectedStyle) injectedStyle.remove();
        };
    }, [mounted, targetSelector, hideDefaultCursor, isMobile, hoverDuration, parallaxOn]);

    if (!mounted || isMobile) {
        return null;
    }

    return (
        <div className="pointer-events-none z-[99999]">
            {/* The lagged outline (outer bounds of waves) */}
            <div
                ref={blobRef}
                className="fixed top-0 left-0 flex items-center justify-center border-2 border-white pointer-events-none z-[99999]"
                style={{ willChange: 'transform, width, height, border-radius' }}
            />
            {/* The sonar wave generator */}
            <div
                ref={rippleRef}
                className="fixed top-0 left-0 flex items-center justify-center pointer-events-none z-[99999]"
                style={{ willChange: 'transform, opacity, scale' }}
            />
            {/* The exact center point */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-[6px] h-[6px] bg-white rounded-full pointer-events-none z-[99999]"
                style={{ willChange: 'transform, opacity' }}
            />
        </div>
    );
};

export default CustomCursor;
