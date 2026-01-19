import { useEffect, useRef, useState } from 'react';

const Cursor3D = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [click, setClick] = useState(false);
    const [hover, setHover] = useState(false);

    // Position refs for smooth animation loop without re-renders
    const mouse = useRef({ x: 0, y: 0 });
    const cursor = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Check if device is touch or reduced motion
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (isTouch || reducedMotion) return;

        setIsVisible(true);

        const onMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        const onMouseDown = () => setClick(true);
        const onMouseUp = () => setClick(false);

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.closest('[role="button"]') ||
                target.classList.contains('cursor-pointer');

            setHover(!!isInteractive);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mouseover', onMouseOver);

        let rafId: number;
        const animate = () => {
            // Smooth interpolation factor
            const ease = 0.15;

            cursor.current.x += (mouse.current.x - cursor.current.x) * ease;
            cursor.current.y += (mouse.current.y - cursor.current.y) * ease;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0) translate(-50%, -50%)`;
            }

            rafId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mouseover', onMouseOver);
            cancelAnimationFrame(rafId);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <div
                ref={cursorRef}
                className={`pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform
          flex items-center justify-center transition-all duration-300 ease-out`}
            >
                <div
                    className={`
            relative rounded-full backdrop-blur-sm
            transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]
            ${click ? 'w-4 h-4 opacity-90' : hover ? 'w-8 h-8 opacity-80' : 'w-5 h-5 opacity-90'}
          `}
                    style={{
                        background: `
              radial-gradient(
                circle at 35% 35%, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(240, 230, 200, 0.8) 20%, 
                rgba(210, 190, 150, 0.9) 60%,
                rgba(180, 160, 120, 0) 100%
              )
            `,
                        boxShadow: `
              0 0 10px rgba(220, 200, 160, 0.3),
              0 2px 5px rgba(0, 0, 0, 0.1),
              inset 0 0 2px rgba(255, 255, 255, 0.5)
            `
                    }}
                >
                    <div
                        className="absolute top-[20%] left-[20%] w-[30%] h-[30%] rounded-full bg-white opacity-60 blur-[1px]"
                    />
                </div>
            </div>
            <style>{`
        body, a, button, input, select, textarea, [role="button"] {
          cursor: none !important;
        }
      `}</style>
        </>
    );
};

export default Cursor3D;
