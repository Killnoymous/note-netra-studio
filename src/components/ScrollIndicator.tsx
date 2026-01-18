import { useEffect, useState } from 'react';

const ScrollIndicator = () => {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            // Fade out as user scrolls (0 to 300px)
            const scrollPos = window.scrollY;
            const newOpacity = Math.max(0, 1 - scrollPos / 300);
            setOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Color: Muted Beige/Warm Grey (#C0B8A0)
    // Low opacity base (60%)

    return (
        <div
            className="w-full flex flex-col items-center justify-center py-12 pointer-events-none transition-opacity duration-300 -mt-24 relative z-20"
            style={{ opacity: opacity }}
        >
            <span className="text-[#C0B8A0]/60 text-xs font-medium tracking-[0.2em] uppercase mb-4">
                Scroll
            </span>
            <div className="h-12 w-px bg-[#C0B8A0]/40" />
        </div>
    );
};

export default ScrollIndicator;
