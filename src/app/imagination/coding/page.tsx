"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, ChevronLeft, CheckCircle2, ArrowRight, Play, Lock, Trash2, BatteryCharging, Shield, Radio, Mic } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

// --- Sub-components for 5 Unique Interactions ---

const Stage1Swipe = ({ onComplete }: { onComplete: () => void }) => {
    const [cards, setCards] = useState([
        { id: 1, text: "나는 부족해", type: 'negative' },
        { id: 2, text: "나는 점점 나아지고 있어", type: 'positive' },
        { id: 3, text: "이번에도 실패할거야", type: 'negative' },
        { id: 4, text: "난 충분히 해낼 수 있어", type: 'positive' }
    ]);

    const handleDragEnd = (event: any, info: any) => {
        if (cards.length === 0) return;
        const currentCard = cards[0];
        
        if (info.offset.x > 100) {
            if (currentCard.type === 'positive') processMatch();
            else processMiss();
        } else if (info.offset.x < -100) {
            if (currentCard.type === 'negative') processMatch();
            else processMiss();
        }
    };

    const processMatch = () => {
        confetti({ particleCount: 20, spread: 40, colors: ['#10B981', '#3B82F6'] });
        const newCards = [...cards].slice(1);
        setCards(newCards);
        if (newCards.length === 0) onComplete();
    };

    const processMiss = () => {
        // Just visually wait for them to try again. (Framer motion bounces back nicely)
    };

    if (cards.length === 0) return null;

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto">
            <div className="absolute left-4 md:left-10 opacity-30 flex flex-col items-center text-red-400 pointer-events-none">
                <Trash2 size={40} className="md:w-16 md:h-16" />
                <span className="text-[10px] md:text-sm mt-2 font-black">부정 (좌로 버리기)</span>
            </div>
            <div className="absolute right-4 md:right-10 opacity-30 flex flex-col items-center text-green-400 pointer-events-none">
                <BatteryCharging size={40} className="md:w-16 md:h-16" />
                <span className="text-[10px] md:text-sm mt-2 font-black">긍정 (우로 담기)</span>
            </div>
            
            <motion.div
                key={cards[0].id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="w-56 md:w-72 h-72 md:h-96 bg-[#1a1a2e] border-2 border-white/20 rounded-[2rem] flex flex-col items-center justify-center p-8 text-center cursor-grab active:cursor-grabbing shadow-2xl relative z-20"
                whileTap={{ scale: 0.95 }}
                whileDrag={{ scale: 1.05 }}
            >
                <div className="w-12 h-1 bg-white/20 rounded-full mb-8" />
                <h3 className="text-2xl md:text-3xl font-black leading-snug">{cards[0].text}</h3>
            </motion.div>
            <p className="mt-8 text-white/40 text-xs md:text-sm animate-pulse">카드를 잡고 알맞은 방향으로 스와이프 하세요</p>
        </div>
    );
};

const Stage2Typing = ({ onComplete }: { onComplete: () => void }) => {
    const [word, setWord] = useState("용기");
    const [input, setInput] = useState("");
    const [score, setScore] = useState(0);
    const words = ["도전", "희망", "감사"];

    useEffect(() => {
        if (score < 3) {
            setWord(words[score]);
            setInput("");
        } else {
            onComplete();
        }
    }, [score, onComplete, words]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === word) {
            confetti({ particleCount: 40, spread: 60, colors: ['#EF4444', '#FCD34D', '#10B981'] });
            setScore(s => s + 1);
        } else {
            setInput(""); // Reset on wrong
        }
    };

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto">
            <motion.div 
                key={word}
                initial={{ y: -50, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ type: 'spring' }}
                className="mb-12 p-8 bg-gradient-to-b from-red-600/30 to-rose-900/30 border-2 border-red-500/50 rounded-3xl flex flex-col items-center gap-4 shadow-[0_0_40px_rgba(225,29,72,0.3)]"
            >
                <Shield className="text-red-400" size={40} />
                <span className="text-red-200/60 text-sm font-bold uppercase tracking-widest">목표 단어</span>
                <span className="text-4xl md:text-5xl font-black text-white">{word}</span>
            </motion.div>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input 
                    autoFocus
                    type="text" 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="위 단어를 똑같이 입력하세요" 
                    className="px-8 py-5 md:min-w-[300px] bg-black/50 backdrop-blur-md border border-white/20 rounded-2xl text-xl text-center outline-none focus:border-blue-400 focus:bg-white/10 transition-all font-bold text-white shadow-inner place"
                />
                <button type="submit" className="hidden">Enter</button>
            </form>
        </div>
    );
};

