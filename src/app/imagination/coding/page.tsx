"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, ChevronLeft, CheckCircle2, ArrowRight, Play, Lock } from 'lucide-react';
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
    isBoss?: boolean;
    health?: number;
}

const negativeThoughts = [
    "난 안돼", "포기할까", "너무 어려워", "나는 부족해", 
    "실패할 거야", "두려워", "또 틀렸어", "재능이 없어", 
    "늦었어", "답답해", "어차피 안돼", "망했어", "누가 날 좋아하겠어", "이래서 안돼"
];

const positiveThoughts = [
    "할 수 있다!", "성장 중!", "새로운 도전!", "배우는 과정", 
    "성공할 거야!", "용기!", "다시 해보자!", "나는 충분해!", 
    "지금부터 시작!", "해결할 수 있어!", "경험이야", "멋진 시도!", "충분히 빛나고 있어"
];

const stageDescriptions = [
    "느리게 떠다니는 작은 부정적 생각들을 터치하여 기본 긍정 로직을 복구하세요.",
    "조금 더 빨라진 부정 버그들을 순발력 있게 잡아 시스템 최적화율을 높이세요.",
    "끊어진 네트워크를 연결하기 위해 다수의 버그를 끊임없이 신속하게 처리하세요.",
    "외부의 부정적 개입을 막는 방화벽을 튼튼하게 구축하세요. 집중력이 필요합니다!",
    "거대한 보스 버그를 여러 번 터치해 부수고 코어 엔진을 최종 점화하세요!"
];

function CodingGameContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dayValue = searchParams.get('day');
    const day = dayValue ? parseInt(dayValue) : 1;

    const [isMounted, setIsMounted] = useState(false);
    
    // Level & Data
    const level = Math.floor((day - 1) / 6) + 1;
    const levelNames = ['기본 디버깅', '시스템 최적화', '네트워크 복구', '방화벽 강화', '코어 엔진 재가동'];
    
    // UI/Flow State
    const [viewingStage, setViewingStage] = useState(1);
    const [maxUnlockedStage, setMaxUnlockedStage] = useState(1);
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'stageClear' | 'readyToLaunch' | 'flying' | 'success' | 'clear'>('intro');
    
    // Gameplay State
    const [bugs, setBugs] = useState<Bug[]>([]);
    const [score, setScore] = useState(0);

    // Difficulty
    const targetScore = 5 + (viewingStage * 3) + (level * 2);
    const bugDuration = Math.max(0.6, 4 - (viewingStage * 0.4) - (level * 0.2)); 

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // 1~4단계 클리어 시 4초 대기 후 자동으로 다음 단계 진입
    useEffect(() => {
        if (gameState === 'stageClear') {
            const timer = setTimeout(() => {
                handleNextStage();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [gameState, viewingStage]);

    // 5단계 최종 발사 화면(success) 이후 우주선 애니메이션(flying) 처리 및 아트 전환
    useEffect(() => {
        if (gameState === 'success') {
            const flyTimer = setTimeout(() => setGameState('flying'), 1500);
            const clearTimer = setTimeout(() => {
                setGameState('clear');
            }, 4000);
            return () => {
                clearTimeout(flyTimer);
                clearTimeout(clearTimer);
            };
        }
    }, [gameState]);

    // Clear 상태 돌입 후 5초 뒤 무조건 아트로 자동 이동
    useEffect(() => {
        if (gameState === 'clear') {
            const timer = setTimeout(() => {
                router.push(`/imagination/art?day=${day}`);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [gameState, day, router]);


    const startGame = () => {
        setScore(0);
        const bugCount = 8 + (viewingStage * 3) + (level * 2);
        const newBugs: Bug[] = Array.from({ length: bugCount }).map((_, i) => {
            const isBossCandidate = viewingStage === 5 && i === bugCount - 1;
            return {
                id: Date.now() + i,
                text: isBossCandidate ? "거대 부정적 생각" : negativeThoughts[Math.floor(Math.random() * negativeThoughts.length)],
                x: Math.random() * 80 + 10,
                y: Math.random() * 60 + 10,
                delay: Math.random() * (1.5 - (viewingStage * 0.1)),
                duration: Math.random() * bugDuration + bugDuration,
                resolved: false,
                isBoss: isBossCandidate,
                health: isBossCandidate ? (3 + level) : 1
            };
        });
        setBugs(newBugs);
        setGameState('playing');
    };

    const handleBugClick = (id: number) => {
        if (gameState !== 'playing') return;

        let stageCleared = false;

        setBugs(prev => prev.map(bug => {
            if (bug.id === id && !bug.resolved) {
                const currentHealth = bug.health || 1;
                if (currentHealth > 1) {
                    confetti({ particleCount: 15, spread: 30, origin: { x: bug.x / 100, y: bug.y / 100 }, colors: ['#EF4444', '#F87171'] });
                    return { ...bug, health: currentHealth - 1 };
                }

                confetti({ particleCount: 25, spread: 50, colors: ['#3B82F6', '#10B981'] });
                
                const newScore = score + 1;
                setScore(newScore);

                if (newScore >= targetScore) {
                    stageCleared = true;
                }

                return { 
                    ...bug, 
                    resolved: true, 
                    text: positiveThoughts[Math.floor(Math.random() * positiveThoughts.length)],
                    health: 0
                };
            }
            return bug;
        }));

        if (stageCleared) {
            confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 }, colors: ['#3B82F6', '#FCD34D'] });
            if (viewingStage < 5) {
                if (maxUnlockedStage <= viewingStage) {
                    setMaxUnlockedStage(viewingStage + 1);
                }
                setGameState('stageClear');
            } else {
                setGameState('readyToLaunch');
            }
        }
    };

    const handleNextStage = () => {
        setBugs([]);
        const nextStage = viewingStage + 1;
        if (nextStage <= 5) {
            setViewingStage(nextStage);
            setGameState('intro');
            setTimeout(() => {
                // Intro로 잠시 빠졌다가 바로 시작하게 해주거나, 사용자가 클릭하게 놔둠
                // 여기서는 "순차적 버튼 클릭 및 자동 시작"이라는 요청에 따라, 
                // Intro 화면 렌더링 후 0.1초만에 startGame 호출하여 매끄러운 자동 진행 연출.
                // 수동 전환 클릭 시에도 이 함수가 불리므로 동일하게 작동
                setViewingStage(nextStage);
                // Intro 보여줄 새 없이 바로 훈련 돌입원하면 바로 startGame(),
                // 체험 설명(intro)을 읽게 하려면 intro에 머물게 함. 
                // 사용자가 체험을 읽어야 하므로 intro 상태에 머물게 하는 것이 좋음.
            }, 100);
        }
    };

    const handleLaunch = () => {
        if (gameState !== 'readyToLaunch') return;
        confetti({ particleCount: 250, spread: 140, origin: { y: 0.6 }, colors: ['#3B82F6', '#60A5FA', '#93C5FD', '#FCD34D', '#10B981'] });
        setGameState('success');
    };

    if (!isMounted) return <div className="min-h-screen bg-black" />;

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative font-sans">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-10 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" />
                <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10 h-screen flex flex-col">
                <Link 
                    href="/imagination"
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-all mb-4 w-fit no-underline group z-50 pointer-events-auto"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 여정 지도로 돌아가기
                </Link>

                <div className="text-center mb-6 z-50 pointer-events-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2 border border-blue-500/20">
                         DAY {day} • {levelNames[level - 1]}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-blue-400 mb-6">코딩 우주선 엔진실</h1>
                    
                    {/* 상단 1~5단계 네비게이션 및 설명 UI 렌더링 영역 */}
                    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
                        <div className="flex bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-1 overflow-hidden">
                            {[1, 2, 3, 4, 5].map((stageNumber) => {
                                const isUnlocked = stageNumber <= maxUnlockedStage;
                                const isCurrent = viewingStage === stageNumber;
                                return (
                                    <button
                                        key={stageNumber}
                                        onClick={() => {
                                            if (isUnlocked && gameState !== 'playing') {
                                                setViewingStage(stageNumber);
                                                setGameState('intro');
                                            }
                                        }}
                                        className={`flex-1 flex flex-col items-center py-2 transition-all rounded-xl relative ${
                                            isCurrent ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 
                                            isUnlocked ? 'hover:bg-white/10 cursor-pointer' : 
                                            'opacity-30 cursor-not-allowed'
                                        }`}
                                    >
                                        {!isUnlocked && <Lock size={12} className="absolute top-2 right-2" />}
                                        <span className={`text-xs font-black ${isCurrent ? 'text-white' : 'text-blue-200'}`}>{stageNumber}단계</span>
                                    </button>
                                );
                            })}
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={viewingStage}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl shadow-inner text-sm md:text-base text-blue-100/80"
                            >
                                <strong className="text-blue-300 block mb-1">{viewingStage}단계 임무 정보</strong>
                                {stageDescriptions[viewingStage - 1]}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="flex-1 relative border border-white/10 rounded-[3rem] bg-white/5 backdrop-blur-sm overflow-hidden mb-8 z-30 pointer-events-auto">
                    
                    {/* 게임 진행 화면이 아닐 때 (Intro, StageClear 등) 중앙 팝업 */}
                    <AnimatePresence>
                        {gameState !== 'playing' && gameState !== 'flying' && gameState !== 'clear' && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-[100] backdrop-blur-md"
                            >
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center p-8 bg-black/40 border border-white/10 rounded-[2rem] shadow-2xl flex flex-col items-center"
                                >
                                    {gameState === 'intro' && (
                                        <>
                                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                                                <Play className="text-blue-400 ml-1" size={32} />
                                            </div>
                                            <h3 className="text-3xl font-black text-white mb-6">준비 되셨나요?</h3>
                                            <p className="mb-6 text-white/50">{viewingStage}단계 디버깅을 시작합니다.</p>
                                            <button 
                                                onClick={startGame}
                                                className="px-12 py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black text-xl shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all hover:scale-110 active:scale-95 text-white"
                                            >
                                                {viewingStage}단계 시작하기
                                            </button>
                                        </>
                                    )}

                                    {gameState === 'stageClear' && (
                                        <>
                                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                                                <CheckCircle2 className="text-green-400" size={32} />
                                            </div>
                                            <h3 className="text-3xl font-black text-white mb-6 tracking-tighter">
                                                {viewingStage}단계 완벽 복구!
                                            </h3>
                                            <p className="text-white/50 mb-6">잠시 후 다음 단계로 자동 이동합니다...</p>
                                            <button 
                                                onClick={handleNextStage}
                                                className="px-10 py-5 bg-white/10 border border-white/20 hover:bg-white/20 rounded-2xl font-black text-lg transition-all active:scale-95 text-white flex gap-2 items-center"
                                            >
                                                기다리지 않고 바로 진행 <ArrowRight size={18}/>
                                            </button>
                                        </>
                                    )}

                                    {gameState === 'readyToLaunch' && (
                                        <>
                                            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
                                                <Rocket className="text-yellow-400" size={32} />
                                            </div>
                                            <h3 className="text-3xl font-black text-yellow-400 mb-6 tracking-tighter drop-shadow-md">
                                                모든 코어 엔진 복구 완료
                                            </h3>
                                            <p className="text-white/70 mb-6">에너지가 100% 충전되었습니다. 직접 버튼을 눌러 우주선을 발사하세요!</p>
                                            <button 
                                                onClick={handleLaunch}
                                                className="px-12 py-5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl font-black text-xl shadow-[0_0_40px_rgba(250,204,21,0.5)] transition-all hover:scale-110 active:scale-95 text-black flex items-center gap-2"
                                            >
                                                <Rocket className="rotate-45" /> 엔진 점화 및 발사
                                            </button>
                                        </>
                                    )}
                                    
                                    {gameState === 'success' && (
                                        <>
                                            <h3 className="text-4xl font-black text-white mb-4 tracking-tighter">
                                                코어를 점화합니다!
                                            </h3>
                                            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                                        </>
                                    )}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <AnimatePresence>
                        {gameState === 'playing' && bugs.map(bug => (
                            <motion.button
                                key={bug.id}
                                onClick={() => handleBugClick(bug.id)}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ 
                                    opacity: 1, 
                                    scale: bug.resolved ? 1.2 : 1,
                                    y: bug.resolved ? [0, -70] : [0, 15, -15, 0],
                                    x: bug.resolved ? 0 : [0, 10, -10, 0]
                                }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ 
                                    duration: bug.resolved ? 0.6 : bug.duration, 
                                    repeat: bug.resolved ? 0 : Infinity,
                                    delay: bug.resolved ? 0 : bug.delay
                                }}
                                disabled={bug.resolved}
                                className={`absolute px-5 py-3.5 rounded-[1.2rem] font-bold shadow-2xl outline-none cursor-pointer border backdrop-blur-md transition-all z-[90] ${
                                    bug.resolved 
                                    ? 'bg-green-500/20 text-green-300 border-green-400/40' 
                                    : bug.isBoss 
                                        ? 'bg-purple-600/40 text-purple-200 border-purple-500/50 scale-125 z-40'
                                        : 'bg-red-500/20 text-red-300 hover:bg-red-500/40 border-red-500/30'
                                }`}
                                style={{ 
                                    left: `${bug.x}%`, 
                                    top: `${bug.y}%`,
                                    pointerEvents: bug.resolved ? 'none' : 'auto'
                                }}
                            >
                                {bug.text}
                                {bug.isBoss && !bug.resolved && (
                                    <div className="absolute -top-3 left-0 w-full flex justify-center gap-0.5">
                                        {Array.from({ length: bug.health || 0 }).map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-red-500 rounded-full" />
                                        ))}
                                    </div>
                                )}
                            </motion.button>
                        ))}
                    </AnimatePresence>

                    {/* Spaceship Graphic in Background */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-30">
                        <AnimatePresence>
                            {(gameState !== 'flying' && gameState !== 'clear') ? (
                                <motion.div
                                    animate={{ 
                                        y: (gameState === 'success' || gameState === 'readyToLaunch' || gameState === 'stageClear') ? -20 : [0, -8, 0],
                                        scale: (gameState === 'success' || gameState === 'readyToLaunch') ? 1.1 : 1
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Rocket size={120} className={`${(gameState === 'success' || gameState === 'readyToLaunch') ? 'text-yellow-400 drop-shadow-[0_0_50px_rgba(250,204,21,0.6)]' : 'text-blue-500/50'} transition-colors duration-500`} />
                                </motion.div>
                            ) : gameState === 'flying' ? (
                                <motion.div
                                    initial={{ y: 0, opacity: 1 }}
                                    animate={{ y: -1500, opacity: 0 }}
                                    transition={{ duration: 2, ease: "easeIn" }}
                                >
                                    <Rocket size={140} className="text-yellow-400 drop-shadow-[0_0_80px_rgba(250,204,21,0.8)]" />
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>

                    {/* Final Success Popup */}
                    <AnimatePresence>
                        {gameState === 'clear' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-[150] flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl p-10 text-center"
                            >
                                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(37,99,235,0.5)]">
                                    <ArrowRight size={50} className="text-white" />
                                </div>
                                <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">Day {day} 코딩 임무 완수!</h2>
                                <p className="text-blue-200 text-lg mb-10">
                                    당신의 긍정 에너지가 우주선의 엔진을 수리했습니다.<br/>
                                    아무 것도 누르지 않으셔도 <br className="md:hidden"/> 잠시 후 <b>아트 유니버스</b>로 이동합니다.
                                </p>
                                <button 
                                    onClick={() => router.push(`/imagination/art?day=${day}`)}
                                    className="px-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center gap-2 pointer-events-auto"
                                >
                                    아트 유니버스로 즉시 이동 <ArrowRight size={20} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Energy Bar */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-[2rem] relative z-50 pointer-events-auto">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-blue-400 font-black uppercase text-xs tracking-widest leading-none">
                            {viewingStage}단계 최적화 진행률
                        </span>
                        <span className="text-white font-black">{Math.min(100, Math.round((score / targetScore) * 100))}%</span>
                    </div>
                    <div className="w-full bg-black/50 rounded-full h-8 border border-white/5 overflow-hidden relative p-1.5 shadow-inner">
                        <motion.div 
                            className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 h-full rounded-full relative"
                            initial={{ width: '0%' }}
                            animate={{ width: `${Math.min(100, (score / targetScore) * 100)}%` }}
                            transition={{ type: 'spring', bounce: 0.1, duration: 0.8 }}
                        >
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] bg-[length:40px_100%] animate-[shimmer_1.5s_infinite]" />
                        </motion.div>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes shimmer {
                    0% { background-position: -40px 0; }
                    100% { background-position: 100% 0; }
                }
            `}</style>
        </div>
    );
}

export default function CodingGamePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <CodingGameContent />
        </Suspense>
    );
}
