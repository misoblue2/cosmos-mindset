"use client";

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ChevronLeft, CheckCircle2, ArrowRight, Play, Star, Brain, HeartPulse, Dna, Compass, Zap, Activity, Eye, ShieldAlert, Rocket } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/sound';

// --- STAGE 1: 세포 주파수 동조 (Cellular Resonance) ---
const Stage1Resonance = ({ onComplete }: { onComplete: () => void }) => {
    const [freq, setFreq] = useState(50);
    const targetFreq = 73; // 임의의 타겟 주파수
    const maxDiff = 100;
    
    // 두 파형의 일치도 (0 ~ 1)
    const matchRatio = 1 - (Math.abs(freq - targetFreq) / maxDiff);
    const isMatched = Math.abs(freq - targetFreq) <= 1;

    useEffect(() => {
        if (isMatched) {
            sound?.playSuccess();
            setTimeout(onComplete, 2000);
        }
    }, [isMatched]);

    const handleDial = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFreq(parseInt(e.target.value));
        if (Math.abs(freq - parseInt(e.target.value)) > 2) sound?.playTap();
    };

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto px-4 touch-none">
            <h2 className="text-2xl font-black text-white mb-2 tracking-widest">세포 주파수 동조</h2>
            <p className="text-emerald-200/60 mb-10 text-center text-sm font-bold max-w-sm leading-relaxed">
                현재 당신의 신경망이 불협화음을 내고 있습니다.<br/>하단의 다이얼을 돌려 두 파동을 완벽히 일치시키세요.
            </p>

            <div className="relative w-full max-w-md h-64 bg-[#020b14] border border-emerald-500/30 rounded-[2rem] overflow-hidden mb-12 shadow-[0_0_50px_rgba(16,185,129,0.1)] flex items-center justify-center">
                {/* 배경 그리드 */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                {/* 타겟 피크 파형 (Red/Orange) */}
                <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <motion.path 
                        d={`M 0 50 Q 25 ${50 - targetFreq} 50 50 T 100 50`} 
                        fill="none" stroke="#f43f5e" strokeWidth="2"
                        animate={{ d: [`M 0 50 Q 25 ${50 - targetFreq} 50 50 T 100 50`, `M 0 50 Q 25 ${50 - targetFreq + 10} 50 50 T 100 50`] }}
                        transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse" }}
                    />
                </svg>

                {/* 현재 유저 파형 (Emerald) */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <motion.path 
                        d={`M 0 50 Q 25 ${50 - freq} 50 50 T 100 50`} 
                        fill="none" stroke="#34d399" strokeWidth={isMatched ? "8" : "3"}
                        style={{ filter: isMatched ? 'drop-shadow(0 0 10px #34d399)' : 'none' }}
                        animate={{ d: [`M 0 50 Q 25 ${50 - freq} 50 50 T 100 50`, `M 0 50 Q 25 ${50 - freq + (isMatched?2:15)} 50 50 T 100 50`] }}
                        transition={{ repeat: Infinity, duration: isMatched ? 0.2 : 0.8, repeatType: "reverse" }}
                    />
                </svg>

                {/* 일치 시 폭발하는 빛 */}
                <AnimatePresence>
                    {isMatched && (
                        <motion.div initial={{ opacity:0, scale:0 }} animate={{ opacity:1, scale:2 }} className="absolute w-32 h-32 bg-emerald-400/30 rounded-full blur-2xl" />
                    )}
                </AnimatePresence>
            </div>

            <div className="w-full max-w-sm flex items-center gap-4">
                <Activity size={24} className={isMatched ? 'text-emerald-400' : 'text-stone-500'} />
                <input 
                    type="range" min="0" max="100" value={freq} onChange={handleDial} disabled={isMatched}
                    className="flex-1 appearance-none bg-white/10 h-3 rounded-full outline-none focus:bg-white/20 accent-emerald-500 cursor-grab"
                />
            </div>
            
            {isMatched && <p className="mt-8 text-emerald-400 font-black text-xl animate-pulse">주파수 동조 완료. DNA가 안정화되었습니다.</p>}
        </div>
    );
};

