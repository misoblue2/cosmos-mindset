"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Zap, ChevronLeft, RefreshCcw, Play, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

export default function CodingGamePage() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
    const [gameState, setGameState] = useState<'idle' | 'success' | 'flying'>('idle');
    
    const subjects = ["나는", "우리는", "내 마음은"];
    const actions = ["언제나", "매일", "강하게"];
    const goals = ["성장한다", "빛이 난다", "할 수 있다"];
    
    const targetSentence = "나는 매일 성장한다";

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleBlockClick = (word: string) => {
        if (selectedBlocks.length < 3 && !selectedBlocks.includes(word)) {
            setSelectedBlocks([...selectedBlocks, word]);
        }
    };

    const resetGame = () => {
        setSelectedBlocks([]);
        setGameState('idle');
    };

    const launchSpaceship = () => {
        const currentSentence = selectedBlocks.join(" ");
        if (currentSentence === targetSentence) {
            setGameState('success');
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#3B82F6', '#60A5FA', '#93C5FD']
            });
            setTimeout(() => setGameState('flying'), 1200);
        } else {
            alert("확언의 기운이 맞지 않습니다! 순서를 다시 한 번 확인해볼까요?");
            resetGame();
        }
    };

    if (!isMounted) return <div className="min-h-screen bg-black" />;

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative font-sans">
            {/* Space Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-10 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" />
                <div className="absolute top-40 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10 h-screen flex flex-col">
                <Link 
                    href="/imagination"
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-all mb-8 w-fit no-underline group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 돌아가기
                </Link>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black tracking-tighter text-blue-400 mb-2">코딩 우주선 엔진실</h1>
                    <p className="text-gray-500 text-sm">긍정 확언 블록을 순서대로 조립하여 에너지를 충전하세요.</p>
                </div>

                {/* Spaceship Area */}
                <div className="flex-1 flex items-center justify-center relative">
                    <AnimatePresence>
                        {gameState !== 'flying' ? (
                            <motion.div
                                initial={{ y: 0 }}
                                animate={{ 
                                    y: gameState === 'success' ? -20 : [0, -10, 0],
                                    rotate: gameState === 'success' ? 0 : [-1, 1, -1]
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="relative"
                            >
                                <Rocket size={120} className={`${gameState === 'success' ? 'text-yellow-400' : 'text-blue-500'} transition-colors duration-500`} />
                                {gameState === 'success' && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute -bottom-10 left-1/2 -translate-x-1/2"
                                    >
                                        <Zap className="text-yellow-400 animate-bounce" size={40} />
                                    </motion.div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ y: 0, opacity: 1 }}
                                animate={{ y: -1000, opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeIn" }}
                            >
                                <Rocket size={120} className="text-yellow-400" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Coding Area */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] mb-8">
                    <div className="flex justify-center gap-4 mb-8">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="w-24 h-14 md:w-32 md:h-16 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center text-blue-300 font-bold bg-black/20">
                                {selectedBlocks[i] || ""}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-wrap justify-center gap-2">
                            {subjects.map(s => (
                                <button 
                                    key={s} 
                                    disabled={selectedBlocks.includes(s) || gameState !== 'idle'}
                                    onClick={() => handleBlockClick(s)} 
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                        selectedBlocks.includes(s) 
                                        ? "bg-blue-600/10 border-blue-500/10 text-white/20 cursor-not-allowed" 
                                        : "bg-blue-600/20 hover:bg-blue-600 border-blue-500/30 text-white"
                                    }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            {actions.map(a => (
                                <button 
                                    key={a} 
                                    disabled={selectedBlocks.includes(a) || gameState !== 'idle'}
                                    onClick={() => handleBlockClick(a)} 
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                        selectedBlocks.includes(a) 
                                        ? "bg-purple-600/10 border-purple-500/10 text-white/20 cursor-not-allowed" 
                                        : "bg-purple-600/20 hover:bg-purple-600 border-purple-500/30 text-white"
                                    }`}
                                >
                                    {a}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            {goals.map(g => (
                                <button 
                                    key={g} 
                                    disabled={selectedBlocks.includes(g) || gameState !== 'idle'}
                                    onClick={() => handleBlockClick(g)} 
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                        selectedBlocks.includes(g) 
                                        ? "bg-pink-600/10 border-pink-500/10 text-white/20 cursor-not-allowed" 
                                        : "bg-pink-600/20 hover:bg-pink-600 border-pink-500/30 text-white"
                                    }`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4 pb-10">
                    <button onClick={resetGame} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all">
                        <RefreshCcw size={24} />
                    </button>
                    <button 
                        onClick={launchSpaceship}
                        disabled={selectedBlocks.length < 3}
                        className={`px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all ${
                            selectedBlocks.length === 3 ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50" : "bg-gray-800 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        {gameState === 'flying' ? <CheckCircle2 /> : <Play />}
                        {gameState === 'flying' ? "발사 성공" : "엔진 가동"}
                    </button>
                </div>
            </div>
        </div>
    );
}
