
import { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    key?: string | number;
    variant?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right';
}

const RevealOnScroll = ({ children, className = "", delay = 0, variant = "fade-up" }: RevealOnScrollProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const getTransforms = () => {
        switch (variant) {
            case 'fade-in':
                return isVisible ? "opacity-100" : "opacity-0";
            case 'slide-left':
                return isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10";
            case 'slide-right':
                return isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10";
            case 'fade-up':
            default:
                return isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 scale-[0.98]";
        }
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out transform ${getTransforms()} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default RevealOnScroll;
