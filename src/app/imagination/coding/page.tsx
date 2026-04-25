"use client";

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, ChevronLeft, CheckCircle2, ArrowRight, Play, Trash2, BatteryCharging, Shield, Radio, Mic, Heart, Fingerprint, Star } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/sound';

// --- STAGE 1: 마인드 스캐닝 (스와이프 정화 명상) ---
const Stage1Swipe = ({ onComplete }: { onComplete: () => void }) => {
    // 깊이 있는 템포를 위해 카드 10장 준비 (긍/부정 식별)
    const initialCards = [
        { id: 1, text: "나는 오늘을 온전히 살아낼 힘이 있다", type: 'positive' },
        { id: 2, text: "내 모든 시도는 실패로 돌아갈 것이다", type: 'negative' },
        { id: 3, text: "나의 과거는 나를 규정하지 않는다", type: 'positive' },
        { id: 4, text: "나는 사랑받기엔 부족한 사람이다", type: 'negative' },
        { id: 5, text: "작은 발전도 나락에서 벗어나는 위대한 한 걸음이다", type: 'positive' },
        { id: 6, text: "아무도 내 노력을 알아주지 않을 것이다", type: 'negative' },
        { id: 7, text: "나는 있는 그대로 이미 완전하다", type: 'positive' },
        { id: 8, text: "나의 미래는 빛으로 가득 차 있다", type: 'positive' },
    ];
    
    const [cards, setCards] = useState(initialCards);

    useEffect(() => {
        sound?.init();
    }, []);

    const handleDragEnd = (event: any, info: any) => {
        if (cards.length === 0) return;
        const currentCard = cards[0];
        
        // 50px만 밀어도 감지되게 하여 편안하게 조작
        if (info.offset.x > 80) {
            if (currentCard.type === 'positive') processMatch();
            else processMiss();
        } else if (info.offset.x < -80) {
            if (currentCard.type === 'negative') processMatch();
            else processMiss();
        }
    };

    const processMatch = () => {
        sound?.playSuccess();
        const newCards = [...cards].slice(1);
        setCards(newCards);
        if (newCards.length === 0) setTimeout(onComplete, 1000);
    };

    const processMiss = () => {
        sound?.playError();
    };

    if (cards.length === 0) return (
        <div className="flex flex-col flex-1 h-full items-center justify-center animate-pulse">
            <CheckCircle2 size={80} className="text-green-400 mb-4" />
            <div className="text-2xl font-black">의식 정화 완료</div>
        </div>
    );

    return (
        <div className="flex flex-col items-center flex-1 h-full w-full justify-center relative z-50 pointer-events-auto">
            <div className="absolute top-10 text-center px-4 w-full text-white/50 font-bold leading-relaxed">
                숨을 깊이 들이쉬고, 나타나는 문장을 천천히 음미하세요.<br/>
                부정적인 생각은 <span className="text-red-400">버리고(좌)</span>, 긍정적인 선언은 <span className="text-green-400">수용(우)</span>하세요.
            </div>

            <div className="absolute left-6 md:left-16 opacity-30 flex flex-col items-center text-red-400 pointer-events-none transition-opacity duration-300">
                <Trash2 size={40} className="md:w-16 md:h-16 mb-2" />
                <span className="text-xs md:text-sm font-black tracking-widest uppercase">부정 소각</span>
            </div>
            
            <div className="absolute right-6 md:right-16 opacity-30 flex flex-col items-center text-green-400 pointer-events-none transition-opacity duration-300">
                <BatteryCharging size={40} className="md:w-16 md:h-16 mb-2" />
                <span className="text-xs md:text-sm font-black tracking-widest uppercase">긍정 수용</span>
            </div>
            
            <AnimatePresence>
                <motion.div
                    key={cards[0].id}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragStart={() => sound?.playTap()}
                    onDragEnd={handleDragEnd}
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: -50 }}
                    transition={{ duration: 0.5 }}
                    className="w-64 md:w-96 h-80 md:h-[26rem] bg-gradient-to-br from-indigo-900/40 to-[#050510]/80 backdrop-blur-2xl border-2 border-white/20 rounded-[2rem] flex flex-col items-center justify-center p-10 text-center cursor-grab active:cursor-grabbing shadow-[0_0_50px_rgba(79,70,229,0.2)] relative z-20"
                >
                    <div className="absolute top-4 text-[10px] text-white/30 tracking-[0.2em]">남은 생각 {cards.length}개</div>
                    <h3 className="text-2xl md:text-3xl font-black leading-relaxed break-keep-all">{cards[0].text}</h3>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

