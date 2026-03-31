"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Beaker, Flame, Sparkles, ChevronLeft, RefreshCcw, FlaskRound } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

const elements = [
    { id: 'e1', name: '호기심', color: 'bg-emerald-500', glow: 'shadow-emerald-500/50' },
    { id: 'e2', name: '실패', color: 'bg-red-500', glow: 'shadow-red-500/50' },
    { id: 'e3', name: '꾸준함', color: 'bg-blue-500', glow: 'shadow-blue-500/50' },
    { id: 'e4', name: '용기', color: 'bg-amber-500', glow: 'shadow-amber-500/50' },
    { id: 'e5', name: '따뜻함', color: 'bg-pink-500', glow: 'shadow-pink-500/50' },
    { id: 'e6', name: '아이디어', color: 'bg-purple-500', glow: 'shadow-purple-500/50' }
];

const results = [
    { text: '빛나는 혁신!', desc: '새로운 세상을 여는 열쇠가 됩니다.', icon: <Sparkles size={40} className="text-yellow-400" /> },
    { text: '위대한 경험!', desc: '실패는 성공을 향한 가장 훌륭한 재료입니다.', icon: <Flame size={40} className="text-orange-400" /> },
    { text: '무한한 성장!', desc: '어제보다 더 나은 당신을 만들었습니다.', icon: <Rocket size={40} className="text-blue-400" /> },
    { text: '따뜻한 연결!', desc: '세상을 아름답게 바꾸는 힘이 피어납니다.', icon: <Heart size={40} className="text-pink-400" /> }
];

import { Rocket, Heart } from 'lucide-react';

export default function ScienceGamePage() {
    const [isMounted, setIsMounted] = useState(false);
    const [selectedElements, setSelectedElements] = useState<typeof elements>([]);
    const [gameState, setGameState] = useState<'idle' | 'synthesizing' | 'result'>('idle');
    const [finalResult, setFinalResult] = useState<typeof results[0] | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleElementClick = (element: typeof elements[0]) => {
        if (gameState !== 'idle') return;
        
        if (selectedElements.find(e => e.id === element.id)) {
            setSelectedElements(prev => prev.filter(e => e.id !== element.id));
        } else if (selectedElements.length < 2) {
            setSelectedElements(prev => [...prev, element]);
        }
    };

    const handleSynthesis = () => {
        if (selectedElements.length !== 2) return;
        
        setGameState('synthesizing');

        // Play middle confetti
        const end = Date.now() + 1500;
        const colors = ['#10B981', '#3B82F6', '#6366F1'];

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 90,
                spread: 30,
                origin: { x: 0.5, y: 0.6 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        setTimeout(() => {
            setFinalResult(results[Math.floor(Math.random() * results.length)]);
            setGameState('result');
            
            // Big Boom
            confetti({
                particleCount: 150,
                spread: 120,
                origin: { y: 0.5 },
                colors: ['#FCD34D', '#10B981', '#3B82F6', '#EC4899']
            });
        }, 1500);
    };

    const resetGame = () => {
        setSelectedElements([]);
        setFinalResult(null);
        setGameState('idle');
    };

    if (!isMounted) return <div className="min-h-screen bg-black" />;

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative font-sans">
            <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 to-blue-900/10 pointer-events-none" />

            <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10 h-screen flex flex-col">
                <Link 
                    href="/imagination"
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-all mb-4 w-fit no-underline group z-50 pointer-events-auto"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 돌아가기
                </Link>

                <div className="text-center mb-8 z-50 pointer-events-auto">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">미래 과학 실험실</h1>
                    <p className="text-gray-400 text-sm md:text-base">두 가지 에너지 원소를 배합하여 잠재력을 폭발시켜 보세요.</p>
                </div>

                {/* Synthesis Area */}
                <div className="flex-1 flex flex-col items-center justify-center relative mb-8 z-50 pointer-events-auto">
                    <div className="flex gap-4 md:gap-12 mb-12 relative w-full justify-center">
                        {/* Flask 1 */}
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 md:w-32 md:h-32 mb-4 bg-white/5 border-2 border-dashed border-white/20 rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                                {selectedElements[0] ? (
                                    <motion.div 
                                        initial={{ y: 50, opacity: 0 }} 
                                        animate={{ y: 0, opacity: 1 }}
                                        className={`absolute inset-0 ${selectedElements[0].color} opacity-30`}
                                    />
                                ) : (
                                    <FlaskConical size={32} className="text-white/20" />
                                )}
                                {selectedElements[0] && <span className="relative z-10 font-bold">{selectedElements[0].name}</span>}
                            </div>
                        </div>

                        {/* Plus Sign */}
                        <div className="flex items-center justify-center pb-8">
                            <span className="text-3xl font-black text-white/20">+</span>
                        </div>

                        {/* Flask 2 */}
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 md:w-32 md:h-32 mb-4 bg-white/5 border-2 border-dashed border-white/20 rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                                {selectedElements[1] ? (
                                    <motion.div 
                                        initial={{ y: 50, opacity: 0 }} 
                                        animate={{ y: 0, opacity: 1 }}
                                        className={`absolute inset-0 ${selectedElements[1].color} opacity-30`}
                                    />
                                ) : (
                                    <FlaskRound size={32} className="text-white/20" />
                                )}
                                {selectedElements[1] && <span className="relative z-10 font-bold">{selectedElements[1].name}</span>}
                            </div>
                        </div>
                    </div>

                    <AnimatePresence>
                        {gameState === 'result' && finalResult && (
                            <motion.div 
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]/90 backdrop-blur-md rounded-3xl border border-emerald-500/30 p-8 shadow-[0_0_50px_rgba(16,185,129,0.2)]"
                            >
                                <div className="p-6 bg-emerald-500/10 rounded-full mb-6">
                                    {finalResult.icon}
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-emerald-400 mb-4">{finalResult.text}</h2>
                                <p className="text-emerald-100/70 text-lg md:text-xl font-medium">{finalResult.desc}</p>
                                <button 
                                    onClick={resetGame}
                                    className="mt-8 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-bold cursor-pointer"
                                >
                                    새로운 실험하기
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Synthesis Button */}
                    <AnimatePresence>
                        {selectedElements.length === 2 && gameState === 'idle' && (
                            <motion.button
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 20, opacity: 0 }}
                                onClick={handleSynthesis}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-20 px-10 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl font-black text-2xl shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105 transition-transform flex items-center gap-2"
                            >
                                <Beaker className="animate-pulse" /> 합성 시작
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                {/* Elements Bench */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] mb-10 z-50 pointer-events-auto">
                    <h3 className="text-white/50 text-sm font-bold mb-4 text-center uppercase tracking-widest">실험 원소 진열대</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {elements.map((el) => {
                            const isSelected = selectedElements.find(e => e.id === el.id);
                            return (
                                <button
                                    key={el.id}
                                    onClick={() => handleElementClick(el)}
                                    disabled={gameState !== 'idle'}
                                    className={`p-4 rounded-2xl border transition-all cursor-pointer font-bold relative overflow-hidden ${
                                        isSelected 
                                            ? `border-white/20 bg-white/10 ${el.glow} glow`
                                            : `border-white/5 bg-black/50 hover:bg-white/5`
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded-full ${el.color}`} />
                                        <span className={isSelected ? 'text-white' : 'text-gray-400'}>{el.name}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4 pb-10 z-50 pointer-events-auto">
                    <button onClick={resetGame} className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white transition-all cursor-pointer">
                        <RefreshCcw size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}
