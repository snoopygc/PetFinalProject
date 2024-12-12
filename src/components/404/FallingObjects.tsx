import React, { useEffect, useRef } from 'react';

interface FallingObjectsProps {
    emoji: string;
    interval: number;
}

const FallingObjects: React.FC<FallingObjectsProps> = ({ emoji, interval }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const createObject = () => {
            const object = document.createElement('div');
            object.textContent = emoji;
            object.style.position = 'absolute';
            object.style.fontSize = '2rem';
            object.style.left = `${Math.random() * 100}%`;
            object.style.top = '0';
            object.style.animationDuration = `${Math.random() * 3 + 2}s`;
            object.style.animationName = 'fall';
            object.style.animationTimingFunction = 'linear';
            object.style.animationFillMode = 'forwards';
            container.appendChild(object);

            setTimeout(() => {
                object.remove();
            }, 5000);
        };

        const intervalId = setInterval(createObject, interval);

        return () => clearInterval(intervalId);
    }, [emoji, interval]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 top-16 overflow-hidden pointer-events-none"
        >
            <style jsx>{`
            @keyframes fall {
            from {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            to {
                transform: translateY(calc(100vh - 4rem)) rotate(360deg);
                opacity: 0;
            }
            }
        `}</style>
        </div>
    );
};

export default FallingObjects;