// --- STAGE 2: 긍정 타자 디펜스 (강제 주입 선언) ---
const Stage2Typing = ({ onComplete }: { onComplete: () => void }) => {
    // 한글 띄어쓰기나 IME 자모 분리 현상을 방지하기 위해 정규화 검사를 거침
    const sentences = [
        "모든 위기는 곧 성장의 발판이다",
        "내 안에는 끝없는 가능성이 숨어 있다",
        "나는 어떤 시련에도 무너지지 않는다",
        "오늘 하루도 감사함으로 가득 채운다",
        "나의 가치는 외부의 평가로 결정되지 않는다"
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [input, setInput] = useState("");
    
    // 입력값 검증 (띄어쓰기 무시하고 일치 비교 -> 한글 IME 입력 버그 완전 방지)
    const checkMatch = (val: string, target: string) => {
        return val.replace(/\s+/g, '') === target.replace(/\s+/g, '');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInput(val);
        sound?.playTap();

        if (checkMatch(val, sentences[currentIndex])) {
            sound?.playSuccess();
            confetti({ particleCount: 50, spread: 60, colors: ['#EF4444', '#FCD34D', '#10B981'] });
            
            if (currentIndex + 1 < sentences.length) {
                setTimeout(() => {
                    setCurrentIndex(c => c + 1);
                    setInput("");
                }, 400); // 딜레이를 주어 완성의 기쁨을 짧게 만끽
            } else {
                setTimeout(onComplete, 800);
            }
        }
    };

    const word = sentences[currentIndex] || "";

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto">
            <Shield className="text-red-400 mb-6 drop-shadow-md" size={60} />
            <h2 className="text-lg text-red-200/60 font-black mb-4 tracking-widest">부정어 접근 중! 방어막을 선언하세요 ({currentIndex+1}/{sentences.length})</h2>
            
            <motion.div 
                key={word}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-12 p-8 bg-black/40 border-2 border-red-500/30 rounded-[2rem] w-full max-w-xl text-center shadow-[0_0_40px_rgba(225,29,72,0.2)]"
            >
                <span className="text-2xl md:text-3xl font-black text-white leading-relaxed break-keep-all">{word}</span>
            </motion.div>

            <input 
                type="text" 
                autoFocus
                value={input}
                onChange={handleInputChange}
                onContextMenu={e => e.preventDefault()}
                onPaste={e => e.preventDefault()} // 복사 붙여넣기 방지 (직접 치게 만듦)
                placeholder="위 문장을 마음속으로 읽으며 타이핑하세요" 
                className="w-full max-w-xl px-6 py-5 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl text-xl text-center outline-none focus:border-red-400 focus:bg-white/10 transition-all font-bold text-white shadow-inner place-placeholder:text-sm"
            />
        </div>
    );
};

