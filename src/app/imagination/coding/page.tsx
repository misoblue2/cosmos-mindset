"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Zap, ChevronLeft, RefreshCcw, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface Bug {
    id: number;
    text: string;
    x: number;
    y: number;
    delay: number;
    duration: number;
    resolved: boolean;
}

const negativeThoughts = [
    "난 안돼", "포기할까", "너무 어려워", "나는 부족해", 
    "실패할 거야", "두려워", "또 틀렸어", "재능이 없어", 
    "늦었어", "답답해", "어차피 안돼", "망했어"
];

const positiveThoughts = [
    "할 수 있다!", "성장 중!", "새로운 도전!", "배우는 과정", 
    "성공할 거야!", "용기!", "다시 해보자!", "나는 충분해!", 
    "지금부터 시작!", "해결할 수 있어!", "경험이야", "멋진 시도!"
];

export default function CodingGamePage() {
    const [isMounted, setIsMounted] = useState(false);
    const [bugs, setBugs] = useState<Bug[]>([]);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'success' | 'flying'>('idle');
    const targetScore = 10;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const spawnBugs = () => {
        const newBugs: Bug[] = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            text: negativeThoughts[Math.floor(Math.random() * negativeThoughts.length)],
            x: Math.random() * 80 + 10, // 10% ~ 90%
            y: Math.random() * 60 + 10, // 10% ~ 70%
            delay: Math.random() * 2,
            duration: Math.random() * 3 + 3,
            resolved: false
        }));
        setBugs(newBugs);
        setScore(0);
        setGameState('playing');
    };

    const handleBugClick = (id: number) => {
        if (gameState !== 'playing') return;

        setBugs(prev => prev.map(bug => {
            if (bug.id === id && !bug.resolved) {
                // Play internal confetti for a hit
                confetti({
                    particleCount: 20,
                    spread: 40,
                    origin: { x: bug.x / 100, y: bug.y / 100 },
                    colors: ['#3B82F6', '#10B981']
                });
                return { 
                    ...bug, 
                    resolved: true, 
                    text: positiveThoughts[Math.floor(Math.random() * positiveThoughts.length)] 
                };
            }
            return bug;
        }));

        const newScore = score + 1;
        setScore(newScore);

        if (newScore >= targetScore) {
            setGameState('success');
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#3B82F6', '#60A5FA', '#93C5FD', '#FCD34D']
            });
            setTimeout(() => setGameState('flying'), 1500);
        }
    };

    const resetGame = () => {
        setBugs([]);
        setScore(0);
        setGameState('idle');
    };

    if (!isMounted) return <div className="min-h-screen bg-black" />;

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative font-sans">
            {/* Space Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-10 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" />
                <div className="absolute top-40 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10 h-screen flex flex-col">
                <Link 
                    href="/imagination"
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-all mb-4 w-fit no-underline group z-50"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 돌아가기
                </Link>

                <div className="text-center mb-6 z-50">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-blue-400 mb-2">코딩 우주선 엔진실</h1>
                    <p className="text-gray-400 text-sm md:text-base">우주를 떠도는 부정적 생각(버그)을 터치하여 긍정 에너지로 변환하세요!</p>
                </div>

                {/* Bug Area */}
                <div className="flex-1 relative border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm overflow-hidden mb-8">
                    {gameState === 'idle' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-20">
                            <button 
                                onClick={spawnBugs}
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black text-xl shadow-lg shadow-blue-500/50 transition-all transform hover:scale-105"
                            >
                                디버깅 시작
                            </button>
                        </div>
                    )}
                    
                    <AnimatePresence>
                        {bugs.map(bug => (
                            <motion.button
                                key={bug.id}
                                onClick={() => handleBugClick(bug.id)}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ 
                                    opacity: 1, 
                                    scale: bug.resolved ? 1.2 : 1,
                                    y: bug.resolved ? [0, -50] : [0, 15, -15, 0],
                                    x: bug.resolved ? 0 : [0, 10, -10, 0]
                                }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ 
                                    duration: bug.resolved ? 0.5 : bug.duration, 
                                    repeat: bug.resolved ? 0 : Infinity,
                                    delay: bug.resolved ? 0 : bug.delay
                                }}
                                disabled={bug.resolved}
                                className={`absolute px-4 py-3 rounded-2xl font-bold shadow-xl outline-none cursor-pointer ${
                                    bug.resolved 
                                    ? 'bg-green-500/20 text-green-400 border border-green-400/50' 
                                    : 'bg-red-500/20 text-red-400 hover:bg-red-500/40 border border-red-500/30'
                                }`}
                                style={{ 
                                    left: `${bug.x}%`, 
                                    top: `${bug.y}%`,
                                    pointerEvents: bug.resolved ? 'none' : 'auto'
                                }}
                            >
                                {bug.text}
                            </motion.button>
                        ))}
                    </AnimatePresence>

                    {/* Spaceship in the center bottom */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
                        <AnimatePresence>
                            {gameState !== 'flying' ? (
                                <motion.div
                                    animate={{ 
                                        y: gameState === 'success' ? -20 : [0, -5, 0],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative"
                                >
                                    <Rocket size={80} className={`${gameState === 'success' ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'text-blue-500'} transition-colors duration-500`} />
                                    {gameState === 'success' && (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="absolute -bottom-6 left-1/2 -translate-x-1/2"
                                        >
                                            <Zap className="text-yellow-400 animate-bounce" size={24} />
                                        </motion.div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ y: 0, opacity: 1 }}
                                    animate={{ y: -800, opacity: 0 }}
                                    transition={{ duration: 1.5, ease: "easeIn" }}
                                >
                                    <Rocket size={120} className="text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.8)]" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Energy Bar */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] mb-8 relative z-50">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-blue-400 font-bold">엔진 충전량</span>
                        <span className="text-white font-black">{Math.min(100, (score / targetScore) * 100)}%</span>
                    </div>
                    <div className="w-full bg-black/50 rounded-full h-6 border border-white/10 overflow-hidden relative p-1">
                        <motion.div 
                            className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full rounded-full relative"
                            initial={{ width: '0%' }}
                            animate={{ width: `${Math.min(100, (score / targetScore) * 100)}%` }}
                            transition={{ type: 'spring', bounce: 0.2 }}
                        >
                            {(score / targetScore) >= 1 && (
                                <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4 pb-10 z-50">
                    <button onClick={resetGame} className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white transition-all cursor-pointer">
                        <RefreshCcw size={24} />
                    </button>
                    <button 
                        disabled={true}
                        className={`px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all ${
                            gameState === 'flying' || gameState === 'success' ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50" : "bg-gray-800 border border-white/5 text-gray-500"
                        }`}
                    >
                        {gameState === 'flying' || gameState === 'success' ? <CheckCircle2 /> : <Zap />}
                        {gameState === 'flying' ? "발사 성공!" : gameState === 'success' ? "엔진 완전 충전" : "충전 대기 중..."}
                    </button>
                </div>
            </div>
        </div>
    );
}
