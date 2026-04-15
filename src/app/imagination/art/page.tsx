"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Sparkles, ChevronLeft, RefreshCcw, CheckCircle2, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { completeDay } from '@/lib/trainingStore';

interface PaintSplat {
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    rotation: number;
    scale: number;
}

const colors = ['#EC4899', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'];

function ArtGameContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dayValue = searchParams.get('day');
    const day = dayValue ? parseInt(dayValue) : 11;
    
    // Level calculation (1-5) based on 30-day (6 days per level)
    const level = Math.floor((day - 1) / 6) + 1;
    const levelNames = ['점묘화 기초', '선의 흐름', '색채의 조화', '빛의 폭발', '우주 걸작 완성'];

    const [isMounted, setIsMounted] = useState(false);
    const [splats, setSplats] = useState<PaintSplat[]>([]);
    const [score, setScore] = useState(0);
    const [currentStage, setCurrentStage] = useState(1);
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'readyToNext' | 'readyToLaunch' | 'stageClear' | 'success' | 'clear'>('idle');
    
    const targetScore = 5 + (currentStage * 2);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const startGame = () => {
        setSplats([]);
        setScore(0);
        setCurrentStage(1);
        setGameState('playing');
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (gameState !== 'playing') return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        // Dynamic colors based on stage
        const stageColors = [
            ['#EC4899', '#8B5CF6'], // 1: Pink/Purple
            ['#3B82F6', '#06B6D4'], // 2: Blue/Cyan
            ['#10B981', '#34D399'], // 3: Green
            ['#F59E0B', '#EF4444'], // 4: Orange/Red
            ['#EC4899', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'] // 5: Rainbow
        ];
        
        const palette = stageColors[currentStage - 1] || colors;
        const color = palette[Math.floor(Math.random() * palette.length)];

        // Enhanced confetti based on level and stage
        confetti({
            particleCount: 20 + (currentStage * 10),
            spread: 40 + (currentStage * 10),
            origin: { x: (e.clientX) / window.innerWidth, y: (e.clientY) / window.innerHeight },
            colors: [color, '#ffffff']
        });

        const newSplat: PaintSplat = {
            id: Date.now(),
            x,
            y,
            color,
            size: 60 + (currentStage * 20) + (Math.random() * 40),
            rotation: Math.random() * 360,
            scale: 0.8 + (currentStage * 0.1)
        };

        setSplats(prev => [...prev, newSplat]);
        const newScore = score + 1;
        setScore(newScore);

        if (newScore >= targetScore) {
            if (currentStage < 5) {
                setGameState('readyToNext');
            } else {
                setGameState('readyToLaunch');
            }
        }
    };

    const handleNextStage = () => {
        if (gameState !== 'readyToNext') return;
        setGameState('stageClear');
        setTimeout(() => {
            setCurrentStage(prev => prev + 1);
            setScore(0);
            setGameState('playing');
        }, 800);
    };

    const handleLaunch = () => {
        if (gameState !== 'readyToLaunch') return;
        setGameState('success');
        const duration = 5000;
        const end = Date.now() + duration;
        const confettiColors = ['#EC4899', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'];

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: confettiColors
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: confettiColors
            });
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        setTimeout(() => {
            setGameState('clear');
        }, 4000);
    };

    const resetGame = () => {
        setSplats([]);
        setScore(0);
        setGameState('idle');
    };

    if (!isMounted) return <div className="min-h-screen bg-black" />;

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative font-sans">
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
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 여정 지도로 돌아가기
                </Link>

                <div className="text-center mb-6 z-50 pointer-events-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 rounded-full text-pink-400 text-[10px] font-black uppercase tracking-widest mb-2 border border-pink-500/20">
                        상상훈련 DAY {day} • {currentStage}단계/총 5단계
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">아트 유니버스</h1>
                    <p className="text-gray-400 text-sm md:text-base">캔버스에 긍정의 색을 채우세요. 5개의 레이어를 완성해야 합니다.</p>
                </div>

                <div className={`flex-1 relative rounded-[3rem] overflow-hidden mb-8 border transition-all duration-700 pointer-events-auto cursor-crosshair ${
                        gameState === 'success' || gameState === 'clear' ? 'border-pink-500/50 shadow-[0_0_50px_rgba(236,72,153,0.3)] bg-white/10' : 'border-white/10 bg-white/5'
                    }`}
                    onClick={handleCanvasClick}
                >
                    {gameState === 'idle' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-20">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center"
                            >
                                <button 
                                    onClick={(e) => { e.stopPropagation(); startGame(); }}
                                    className="px-12 py-5 bg-gradient-to-r from-pink-600 to-purple-600 hover:scale-110 rounded-2xl font-black text-2xl shadow-lg transition-all active:scale-95"
                                >
                                    컬러 미션 시작
                                </button>
                                <p className="mt-6 text-white/40 text-sm italic">"색채는 영혼에 직접적인 영향을 미치는 수단이다."</p>
                            </motion.div>
                        </div>
                    )}
                    
                    {gameState === 'stageClear' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm z-20 pointer-events-none">
                            <motion.h3 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-3xl font-black text-white drop-shadow-lg"
                            >
                                Stage {currentStage} 완료! 다음 레이어 준비...
                            </motion.h3>
                        </div>
                    )}

                    <AnimatePresence>
                        {splats.map(splat => (
                            <motion.div
                                key={splat.id}
                                initial={{ opacity: 0, scale: 0, rotate: splat.rotation }}
                                animate={{ 
                                    opacity: 1, 
                                    scale: [0, splat.scale * 1.5, splat.scale], 
                                    rotate: splat.rotation + (currentStage > 2 ? 20 : 0) 
                                }}
                                transition={{ duration: 0.6, type: 'spring' }}
                                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen pointer-events-none ${currentStage >= 4 ? 'animate-pulse' : ''}`}
                                style={{
                                    left: `${splat.x}%`,
                                    top: `${splat.y}%`,
                                    width: `${splat.size}px`,
                                    height: `${splat.size}px`,
                                    background: `radial-gradient(circle, ${splat.color} 0%, transparent 80%)`,
                                    filter: `blur(${8 - currentStage}px) brightness(${1 + currentStage * 0.1})`,
                                    boxShadow: currentStage >= 3 ? `0 0 ${20 + currentStage * 10}px ${splat.color}44` : 'none'
                                }}
                            />
                        ))}
                    </AnimatePresence>

                    {/* Next Stage Button Overlay */}
                    <AnimatePresence>
                        {gameState === 'readyToNext' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-30">
                                <motion.button
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    onClick={(e) => { e.stopPropagation(); handleNextStage(); }}
                                    className="px-10 py-5 bg-white text-black rounded-2xl font-black text-xl flex items-center gap-3 hover:scale-110 active:scale-95 transition-all shadow-2xl"
                                >
                                    <Sparkles className="text-pink-500" /> {currentStage}단계 예술 완성: 다음 단계로
                                </motion.button>
                            </div>
                        )}
                        {gameState === 'readyToLaunch' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-30">
                                <motion.button
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    onClick={(e) => { e.stopPropagation(); handleLaunch(); }}
                                    className="px-12 py-6 bg-pink-600 text-white rounded-2xl font-black text-2xl flex items-center gap-3 hover:scale-110 active:scale-95 transition-all shadow-[0_0_50px_rgba(236,72,153,0.5)]"
                                >
                                    <Star className="fill-white" /> 우주 걸작 최종 완성!
                                </motion.button>
                            </div>
                        )}
                    </AnimatePresence>

                    {gameState === 'success' && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-black/20 z-10"
                        >
                            <Sparkles className="text-yellow-400 animate-pulse mb-4" size={80} />
                            <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg text-center leading-tight">
                                마음의 우주가 <br/> 빛나기 시작합니다!
                            </h2>
                        </motion.div>
                    )}

                    {/* Mission Clear Screen */}
                    <AnimatePresence>
                        {gameState === 'clear' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl p-10 text-center"
                            >
                                <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(236,72,153,0.5)]">
                                    <Star size={50} className="text-white" />
                                </div>
                                <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">Day {day} 예술 완성!</h2>
                                <p className="text-white/60 text-lg mb-10">당신의 상상력이 우주를 아름답게 물들였습니다.<br/>이제 마지막 관문인 미래 과학 실험실로 이동할 준비가 되었습니다.</p>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <button 
                                        onClick={() => router.push(`/imagination/science?day=${day}`)}
                                        className="px-12 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-2xl font-black text-xl flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                                    >
                                        STEP 3: 미래 과학 실험실로 <ArrowRight />
                                    </button>
                                    <button 
                                        onClick={() => router.push('/imagination')}
                                        className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
                                    >
                                        지도 확인하기
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center justify-between pointer-events-auto bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] mb-10 z-50">
                    <div className="w-full flex-1">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-pink-400 font-black uppercase text-xs tracking-widest leading-none flex items-center gap-2">
                                <Palette size={16} /> 마음의 캔버스 충전도
                            </span>
                            <span className="text-white font-black">{Math.min(100, Math.round((score / targetScore) * 100))}%</span>
                        </div>
                        <div className="w-full bg-black/50 rounded-full h-4 border border-white/5 overflow-hidden relative shadow-inner">
                            <motion.div 
                                className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-500 h-full rounded-full"
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

export default function ArtGamePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <ArtGameContent />
        </Suspense>
    );
}