// --- STAGE 3: 주파수 기억 퍼즐 (사이먼 세이즈) ---
const Stage3Puzzle = ({ onComplete }: { onComplete: () => void }) => {
    // 1번부터 4번까지, 3라운드 진행
    const [round, setRound] = useState(1);
    const [pattern, setPattern] = useState<number[]>([]);
    const [userPattern, setUserPattern] = useState<number[]>([]);
    const [isPlayingPattern, setIsPlayingPattern] = useState(true);
    const [activeNode, setActiveNode] = useState<number | null>(null);

    const maxRounds = 3;

    useEffect(() => {
        // 라운드 진입 시 새 패턴 생성하고 보여줌
        const newPattern = Array.from({ length: 2 + round }, () => Math.floor(Math.random() * 4) + 1);
        setPattern(newPattern);
        setUserPattern([]);
        playPattern(newPattern);
    }, [round]);

    const playPattern = async (pat: number[]) => {
        setIsPlayingPattern(true);
        await new Promise(r => setTimeout(r, 1000)); // 휴식
        for (let i = 0; i < pat.length; i++) {
            setActiveNode(pat[i]);
            sound?.playSuccess(); // 노드마다 소리
            await new Promise(r => setTimeout(r, 400));
            setActiveNode(null);
            await new Promise(r => setTimeout(r, 200));
        }
        setIsPlayingPattern(false);
    };

    const handleNodeClick = (id: number) => {
        if (isPlayingPattern) return;
        sound?.playTap();
        
        const nextUserPattern = [...userPattern, id];
        setUserPattern(nextUserPattern);

        const currentIndex = nextUserPattern.length - 1;
        if (nextUserPattern[currentIndex] !== pattern[currentIndex]) {
            // Error! Replay pattern
            sound?.playError();
            setUserPattern([]);
            playPattern(pattern);
            return;
        }

        if (nextUserPattern.length === pattern.length) {
            // 라운드 클리어
            sound?.playEngineHum();
            if (round < maxRounds) {
                setTimeout(() => setRound(r => r + 1), 1000);
            } else {
                confetti({ particleCount: 150, spread: 100, origin: { y: 0.8 } });
                setTimeout(onComplete, 1500);
            }
        }
    };

    return (
        <div className="w-full h-full relative flex flex-col items-center justify-center z-50 pointer-events-auto">
            <div className="text-center mb-16">
                <h2 className="text-2xl font-black text-white mb-2">기억 회로 복원 (라운드 {round}/{maxRounds})</h2>
                <p className="text-white/50 font-bold">코어 불빛의 순서를 기억하고 똑같이 누르세요.</p>
                {isPlayingPattern && <p className="text-blue-400 font-bold mt-4 animate-pulse">패턴 출력 중... 집중하세요!</p>}
                {!isPlayingPattern && <p className="text-green-400 font-bold mt-4">순서대로 입력하세요</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:gap-12 relative p-8">
                {[1, 2, 3, 4].map(id => {
                    const isLit = activeNode === id || (!isPlayingPattern && userPattern.includes(id));
                    return (
                        <motion.button
                            key={id}
                            disabled={isPlayingPattern}
                            onClick={() => handleNodeClick(id)}
                            whileTap={{ scale: 0.9 }}
                            className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl border-4 flex items-center justify-center shadow-2xl transition-all duration-200 ${
                                isLit 
                                ? 'bg-blue-600 border-white text-white scale-105 shadow-[0_0_50px_rgba(59,130,246,0.8)]' 
                                : 'bg-black/40 border-blue-500/30 text-white/20 hover:border-blue-400/50'
                            }`}
                        >
                            <span className="text-3xl font-black">{id}</span>
                        </motion.button>
                    )
                })}
            </div>
        </div>
    );
};

// --- STAGE 4: 시각적 호흡 유도 명상 (5-5-5 호흡법, 432Hz 치유) ---
const Stage4Breathing = ({ onComplete }: { onComplete: () => void }) => {
    const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
    const [cycle, setCycle] = useState(1);
    const maxCycles = 10;
    
    // 호흡 페이즈 시간 (5초씩 = 5000ms)
    const phaseTime = 5000;

    useEffect(() => {
        sound?.startMeditationDrone();
        return () => sound?.stopMeditationDrone();
    }, []);

    useEffect(() => {
        // 단계 시작 시 맑은 차임벨 소리
        sound?.playChime();
        
        const timer = setTimeout(() => {
            if (phase === 'inhale') {
                setPhase('hold');
            } else if (phase === 'hold') {
                setPhase('exhale');
            } else {
                // exhale 완료 시 1주기 추가
                if (cycle < maxCycles) {
                    setCycle(c => c + 1);
                    setPhase('inhale');
                } else {
                    sound?.stopMeditationDrone();
                    onComplete();
                }
            }
        }, phaseTime);
        return () => clearTimeout(timer);
    }, [phase, cycle, onComplete]);

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto px-4">
            <h2 className="text-3xl font-black text-center mb-4 tracking-widest text-blue-200">빛의 호흡 명상</h2>
            <p className="text-white/60 text-center font-bold mb-16 text-lg max-w-md leading-relaxed">
                바라보고 숨만 쉬세요. 조작은 필요 없습니다.<br/>빛의 크기에 맞춰 호흡하세요. (진행: {cycle}/{maxCycles} 세트)
            </p>

            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-12">
                {/* 텍스트 가이드 */}
                <div className="absolute z-20 text-center pointer-events-none">
                    <AnimatePresence mode="wait">
                        {phase === 'inhale' && <motion.div key="inhale" initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{ opacity: 0}} className="text-4xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,1)] tracking-widest">들이쉬기 (5초)</motion.div>}
                        {phase === 'hold' && <motion.div key="hold" initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{ opacity: 0}} className="text-4xl font-black text-yellow-300 drop-shadow-[0_0_20px_rgba(253,224,71,1)] tracking-widest">머금기 (5초)</motion.div>}
                        {phase === 'exhale' && <motion.div key="exhale" initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{ opacity: 0}} className="text-4xl font-black text-blue-300 drop-shadow-[0_0_20px_rgba(147,197,253,1)] tracking-widest">내쉬기 (5초)</motion.div>}
                    </AnimatePresence>
                </div>
                
                {/* 팽창/수축 구체 (시각화) */}
                <motion.div 
                    animate={{ 
                        scale: phase === 'inhale' ? 1.5 : phase === 'hold' ? 1.5 : 0.6,
                        opacity: phase === 'hold' ? 1 : 0.6,
                        backgroundColor: phase === 'inhale' ? 'rgba(96, 165, 250, 0.4)' : phase === 'hold' ? 'rgba(250, 204, 21, 0.6)' : 'rgba(59, 130, 246, 0.2)'
                    }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="absolute w-40 h-40 rounded-full blur-2xl z-10"
                />
                {/* 외곽선 링 */}
                <motion.div 
                    animate={{ 
                        scale: phase === 'inhale' ? 1.5 : phase === 'hold' ? 1.5 : 0.6,
                        borderColor: phase === 'hold' ? 'rgba(250, 204, 21, 0.9)' : 'rgba(96, 165, 250, 0.5)'
                    }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="absolute w-40 h-40 rounded-full border-[6px] z-10 pointer-events-none"
                />
            </div>
            
            {/* 전체 10세트 진행바 */}
            <div className="w-full max-w-md h-3 bg-white/10 rounded-full overflow-hidden border border-white/20">
                <motion.div 
                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${(cycle / maxCycles) * 100}%` }}
                    transition={{ duration: 1 }}
                />
            </div>
        </div>
    );
};

// --- STAGE 5: 나의 은하계 창조 (감사 일기 + 10초 점화) ---
const Stage5Ignition = ({ onComplete }: { onComplete: () => void }) => {
    const [step, setStep] = useState(1);
    const [gratitudes, setGratitudes] = useState(["", "", ""]);
    const [holdProgress, setHoldProgress] = useState(0);
    const holdTimer = useRef<any>(null);

    const requiredHoldTime = 100; // 100 * 50ms = 5초 홀드 

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (gratitudes.some(g => g.trim().length < 2)) {
            sound?.playError();
            alert("세 가지 빈칸을 모두 채워주세요.");
            return;
        }
        sound?.playSuccess();
        setStep(2);
    };

    const handlePointerDown = () => {
        sound?.playEngineHum();
        holdTimer.current = setInterval(() => {
            setHoldProgress(p => {
                if (p >= requiredHoldTime) {
                    clearInterval(holdTimer.current);
                    sound?.playSuccess();
                    onComplete();
                    return p;
                }
                return p + 1;
            });
        }, 50);
    };

    const handlePointerUp = () => {
        if (holdTimer.current) {
            clearInterval(holdTimer.current);
            sound?.stopMeditationDrone(); 
        }
        if (holdProgress < requiredHoldTime) {
            setHoldProgress(0); // 원위치 (강제 집중)
        }
    };

    if (step === 1) {
        return (
            <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto">
                <Heart size={50} className="text-pink-400 mb-6 drop-shadow-[0_0_20px_rgba(244,114,182,0.6)]" />
                <h2 className="text-2xl font-black mb-2 text-center text-white">마음의 에너지 충전</h2>
                <p className="text-white/50 text-sm md:text-base font-bold text-center mb-8 max-w-md">
                    점화를 위해 세 가지 강렬한 긍정 연료가 필요합니다.<br/>오늘 감사했던 일, 혹은 내 자신을 향한 칭찬 세 가지를 적어주세요.
                </p>
                
                <form onSubmit={handleNextStep} className="flex flex-col gap-4 w-full max-w-sm">
                    {[0, 1, 2].map(i => (
                        <input 
                            key={i}
                            value={gratitudes[i]}
                            onChange={e => {
                                const newG = [...gratitudes];
                                newG[i] = e.target.value;
                                setGratitudes(newG);
                                sound?.playTap();
                            }}
                            placeholder={`${i+1}. 사소한 것도 좋습니다.`}
                            className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-lg outline-none focus:border-pink-400 transition-all font-bold"
                        />
                    ))}
                    <button type="submit" className="mt-4 w-full py-5 bg-pink-600 rounded-xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(244,114,182,0.4)]">
                        연료 주입 완료
                    </button>
                </form>
            </div>
        );
    }

    // Step 2: 5초 홀드
    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto">
            <Fingerprint size={80} className={`mb-10 transition-all duration-[3000ms] ${holdProgress > 0 ? 'text-yellow-400 drop-shadow-[0_0_50px_rgba(250,204,21,1)] scale-125' : 'text-white/30'}`} />
            
            <h2 className="text-xl md:text-3xl font-black text-white mb-6 text-center leading-relaxed">
                모든 준비가 끝났습니다.<br/>
                <span className="text-yellow-400">아래 버튼을 5초간 꾹 눌러 점화하세요.</span>
            </h2>

            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* 지문 꾹 누르기 UI */}
                <button
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    className="w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full font-black text-2xl text-black shadow-[0_0_50px_rgba(250,204,21,0.5)] z-20 cursor-pointer active:scale-95 transition-transform flex items-center justify-center select-none touch-none"
                >
                    점화 홀드
                </button>
                
                {/* Progress Ring */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none -rotate-90">
                    <circle cx="128" cy="128" r="120" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                    <circle 
                        cx="128" cy="128" r="120" 
                        fill="none" 
                        stroke="#FACC15" 
                        strokeWidth="8"
                        strokeDasharray="754" 
                        strokeDashoffset={754 - (754 * (holdProgress / requiredHoldTime))} 
                        className="transition-all ease-linear"
                    />
                </svg>
            </div>
            {holdProgress > 0 && <p className="mt-8 font-black text-yellow-400 animate-pulse text-lg tracking-[0.3em]">에너지 집중 중...</p>}
        </div>
    );
};


// --- 본체 컨테이너 ---

const stageDescriptionsMap = [
    "마음을 비우기 위한 정화 명상입니다. 약 2~3분간 흘러오는 문장들을 인지하고 올바른 방향으로 천천히 분리하세요.",
    "이제 긍정을 강제로 주입할 시간입니다. 등장하는 강렬한 선언들을 마음속으로 외치며 똑같이 쳐내려가세요.",
    "망가진 코어의 기억 패턴을 복구합니다. 번호가 켜지는 순서를 눈여겨보고 그대로 따라 누르며 극도로 집중하세요.",
    "가장 섬세한 호흡 명상 단계입니다. 파란색 기준점의 움직임에 맞추어 슬라이더를 부드럽게 유지시키세요.",
    "당신의 존재를 온 우주로 발사하기 위한 최종 절차입니다. 감사와 확언을 통해 에너지를 100% 임계점까지 끌어올리세요."
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
    
    const levelNames = ['명상 스캐닝', '무의식 각인', '집중력 라우팅', '호흡 동기화', '감사 점화 홀드'];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // 클리어 대기
    useEffect(() => {
        if (gameState === 'stageClear') {
            const timer = setTimeout(() => handleNextStage(), 1500); // 1.5초 딜레이 주어 성공의 여운
            return () => clearTimeout(timer);
        }
    }, [gameState, viewingStage]);

    // 최종 발사 (성공 모션 -> clear 화면) -> 아트 유니버스
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
            const timer = setTimeout(() => router.push(`/imagination/art?day=${day}`), 5000);
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
        confetti({ particleCount: 300, spread: 160, origin: { y: 0.6 }, colors: ['#3B82F6', '#60A5FA', '#FCD34D', '#10B981'] });
        setGameState('success');
    };

    if (!isMounted) return <div className="min-h-screen bg-black" />;

    return (
        <div className="min-h-screen bg-[#050510] text-white overflow-hidden relative font-sans flex flex-col items-center">
            {/* 기본 우주 별가루 배경 */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-10 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" />
                <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
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
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 rounded-full text-blue-400 text-[10px] md:text-sm font-black uppercase tracking-widest mb-4 border border-blue-500/20 shadow-inner">
                         DAY {day} 심화 15분 마스터 훈련
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-400 mb-6 drop-shadow-md">
                        우주선 코어 명상실: {levelNames[viewingStage - 1]}
                    </h1>
                    
                    {/* 상단 1~5단계 네비게이션 */}
                    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
                        <div className="flex bg-white/5 backdrop-blur-md border border-white/10 rounded-[1.5rem] p-2 overflow-hidden shadow-xl gap-1">
                            {[1, 2, 3, 4, 5].map((stageNumber) => {
                                const isCurrent = viewingStage === stageNumber;
                                return (
                                    <button
                                        key={stageNumber}
                                        onClick={() => {
                                            // 비행/완료 상태를 제외하고 언제 어느 때든 자유롭게 단계 점프 (자물쇠 없음)
                                            if (gameState === 'flying' || gameState === 'clear') return;
                                            sound?.playTap();
                                            sound?.stopMeditationDrone(); // 4단계 진행 중 넘어갈 경우 사운드 초기화
                                            setViewingStage(stageNumber);
                                            setGameState('intro');
                                        }}
                                        className={`flex-1 flex flex-col items-center py-3 md:py-4 transition-all rounded-2xl relative ${
                                            isCurrent ? 'bg-gradient-to-b from-blue-600 to-indigo-700 shadow-[0_0_20px_rgba(79,70,229,0.5)] scale-105 z-10' : 
                                            'hover:bg-white/10 cursor-pointer text-white/30'
                                        }`}
                                    >
                                        <div className="flex flex-col items-center gap-1">
                                            <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${isCurrent ? 'text-blue-200' : ''}`}>STEP {stageNumber}</span>
                                            <span className={`hidden md:block text-sm font-bold ${isCurrent ? 'text-white' : ''}`}>{levelNames[stageNumber-1]}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] bg-gradient-to-b from-white/10 to-transparent backdrop-blur-2xl overflow-hidden mb-8 z-30 pointer-events-auto shadow-[0_0_60px_rgba(0,0,0,0.5)] flex flex-col">
                    
                    {/* 게임 메커니즘 렌더링 */}
                    {gameState === 'playing' && (
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                            {viewingStage === 1 && <Stage1Swipe onComplete={handleStageComplete} />}
                            {viewingStage === 2 && <Stage2Typing onComplete={handleStageComplete} />}
                            {viewingStage === 3 && <Stage3Puzzle onComplete={handleStageComplete} />}
                            {viewingStage === 4 && <Stage4Breathing onComplete={handleStageComplete} />}
                            {viewingStage === 5 && <Stage5Ignition onComplete={handleStageComplete} />}
                        </div>
                    )}

                    {/* 모달 화면 (인트로 등) */}
                    <AnimatePresence>
                        {gameState !== 'playing' && gameState !== 'flying' && gameState !== 'clear' && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-[100] backdrop-blur-xl pointer-events-auto"
                            >
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    className="text-center p-8 bg-[#0a0a1a] border border-white/10 rounded-[3rem] shadow-2xl flex flex-col items-center max-w-lg w-[90%]"
                                >
                                    {gameState === 'intro' && (
                                        <>
                                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500/30 to-indigo-600/30 rounded-full flex items-center justify-center mb-6 border border-white/10">
                                                <Star className="text-blue-400" size={40} />
                                            </div>
                                            <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">집중 훈련 {viewingStage}</h3>
                                            <p className="mb-10 text-blue-100 text-sm md:text-base leading-relaxed font-bold bg-white/5 p-6 rounded-2xl border border-white/5">
                                                {stageDescriptionsMap[viewingStage - 1]}
                                            </p>
                                            <button 
                                                onClick={startGame}
                                                className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[1.5rem] font-black text-xl md:text-2xl shadow-[0_0_50px_rgba(79,70,229,0.4)] transition-all hover:scale-105 active:scale-95 text-white"
                                            >
                                                깊은 심호흡과 함께 시작
                                            </button>
                                        </>
                                    )}

                                    {gameState === 'stageClear' && (
                                        <>
                                            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(74,222,128,0.3)]">
                                                <CheckCircle2 className="text-green-400" size={50} />
                                            </div>
                                            <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">
                                                훌륭합니다!
                                            </h3>
                                            <p className="text-white/60 mb-8 text-lg font-bold">당신의 에너지가 한 칸 더 차올랐습니다.<br/>자동으로 다음 단계로 이어집니다.</p>
                                            
                                            <div className="w-10 h-10 border-4 border-white/10 border-t-green-400 rounded-full animate-spin" />
                                        </>
                                    )}

                                    {gameState === 'readyToLaunch' && (
                                        <>
                                            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center mb-8 shadow-inner border border-yellow-500/30">
                                                <Rocket className="text-yellow-400 drop-shadow-md" size={60} />
                                            </div>
                                            <h3 className="text-5xl font-black text-yellow-400 mb-6 tracking-tighter drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]">
                                                코어 점화 성공
                                            </h3>
                                            <p className="text-white/80 mb-12 text-lg leading-relaxed font-bold">기나긴 내면의 훈련을 완벽히 마쳤습니다.<br/>이제 당신의 가능성을 하늘로 쏘아 올리세요!</p>
                                            <button 
                                                onClick={handleLaunch}
                                                className="w-full py-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl font-black text-2xl shadow-[0_0_50px_rgba(250,204,21,0.6)] transition-all hover:scale-105 active:scale-95 text-[#050510] flex justify-center items-center gap-3"
                                            >
                                                <Rocket className="rotate-45" /> 세상으로 발사
                                            </button>
                                        </>
                                    )}
                                    
                                    {gameState === 'success' && (
                                        <>
                                            <h3 className="text-5xl font-black text-white mb-10 tracking-tighter animate-pulse drop-shadow-lg">
                                                점화 중...
                                            </h3>
                                            <div className="w-20 h-20 border-8 border-transparent border-t-yellow-400 border-r-orange-500 rounded-full animate-spin drop-shadow-[0_0_40px_rgba(250,204,21,0.8)]" />
                                        </>
                                    )}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 백그라운드 우주선 그래픽 */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-[10]">
                        <AnimatePresence>
                            {(gameState !== 'flying' && gameState !== 'clear') ? (
                                <motion.div
                                    animate={{ 
                                        y: (gameState === 'success' || gameState === 'readyToLaunch' || gameState === 'stageClear') ? -20 : [0, -8, 0],
                                        scale: (gameState === 'success' || gameState === 'readyToLaunch') ? 1.1 : 1
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Rocket size={120} className={`${(gameState === 'success' || gameState === 'readyToLaunch') ? 'text-yellow-400 drop-shadow-[0_0_50px_rgba(250,204,21,0.6)]' : 'text-blue-500/20'} transition-colors duration-1000`} />
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

                    {/* 최종 클리어 모달 (아트 유니버스 자동 이동) */}
                    <AnimatePresence>
                        {gameState === 'clear' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-[150] flex flex-col items-center justify-center bg-[#050510]/95 backdrop-blur-2xl p-10 text-center"
                            >
                                <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-10 shadow-[0_0_80px_rgba(99,102,241,0.6)]">
                                    <Star size={60} className="text-white" />
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter drop-shadow-md">수고하셨습니다</h2>
                                <p className="text-blue-200 text-xl md:text-2xl mb-16 font-bold leading-relaxed max-w-lg">
                                    당신의 흔들림 없는 긍정 에너지가<br/>깊은 무의식을 재설계했습니다.<br/><br/>
                                    <span className="text-white opacity-50 text-base">잠시 후 마음의 캔버스, 아트 유니버스로 넘어갑니다...</span>
                                </p>
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