const Stage3Puzzle = ({ onComplete }: { onComplete: () => void }) => {
    const [activeNodes, setActiveNodes] = useState<number[]>([]);
    const totalNodes = 4;

    const handleNodeClick = (id: number) => {
        if (activeNodes.length === id - 1) {
            const next = [...activeNodes, id];
            setActiveNodes(next);
            if (next.length === totalNodes) {
                confetti({ particleCount: 50, spread: 70, colors: ['#3B82F6', '#60A5FA'] });
                setTimeout(onComplete, 800);
            }
        } else if (!activeNodes.includes(id)) {
            setActiveNodes([]); // wrong order, reset
        }
    };

    const positions = [
        { top: '30%', left: '20%' },
        { top: '30%', left: '80%' },
        { top: '70%', left: '80%' },
        { top: '70%', left: '20%' },
    ];

    return (
        <div className="w-full h-full relative flex items-center justify-center z-50 pointer-events-auto">
            <div className="absolute top-10 font-black text-white/50 text-center px-4">
                코어 에너지를 순서대로 눌러 파이프 회로를 전부 연결하세요.
                <div className="text-blue-400 mt-2 tracking-[0.5em] text-lg mt-2">1 ➡️ 2 ➡️ 3 ➡️ 4</div>
            </div>
            
            <div className="relative w-64 h-64 md:w-96 md:h-96">
                {/* Lines (visual only for now) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 100 100">
                    <polyline points="20,30 80,30 80,70 20,70" fill="none" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
                </svg>

                {positions.map((pos, i) => {
                    const id = i + 1;
                    const isActive = activeNodes.includes(id);
                    return (
                        <motion.button
                            key={id}
                            style={{ top: pos.top, left: pos.left }}
                            className={`absolute w-16 h-16 md:w-20 md:h-20 -ml-8 -mt-8 md:-ml-10 md:-mt-10 rounded-full border-4 flex flex-col items-center justify-center font-black transition-all duration-300 z-50 pointer-events-auto shadow-2xl ${
                                isActive ? 'bg-blue-500 border-blue-200 text-white shadow-[0_0_40px_rgba(59,130,246,0.8)] scale-110' : 'bg-black border-white/20 text-white/30 hover:border-white/60 hover:bg-white/5'
                            }`}
                            onClick={() => handleNodeClick(id)}
                            whileTap={{ scale: 0.8 }}
                        >
                            <span className="text-2xl">{id}</span>
                        </motion.button>
                    )
                })}
            </div>
        </div>
    );
};

const Stage4Slider = ({ onComplete }: { onComplete: () => void }) => {
    const [value, setValue] = useState(50);
    const target = 77;
    const [matchedTime, setMatchedTime] = useState(0);

    useEffect(() => {
        let timer: any;
        if (value === target) {
            timer = setInterval(() => {
                setMatchedTime(prev => {
                    if (prev >= 2) {
                        clearInterval(timer);
                        onComplete();
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1000);
        } else {
            setMatchedTime(0);
        }
        return () => clearInterval(timer);
    }, [value, target, onComplete]);

    const isMatched = value === target;

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto">
            <Radio size={80} className={`mb-10 transition-colors duration-500 ${isMatched ? 'text-green-400 animate-pulse drop-shadow-[0_0_30px_rgba(74,222,128,0.5)]' : 'text-blue-500/30'}`} />
            
            <div className="text-center mb-10 bg-white/5 p-6 rounded-[2rem] border border-white/10 backdrop-blur-md">
                <p className="text-white/40 mb-2 font-bold tracking-widest text-sm">목표 긍정 주파수</p>
                <div className="text-6xl font-black text-blue-400 font-mono tracking-tighter">{target} <span className="text-2xl opacity-50">Hz</span></div>
            </div>

            <div className="text-center mb-6 text-4xl font-bold font-mono tracking-tighter">
                <span className={isMatched ? "text-green-400" : "text-white/70"}>{value} <span className="text-xl">Hz</span></span>
            </div>

            <input 
                type="range" 
                min="0" max="100" 
                value={value} 
                onChange={e => setValue(parseInt(e.target.value))}
                className="w-72 md:w-[28rem] h-4 accent-blue-500 bg-white/10 rounded-full appearance-none outline-none cursor-pointer"
            />
            <p className="mt-4 text-xs text-white/40 text-center">동기화 게이지를 정확히 맞춰 2초간 유지하세요.</p>

            <div className="mt-8 flex gap-2 h-2 w-48 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-green-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${(matchedTime / 2) * 100}%` }}
                />
            </div>
        </div>
    );
};

const Stage5Ignition = ({ onComplete }: { onComplete: () => void }) => {
    const [text, setText] = useState("");
    const target = "나는 해낼 수 있다";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text === target) {
            onComplete();
        }
    };

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto">
            <Mic size={70} className={`mb-8 transition-colors duration-500 ${text === target ? 'text-yellow-400 drop-shadow-[0_0_40px_rgba(250,204,21,0.8)]' : 'text-white/30'}`} />
            
            <h2 className="text-xl md:text-3xl font-black text-white mb-10 text-center leading-relaxed">
                엔진을 깨울 마지막 선언을 입력하세요.<br/>
                <span className="inline-block mt-4 text-yellow-400 bg-yellow-500/10 px-6 py-2 rounded-2xl border border-yellow-500/20">"{target}"</span>
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center w-full max-w-sm">
                <input 
                    type="text"
                    autoFocus
                    placeholder="입력 또는 소리내어 선언"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className="w-full px-6 py-5 bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl text-2xl text-center focus:border-yellow-400 focus:outline-none transition-all font-bold text-white shadow-inner place"
                />
                <button
                    type="submit"
                    className={`w-full py-5 rounded-2xl font-black text-xl transition-all ${
                        text === target ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-black shadow-[0_0_40px_rgba(250,204,21,0.6)] cursor-pointer hover:scale-105 active:scale-95' : 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'
                    }`}
                >
                    최종 코어 점화 🔥
                </button>
            </form>
        </div>
    );
};


// --- Flow Container ---

const stageDescriptionsMap = [
    "부정적인 생각은 왼쪽으로 버리고, 긍정적인 생각은 오른쪽으로 채워넣으세요!",
    "떨어지는 침입 부정어들을 막아내세요. 방어막에 쓰여진 단어를 정확히 타이핑하고 엔터를 누르세요.",
    "끊어진 긍정 회로를 순서대로 클릭하여 에너지를 완벽하게 연결하세요.",
    "라디오 슬라이더를 섬세하게 조절하여 안정적인 긍정 주파수(77Hz)에 맞추고 2초간 유지하세요.",
    "출격 준비 완료! 나만의 확언을 정확히 입력하고 최종 점화 버튼을 누르세요."
];

function CodingGameContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dayValue = searchParams.get('day');
    const day = dayValue ? parseInt(dayValue) : 1;

    const [isMounted, setIsMounted] = useState(false);
    
    // UI/Flow State
    const [viewingStage, setViewingStage] = useState(1);
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'stageClear' | 'readyToLaunch' | 'flying' | 'success' | 'clear'>('intro');
    
    const levelNames = ['스캐닝 필터', '단어 타이핑', '패턴 매칭', '주파수 동기화', '엔진 점화 확언'];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // 클리어 대기
    useEffect(() => {
        if (gameState === 'stageClear') {
            const timer = setTimeout(() => {
                handleNextStage();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [gameState, viewingStage]);

    // 5단계 최종 모션
    useEffect(() => {
        if (gameState === 'success') {
            const flyTimer = setTimeout(() => setGameState('flying'), 1500);
            const clearTimer = setTimeout(() => {
                setGameState('clear');
            }, 3500);
            return () => {
                clearTimeout(flyTimer);
                clearTimeout(clearTimer);
            };
        }
    }, [gameState]);

    // 완전 클리어 다음 장소 이동
    useEffect(() => {
        if (gameState === 'clear') {
            const timer = setTimeout(() => {
                router.push(`/imagination/art?day=${day}`);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [gameState, day, router]);

    const handleStageComplete = () => {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 }, colors: ['#3B82F6', '#10B981', '#FCD34D'] });
        if (viewingStage < 5) {
            setGameState('stageClear');
        } else {
            setGameState('readyToLaunch');
        }
    };

    const startGame = () => {
        setGameState('playing');
    };

    const handleNextStage = () => {
        const nextStage = viewingStage + 1;
        if (nextStage <= 5) {
            setViewingStage(nextStage);
            setGameState('intro');
        }
    };

    const handleLaunch = () => {
        if (gameState !== 'readyToLaunch') return;
        confetti({ particleCount: 250, spread: 140, origin: { y: 0.6 }, colors: ['#3B82F6', '#60A5FA', '#FCD34D', '#10B981'] });
        setGameState('success');
    };

    if (!isMounted) return <div className="min-h-screen bg-black" />;

    return (
        <div className="min-h-screen bg-[#050510] text-white overflow-hidden relative font-sans flex flex-col items-center">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-10 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" />
                <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10 flex-1 flex flex-col w-full h-[100dvh]">
                <Link 
                    href="/imagination"
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-all mb-4 w-fit no-underline group z-50 pointer-events-auto"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 여정 지도로 돌아가기
                </Link>

                <div className="text-center mb-6 z-50 pointer-events-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 rounded-full text-blue-400 text-[10px] md:text-xs font-black uppercase tracking-widest mb-4 border border-blue-500/20 shadow-inner">
                         DAY {day} MISSION
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-400 mb-6 drop-shadow-md">
                        우주선 코어 복구: {levelNames[viewingStage - 1]}
                    </h1>
                    
                    {/* 상단 1~5단계 네비게이션 */}
                    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
                        <div className="flex bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-1.5 overflow-hidden shadow-xl">
                            {[1, 2, 3, 4, 5].map((stageNumber) => {
                                const isCurrent = viewingStage === stageNumber;
                                return (
                                    <button
                                        key={stageNumber}
                                        onClick={() => {
                                            if (gameState !== 'playing') {
                                                setViewingStage(stageNumber);
                                                setGameState('intro');
                                            }
                                        }}
                                        className={`flex-1 flex flex-col items-center py-2.5 transition-all rounded-[14px] relative ${
                                            isCurrent ? 'bg-gradient-to-b from-blue-500 to-indigo-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 
                                            'hover:bg-white/10 cursor-pointer text-white/40'
                                        }`}
                                    >
                                        <span className={`text-xs font-black ${isCurrent ? 'text-white' : ''}`}>STEP {stageNumber}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative border border-white/10 rounded-[2.5rem] bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md overflow-hidden mb-8 z-30 pointer-events-auto shadow-2xl flex flex-col">
                    
                    {/* 게임 메커니즘 렌더링 */}
                    {gameState === 'playing' && (
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                            {viewingStage === 1 && <Stage1Swipe onComplete={handleStageComplete} />}
                            {viewingStage === 2 && <Stage2Typing onComplete={handleStageComplete} />}
                            {viewingStage === 3 && <Stage3Puzzle onComplete={handleStageComplete} />}
                            {viewingStage === 4 && <Stage4Slider onComplete={handleStageComplete} />}
                            {viewingStage === 5 && <Stage5Ignition onComplete={handleStageComplete} />}
                        </div>
                    )}

                    {/* 진행 화면이 아닐 때 모달 */}
                    <AnimatePresence>
                        {gameState !== 'playing' && gameState !== 'flying' && gameState !== 'clear' && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-[100] backdrop-blur-md pointer-events-auto"
                            >
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    className="text-center p-8 bg-[#0a0a1a] border border-white/10 rounded-[2rem] shadow-2xl flex flex-col items-center max-w-lg w-[90%]"
                                >
                                    {gameState === 'intro' && (
                                        <>
                                            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                                <Play className="text-blue-400 ml-1" size={40} />
                                            </div>
                                            <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">STEP {viewingStage}</h3>
                                            <p className="mb-8 text-blue-200/80 leading-relaxed font-medium bg-blue-900/30 p-4 rounded-xl border border-blue-500/20">
                                                {stageDescriptionsMap[viewingStage - 1]}
                                            </p>
                                            <button 
                                                onClick={startGame}
                                                className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-black text-xl shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all hover:scale-105 active:scale-95 text-white"
                                            >
                                                시작하기
                                            </button>
                                        </>
                                    )}

                                    {gameState === 'stageClear' && (
                                        <>
                                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                                <CheckCircle2 className="text-green-400" size={40} />
                                            </div>
                                            <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">
                                                {viewingStage}단계 완료!
                                            </h3>
                                            <p className="text-white/50 mb-8">안정화 완료. 다음 모듈로 넘어갑니다.</p>
                                            <button 
                                                onClick={handleNextStage}
                                                className="w-full py-5 bg-white/10 border border-white/20 hover:bg-white/20 rounded-2xl font-black text-lg transition-all active:scale-95 text-white flex gap-2 justify-center items-center"
                                            >
                                                바로 이동 <ArrowRight size={18}/>
                                            </button>
                                        </>
                                    )}

                                    {gameState === 'readyToLaunch' && (
                                        <>
                                            <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                                <Rocket className="text-yellow-400 drop-shadow-md" size={48} />
                                            </div>
                                            <h3 className="text-4xl font-black text-yellow-400 mb-4 tracking-tighter drop-shadow-md">
                                                코어 복구 100%
                                            </h3>
                                            <p className="text-white/70 mb-8 leading-relaxed">모든 훈련을 마쳤습니다.<br/>직접 점화 스위치를 눌러 멋지게 날아오르세요!</p>
                                            <button 
                                                onClick={handleLaunch}
                                                className="w-full py-6 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl font-black text-2xl shadow-[0_0_50px_rgba(250,204,21,0.6)] transition-all hover:scale-105 active:scale-95 text-black flex justify-center items-center gap-3"
                                            >
                                                <Rocket className="rotate-45" /> 엔진 발사
                                            </button>
                                        </>
                                    )}
                                    
                                    {gameState === 'success' && (
                                        <>
                                            <h3 className="text-4xl font-black text-white mb-6 tracking-tighter animate-pulse">
                                                점화 중...
                                            </h3>
                                            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-yellow-400 rounded-full animate-spin shadow-[0_0_30px_rgba(250,204,21,0.4)]" />
                                        </>
                                    )}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 백그라운드 우주선 그래픽 */}
                    <div className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-[10]">
                        <AnimatePresence>
                            {(gameState !== 'flying' && gameState !== 'clear') ? (
                                <motion.div
                                    animate={{ 
                                        y: (gameState === 'success' || gameState === 'readyToLaunch' || gameState === 'stageClear') ? -20 : [0, -8, 0],
                                        scale: (gameState === 'success' || gameState === 'readyToLaunch') ? 1.1 : 1
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Rocket size={120} className={`${(gameState === 'success' || gameState === 'readyToLaunch') ? 'text-yellow-400 drop-shadow-[0_0_50px_rgba(250,204,21,0.6)]' : 'text-blue-500/20'} transition-colors duration-500`} />
                                    {/* 엔진 불꽃 파티클 (간단) */}
                                    {gameState === 'success' && (
                                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-10 h-20 bg-gradient-to-t from-transparent via-yellow-500 to-white blur-md animate-pulse" />
                                    )}
                                </motion.div>
                            ) : gameState === 'flying' ? (
                                <motion.div
                                    initial={{ y: 0, opacity: 1, scale: 1.1 }}
                                    animate={{ y: -1500, opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 2, ease: "easeIn" }}
                                >
                                    <Rocket size={140} className="text-yellow-400 drop-shadow-[0_0_80px_rgba(250,204,21,0.8)]" />
                                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-16 h-40 bg-gradient-to-t from-transparent via-orange-500 to-white blur-xl" />
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>

                    {/* 최종 클리어 모달 (아트 유니버스 이동) */}
                    <AnimatePresence>
                        {gameState === 'clear' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-[150] flex flex-col items-center justify-center bg-[#050510]/95 backdrop-blur-xl p-10 text-center"
                            >
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(79,70,229,0.5)]">
                                    <ArrowRight size={50} className="text-white" />
                                </div>
                                <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">우주선 훈련 완수!</h2>
                                <p className="text-blue-200 text-lg md:text-xl mb-12 font-medium leading-relaxed">
                                    당신의 긍정 에너지가 엔진을 성공적으로 복구했습니다.<br/>
                                    아주 멋진 성과입니다.<br className="md:hidden"/> 잠시 후 <b>아트 유니버스</b>로 이어집니다.
                                </p>
                                <button 
                                    onClick={() => router.push(`/imagination/art?day=${day}`)}
                                    className="px-12 py-5 bg-white text-[#050510] rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-3 pointer-events-auto"
                                >
                                    아트 공간으로 즉시 이동 <ArrowRight size={20} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default function CodingGamePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#050510]" />}>
            <CodingGameContent />
        </Suspense>
    );
}
