"use client";

import { useEffect, useRef } from "react";

const BackgroundLayout = () => {
    const interBubbleRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number>(0);
    const positionRef = useRef({
        curX: 0,
        curY: 0,
        tgX: 0,
        tgY: 0
    });

    useEffect(() => {
        const move = () => {
            if (!interBubbleRef.current) return;
            
            const { curX, curY, tgX, tgY } = positionRef.current;
            const newX = curX + (tgX - curX) / 20;
            const newY = curY + (tgY - curY) / 20;
            
            if (Math.abs(newX - curX) > 0.1 || Math.abs(newY - curY) > 0.1) {
                positionRef.current.curX = newX;
                positionRef.current.curY = newY;
                interBubbleRef.current.style.transform = `translate3d(${Math.round(newX)}px, ${Math.round(newY)}px, 0)`;
            }
            
            animationFrameRef.current = requestAnimationFrame(move);
        };

        const handleMouseMove = (event: MouseEvent) => {
            const distance = Math.sqrt(
                Math.pow(event.clientX - positionRef.current.tgX, 2) +
                Math.pow(event.clientY - positionRef.current.tgY, 2)
            );
            
            if (distance > 5) {
                positionRef.current.tgX = event.clientX;
                positionRef.current.tgY = event.clientY;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        move();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);
    
    return (
        <div className="gradient-bg">
            <svg xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
            <div className="gradients-container">
                <div className="g1"></div>
                <div className="g2"></div>
                <div className="g3"></div>
                <div className="g4"></div>
                <div className="g5"></div>
                <div className="interactive" ref={interBubbleRef}></div>
            </div>
        </div>
    );
}

export default BackgroundLayout;