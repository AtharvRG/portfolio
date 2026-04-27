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
    const arrowWrapperRef = useRef<HTMLDivElement>(null);

    const activeTargetRef = useRef<Element | null>(null);
    const mousePos = useRef({ x: -100, y: -100 });
    const isReady = useRef(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isMobileDevice = useMemo(() => {
        if (typeof window === 'undefined') return true;
        return ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth <= 768;
    }, []);

    useEffect(() => {
        if (!mounted || isMobileDevice || !blobRef.current || !arrowWrapperRef.current) return;

        const originalCursor = document.body.style.cursor;
        
        if (hideDefaultCursor) {
            document.documentElement.style.cursor = 'none';
            document.body.style.cursor = 'none';
            const style = document.createElement('style');
            style.id = 'target-cursor-style';
            style.innerHTML = `* { cursor: none !important; }`;
            document.head.appendChild(style);
        }

        const blob = blobRef.current;
        const arrow = arrowWrapperRef.current;

        gsap.set([blob, arrow], { xPercent: -50, yPercent: -50, x: -200, y: -200 });
        gsap.set(blob, { opacity: 0, width: 40, height: 40, borderRadius: "50%", border: "2px solid white" });
        gsap.set(arrow, { opacity: 0 });

        const tickerFn = () => {
            if (!isReady.current) return;

            if (activeTargetRef.current) {
                if (!document.contains(activeTargetRef.current)) {
                    handleLeave();
                    return;
                }

                const rect = activeTargetRef.current.getBoundingClientRect();
                const targetX = rect.left + rect.width / 2;
                const targetY = rect.top + rect.height / 2;

                const parallaxDistanceX = parallaxOn ? (mousePos.current.x - targetX) * 0.15 : 0;
                const parallaxDistanceY = parallaxOn ? (mousePos.current.y - targetY) * 0.15 : 0;

                gsap.to(blob, {
                    x: targetX + parallaxDistanceX,
                    y: targetY + parallaxDistanceY,
                    duration: 0.1,
                    ease: 'none',
                    overwrite: 'auto'
                });
            }
        };

        gsap.ticker.add(tickerFn);

        const handleEnter = (target: Element) => {
            activeTargetRef.current = target;
            const rect = target.getBoundingClientRect();

            // --- RE-ADDED: DISPATCH EVENT FOR CONTACT MARQUEE ---
            const event = new CustomEvent('cursor-enter', { 
                detail: { x: mousePos.current.x, y: mousePos.current.y }, 
                bubbles: true 
            });
            target.dispatchEvent(event);

            // Hide Arrow / Show Outline
            gsap.to(arrow, { scale: 0, opacity: 0, duration: 0.15, ease: "power2.in", overwrite: 'auto' });
            gsap.to(blob, {
                opacity: 1,
                width: rect.width + 16,
                height: rect.height + 16,
                borderRadius: "8px",
                duration: hoverDuration,
                ease: 'power3.out',
                overwrite: 'auto'
            });
        };

        const handleLeave = () => {
            if (!activeTargetRef.current) return;
            const target = activeTargetRef.current;
            activeTargetRef.current = null;

            // --- RE-ADDED: DISPATCH EVENT FOR CONTACT MARQUEE ---
            const event = new CustomEvent('cursor-leave', { 
                detail: { x: mousePos.current.x, y: mousePos.current.y }, 
                bubbles: true 
            });
            target.dispatchEvent(event);

            // Restore Arrow / Hide Outline
            gsap.to(arrow, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)", overwrite: 'auto' });
            gsap.to(blob, {
                width: 20,
                height: 20,
                borderRadius: "50%",
                opacity: 0,
                duration: 0.2,
                ease: 'power3.out',
                overwrite: 'auto'
            });
        };

        const evaluateCursor = () => {
            if (!isReady.current) return;
            const elementsUnder = document.elementsFromPoint(mousePos.current.x, mousePos.current.y);
            const target = elementsUnder.find(el => el.closest(targetSelector) || el.matches(targetSelector));
            const actualTarget = target ? (target.closest(targetSelector) || target) : null;

            if (actualTarget) {
                if (activeTargetRef.current !== actualTarget) {
                    if (activeTargetRef.current) handleLeave();
                    handleEnter(actualTarget);
                }
            } else if (activeTargetRef.current) {
                handleLeave();
            }
        };

        const evalInterval = setInterval(evaluateCursor, 30);

        const moveHandler = (e: MouseEvent) => {
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;

            if (!isReady.current) {
                isReady.current = true;
                if (!activeTargetRef.current) {
                    gsap.to(arrow, { opacity: 1, duration: 0.3 });
                }
                gsap.set([arrow, blob], { x: e.clientX, y: e.clientY });
            }

            gsap.set(arrow, { x: e.clientX, y: e.clientY });
            if (!activeTargetRef.current) {
                gsap.set(blob, { x: e.clientX, y: e.clientY });
            }
        };

        const mouseDownHandler = () => {
            if (!activeTargetRef.current) { gsap.to(arrow, { scale: 0.8, duration: 0.2 }); }
            else { gsap.to(blob, { scale: 0.95, duration: 0.15 }); }
        };

        const mouseUpHandler = () => {
            if (!activeTargetRef.current) { gsap.to(arrow, { scale: 1, duration: 0.3, ease: "back.out(2)" }); }
            else { gsap.to(blob, { scale: 1, duration: 0.4, ease: "back.out(1.5)" }); }
        };

        window.addEventListener('mousemove', moveHandler, { passive: true });
        window.addEventListener('mousedown', mouseDownHandler);
        window.addEventListener('mouseup', mouseUpHandler);

        return () => {
            gsap.ticker.remove(tickerFn);
            clearInterval(evalInterval);
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mousedown', mouseDownHandler);
            window.removeEventListener('mouseup', mouseUpHandler);
            document.documentElement.style.cursor = originalCursor;
            document.body.style.cursor = originalCursor;
            const style = document.getElementById('target-cursor-style');
            if(style) style.remove();
        };
    }, [mounted, targetSelector, hideDefaultCursor, isMobileDevice, hoverDuration, parallaxOn]);

    if (!mounted || isMobileDevice) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999]">
            <div ref={blobRef} className="fixed top-0 left-0 border-white pointer-events-none" style={{ willChange: 'transform, width, height, opacity, border-radius' }} />
            <div ref={arrowWrapperRef} className="fixed top-0 left-0 will-change-transform flex items-center justify-center">
                <svg stroke="black" fill="white" strokeWidth="1" viewBox="0 0 16 16" className="h-7 w-7 -rotate-[70deg] transform drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
                </svg>
            </div>
        </div>
    );
};

export default CustomCursor;