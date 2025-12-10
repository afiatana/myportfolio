"use client";
import { useEffect, useRef, useState } from 'react';
import styles from './MatrixLoader.module.css';

interface MatrixLoaderProps {
    onFinished: () => void;
}

export default function MatrixLoader({ onFinished }: MatrixLoaderProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Matrix characters (Katakana + standard)
        const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charArray = chars.split('');

        const fontSize = 16;
        const columns = canvas.width / fontSize;

        // Array of drops - one per column
        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            // Black BG for the canvas
            // Translucent BG to show trail
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0'; // Green text
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Sending the drop back to the top randomly after it has crossed the screen
                // adding a randomness to the reset to make the drops scattered on the Y axis
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Incrementing Y coordinate
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        // Initial timeout to start fade out
        const timeout = setTimeout(() => {
            setFadeOut(true);
            // Wait for fade transition to finish before unmounting
            setTimeout(onFinished, 1000);
        }, 4000); // Show for 4 seconds

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
            window.removeEventListener('resize', handleResize);
        };
    }, [onFinished]);

    return (
        <div className={`${styles.loaderContainer} ${fadeOut ? styles.hidden : ''}`}>
            <canvas ref={canvasRef} className={styles.canvas}></canvas>
            <div className={styles.loadingText}>INITIALIZING...</div>
        </div>
    );
}
