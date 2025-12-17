import React, { useRef, useState, useEffect } from 'react';

const IMAGE_SRC = '/biryani.jpg';

export default function ScratchImage() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPlayTime, setLastPlayTime] = useState(0);
    const audioRef = useRef(null);

    const drawCoverImage = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const img = new Image();
        img.src = IMAGE_SRC;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 600;
        canvas.height = 400;
        drawCoverImage();
    }, []);

    const playSound = () => {
        const now = Date.now();
        if (now - lastPlayTime > 1000 && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
            setLastPlayTime(now);
        }
    };

    const scratch = (x, y) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const canvasX = (x - rect.left) * scaleX;
        const canvasY = (y - rect.top) * scaleY;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        playSound();
    };

    const handleMouseDown = e => {
        setIsDrawing(true);
        scratch(e.clientX, e.clientY);
    };

    const handleMouseMove = e => {
        if (isDrawing) scratch(e.clientX, e.clientY);
    };

    const handleMouseUp = () => setIsDrawing(false);

    const handleTouchStart = e => {
        e.preventDefault();
        setIsDrawing(true);
        const t = e.touches[0];
        scratch(t.clientX, t.clientY);
    };

    const handleTouchMove = e => {
        e.preventDefault();
        if (!isDrawing) return;
        const t = e.touches[0];
        scratch(t.clientX, t.clientY);
    };

    const handleTouchEnd = () => setIsDrawing(false);

    const resetCanvas = () => {
        drawCoverImage();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl">
                <h1 className="text-3xl font-bold text-center mb-2">
                    chicken biryani 😋
                </h1>
                <p className="text-gray-600 text-center mb-6">
                    put your finger on it to eat it
                </p>

                <div className="relative inline-block">
                    <img
                        src="/catmeme.jpeg"
                        alt="Hidden"
                        className="absolute inset-0 w-full h-full object-contain rounded-lg"
                    />

                    <canvas
                        ref={canvasRef}
                        className="relative rounded-lg border-4 border-gray-300"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    />
                </div>

                <button
                    onClick={resetCanvas}
                    className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