// --- STAGE 2: 소마틱 에너지 노드 개방 (Chakra / Vagus Nerve) ---
const Stage2SomaticNodes = ({ onComplete }: { onComplete: () => void }) => {
    const nodes = [
        { id: 1, label: '이마 (송과체)', y: 20 },
        { id: 2, label: '가슴 (미주신경)', y: 50 },
        { id: 3, label: '단전 (코어)', y: 80 }
    ];
    const [currentNode, setCurrentNode] = useState(0);
    const [progress, setProgress] = useState(0);
    const holdTimerRef = useRef<any>(null);

    const startHold = (index: number) => {
        if (index !== currentNode) return;
        sound?.startMeditationDrone();
        holdTimerRef.current = setInterval(() => {
            setProgress(p => {
                if (p + 1 >= 50) { // 5초
                    clearInterval(holdTimerRef.current);
                    sound?.stopMeditationDrone();
                    sound?.playSuccess();
                    setProgress(0);
                    setCurrentNode(c => c + 1);
                    return 0;
                }
                return p + 1;
            });
        }, 100);
    };

    const stopHold = () => {
        if (holdTimerRef.current) clearInterval(holdTimerRef.current);
        sound?.stopMeditationDrone();
        setProgress(0);
    };

    useEffect(() => {
        if (currentNode >= nodes.length) {
            setTimeout(onComplete, 1000);
        }
    }, [currentNode]);

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto px-4 touch-none user-select-none">
            <h2 className="text-2xl font-black text-white mb-2 tracking-widest">신체 에너지 개방</h2>
            <p className="text-emerald-100/70 mb-8 text-center text-sm md:text-base font-bold max-w-sm leading-relaxed p-4 bg-white/5 rounded-2xl border border-white/10">
                실제로 몸을 바르게 펴보세요.<br/>불이 꺼진 신체 노드에 빛을 대고 <span className="text-emerald-400">5초간 유지</span>하여 에너지를 관통시키세요.
            </p>

            <div className="relative w-48 h-96 bg-black/40 border border-white/5 rounded-[3rem] shadow-inner flex flex-col items-center py-8">
                {/* 신체 실루엣 가이드 라인 */}
                <div className="absolute top-12 bottom-12 w-1 bg-white/10 rounded-full" />

                {nodes.map((node, i) => {
                    const isUnlocked = i < currentNode;
                    const isCurrent = i === currentNode;
                    return (
                        <div 
                            key={node.id}
                            className="absolute w-full flex justify-center -ml-[50%]"
                            style={{ top: `${node.y}%`, left: '50%' }}
                        >
                            <div 
                                onPointerDown={() => startHold(i)}
                                onPointerUp={stopHold}
                                onPointerLeave={stopHold}
                                className={`relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                                    isUnlocked ? 'bg-emerald-400 shadow-[0_0_40px_rgba(52,211,153,0.8)] scale-110' :
                                    isCurrent ? 'bg-stone-800 border-2 border-emerald-500/50 hover:bg-stone-700' : 'bg-stone-900 opacity-50'
                                }`}
                            >
                                {isUnlocked ? <CheckCircle2 className="text-emerald-900" /> : <div className="w-4 h-4 bg-white/20 rounded-full" />}
                                
                                {/* 꾹 누르는 동안 프로그레스 */}
                                {isCurrent && progress > 0 && (
                                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none scale-125">
                                        <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(52,211,153,0.2)" strokeWidth="4" />
                                        <circle cx="32" cy="32" r="30" fill="none" stroke="#34d399" strokeWidth="4" strokeDasharray="188" strokeDashoffset={188 - (188 * progress) / 50} />
                                    </svg>
                                )}
                                <span className={`absolute -right-24 font-bold text-sm whitespace-nowrap ${isUnlocked ? 'text-emerald-400' : 'text-stone-500'}`}>
                                    {node.label}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
            {currentNode < nodes.length && <p className="mt-8 text-emerald-300 font-bold animate-pulse text-sm">노드를 꾹 누르며 호흡을 들이마시세요...</p>}
        </div>
    );
};

// --- STAGE 3: EMDR 안구 운동 (Trauma Tracking) ---
const Stage3EMDR = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [pos, setPos] = useState({ x: 50, y: 50 });
    const targetRef = useRef<HTMLDivElement>(null);
    const hoverTimerConfig = useRef<any>(null);

    // 구체가 무작위로 계속 도망다님
    useEffect(() => {
        const interval = setInterval(() => {
            setPos({
                x: 10 + Math.random() * 80, // 10% ~ 90%
                y: 10 + Math.random() * 80
            });
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const startTracking = () => {
        sound?.startMeditationDrone();
        hoverTimerConfig.current = setInterval(() => {
            setProgress(p => {
                if (p + 1 >= 100) {
                    clearInterval(hoverTimerConfig.current);
                    sound?.stopMeditationDrone();
                    sound?.playSuccess();
                    onComplete();
                    return 100;
                }
                return p + 1;
            });
        }, 50);
    };

    const stopTracking = () => {
        clearInterval(hoverTimerConfig.current);
        sound?.stopMeditationDrone();
    };

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto px-4 touch-none user-select-none">
            <h2 className="text-2xl font-black text-white mb-2 tracking-widest">EMDR 신경 재처리</h2>
            <p className="text-white/60 mb-8 text-center text-sm font-bold max-w-sm">
                세계적인 트라우마 치유 기법입니다.<br/>
                마우스(손가락)로 빛나는 구체를 쫓아 계속 올려두세요.<br/>시선이 빛을 따라갈 때 무의식의 엉킨 실타래가 풀립니다.
            </p>

            <div className="relative w-full max-w-lg h-96 bg-black/50 border border-white/10 rounded-3xl overflow-hidden mb-6 shadow-inner cursor-crosshair">
                <motion.div
                    ref={targetRef}
                    animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    transition={{ type: "spring", stiffness: 40, damping: 15 }}
                    onPointerEnter={startTracking}
                    onPointerLeave={stopTracking}
                    onPointerDown={startTracking} // 모바일 터치 대응
                    onPointerUp={stopTracking}
                    className="absolute w-20 h-20 -ml-10 -mt-10 rounded-full flex items-center justify-center group"
                >
                    <div className="w-12 h-12 bg-white rounded-full shadow-[0_0_50px_rgba(255,255,255,0.8)] filter blur-sm group-hover:scale-150 group-hover:bg-cyan-300 transition-all duration-300" />
                    <Eye className="absolute text-cyan-900 opacity-50" size={20} />
                </motion.div>

                {/* 프로그레스 인디케이터 중앙 고정 */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <span className="text-8xl font-black text-white">{progress}%</span>
                </div>
            </div>
            
            <div className="w-full max-w-sm h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div className="h-full bg-cyan-400" style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
};

// --- STAGE 4: 트라우마 레이저 분쇄 (Toxin Disintegration) ---
const Stage4ToxinLaser = ({ onComplete }: { onComplete: () => void }) => {
    const [holding, setHolding] = useState(false);
    const [health, setHealth] = useState(100);
    const [shattered, setShattered] = useState(false);
    const intervalRef = useRef<any>(null);

    const handleDown = () => {
        if (shattered) return;
        setHolding(true);
        sound?.playEngineHum();
        intervalRef.current = setInterval(() => {
            setHealth(h => {
                if (h - 2 <= 0) {
                    clearInterval(intervalRef.current);
                    setShattered(true);
                    sound?.stopMeditationDrone(); // in case
                    sound?.playSuccess();
                    // 물리 파편 이펙트
                    confetti({ particleCount: 150, spread: 360, origin: { y: 0.5 }, colors: ['#444', '#111', '#EF444'] });
                    setTimeout(onComplete, 2000);
                    return 0;
                }
                return h - 2;
            });
        }, 50);
    };

    const handleUp = () => {
        setHolding(false);
        clearInterval(intervalRef.current);
    };

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto px-4 touch-none user-select-none">
            <h2 className="text-2xl font-black text-white mb-2 tracking-widest">부정적 결정체 파괴</h2>
            <p className="text-white/60 mb-12 text-center text-sm font-bold max-w-sm">
                마음 깊은 곳에 굳어버린 과거의 상처입니다.<br/>
                덩어리를 마우스로 <span className="text-red-400">길게 꾹 눌러</span> 레이저로 완전히 박살 내세요.
            </p>

            <div className="relative flex items-center justify-center w-full h-64 mb-8">
                {/* 발사되는 레이저선 */}
                <AnimatePresence>
                    {holding && !shattered && (
                        <motion.div 
                            initial={{ opacity:0, scaleY:0 }} animate={{ opacity:1, scaleY:1 }} exit={{ opacity:0 }}
                            className="absolute top-[120%] w-2 h-64 bg-cyan-400 origin-bottom shadow-[0_0_30px_rgba(34,211,238,1)] z-10"
                        />
                    )}
                </AnimatePresence>

                {!shattered ? (
                    <motion.div
                        onPointerDown={handleDown}
                        onPointerUp={handleUp}
                        onPointerLeave={handleUp}
                        animate={holding ? { x: [-5, 5, -5, 5, 0], y: [-5, 5, -2, 2, 0] } : {}}
                        transition={{ repeat: Infinity, duration: 0.1 }}
                        className="relative cursor-crosshair z-20"
                    >
                        {/* 흉측한 트라우마 크리스탈 모양 */}
                        <div className="w-40 h-40 bg-stone-900 border-4 border-stone-700 rotate-45 transform flex items-center justify-center shadow-2xl overflow-hidden relative">
                            <div className="absolute inset-0 bg-red-900/40 mix-blend-overlay" />
                            <ShieldAlert size={60} className="text-red-500/50 -rotate-45" />
                            
                            {/* 크리스탈 금가는 이펙트 비례 */}
                            <div className="absolute inset-0 bg-white/20 transition-all duration-75" style={{ opacity: 1 - health/100 }} />
                        </div>
                        {/* HP 바 */}
                        <div className="absolute -bottom-10 w-full h-2 bg-red-900 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 transition-all" style={{ width: `${health}%` }} />
                        </div>
                    </motion.div>
                ) : (
                    // 산산조각 난 모습 시각화
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ duration: 1 }} className="text-4xl font-black text-cyan-400">
                        소멸 완료!
                    </motion.div>
                )}
            </div>
            {holding && !shattered && <p className="text-cyan-400 font-bold animate-ping text-xl">파괴 중... 계속 누르세요!</p>}
        </div>
    );
};

// --- STAGE 5: 다차원 퀀텀 점프 (Warp Speed) ---
const Stage5WarpJump = ({ onComplete }: { onComplete: () => void }) => {
    const [statement, setStatement] = useState("");
    const [warpProgress, setWarpProgress] = useState(0); // 0 to 100
    const [warping, setWarping] = useState(false);
    
    const checkReady = statement.replace(/\s+/g,'').length >= 10;

    const handleLeverDrag = (e: any, info: any) => {
        if (!checkReady) return;
        // 제한 구역 내 드래그 오프셋(y)을 프로그레스로 변환 (대략 200px 드래그)
        const prog = Math.min(100, Math.max(0, (info.point.y / window.innerHeight) * 100)); // 모바일/PC 대응 대략화
        // 단순화를 위해 range input 사용으로 대체함 (드래그 제어가 더 직관적)
    };

    const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setWarpProgress(val);
        if (val === 100 && !warping) {
            setWarping(true);
            sound?.playSuccess();
            // 빅뱅 화면 효과 대기 후 완료
            setTimeout(onComplete, 4000);
        }
    };

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto px-4 touch-none user-select-none overflow-hidden">
            
            {/* 워프 이펙트 오버레이 */}
            {warping && (
                <div className="absolute inset-0 z-[-1] bg-black">
                    <div className="absolute w-2 h-20 bg-white left-1/4 animate-[ping_0.5s_infinite]" />
                    <div className="absolute w-2 h-40 bg-cyan-400 right-1/4 animate-[ping_0.3s_infinite]" />
                    <div className="absolute w-2 h-60 bg-pink-400 left-1/2 animate-[ping_0.2s_infinite]" />
                    <div className="absolute inset-0 bg-blue-900/50 mix-blend-screen animate-pulse" />
                </div>
            )}

            <h2 className="text-3xl font-black text-emerald-300 mb-2 tracking-widest z-10">다차원 퀀텀 점프</h2>
            <p className="text-white/80 mb-10 text-center font-bold max-w-md leading-relaxed z-10">
                몸과 마음이 무한한 잠재력으로 세팅되었습니다.<br/>
                이루고자 하는 최종 목표를 입력하고 <span className="text-yellow-400">워프 레버</span>를 최대로 끝까지 당기세요!
            </p>

            <motion.div animate={warping ? { scale: 1.5, opacity: 0 } : {}} className="w-full max-w-md z-10 flex flex-col items-center">
                <textarea 
                    value={statement}
                    onChange={e => { setStatement(e.target.value); sound?.playTap(); }}
                    disabled={warping}
                    placeholder="예: 나는 매일 한계를 돌파하며 거대한 우주를 창조한다."
                    className="w-full bg-black/60 border-2 border-emerald-500/50 rounded-2xl p-6 text-white text-xl outline-none focus:border-cyan-400 transition-all font-bold resize-none shadow-[0_0_30px_rgba(16,185,129,0.2)] mb-12 text-center"
                    rows={3}
                />

                <div className={`relative flex flex-col items-center w-full p-8 border-4 rounded-[3rem] transition-all bg-black/80 ${checkReady ? 'border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.5)]' : 'border-stone-800'}`}>
                    <span className="text-emerald-400 font-black mb-4 tracking-widest">WARP ENGINE</span>
                    {/* 상하 슬라이더 (CSS Trick) */}
                    <input 
                        type="range" min="0" max="100" value={warpProgress} onChange={handleSlider} disabled={!checkReady || warping}
                        className="w-full appearance-none bg-white/10 h-4 rounded-full outline-none focus:bg-white/20 accent-cyan-400"
                    />
                    <div className="w-full flex justify-between mt-4 text-xs font-black text-stone-500">
                        <span>0G</span>
                        <span className="text-cyan-400">LIGHT SPEED</span>
                    </div>
                </div>
                {!checkReady && <p className="mt-6 text-stone-500 font-bold text-sm">확언을 10글자 이상 작성해야 레버가 해제됩니다.</p>}
            </motion.div>

            {warping && (
                <motion.h1 
                    initial={{ scale: 0, opacity: 1 }} animate={{ scale: [1, 2, 5], opacity: [1, 1, 0] }} transition={{ duration: 3 }}
                    className="absolute z-50 text-7xl font-black text-white whitespace-nowrap italic tracking-tighter"
                >
                    WARP SPEED!
                </motion.h1>
            )}
        </div>
    );
};

const stageDescriptionsMap = [
    "장과 뇌는 하나의 신경으로 연결되어 있습니다. 당신의 불안정한 뇌파를 조절하여 건강한 맑은 에너지의 주파수와 정확히 일치시키세요.",
    "우리 몸의 막혀있는 차크라(미주신경)를 열 차례입니다. 신체 노드에 빛을 대고 가슴을 활짝 편 채 5초간 집중하세요.",
    "세계적인 불안 해소 기법 'EMDR(안구운동)'입니다. 화면을 예측 불가하게 움직이는 빛의 궤적을 끝까지 시선으로 따라가 무의식을 정화하세요.",
    "과거로부터 쌓여 딱딱하게 굳어버린 트라우마 결정체입니다. 강력한 멘탈 레이저를 쏘아 완전한 가루로 산산조각 내버리세요.",
    "모든 제약이 풀린 당신은 이제 빛의 속도로 나아갈 수 있습니다. 당신 삶의 가장 위대한 선언을 적고 퀀텀 점프 레버를 당기세요!"
];

function ScienceGameContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dayValue = searchParams.get('day');
    const day = dayValue ? parseInt(dayValue) : 1;

    const [isMounted, setIsMounted] = useState(false);
    const [viewingStage, setViewingStage] = useState(1);
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'stageClear' | 'readyToLaunch' | 'flying' | 'success' | 'clear'>('intro');
    
    const levelNames = ['주파수 동조', '신체 에너지 개방', 'EMDR 안구운동', '트라우마 분쇄', '퀀텀 점프'];

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
            const timer = setTimeout(() => setGameState('clear'), 4000);
            return () => clearTimeout(timer);
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
            // 5단계는 직접 워프 점프하므로 바로 success로 보냄
            confetti({ particleCount: 500, spread: 360, origin: { y: 0.5 }, colors: ['#10B981', '#34D399', '#22D3EE', '#FFFFFF'], startVelocity: 60 });
            setGameState('success');
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

    if (!isMounted) return <div className="min-h-screen bg-[#020b14]" />;

    return (
        <div className="min-h-screen bg-[#020b14] text-white overflow-hidden relative font-sans flex flex-col items-center">
            {/* 극강의 사이언스 앰비언트 (블랙옵스 스타일 사이버네틱) */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/30 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/30 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '3s'}} />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
            </div>

            <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10 flex-1 flex flex-col w-full h-[100dvh]">
                <Link 
                    href="/imagination"
                    onClick={() => sound?.playTap()}
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-all mb-4 w-fit no-underline group z-50 pointer-events-auto font-bold"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 여정 지도로 복귀
                </Link>

                <div className="text-center mb-6 z-50 pointer-events-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest mb-4 border border-emerald-500/20 shadow-inner">
                         DAY {day} 마인드-바디 브레인해킹
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-400 mb-6 drop-shadow-md">
                        바이오 랩: {levelNames[viewingStage - 1]}
                    </h1>
                    
                    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
                        <div className="flex bg-black/40 backdrop-blur-md border border-white/10 rounded-[1.5rem] p-2 overflow-hidden shadow-2xl gap-1">
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
                                            isCurrent ? 'bg-gradient-to-b from-emerald-600 to-cyan-700 shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-105 z-10' : 
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

                <div className="flex-1 relative border border-emerald-500/20 rounded-[2.5rem] md:rounded-[3.5rem] bg-gradient-to-b from-white/5 to-transparent backdrop-blur-3xl overflow-hidden mb-8 z-30 pointer-events-auto shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col">
                    
                    {gameState === 'playing' && (
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                            {viewingStage === 1 && <Stage1Resonance onComplete={handleStageComplete} />}
                            {viewingStage === 2 && <Stage2SomaticNodes onComplete={handleStageComplete} />}
                            {viewingStage === 3 && <Stage3EMDR onComplete={handleStageComplete} />}
                            {viewingStage === 4 && <Stage4ToxinLaser onComplete={handleStageComplete} />}
                            {viewingStage === 5 && <Stage5WarpJump onComplete={handleStageComplete} />}
                        </div>
                    )}

                    <AnimatePresence>
                        {gameState !== 'playing' && gameState !== 'clear' && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-[#020b14]/90 z-[100] backdrop-blur-xl pointer-events-auto"
                            >
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    className="text-center p-8 bg-black/80 border border-emerald-500/30 rounded-[3rem] shadow-2xl flex flex-col items-center max-w-lg w-[90%]"
                                >
                                    {gameState === 'intro' && (
                                        <>
                                            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500/30 to-cyan-600/30 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                                                <Activity className="text-emerald-400" size={40} />
                                            </div>
                                            <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">육체 해킹 {viewingStage}</h3>
                                            <p className="mb-10 text-emerald-100 text-sm md:text-base leading-relaxed font-bold bg-white/5 p-6 rounded-2xl border border-white/10">
                                                {stageDescriptionsMap[viewingStage - 1]}
                                            </p>
                                            <button 
                                                onClick={startGame}
                                                className="w-full py-6 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-[1.5rem] font-black text-xl md:text-2xl shadow-[0_0_50px_rgba(34,211,238,0.4)] transition-all hover:scale-105 active:scale-95 text-white"
                                            >
                                                시스템 진입
                                            </button>
                                        </>
                                    )}

                                    {gameState === 'stageClear' && (
                                        <>
                                            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(52,211,153,0.3)]">
                                                <CheckCircle2 className="text-emerald-400" size={50} />
                                            </div>
                                            <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">
                                                정상화 완료!
                                            </h3>
                                            <p className="text-white/60 mb-8 text-lg font-bold">DNA와 신경망이 한 단계 진화했습니다.<br/>다음 랩으로 이동합니다.</p>
                                            <div className="w-10 h-10 border-4 border-white/10 border-t-cyan-400 rounded-full animate-spin" />
                                        </>
                                    )}

                                    {gameState === 'success' && (
                                        <>
                                            <h3 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-t from-cyan-400 to-emerald-200 mb-10 tracking-tighter animate-pulse drop-shadow-lg italic">
                                                WARPING...
                                            </h3>
                                            <div className="w-20 h-20 border-8 border-transparent border-t-cyan-400 border-r-emerald-500 rounded-full animate-spin drop-shadow-[0_0_40px_rgba(34,211,238,0.8)]" />
                                        </>
                                    )}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 최종 클리어 모달 (메인 여정 트리로 이동) */}
                    <AnimatePresence>
                        {gameState === 'clear' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-[150] flex flex-col items-center justify-center bg-[#020b14]/95 backdrop-blur-2xl p-10 text-center"
                            >
                                <div className="w-40 h-40 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center mb-10 shadow-[0_0_100px_rgba(34,211,238,0.8)]">
                                    <Rocket size={80} className="text-white" />
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter drop-shadow-md leading-tight">
                                    DAY {day} 마스터 완료!
                                </h2>
                                <p className="text-cyan-200 text-xl md:text-2xl mb-12 font-bold leading-relaxed max-w-lg">
                                    당신은 시공간을 넘어 한계를 돌파했습니다.<br/>가장 진보된 형태의 긍정 신경망이 구축되었습니다.<br/><br/>
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
        <Suspense fallback={<div className="min-h-screen bg-[#020b14]" />}>
            <ScienceGameContent />
        </Suspense>
    );
}
