"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Sparkles, ChevronLeft, RefreshCcw, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface PaintSplat {
    id: number;
    x: number;
    y: number;
    color: string;
}

const colors = ['#EC4899', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'];

export default function ArtGamePage() {
    const [isMounted, setIsMounted] = useState(false);
    const [splats, setSplats] = useState<PaintSplat[]>([]);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'success'>('idle');
    const targetScore = 7;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const startGame = () => {
        setSplats([]);
        setScore(0);
        setGameState('playing');
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (gameState !== 'playing') return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Visual feedback
        confetti({
            particleCount: 30,
            spread: 60,
            origin: { x: (e.clientX) / window.innerWidth, y: (e.clientY) / window.innerHeight },
            colors: [color, '#ffffff']
        });

        const newSplat: PaintSplat = {
            id: Date.now(),
            x,
            y,
            color
        };

        setSplats(prev => [...prev, newSplat]);
        const newScore = score + 1;
        setScore(newScore);

        if (newScore >= targetScore) {
            setGameState('success');
            // Huge celebration
            const end = Date.now() + 2 * 1000;
            const colors = ['#EC4899', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'];

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    };

    const resetGame = () => {
        setSplats([]);
        setScore(0);
        setGameState('idle');
    };

    if (!isMounted) return <div className="min-h-screen bg-black" />;

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative font-sans">
            {/* Background transitions from dark to bright based on score */}
            <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
                style={{
                    background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,${(score / targetScore) * 0.15}) 0%, transparent 70%)`
                }}
            />

            <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10 h-screen flex flex-col pointer-events-none">
                <Link 
                    href="/imagination"
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-all mb-4 w-fit no-underline group z-50 pointer-events-auto"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 돌아가기
                </Link>

                <div className="text-center mb-6 z-50 pointer-events-auto">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">아트 유니버스</h1>
                    <p className="text-gray-400 text-sm md:text-base">어두운 빈 공간을 터치하여 긍정의 다채로운 색상으로 가득 채워보세요!</p>
                </div>

                {/* Interactive Canvas Area */}
                <div 
                    className={`flex-1 relative rounded-[3rem] overflow-hidden mb-8 border transition-all duration-700 pointer-events-auto cursor-crosshair ${
                        gameState === 'success' ? 'border-pink-500/50 shadow-[0_0_50px_rgba(236,72,153,0.3)] bg-white/10' : 'border-white/10 bg-white/5'
                    }`}
                    onClick={handleCanvasClick}
                >
                    {gameState === 'idle' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-20">
                            <button 
                                onClick={(e) => { e.stopPropagation(); startGame(); }}
                                className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:scale-105 rounded-2xl font-black text-xl shadow-lg transition-all"
                            >
                                캔버스 열기
                            </button>
                        </div>
                    )}

                    <AnimatePresence>
                        {splats.map(splat => (
                            <motion.div
                                key={splat.id}
                                initial={{ opacity: 0, scale: 0, rotate: Math.random() * 360 }}
                                animate={{ opacity: 1, scale: [0, 1.5, 1], rotate: Math.random() * 360 }}
                                transition={{ duration: 0.5, type: 'spring' }}
                                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen pointer-events-none"
                                style={{
                                    left: `${splat.x}%`,
                                    top: `${splat.y}%`,
                                    width: `${Math.random() * 80 + 40}px`,
                                    height: `${Math.random() * 80 + 40}px`,
                                    background: `radial-gradient(circle, ${splat.color} 0%, transparent 70%)`,
                                    filter: 'blur(5px)'
                                }}
                            />
                        ))}
                    </AnimatePresence>

                    {gameState === 'success' && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-black/20"
                        >
                            <Sparkles className="text-yellow-400 animate-pulse mb-4" size={60} />
                            <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg text-center leading-tight">
                                당신의 내면이 <br/> 아름답게 빛납니다!
                            </h2>
                        </motion.div>
                    )}
                </div>

                {/* Progress Bar & Controls */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between pointer-events-auto bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] mb-10 z-50">
                    <div className="w-full flex-1">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-pink-400 font-bold flex items-center gap-2">
                                <Palette size={18} /> 감정 캔버스 채우기
                            </span>
                            <span className="text-white font-black">{Math.min(100, Math.round((score / targetScore) * 100))}%</span>
                        </div>
                        <div className="w-full bg-black/50 rounded-full h-4 border border-white/10 overflow-hidden relative">
                            <motion.div 
                                className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 h-full rounded-full"
                                initial={{ width: '0%' }}
                                animate={{ width: `${Math.min(100, (score / targetScore) * 100)}%` }}
                                transition={{ type: 'spring', bounce: 0.2 }}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={resetGame} className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white transition-all cursor-pointer">
                            <RefreshCcw size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
