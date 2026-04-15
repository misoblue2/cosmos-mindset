"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Star, Rocket, ChevronLeft, Sparkles, Lock, CheckCircle2, Trophy, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getProgress, UserProgress } from '@/lib/trainingStore';

const DAYS = 30;

export default function ImaginationJourneyPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [progress, setProgress] = useState<UserProgress | null>(null);
    const [hoveredDay, setHoveredDay] = useState<number | null>(null);

    useEffect(() => {
        const loadProgress = async () => {
            const data = await getProgress();
            setProgress(data);
            setIsMounted(true);
        };
        loadProgress();
    }, []);

    if (!isMounted || !progress) return <div className="min-h-screen bg-[#050510]" />;

    const getTheme = (day: number) => {
        const level = Math.floor((day - 1) / 6) + 1;
        
        const style = day <= 10 ? 
            { icon: <Zap size={18} />, color: 'from-blue-600 to-cyan-400', shadow: 'shadow-blue-500/30' } :
            day <= 20 ?
            { icon: <Star size={18} />, color: 'from-purple-600 to-pink-400', shadow: 'shadow-pink-500/30' } :
            { icon: <Rocket size={18} />, color: 'from-emerald-600 to-teal-400', shadow: 'shadow-emerald-500/30' };

        return { 
            name: '일일 통합 훈련 3STEP', 
            levelName: `우주 개척 ${day}일차`,
            icon: style.icon, 
            color: style.color, 
            shadow: style.shadow,
            href: '/imagination/coding', // 무조건 코딩부터 시작
            level,
            stages: 15
        };
    };

    // Calculate position for spiral/path layout
    const getPosition = (day: number) => {
        const row = Math.floor((day - 1) / 5);
        const col = (day - 1) % 5;
        const x = row % 2 === 0 ? col * 20 + 10 : (4 - col) * 20 + 10;
        const y = row * 15 + 10;
        return { x, y };
    };

    return (
        <div className="min-h-screen bg-[#050510] text-white relative flex flex-col items-center pt-8 pb-32">
            {/* Cosmic Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050510] to-[#050510]" />
                {/* Random smaller stars */}
                {[...Array(50)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
                        style={{ 
                            top: `${Math.random() * 100}%`, 
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 max-w-5xl relative z-10 w-full">
                {/* Top Nav */}
                <div className="flex justify-between items-center mb-10">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-white/40 hover:text-white transition-all font-bold cursor-pointer no-underline group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 메인
                    </Link>
                    
                    <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-2.5 rounded-2xl border border-white/10 shadow-xl">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-none mb-1">Total Energy</span>
                            <span className="text-xl font-black text-yellow-400 leading-none">{progress.totalPositiveEnergy.toLocaleString()}</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-none mb-1">Journey</span>
                            <span className="text-xl font-black text-white leading-none">{progress.completedDays.length}/30</span>
                        </div>
                    </div>
                </div>

                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block"
                    >
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Sparkles className="text-yellow-400" size={20} />
                            <h2 className="text-sm font-black text-yellow-400 uppercase tracking-[0.3em]">30 Days Transformation</h2>
                            <Sparkles className="text-yellow-400" size={20} />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-indigo-200 to-purple-400 mb-6 py-2">
                            상상학교 스타 패스: 일일 15단계
                        </h1>
                        <p className="text-white/50 max-w-xl mx-auto font-medium leading-relaxed">
                            매일 [코딩 ➡️ 아트 ➡️ 과학] 3가지 우주를 순차 돌파하세요.<br/>
                            30일 후, 당신은 완전히 새로운 마음의 차원을 갖게 됩니다.
                        </p>
                    </motion.div>
                </div>

                {/* The 30-Day Path Map */}
                <div className="relative w-full aspect-[4/3] md:aspect-[16/9] mb-20 bg-black/20 rounded-[3rem] border border-white/5 overflow-hidden p-8 md:p-16">
                    {/* SVG Progress Line */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.path
                            d={Array.from({ length: DAYS }).reduce<string>((acc, _, i) => {
                                const pos = getPosition(i + 1);
                                return acc + (i === 0 ? `M ${pos.x} ${pos.y}` : ` L ${pos.x} ${pos.y}`);
                            }, '')}
                            fill="none"
                            stroke="white"
                            strokeWidth="0.5"
                            strokeDasharray="2 2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                    </svg>

                    {/* Day Nodes */}
                    <div className="relative w-full h-full">
                        {Array.from({ length: DAYS }).map((_, i) => {
                            const day = i + 1;
                            const pos = getPosition(day);
                            const theme = getTheme(day);
                            const isCompleted = progress.completedDays.includes(day);
                            const isUnlocked = day <= progress.currentDay;
                            const isCurrent = day === progress.currentDay;

                            return (
                                <motion.div
                                    key={day}
                                    className="absolute"
                                    style={{ 
                                        left: `${pos.x}%`, 
                                        top: `${pos.y}%`,
                                        transform: 'translate(-50%, -50%)' 
                                    }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.03 }}
                                >
                                    <Link 
                                        href={isUnlocked ? `${theme.href}?day=${day}` : '#'}
                                        onClick={(e) => !isUnlocked && e.preventDefault()}
                                        onMouseEnter={() => setHoveredDay(day)}
                                        onMouseLeave={() => setHoveredDay(null)}
                                        className={`
                                            relative group flex items-center justify-center
                                            w-12 h-12 md:w-16 md:h-16 rounded-full transition-all duration-300
                                            ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}
                                            ${isCurrent ? 'ring-4 ring-yellow-400 ring-offset-4 ring-offset-[#050510] z-30 shadow-[0_0_30px_rgba(250,204,21,0.5)]' : 'z-20'}
                                        `}
                                        style={{ WebkitTapHighlightColor: 'transparent' }}
                                    >
                                        {/* Node Circle */}
                                        <div className={`
                                            absolute inset-0 rounded-full bg-gradient-to-br ${theme.color} 
                                            ${isUnlocked ? theme.shadow : 'grayscale bg-white/10'}
                                            transition-all duration-500
                                            group-hover:scale-110 active:scale-95
                                        `} />
                                        
                                        {/* Inner Content */}
                                        <div className="relative z-10 flex flex-col items-center justify-center">
                                            {isCompleted ? (
                                                <CheckCircle2 size={24} className="text-white drop-shadow-md" />
                                            ) : !isUnlocked ? (
                                                <Lock size={18} className="text-white/50" />
                                            ) : (
                                                <span className="text-lg md:text-xl font-black text-white drop-shadow-md">{day}</span>
                                            )}
                                        </div>

                                        {/* Day Label (Tooltip style) */}
                                        <AnimatePresence>
                                            {hoveredDay === day && isUnlocked && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                                    animate={{ opacity: 1, scale: 1, y: -45 }}
                                                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                                    className="absolute whitespace-nowrap bg-white text-black px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-2xl z-40 pointer-events-none"
                                                >
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-1.5">
                                                            {theme.icon}
                                                            <span>Day {day}: {theme.name}</span>
                                                        </div>
                                                        <div className="text-[8px] opacity-70 text-indigo-500">
                                                            Lvl {theme.level} • 일일 총 15스테이지 완수
                                                        </div>
                                                    </div>
                                                    {/* Arrow */}
                                                    <div className="absolute -bottom-1 left-1/2 -track-x-1/2 w-2 h-2 bg-white rotate-45" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Current Indicator Glow */}
                                        {isCurrent && (
                                            <div className="absolute inset-[-10px] rounded-full border-2 border-yellow-400/50 animate-ping" />
                                        )}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Legend / Guide */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {[
                        { title: 'STEP 1: 코딩 우주선 (5단계)', subtitle: '마음의 오류를 디버깅하여 긍정 네트워크를 복구하세요.', color: 'bg-blue-600', icon: <Zap size={20} /> },
                        { title: 'STEP 2: 아트 유니버스 (5단계)', subtitle: '딱딱해진 이성에 따뜻한 통찰과 감성의 색채를 불어넣으세요.', color: 'bg-pink-600', icon: <Star size={20} /> },
                        { title: 'STEP 3: 미래 실험실 (5단계)', subtitle: '최종 결정체를 모아 나만의 가능성 우주를 매일 창조하세요.', color: 'bg-emerald-600', icon: <Rocket size={20} /> },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl group hover:bg-white/10 transition-all flex flex-col items-start text-left">
                            <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:rotate-12 transition-transform`}>
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-black text-white mb-2 leading-tight">{item.title}</h3>
                            <p className="text-white/40 text-xs leading-relaxed">{item.subtitle}</p>
                        </div>
                    ))}
                </div>

                {/* Completion Celebration Footer */}
                {progress.completedDays.length === 30 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-20 p-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-[3rem] text-center text-[#050510] relative overflow-hidden"
                    >
                        <div className="absolute top-[-50px] right-[-50px] opacity-20"><Trophy size={200} /></div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">축하합니다! 30일 완주!</h2>
                        <p className="text-lg font-bold opacity-80 mb-8 max-w-2xl mx-auto">당신은 이제 긍정 에너지가 가득한 삶의 우주 비행사입니다. <br/>언제든 마음의 버그가 생기면 이곳으로 돌아오세요.</p>
                        <button 
                            onClick={async () => {
                                if (confirm('훈련을 처음부터 다시 시작하시겠습니까? (기존 기록이 초기화됩니다)')) {
                                    const { resetProgress } = await import('@/lib/trainingStore');
                                    await resetProgress();
                                    window.location.reload();
                                }
                            }}
                            className="bg-[#050510] text-white px-8 py-3.5 rounded-2xl font-black flex items-center gap-2 mx-auto hover:scale-105 active:scale-95 transition-all"
                        >
                            <ArrowRight size={20} /> 다시 도전하기
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}