"use client";

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CheckCircle2, ArrowRight, Play, Star, Brain, HeartPulse, Dna, Compass, Zap } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/sound';

// --- STAGE 1: 영양학적 마인드셋 (뇌-장축 활성화) ---
const Stage1GutBrain = ({ onComplete }: { onComplete: () => void }) => {
    const [energy, setEnergy] = useState(0);
    const targetEnergy = 100;
    const [foods, setFoods] = useState<{id: number, type: 'good' | 'bad', x: number, y: number}[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 주기적으로 음식 아이템을 떨구는 인터벌
        const interval = setInterval(() => {
            if (containerRef.current) {
                const isGood = Math.random() > 0.3; // 70% good food
                setFoods(prev => [
                    ...prev, 
                    { id: Date.now(), type: isGood ? 'good' : 'bad', x: Math.random() * 80 + 10, y: -10 }
                ]);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // 낙하 애니메이션 (CSS 기반)
    // 클릭 시 먹음
    const handleEat = (f: typeof foods[0]) => {
        setFoods(prev => prev.filter(item => item.id !== f.id));
        if (f.type === 'good') {
            sound?.playTap();
            setEnergy(e => {
                const next = Math.min(e + 20, targetEnergy);
                if (next === targetEnergy) {
                    sound?.playSuccess();
                    setTimeout(onComplete, 1000);
                }
                return next;
            });
        } else {
            sound?.playError();
            setEnergy(e => Math.max(0, e - 10)); // 패널티
        }
    };

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto px-4" ref={containerRef}>
            <h2 className="text-2xl font-black text-white mb-2 tracking-widest">장-뇌 연결망 복구</h2>
            <p className="text-white/60 mb-6 text-center text-sm font-bold">
                맑은 에너지(녹색 구슬)를 터치하여 뇌로 공급하세요.<br/>탁한 에너지(붉은 구슬)는 피하세요!
            </p>

            <div className="relative w-full max-w-sm h-96 bg-emerald-900/10 border border-emerald-500/20 rounded-3xl overflow-hidden mb-8 shadow-inner">
                {/* 브레인 코어 (하단) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none">
                    <Brain size={60} className={`transition-colors duration-500 ${energy === targetEnergy ? 'text-emerald-300 drop-shadow-[0_0_40px_rgba(52,211,153,1)]' : 'text-emerald-800'}`} />
                    <span className="text-emerald-400 font-black mt-2">{energy}%</span>
                </div>

                {/* 떨어지는 음식들 */}
                <AnimatePresence>
                    {foods.map(f => (
                        <motion.div
                            key={f.id}
                            initial={{ top: '-10%', left: `${f.x}%` }}
                            animate={{ top: '110%' }}
                            transition={{ duration: 3, ease: 'linear' }}
                            onPointerDown={() => handleEat(f)}
                            className={`absolute w-12 h-12 rounded-full cursor-pointer shadow-lg flex items-center justify-center border-2 z-20 ${
                                f.type === 'good' ? 'bg-emerald-400 border-white/50 text-emerald-900' : 'bg-red-500 border-white/50 text-white'
                            }`}
                        >
                            <span className="text-xs font-black">{f.type === 'good' ? '맑음' : '탁함'}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- STAGE 2: 소마틱 스트레칭 (강제 홀드) ---
const Stage2Somatic = ({ onComplete }: { onComplete: () => void }) => {
    const [holding, setHolding] = useState(false);
    const [progress, setProgress] = useState(0);
    const requiredTicks = 150; // 150 * 100ms = 15초 유지
    const holdTimer = useRef<any>(null);

    const startHold = () => {
        setHolding(true);
        sound?.startMeditationDrone(); 
        holdTimer.current = setInterval(() => {
            setProgress(p => {
                const next = p + 1;
                if (next >= requiredTicks) {
                    clearInterval(holdTimer.current);
                    sound?.stopMeditationDrone();
                    sound?.playSuccess();
                    onComplete();
                    return requiredTicks;
                }
                return next;
            });
        }, 100);
    };

    const stopHold = () => {
        setHolding(false);
        if (holdTimer.current) clearInterval(holdTimer.current);
        sound?.stopMeditationDrone();
        if (progress < requiredTicks) setProgress(0); // 원위치
    };

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto px-4 touch-none user-select-none">
            <h2 className="text-2xl font-black text-white mb-2 tracking-widest">미주신경 안정화</h2>
            <p className="text-emerald-100 mb-8 text-center text-sm md:text-base font-bold max-w-sm leading-relaxed p-4 bg-emerald-900/20 rounded-2xl border border-emerald-500/20">
                의자에서 허리를 펴고 가슴을 활짝 열어보세요.<br/>
                스트레칭 동작을 유지하면서, 아래 버튼을 <span className="text-yellow-300 animate-pulse">15초간 꾹 누르고 계세요.</span>
            </p>

            <div className="relative mb-12 flex items-center justify-center">
                {/* 15초 프로그레스 원형 */}
                <svg className="absolute w-[200px] h-[200px] -rotate-90 pointer-events-none">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                    <circle 
                        cx="100" cy="100" r="90" 
                        fill="none" 
                        stroke="#34d399" 
                        strokeWidth="8" 
                        strokeDasharray="565" 
                        strokeDashoffset={565 - (565 * progress) / requiredTicks}
                        className="transition-all duration-100"
                    />
                </svg>
                
                <button 
                    onPointerDown={startHold}
                    onPointerUp={stopHold}
                    onPointerLeave={stopHold}
                    className={`w-32 h-32 rounded-full font-black text-xl transition-all shadow-[0_0_40px_rgba(52,211,153,0.3)] ${
                        holding ? 'bg-emerald-500 scale-90 border-4 border-white text-emerald-900' : 'bg-emerald-800 border items-center justify-center text-emerald-200 hover:bg-emerald-700'
                    }`}
                >
                    {holding ? '호흡하세요' : '누르기'}
                </button>
            </div>
            {holding && <p className="text-emerald-300 font-bold animate-pulse">몸의 긴장을 풀고 가슴을 여세요...</p>}
        </div>
    );
};

// --- STAGE 3: 부정 입자 체외 배출 (커팅) ---
const Stage3ToxinCut = ({ onComplete }: { onComplete: () => void }) => {
    const initialBonds = [
        { id: 1, x: 20, y: 30, color: 'bg-red-500' },
        { id: 2, x: 70, y: 40, color: 'bg-purple-600' },
        { id: 3, x: 40, y: 70, color: 'bg-stone-600' },
        { id: 4, x: 80, y: 80, color: 'bg-zinc-800' },
        { id: 5, x: 30, y: 80, color: 'bg-red-900' },
    ];
    const [bonds, setBonds] = useState(initialBonds);
    
    const cutBond = (id: number) => {
        sound?.playTap();
        setBonds(prev => {
            const next = prev.filter(b => b.id !== id);
            if (next.length === 0) {
                sound?.playSuccess();
                setTimeout(onComplete, 1000);
            }
            return next;
        });
    };

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto px-4 touch-none">
            <h2 className="text-2xl font-black text-white mb-2">무기력 세포 절제</h2>
            <p className="text-white/50 mb-10 text-center text-sm font-bold">
                스트레칭으로 떨어져 나온 피로/무기력 물질들을 마우스로 그어(터치하여) 모두 파괴하세요.
            </p>

            <div className="relative w-full max-w-sm h-80 bg-white/5 border border-white/10 rounded-full shadow-inner overflow-hidden cursor-crosshair">
                <AnimatePresence>
                    {bonds.map((bond, i) => (
                        <motion.div
                            key={bond.id}
                            initial={{ scale: 1 }}
                            exit={{ scale: 0, opacity: 0, filter: "blur(10px)" }}
                            onPointerMove={(e) => {
                                // 드래그(스와이프/마우스이동) 시 커팅
                                if (e.buttons > 0 || e.pointerType === 'touch') {
                                    cutBond(bond.id);
                                }
                            }}
                            onPointerDown={() => cutBond(bond.id)}
                            className={`absolute w-16 h-16 rounded-full flex items-center justify-center border-4 border-white/20 shadow-xl ${bond.color}`}
                            style={{ left: `${bond.x}%`, top: `${bond.y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                            <span className="text-white/50 text-xs font-black">독소</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <p className="mt-6 text-emerald-400/50 text-center text-sm font-bold">(선을 주욱 그어서 파괴하세요)</p>
        </div>
    );
};

// --- STAGE 4: 무중력 0G 이완 명상 ---
const Stage4ZeroG = ({ onComplete }: { onComplete: () => void }) => {
    const [gravity, setGravity] = useState(10);
    const [isFloating, setIsFloating] = useState(false);
    const floatTime = useRef<any>(null);

    const handleGravityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setGravity(val);
        sound?.playTap();

        if (val === 0 && !isFloating) {
            setIsFloating(true);
            sound?.startMeditationDrone(); 
            // 0G 도달시 10초 무중력 관전 후 통과
            floatTime.current = setTimeout(() => {
                sound?.stopMeditationDrone();
                sound?.playSuccess();
                onComplete();
            }, 10000);
        } else if (val > 0 && isFloating) {
            setIsFloating(false);
            sound?.stopMeditationDrone();
            clearTimeout(floatTime.current);
        }
    };

    useEffect(() => {
        return () => clearTimeout(floatTime.current);
    }, []);

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto px-4 touch-none">
            <h2 className="text-2xl font-black text-white mb-2">무중력 이완 명상</h2>
            <p className="text-white/50 mb-16 text-center text-sm font-bold max-w-sm">
                몸의 모든 노폐물이 비워졌습니다.<br/>
                하단의 다이얼을 드래그해 중력을 <span className="text-emerald-400">0G</span>로 맞추고 육체를 허공에 띄우세요.
            </p>

            <div className="relative w-full max-w-sm h-64 border border-white/10 rounded-3xl bg-black/50 overflow-hidden mb-12 shadow-inner">
                {/* 떠다니는 입자들 (중력 영향) */}
                {[1,2,3,4,5].map(i => (
                    <motion.div
                        key={i}
                        animate={{ 
                            y: isFloating ? [-20, -100, -50] : 150, 
                            x: isFloating ? [0, i%2===0?20:-20, 0] : 0,
                            rotate: isFloating ? 360 : 0
                        }}
                        transition={{ duration: isFloating ? 4+i : 0.5, repeat: isFloating ? Infinity : 0, repeatType: "reverse" }}
                        className="absolute bottom-0 left-1/2 w-8 h-8 rounded-lg bg-emerald-500/30 border border-emerald-400/50"
                        style={{ marginLeft: i * 30 - 90 }}
                    />
                ))}
                
                {isFloating && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-4xl font-black text-emerald-200/50 tracking-widest uppercase">Floating in 0G</span>
                    </div>
                )}
            </div>

            <div className="w-full max-w-sm flex flex-col items-center">
                <span className={`text-4xl font-black mb-4 font-mono ${gravity===0 ? 'text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.8)]' : 'text-stone-400'}`}>
                    {gravity}.0 G
                </span>
                <input 
                    type="range" 
                    min="0" max="10" 
                    value={gravity} 
                    onChange={handleGravityChange}
                    className="w-full appearance-none bg-white/10 h-4 rounded-full outline-none focus:bg-white/20"
                />
            </div>
        </div>
    );
};

// --- STAGE 5: 생명의 제네시스 (빅뱅 폭발) ---
const Stage5Genesis = ({ onComplete }: { onComplete: () => void }) => {
    const [statement, setStatement] = useState("");
    const [holding, setHolding] = useState(false);
    const [progress, setProgress] = useState(0);
    const requiredTicks = 100; // 10초 빅뱅 점화

    const timerRef = useRef<any>(null);

    const checkReady = statement.replace(/\s+/g,'').length >= 10;

    const handlePointerDown = () => {
        if (!checkReady) return;
        setHolding(true);
        sound?.playEngineHum();
        timerRef.current = setInterval(() => {
            setProgress(p => {
                const next = p + 1;
                if (next >= requiredTicks) {
                    clearInterval(timerRef.current);
                    sound?.stopMeditationDrone();
                    sound?.playSuccess();
                    onComplete();
                    return requiredTicks;
                }
                return next;
            });
        }, 100);
    };

    const handlePointerUp = () => {
        setHolding(false);
        if (timerRef.current) clearInterval(timerRef.current);
        sound?.stopMeditationDrone();
        if (progress < requiredTicks) setProgress(0);
    };

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto px-4 touch-none user-select-none">
            <h2 className="text-3xl font-black text-emerald-300 mb-4 tracking-widest">생명의 빅뱅</h2>
            <p className="text-white/80 mb-10 text-center font-bold max-w-md leading-relaxed">
                몸과 마음이 완벽히 정화되어 하나의 핵으로 합쳐졌습니다.<br/>
                앞으로 이루고 싶은 가장 위대한 당신의 모습을 적고, 빅뱅 스위치를 10초간 눌러 우주를 창조하세요.
            </p>

            <textarea 
                value={statement}
                onChange={e => {
                    setStatement(e.target.value);
                    sound?.playTap();
                }}
                disabled={holding}
                placeholder="예: 나는 매일 넘치는 에너지로 세상을 지배한다."
                className="w-full max-w-md bg-white/5 border border-white/20 rounded-2xl p-6 text-white text-lg outline-none focus:border-emerald-400 focus:bg-white/10 transition-all font-bold resize-none shadow-inner mb-12"
                rows={3}
            />

            <div className="relative flex items-center justify-center">
                <div 
                    className={`absolute rounded-full transition-all duration-300 ${holding ? 'bg-emerald-500/20 shadow-[0_0_100px_rgba(52,211,153,0.8)]' : 'bg-transparent'}`}
                    style={{ width: 120 + progress * 2, height: 120 + progress * 2 }}
                />
                
                <button 
                    disabled={!checkReady}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    className={`relative z-10 w-28 h-28 rounded-full font-black text-xl transition-all border-4 flex items-center justify-center flex-col gap-1 ${
                        !checkReady ? 'bg-stone-800 border-stone-700 text-stone-600 cursor-not-allowed' :
                        holding ? 'bg-white border-emerald-300 text-emerald-900 scale-90' : 'bg-emerald-600 border-emerald-400 text-white hover:scale-105 shadow-[0_0_40px_rgba(52,211,153,0.4)]'
                    }`}
                >
                    <Zap size={30} className={holding ? 'animate-bounce text-emerald-600' : ''} />
                    {holding ? `${Math.floor((progress/requiredTicks)*100)}%` : '점화'}
                </button>
            </div>
            {!checkReady && <p className="mt-6 text-red-400 font-bold animate-pulse text-sm">확언을 10글자 이상 작성해야 점화 모듈이 개방됩니다.</p>}
        </div>
    );
};

const stageDescriptionsMap = [
    "장과 뇌는 하나의 신경으로 연결되어 있습니다. 뇌로 건강하고 맑은 에너지만 공급하여 생명 다발에 밝은 불을 켜세요.",
    "세계적인 불안 해소 기법인 '가슴 열기(Vagus Nerve)' 스트레칭입니다. 가이드에 맞춰 자세를 취하고 버튼을 꾹 누른 채 호흡하세요.",
    "스트레칭으로 떨어져 나온 몸 속 깊은 스트레스 덩어리들을 메스로 정밀하게 파괴하여 체외로 완벽히 배출합니다.",
    "모든 독소가 사라진 당신의 몸은 깃털처럼 가볍습니다. 중력 다이얼을 0으로 맞추고 우주 한가운데서 무중력 상태로 완전한 휴식을 취하세요.",
    "이로써 두뇌, 몸, 마인드셋의 모든 동기화가 끝났습니다. 당신 삶의 가장 위대한 선언을 외치고 거대한 빅뱅을 터뜨리세요!"
];

function ScienceGameContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dayValue = searchParams.get('day');
    const day = dayValue ? parseInt(dayValue) : 1;

    const [isMounted, setIsMounted] = useState(false);
    const [viewingStage, setViewingStage] = useState(1);
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'stageClear' | 'readyToLaunch' | 'flying' | 'success' | 'clear'>('intro');
    
    const levelNames = ['장뇌축 활성화', '미주신경 안정화', '독소 체외배출', '무중력 이완', '생명의 빅뱅'];

    useEffect(() => { setIsMounted(true); }, []);

    useEffect(() => {
        if (gameState === 'stageClear') {
            const timer = setTimeout(() => handleNextStage(), 1500);
            return () => clearTimeout(timer);
        }
    }, [gameState, viewingStage]);

    useEffect(() => {
        if (gameState === 'success') {
            sound?.playEngineHum();
            const flyTimer = setTimeout(() => setGameState('flying'), 1500);
            const clearTimer = setTimeout(() => setGameState('clear'), 4000);
            return () => { clearTimeout(flyTimer); clearTimeout(clearTimer); };
        }
    }, [gameState]);

    useEffect(() => {
        if (gameState === 'clear') {
            // STEP 3 완료 후 여정 지도로 복귀하며 환호
            const timer = setTimeout(() => router.push(`/imagination?day=${day}&cleared=true`), 5000);
            return () => clearTimeout(timer);
        }
    }, [gameState, day, router]);

    const handleStageComplete = () => {
        if (viewingStage < 5) {
            setGameState('stageClear');
        } else {
            setGameState('readyToLaunch');
        }
    };

    const startGame = () => {
        sound?.playTap();
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
        // 거대한 빅뱅 효과
        confetti({ particleCount: 500, spread: 360, origin: { y: 0.5 }, colors: ['#10B981', '#34D399', '#FCD34D', '#FFFFFF'], startVelocity: 60 });
        setGameState('success');
    };

    if (!isMounted) return <div className="min-h-screen bg-[#071318]" />;

    return (
        <div className="min-h-screen bg-[#071318] text-white overflow-hidden relative font-sans flex flex-col items-center">
            {/* 에메랄드/청록 바이오 랩 앰비언트 */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/30 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '3s'}} />
            </div>

            <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10 flex-1 flex flex-col w-full h-[100dvh]">
                <Link 
                    href="/imagination"
                    onClick={() => sound?.playTap()}
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-all mb-4 w-fit no-underline group z-50 pointer-events-auto"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 여정 지도로 복귀
                </Link>

                <div className="text-center mb-6 z-50 pointer-events-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest mb-4 border border-emerald-500/20 shadow-inner">
                         DAY {day} 신체-마인드 동기화
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400 mb-6 drop-shadow-md">
                        바이오 랩: {levelNames[viewingStage - 1]}
                    </h1>
                    
                    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
                        <div className="flex bg-white/5 backdrop-blur-md border border-white/10 rounded-[1.5rem] p-2 overflow-hidden shadow-xl gap-1">
                            {[1, 2, 3, 4, 5].map((stageNumber) => {
                                const isCurrent = viewingStage === stageNumber;
                                return (
                                    <button
                                        key={stageNumber}
                                        onClick={() => {
                                            if (gameState === 'flying' || gameState === 'clear') return;
                                            sound?.playTap();
                                            sound?.stopMeditationDrone(); 
                                            setViewingStage(stageNumber);
                                            setGameState('intro');
                                        }}
                                        className={`flex-1 flex flex-col items-center py-3 md:py-4 transition-all rounded-2xl relative ${
                                            isCurrent ? 'bg-gradient-to-b from-emerald-600 to-teal-700 shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-105 z-10' : 
                                            'hover:bg-white/10 cursor-pointer text-white/30'
                                        }`}
                                    >
                                        <div className="flex flex-col items-center gap-1">
                                            <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${isCurrent ? 'text-emerald-200' : ''}`}>STEP {stageNumber}</span>
                                            <span className={`hidden md:block text-sm font-bold ${isCurrent ? 'text-white' : ''}`}>{levelNames[stageNumber-1]}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative border border-emerald-500/10 rounded-[2.5rem] md:rounded-[3.5rem] bg-gradient-to-b from-white/5 to-transparent backdrop-blur-3xl overflow-hidden mb-8 z-30 pointer-events-auto shadow-[0_0_60px_rgba(0,0,0,0.5)] flex flex-col">
                    
                    {gameState === 'playing' && (
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                            {viewingStage === 1 && <Stage1GutBrain onComplete={handleStageComplete} />}
                            {viewingStage === 2 && <Stage2Somatic onComplete={handleStageComplete} />}
                            {viewingStage === 3 && <Stage3ToxinCut onComplete={handleStageComplete} />}
                            {viewingStage === 4 && <Stage4ZeroG onComplete={handleStageComplete} />}
                            {viewingStage === 5 && <Stage5Genesis onComplete={handleStageComplete} />}
                        </div>
                    )}

                    <AnimatePresence>
                        {gameState !== 'playing' && gameState !== 'flying' && gameState !== 'clear' && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-[#071318]/80 z-[100] backdrop-blur-xl pointer-events-auto"
                            >
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    className="text-center p-8 bg-[#0a1f26] border border-emerald-500/20 rounded-[3rem] shadow-2xl flex flex-col items-center max-w-lg w-[90%]"
                                >
                                    {gameState === 'intro' && (
                                        <>
                                            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500/30 to-teal-600/30 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                                                <Dna className="text-emerald-400" size={40} />
                                            </div>
                                            <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">육체 동기화 {viewingStage}</h3>
                                            <p className="mb-10 text-emerald-100 text-sm md:text-base leading-relaxed font-bold bg-white/5 p-6 rounded-2xl border border-white/5">
                                                {stageDescriptionsMap[viewingStage - 1]}
                                            </p>
                                            <button 
                                                onClick={startGame}
                                                className="w-full py-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-[1.5rem] font-black text-xl md:text-2xl shadow-[0_0_50px_rgba(16,185,129,0.4)] transition-all hover:scale-105 active:scale-95 text-white"
                                            >
                                                실험 시작하기
                                            </button>
                                        </>
                                    )}

                                    {gameState === 'stageClear' && (
                                        <>
                                            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(52,211,153,0.3)]">
                                                <CheckCircle2 className="text-emerald-400" size={50} />
                                            </div>
                                            <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">
                                                세포 활성화!
                                            </h3>
                                            <p className="text-white/60 mb-8 text-lg font-bold">당신의 육체가 더욱 강건해졌습니다.<br/>다음 랩으로 이동합니다.</p>
                                            <div className="w-10 h-10 border-4 border-white/10 border-t-emerald-400 rounded-full animate-spin" />
                                        </>
                                    )}

                                    {gameState === 'readyToLaunch' && (
                                        <>
                                            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-emerald-500/20 rounded-full flex items-center justify-center mb-8 shadow-inner border border-emerald-500/30">
                                                <Compass className="text-yellow-400 drop-shadow-md" size={60} />
                                            </div>
                                            <h3 className="text-5xl font-black text-yellow-400 mb-6 tracking-tighter drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]">
                                                빅뱅 대기 중
                                            </h3>
                                            <p className="text-white/80 mb-12 text-lg leading-relaxed font-bold">육체와 정신의 결합이 마침내 임계점에 다달았습니다.<br/>스스로 빅뱅을 일으켜 우주를 지배하세요!</p>
                                            <button 
                                                onClick={handleLaunch}
                                                className="w-full py-6 bg-gradient-to-r from-yellow-400 to-emerald-500 rounded-3xl font-black text-2xl shadow-[0_0_50px_rgba(250,204,21,0.6)] transition-all hover:scale-105 active:scale-95 text-[#050510]"
                                            >
                                                거대한 빅뱅 터뜨리기
                                            </button>
                                        </>
                                    )}
                                    
                                    {gameState === 'success' && (
                                        <>
                                            <h3 className="text-5xl font-black text-white mb-10 tracking-tighter animate-pulse drop-shadow-lg">
                                                우주가 확장합니다...
                                            </h3>
                                            <div className="w-20 h-20 border-8 border-transparent border-t-emerald-400 border-r-teal-500 rounded-full animate-spin drop-shadow-[0_0_40px_rgba(16,185,129,0.8)]" />
                                        </>
                                    )}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 백그라운드 바이오 코어 그래픽 */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-[10]">
                        <AnimatePresence>
                            {(gameState !== 'flying' && gameState !== 'clear') ? (
                                <motion.div
                                    animate={{ 
                                        scale: (gameState === 'success' || gameState === 'readyToLaunch') ? [1, 1.2, 1] : [1, 1.05, 1]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <HeartPulse size={120} className={`${(gameState === 'success' || gameState === 'readyToLaunch') ? 'text-yellow-400 drop-shadow-[0_0_50px_rgba(250,204,21,0.6)]' : 'text-emerald-500/20'} transition-colors duration-1000`} />
                                </motion.div>
                            ) : gameState === 'flying' ? (
                                <motion.div
                                    initial={{ opacity: 1, scale: 1.5 }}
                                    animate={{ opacity: 0, scale: 5 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                >
                                    <HeartPulse size={200} className="text-yellow-400 drop-shadow-[0_0_100px_rgba(250,204,21,1)]" />
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>

                    {/* 최종 클리어 모달 (메인 여정 트리로 이동) */}
                    <AnimatePresence>
                        {gameState === 'clear' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-[150] flex flex-col items-center justify-center bg-[#071318]/95 backdrop-blur-2xl p-10 text-center"
                            >
                                <div className="w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-10 shadow-[0_0_100px_rgba(250,204,21,0.8)]">
                                    <Star size={80} className="text-white" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter drop-shadow-md leading-tight">
                                    DAY {day} 마스터 완료!
                                </h2>
                                <p className="text-emerald-200 text-xl md:text-2xl mb-12 font-bold leading-relaxed max-w-lg">
                                    코딩, 아트, 사이언스의 모든 지혜를 흡수했습니다.<br/>상상학교 시스템이 당신의 성공을 100% 확신합니다.<br/><br/>
                                    <span className="text-white opacity-50 text-base">잠시 후 메인 화면으로 돌아갑니다...</span>
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default function ScienceGamePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#071318]" />}>
            <ScienceGameContent />
        </Suspense>
    );
}
