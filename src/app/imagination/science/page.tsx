"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Beaker, Flame, Sparkles, ChevronLeft, RefreshCcw, FlaskRound, Rocket, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { completeDay } from '@/lib/trainingStore';

const elements = [
    { id: 'e1', name: '호기심', color: 'bg-emerald-500', glow: 'shadow-emerald-500/50' },
    { id: 'e2', name: '실패의 용기', color: 'bg-red-500', glow: 'shadow-red-500/50' },
    { id: 'e3', name: '꾸준함', color: 'bg-blue-500', glow: 'shadow-blue-500/50' },
    { id: 'e4', name: '자신감', color: 'bg-amber-500', glow: 'shadow-amber-500/50' },
    { id: 'e5', name: '사랑', color: 'bg-pink-500', glow: 'shadow-pink-500/50' },
    { id: 'e6', name: '창의적 생각', color: 'bg-purple-500', glow: 'shadow-purple-500/50' }
];

const results = [
    { text: '빛나는 혁신!', desc: '새로운 세상을 여는 열쇠가 탄생했습니다.', icon: <Sparkles size={40} className="text-yellow-400" /> },
    { text: '위대한 경험!', desc: '실패를 딛고 일어선 당신은 무적입니다.', icon: <Flame size={40} className="text-orange-400" /> },
    { text: '무한한 성장!', desc: '어제보다 더 나은 당신의 우주가 생성되었습니다.', icon: <Rocket size={40} className="text-blue-400" /> },
    { text: '따뜻한 연결!', desc: '세상을 아름답게 바꾸는 공감의 에너지가 피어납니다.', icon: <Heart size={40} className="text-pink-400" /> }
];

function ScienceGameContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dayValue = searchParams.get('day');
    const day = dayValue ? parseInt(dayValue) : 21;
    
    // Level calculation (1-5) based on 30-day (6 days per level)
    const level = Math.floor((day - 1) / 6) + 1;
    const levelNames = ['초급 합성', '중급 반응', '에너지 정제', '고차원 물리', '우주 재창조'];

    const [isMounted, setIsMounted] = useState(false);
    const [selectedElements, setSelectedElements] = useState<typeof elements>([]);
    const [gameState, setGameState] = useState<'idle' | 'synthesizing' | 'result' | 'readyToNext' | 'readyToLaunch' | 'clear'>('idle');
    const [finalResult, setFinalResult] = useState<typeof results[0] | null>(null);
    const [currentStage, setCurrentStage] = useState(1);
    const [collectedGems, setCollectedGems] = useState<number[]>([]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleElementClick = (element: typeof elements[0]) => {
        if (gameState !== 'idle') return;
        
        const maxElements = (level >= 3 || currentStage >= 3) ? 3 : 2;

        if (selectedElements.find(e => e.id === element.id)) {
            setSelectedElements(prev => prev.filter(e => e.id !== element.id));
        } else if (selectedElements.length < maxElements) {
            setSelectedElements(prev => [...prev, element]);
        }
    };

    const handleSynthesis = () => {
        const requiredElements = (level >= 3 || currentStage >= 3) ? 3 : 2;
        if (selectedElements.length !== requiredElements) return;
        
        setGameState('synthesizing');

        const end = Date.now() + 1500;
        const confettiColors = ['#10B981', '#3B82F6', '#6366F1'];

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 90,
                spread: 30,
                origin: { x: 0.5, y: 0.6 },
                colors: confettiColors
            });
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        setTimeout(() => {
            const result = results[Math.floor(Math.random() * results.length)];
            setFinalResult(result);
            setGameState('result');
            setCollectedGems(prev => [...prev, currentStage]);
            
            confetti({
                particleCount: 150 + (currentStage * 30),
                spread: 120,
                origin: { y: 0.5 },
                colors: ['#FCD34D', '#10B981', '#3B82F6', '#EC4899']
            });

            setTimeout(() => {
                if (currentStage < 5) {
                    setGameState('readyToNext');
                } else {
                    setGameState('readyToLaunch');
                }
            }, 1000);
        }, 1500);
    };

    const handleNextStage = () => {
        if (gameState !== 'readyToNext') return;
        setSelectedElements([]);
        setFinalResult(null);
        setCurrentStage(prev => prev + 1);
        setGameState('idle');
    };

    const handleFinalClear = async () => {
        if (gameState !== 'readyToLaunch') return;
        await completeDay(day, 300 + (day * 20)); // 통합 미션 클리어에 대한 보상 강화
        setGameState('clear');
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
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 여정 지도로 돌아가기
                </Link>

                <div className="text-center mb-8 z-50 pointer-events-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-2 border border-emerald-500/20">
                        상상훈련 DAY {day} • {currentStage}단계/총 5단계
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">미래 과학 실험실</h1>
                    <p className="text-gray-400 text-sm md:text-base">5개의 미래 에너지를 합성하세요! 현재 {collectedGems.length}개 완료</p>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center relative mb-8 z-50 pointer-events-auto">
                    <div className="flex gap-4 md:gap-12 mb-12 relative w-full justify-center">
                        {/* Flask 1 */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 md:w-24 md:h-24 mb-4 bg-white/5 border-2 border-dashed border-white/20 rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                                {selectedElements[0] ? (
                                    <motion.div 
                                        initial={{ y: 50, opacity: 0 }} 
                                        animate={{ y: 0, opacity: 1 }}
                                        className={`absolute inset-0 ${selectedElements[0].color} opacity-30`}
                                    />
                                ) : (
                                    <FlaskConical size={24} className="text-white/20" />
                                )}
                                {selectedElements[0] && <span className="relative z-10 font-bold text-[8px] md:text-xs text-center px-1">{selectedElements[0].name}</span>}
                            </div>
                        </div>

                        <div className="flex items-center justify-center pb-8">
                            <span className="text-xl font-black text-white/20">+</span>
                        </div>

                        {/* Flask 2 */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 md:w-24 md:h-24 mb-4 bg-white/5 border-2 border-dashed border-white/20 rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                                {selectedElements[1] ? (
                                    <motion.div 
                                        initial={{ y: 50, opacity: 0 }} 
                                        animate={{ y: 0, opacity: 1 }}
                                        className={`absolute inset-0 ${selectedElements[1].color} opacity-30`}
                                    />
                                ) : (
                                    <FlaskRound size={24} className="text-white/20" />
                                )}
                                {selectedElements[1] && <span className="relative z-10 font-bold text-[8px] md:text-xs text-center px-1">{selectedElements[1].name}</span>}
                            </div>
                        </div>

                        {level >= 3 && (
                            <>
                                <div className="flex items-center justify-center pb-8">
                                    <span className="text-xl font-black text-white/20">+</span>
                                </div>

                                {/* Flask 3 (Level 3+) */}
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 md:w-24 md:h-24 mb-4 bg-white/5 border-2 border-dashed border-white/20 rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                                        {selectedElements[2] ? (
                                            <motion.div 
                                                initial={{ y: 50, opacity: 0 }} 
                                                animate={{ y: 0, opacity: 1 }}
                                                className={`absolute inset-0 ${selectedElements[2].color} opacity-30`}
                                            />
                                        ) : (
                                            <Beaker size={24} className="text-white/20" />
                                        )}
                                        {selectedElements[2] && <span className="relative z-10 font-bold text-[8px] md:text-xs text-center px-1">{selectedElements[2].name}</span>}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Gem Collection Tray */}
                    <div className="flex gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${collectedGems.includes(i) ? 'bg-emerald-500/40 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-white/5 border-white/10'}`}>
                                {collectedGems.includes(i) ? <Sparkles size={16} className="text-yellow-400" /> : <div className="w-2 h-2 rounded-full bg-white/20" />}
                            </div>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {(gameState === 'result' || gameState === 'readyToNext' || gameState === 'readyToLaunch') && finalResult && (
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]/80 backdrop-blur-3xl rounded-[3rem] border border-emerald-500/30 p-8 shadow-[0_0_80px_rgba(16,185,129,0.3)] z-40"
                            >
                                <motion.div 
                                    animate={{ scale: [1, 1.2, 1] }} 
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="p-8 bg-emerald-500/20 rounded-full mb-8 shadow-[0_0_40px_rgba(16,185,129,0.4)]"
                                >
                                    {finalResult.icon}
                                </motion.div>
                                <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 to-cyan-500 mb-6 tracking-tighter">{finalResult.text}</h2>
                                <p className="text-emerald-50/70 text-lg md:text-2xl font-medium max-w-md text-center leading-relaxed mb-8">{finalResult.desc}</p>
                                
                                {gameState === 'readyToNext' && (
                                    <motion.button
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        onClick={handleNextStage}
                                        className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xl flex items-center gap-2 shadow-lg"
                                    >
                                        에너지 회수: 다음 실험으로 <ArrowRight />
                                    </motion.button>
                                )}
                                
                                {gameState === 'readyToLaunch' && (
                                    <motion.button
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        onClick={handleFinalClear}
                                        className="px-12 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-2xl font-black text-2xl flex items-center gap-3 shadow-[0_0_50px_rgba(16,185,129,0.5)]"
                                    >
                                        <Sparkles /> 최종 에너지 결정체 생성 완료!
                                    </motion.button>
                                )}
                            </motion.div>
                        )}
                        
                        {gameState === 'clear' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl p-10 text-center"
                            >
                                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(16,185,129,0.5)]">
                                    <Rocket size={50} className="text-white" />
                                </div>
                                <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">Day {day} 모든 훈련 성공!</h2>
                                <p className="text-white/60 text-lg mb-10">당신은 코딩, 아트, 과학 3단계 훈련을 모두 마쳤습니다.<br/>긍정 에너지로 가득 채워진 우주가 당신의 다음을 기다립니다.</p>
                                <button 
                                    onClick={() => {
                                        if (day < 30) {
                                            router.push(`/imagination/coding?day=${day + 1}`);
                                        } else {
                                            router.push('/imagination');
                                        }
                                    }}
                                    className="px-12 py-5 bg-white text-black rounded-2xl font-black text-xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                                >
                                    {day < 30 ? `Day ${day + 1} 훈련 준비` : '메인 로비로 복귀'} <ArrowRight />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Synthesis Button */}
                    <AnimatePresence>
                        {selectedElements.length === (level >= 3 ? 3 : 2) && gameState === 'idle' && (
                            <motion.button
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 20, opacity: 0 }}
                                onClick={handleSynthesis}
                                className="absolute bottom-[-20px] px-12 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl font-black text-2xl shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:scale-110 active:scale-95 transition-transform flex items-center gap-2"
                            >
                                <Beaker className="animate-pulse" /> 미래 에너지 합성
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                {/* Elements Bench */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] mb-12 z-50 pointer-events-auto">
                    <h3 className="text-white/40 text-[10px] font-black mb-4 text-center uppercase tracking-[0.3em]">Positive Elements Selection</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {elements.map((el) => {
                            const isSelected = selectedElements.find(e => e.id === el.id);
                            return (
                                <button
                                    key={el.id}
                                    onClick={() => handleElementClick(el)}
                                    disabled={gameState !== 'idle'}
                                    className={`p-4 rounded-2xl border transition-all cursor-pointer font-bold relative overflow-hidden group ${
                                        isSelected 
                                            ? `border-emerald-500/50 bg-emerald-500/20 translate-y-[-4px]`
                                            : `border-white/5 bg-black/40 hover:bg-white/10 hover:border-white/20`
                                    }`}
                                >
                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className={`w-4 h-4 rounded-full ${el.color} ${isSelected ? 'animate-pulse shadow-[0_0_10px_white]' : ''}`} />
                                        <span className={`text-sm md:text-base ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{el.name}</span>
                                    </div>
                                    {isSelected && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-center pb-10 z-50 pointer-events-auto">
                    <button onClick={resetGame} className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white transition-all cursor-pointer group">
                        <RefreshCcw size={24} className="group-hover:rotate-180 transition-transform duration-700" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ScienceGamePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <ScienceGameContent />
        </Suspense>
    );
}
