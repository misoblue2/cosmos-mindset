"use client";

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CheckCircle2, ArrowRight, Play, Star, Brush, Droplet, Move, Circle, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/sound';

// --- STAGE 1: 색채 정화 (블랙홀과 캔버스) ---
const Stage1Colors = ({ onComplete }: { onComplete: () => void }) => {
    const initialColors = [
        { id: 1, type: 'dark', color: 'bg-stone-800', label: '두려움' },
        { id: 2, type: 'light', color: 'bg-pink-400', label: '사랑' },
        { id: 3, type: 'dark', color: 'bg-gray-700', label: '우울' },
        { id: 4, type: 'light', color: 'bg-yellow-300', label: '빛' },
        { id: 5, type: 'dark', color: 'bg-zinc-900', label: '분노' },
        { id: 6, type: 'light', color: 'bg-cyan-400', label: '자유' },
        { id: 7, type: 'light', color: 'bg-emerald-400', label: '안식' },
    ];
    const [colors, setColors] = useState(initialColors);

    // Using a simpler click-based classification instead of complex framer-motion drag constraints 
    // for multiple items, which can get messy on mobile. "터치하여 분류"
    const handleSelect = (clr: typeof initialColors[0], correctType: 'dark'|'light') => {
        if (clr.type === correctType) {
            sound?.playSuccess();
            setColors(c => c.filter(item => item.id !== clr.id));
            if (colors.length === 1) setTimeout(onComplete, 1000);
        } else {
            sound?.playError();
        }
    };

    if (colors.length === 0) return (
        <div className="flex flex-col items-center justify-center">
            <CheckCircle2 size={80} className="text-pink-400 mb-4 animate-pulse" />
            <div className="text-2xl font-black text-pink-200">색채 캔버스 준비 완료</div>
        </div>
    );

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto p-4">
            <h2 className="text-2xl font-black text-white mb-2">색채 정화</h2>
            <p className="text-white/50 mb-12 text-center text-sm font-bold">
                어두운 감정은 <span className="text-gray-400">블랙홀</span>로, 빛나는 감정은 <span className="text-pink-400">캔버스</span>로 보내주세요.
            </p>

            <div className="flex justify-between w-full max-w-lg mb-16 px-4">
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-black shadow-[0_0_30px_rgba(0,0,0,1)] border border-white/10 flex items-center justify-center overflow-hidden mb-4 relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-black animate-spin" />
                    </div>
                    <span className="font-black text-gray-400">블랙홀 (버리기)</span>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.2)] border-2 border-white/40 flex items-center justify-center mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-cyan-500/20" />
                        <Brush className="text-white/50" />
                    </div>
                    <span className="font-black text-pink-300">내면 캔버스 (담기)</span>
                </div>
            </div>

            <div className="flex justify-center gap-4 flex-wrap max-w-sm">
                <AnimatePresence>
                    {colors.map(clr => (
                        <motion.div
                            key={clr.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className={`flex flex-col items-center gap-2 cursor-pointer z-50`}
                        >
                            <div className="flex gap-2 bg-black/50 p-2 rounded-full border border-white/20 backdrop-blur-sm">
                                <button onClick={() => handleSelect(clr, 'dark')} className="w-10 h-10 rounded-full bg-black border border-white/20 text-xs font-bold hover:bg-gray-800 transition-colors flex items-center justify-center">좌</button>
                                <div className={`w-12 h-12 rounded-full ${clr.color} flex items-center justify-center shadow-lg border border-white/20`}>
                                    <span className="text-xs font-black text-white/90 drop-shadow-md">{clr.label}</span>
                                </div>
                                <button onClick={() => handleSelect(clr, 'light')} className="w-10 h-10 rounded-full bg-white/20 border border-white/40 text-xs font-bold hover:bg-white/40 transition-colors flex items-center justify-center">우</button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            {colors.length > 0 && <p className="mt-8 text-xs text-white/30">(색상을 좌/우 버튼을 눌러 정확히 분류하세요)</p>}
        </div>
    );
};

// --- STAGE 2: 빛의 스크래치 ---
const Stage2Scratch = ({ onComplete }: { onComplete: () => void }) => {
    const GRID_SIZE = 64; // 8x8 grid
    const [scratched, setScratched] = useState(new Set<number>());

    const handleScratch = (index: number) => {
        if (!scratched.has(index)) {
            sound?.playTap();
            setScratched(prev => {
                const updated = new Set(prev).add(index);
                if (updated.size === GRID_SIZE) {
                    sound?.playSuccess();
                    setTimeout(onComplete, 1000);
                }
                return updated;
            });
        }
    };

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto px-4">
            <h2 className="text-2xl font-black text-white mb-2">빛의 스크래치</h2>
            <p className="text-white/50 mb-10 text-center text-sm font-bold">
                마우스(또는 손가락)로 어둠을 모두 문질러 명화를 드러내세요.
            </p>

            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden border-4 border-white/20 shadow-[0_0_50px_rgba(236,72,153,0.3)]">
                {/* 배경 명화 (CSS Gradient + Abstract Shape) */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center p-8 text-center pt-20">
                    <h3 className="text-3xl font-black text-white/90 drop-shadow-xl leading-relaxed">
                        어둠이 걷히면<br/>빛이 드러난다
                    </h3>
                    <div className="absolute bottom-10 w-20 h-20 bg-yellow-300 rounded-full blur-3xl opacity-60" />
                </div>

                {/* 스크래치 레이어 (Grid) */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                    {Array.from({ length: GRID_SIZE }).map((_, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => handleScratch(i)}
                            onPointerMove={() => handleScratch(i)} // For touch
                            className={`w-full h-full bg-[#111] transition-opacity duration-500 ${scratched.has(i) ? 'opacity-0' : 'opacity-100'}`}
                        />
                    ))}
                </div>
            </div>
            
            <div className="w-full max-w-sm mt-8 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-pink-500"
                    animate={{ width: `${(scratched.size / GRID_SIZE) * 100}%` }}
                />
            </div>
        </div>
    );
};

// --- STAGE 3: 만다라 명상 (대칭 캔버스) ---
const Stage3Mandala = ({ onComplete }: { onComplete: () => void }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [progress, setProgress] = useState(0);
    const requiredProgress = 100; // 드로잉 이벤트가 100번 발생하면 완료
    const isDrawing = useRef(false);

    useEffect(() => {
        sound?.startMeditationDrone(); 
        return () => sound?.stopMeditationDrone();
    }, []);

    const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas || !isDrawing.current) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        // Scale pointer pos to canvas scale
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        
        ctx.fillStyle = `hsl(${(progress * 3) % 360}, 80%, 60%)`;
        const radius = 3;

        // Draw 6-way symmetry
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI * 2) / 6;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.arc(x - cx, y - cy, radius, 0, Math.PI * 2);
            ctx.fill();
            // Mirrored
            ctx.beginPath();
            ctx.arc(-(x - cx), y - cy, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        setProgress(p => {
            if (p >= requiredProgress) return p;
            if (p + 1 === requiredProgress) {
                sound?.stopMeditationDrone();
                sound?.playSuccess();
                setTimeout(onComplete, 1500);
            }
            return p + 1;
        });
    };

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto px-4 touch-none">
            <h2 className="text-2xl font-black text-white mb-2">만다라 균형 명상</h2>
            <p className="text-white/50 mb-6 text-center text-sm font-bold">
                검은 보드 위에 자유롭게 선을 그려 좌우 뇌의 균형을 맞추세요.
            </p>

            <div className="relative border border-white/20 rounded-full overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.2)]">
                <canvas 
                    ref={canvasRef}
                    width={1000} 
                    height={1000}
                    onPointerDown={(e) => {
                        isDrawing.current = true;
                        draw(e);
                    }}
                    onPointerUp={() => isDrawing.current = false}
                    onPointerLeave={() => isDrawing.current = false}
                    onPointerMove={draw}
                    className="w-72 h-72 md:w-96 md:h-96 bg-black touch-none cursor-crosshair"
                />
            </div>
            
            <div className="w-64 mt-8 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                    animate={{ width: `${Math.min(100, (progress / requiredProgress) * 100)}%` }}
                />
            </div>
        </div>
    );
};

// --- STAGE 4: 음악 심상 훈련 (GIM - Guided Imagery and Music) ---
const Stage4MusicReflection = ({ onComplete }: { onComplete: () => void }) => {
    const [text, setText] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // 백그라운드에서 웅장하고 치유적인 432Hz 앰비언스를 재생
        sound?.startMeditationDrone();
        return () => sound?.stopMeditationDrone();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim().length < 5) {
            sound?.playError();
            alert("조금 더 깊이 느끼고 적어주세요. (최소 5글자 이상)");
            return;
        }
        sound?.playSuccess();
        setSubmitted(true);
        setTimeout(() => {
            sound?.stopMeditationDrone();
            onComplete();
        }, 3000); // 텍스트가 빛으로 날아가는 카타르시스 여운 대기
    };

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto px-4">
            <h2 className="text-2xl font-black text-white mb-2">음악 심상 훈련</h2>
            <p className="text-white/70 mb-8 text-center text-sm md:text-base font-bold max-w-md leading-relaxed">
                현재 흘러나오는 432Hz 힐링 주파수를 깊게 느껴보세요.<br/>이 음악이 당신의 마음에 어떤 풍경이나 어떤 감정을 그려주고 있나요?<br/>억눌린 감정도 좋습니다. 떠오르는 대로 자유롭게 적어내려가세요.
            </p>

            <AnimatePresence mode="wait">
                {!submitted ? (
                    <motion.form 
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        onSubmit={handleSubmit} 
                        className="w-full max-w-lg flex flex-col gap-4"
                    >
                        <textarea 
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value);
                                // Typing feedback (optional soft tap)
                            }}
                            placeholder="이 음악을 들으니..."
                            className="w-full h-40 bg-white/5 border border-white/20 rounded-2xl p-6 text-white text-lg outline-none focus:border-indigo-400 focus:bg-white/10 transition-all font-serif resize-none shadow-inner"
                        />
                        <button type="submit" className="w-full py-4 bg-indigo-600/80 hover:bg-indigo-500 rounded-xl font-black text-lg transition-colors border border-indigo-400/50">
                            감정 흘려보내기
                        </button>
                    </motion.form>
                ) : (
                    <motion.div 
                        key="submitted"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: -50, scale: 1.1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="text-center"
                    >
                        <div className="text-indigo-300 font-serif text-xl italic mb-4 opacity-50">"{text}"</div>
                        <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400 animate-pulse">
                            당신의 감정이 아스라이 정화되었습니다.
                        </h3>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* 시각적 오디오 파동 (가짜) */}
            <div className="absolute bottom-10 flex gap-2 opacity-30 pointer-events-none">
                {[1,2,3,4,5].map(i => (
                    <motion.div 
                        key={i}
                        animate={{ height: ["10px", "40px", "10px"] }}
                        transition={{ duration: Math.random() * 1 + 0.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-2 bg-indigo-400 rounded-full"
                    />
                ))}
            </div>
        </div>
    );
};

// --- STAGE 5: 마스터피스 서명 ---
const Stage5Masterpiece = ({ onComplete }: { onComplete: () => void }) => {
    const [text, setText] = useState("");
    const target = "나의 인생은 하나의 거대한 명작이다";

    const checkMatch = (val: string, t: string) => val.replace(/\s+/g, '') === t.replace(/\s+/g, '');

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        sound?.playTap();
        if (checkMatch(e.target.value, target)) {
            sound?.playSuccess();
            setTimeout(onComplete, 1000);
        }
    };

    return (
        <div className="flex flex-col items-center w-full h-full justify-center relative z-50 pointer-events-auto px-4">
            <h2 className="text-3xl font-black text-white mb-10 text-center leading-relaxed font-serif">
                모든 캔버스가 채워졌습니다.<br/>
                우아한 선언으로 서명을 남기세요.
            </h2>

            <div className="relative p-10 bg-[#fbf8f1] border-[16px] border-yellow-600/80 shadow-[0_0_50px_rgba(202,138,4,0.5)] max-w-2xl w-full text-center">
                <div className="absolute inset-0 bg-yellow-900/5 mix-blend-multiply pointer-events-none" /> {/* 종이 질감 */}
                
                <h3 className="text-black/80 font-serif text-2xl md:text-4xl mb-12 italic leading-relaxed">
                    "{target}"
                </h3>
  
                <input 
                    type="text"
                    value={text}
                    onChange={handleInput}
                    placeholder="위 문장을 마음으로 새기며 입력하세요"
                    className="w-full bg-transparent border-b-2 border-black/20 pb-4 text-center text-xl text-black font-serif outline-none focus:border-yellow-600 placeholder:text-black/30 placeholder:italic transition-colors"
                />
            </div>
            {checkMatch(text, target) && <p className="mt-8 font-black text-yellow-400 animate-pulse text-xl">명작이 완성되었습니다.</p>}
        </div>
    );
};

const stageDescriptionsMap = [
    "마음의 잿빛 캔버스에 남아있는 찌꺼기 감정들을 버리고, 화사하고 밝은 색의 물감만 남기는 정화 단계입니다.",
    "우리 내면은 본래 빛으로 가득합니다. 아무리 짙은 그늘이 덮여있어도, 당신의 손끝으로 긁어내기만 하면 금세 아름다운 명화를 발견할 수 있습니다.",
    "좌우뇌의 철저한 대칭 밸런스를 맞추는 만다라 명상입니다. 마음 가는 대로 캔버스에 그리면 대칭의 힘이 당신을 정렬시킵니다.",
    "세계적인 심리치료 기법인 GIM(Guided Imagery and Music)을 활용합니다. 432Hz 치유 주파수를 들으며 글로 감정을 모두 뿜어내고 정화하세요.",
    "아트 유니버스의 마지막 관문, 당신의 작품과 인생에 스스로 '명작'이라는 금빛 서명을 새깁니다."
];

function ArtGameContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dayValue = searchParams.get('day');
    const day = dayValue ? parseInt(dayValue) : 1;

    const [isMounted, setIsMounted] = useState(false);
    const [viewingStage, setViewingStage] = useState(1);
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'stageClear' | 'readyToLaunch' | 'flying' | 'success' | 'clear'>('intro');
    
    const levelNames = ['색채 정화', '빛의 발현', '대칭 명상', '음악 심상 훈련', '명작의 탄생'];

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
            // STEP 3(미래 실험실)로 넘어간다
            const timer = setTimeout(() => router.push(`/imagination/science?day=${day}`), 5000);
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
        confetti({ particleCount: 300, spread: 160, origin: { y: 0.6 }, colors: ['#EC4899', '#D946EF', '#8B5CF6', '#FCD34D'] });
        setGameState('success');
    };

    if (!isMounted) return <div className="min-h-screen bg-black" />;

    return (
        <div className="min-h-screen bg-[#1c0f1f] text-white overflow-hidden relative font-sans flex flex-col items-center">
            {/* 핑크/퍼플 별빛 앰비언트 */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-10 left-10 w-96 h-96 bg-pink-600/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s'}} />
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
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 rounded-full text-pink-400 text-xs font-black uppercase tracking-widest mb-4 border border-pink-500/20 shadow-inner">
                         DAY {day} 심층 감성 테라피
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400 mb-6 drop-shadow-md">
                        아트 유니버스: {levelNames[viewingStage - 1]}
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
                                            isCurrent ? 'bg-gradient-to-b from-pink-600 to-purple-700 shadow-[0_0_20px_rgba(219,39,119,0.5)] scale-105 z-10' : 
                                            'hover:bg-white/10 cursor-pointer text-white/30'
                                        }`}
                                    >
                                        <div className="flex flex-col items-center gap-1">
                                            <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${isCurrent ? 'text-pink-200' : ''}`}>STEP {stageNumber}</span>
                                            <span className={`hidden md:block text-sm font-bold ${isCurrent ? 'text-white' : ''}`}>{levelNames[stageNumber-1]}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] bg-gradient-to-b from-white/10 to-transparent backdrop-blur-2xl overflow-hidden mb-8 z-30 pointer-events-auto shadow-[0_0_60px_rgba(0,0,0,0.5)] flex flex-col">
                    
                    {gameState === 'playing' && (
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                            {viewingStage === 1 && <Stage1Colors onComplete={handleStageComplete} />}
                            {viewingStage === 2 && <Stage2Scratch onComplete={handleStageComplete} />}
                            {viewingStage === 3 && <Stage3Mandala onComplete={handleStageComplete} />}
                            {viewingStage === 4 && <Stage4MusicReflection onComplete={handleStageComplete} />}
                            {viewingStage === 5 && <Stage5Masterpiece onComplete={handleStageComplete} />}
                        </div>
                    )}

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
                                    className="text-center p-8 bg-[#1a0f1d] border border-white/10 rounded-[3rem] shadow-2xl flex flex-col items-center max-w-lg w-[90%]"
                                >
                                    {gameState === 'intro' && (
                                        <>
                                            <div className="w-24 h-24 bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-full flex items-center justify-center mb-6 border border-white/10">
                                                <Brush className="text-pink-400" size={40} />
                                            </div>
                                            <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">감성 테라피 {viewingStage}</h3>
                                            <p className="mb-10 text-pink-100 text-sm md:text-base leading-relaxed font-bold bg-white/5 p-6 rounded-2xl border border-white/5">
                                                {stageDescriptionsMap[viewingStage - 1]}
                                            </p>
                                            <button 
                                                onClick={startGame}
                                                className="w-full py-6 bg-gradient-to-r from-pink-600 to-purple-600 rounded-[1.5rem] font-black text-xl md:text-2xl shadow-[0_0_50px_rgba(219,39,119,0.4)] transition-all hover:scale-105 active:scale-95 text-white"
                                            >
                                                마음의 붓을 들기
                                            </button>
                                        </>
                                    )}

                                    {gameState === 'stageClear' && (
                                        <>
                                            <div className="w-24 h-24 bg-pink-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(236,72,153,0.3)]">
                                                <CheckCircle2 className="text-pink-400" size={50} />
                                            </div>
                                            <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">
                                                아름답습니다!
                                            </h3>
                                            <p className="text-white/60 mb-8 text-lg font-bold">감성이 한 층 더 짙어졌습니다.<br/>다음 아트 룸으로 이동합니다.</p>
                                            <div className="w-10 h-10 border-4 border-white/10 border-t-pink-400 rounded-full animate-spin" />
                                        </>
                                    )}

                                    {gameState === 'readyToLaunch' && (
                                        <>
                                            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-pink-500/20 rounded-full flex items-center justify-center mb-8 shadow-inner border border-pink-500/30">
                                                <ImageIcon className="text-yellow-400 drop-shadow-md" size={60} />
                                            </div>
                                            <h3 className="text-5xl font-black text-yellow-400 mb-6 tracking-tighter drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]">
                                                전시 완료
                                            </h3>
                                            <p className="text-white/80 mb-12 text-lg leading-relaxed font-bold">당신 내면의 아름다움이 완벽한 예술로 승화되었습니다.<br/>이 눈부신 명작을 우주에 공개하세요!</p>
                                            <button 
                                                onClick={handleLaunch}
                                                className="w-full py-6 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-3xl font-black text-2xl shadow-[0_0_50px_rgba(250,204,21,0.6)] transition-all hover:scale-105 active:scale-95 text-[#050510]"
                                            >
                                                거대한 걸작 전시하기
                                            </button>
                                        </>
                                    )}
                                    
                                    {gameState === 'success' && (
                                        <>
                                            <h3 className="text-5xl font-black text-white mb-10 tracking-tighter animate-pulse drop-shadow-lg">
                                                갤러리 오픈 중...
                                            </h3>
                                            <div className="w-20 h-20 border-8 border-transparent border-t-pink-400 border-r-purple-500 rounded-full animate-spin drop-shadow-[0_0_40px_rgba(219,39,119,0.8)]" />
                                        </>
                                    )}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 백그라운드 아트 우주선 그래픽 */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-[10]">
                        <AnimatePresence>
                            {(gameState !== 'flying' && gameState !== 'clear') ? (
                                <motion.div
                                    animate={{ 
                                        y: (gameState === 'success' || gameState === 'readyToLaunch' || gameState === 'stageClear') ? -20 : [0, -8, 0],
                                        scale: (gameState === 'success' || gameState === 'readyToLaunch') ? 1.1 : 1
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Star fill="currentColor" size={120} className={`${(gameState === 'success' || gameState === 'readyToLaunch') ? 'text-yellow-400 drop-shadow-[0_0_50px_rgba(250,204,21,0.6)]' : 'text-pink-500/20'} transition-colors duration-1000`} />
                                </motion.div>
                            ) : gameState === 'flying' ? (
                                <motion.div
                                    initial={{ y: 0, opacity: 1, scale: 1.1 }}
                                    animate={{ y: -1500, opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 2, ease: "easeIn" }}
                                >
                                    <Star fill="currentColor" size={140} className="text-yellow-400 drop-shadow-[0_0_80px_rgba(250,204,21,0.8)]" />
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>

                    {/* 최종 클리어 모달 (미래 과학실 자동 이동) */}
                    <AnimatePresence>
                        {gameState === 'clear' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-[150] flex flex-col items-center justify-center bg-[#1c0f1f]/95 backdrop-blur-2xl p-10 text-center"
                            >
                                <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-10 shadow-[0_0_80px_rgba(16,185,129,0.6)]">
                                    <Droplet size={60} className="text-white" />
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter drop-shadow-md">예술적 치유 완성</h2>
                                <p className="text-pink-200 text-xl md:text-2xl mb-16 font-bold leading-relaxed max-w-lg">
                                    당신의 감성이 한계 없이 폭발했습니다.<br/>이제 논리와 긍정이 결합된 마법의 공간으로 이동합니다.<br/><br/>
                                    <span className="text-white opacity-50 text-base">잠시 후 미래 과학 실험실로 넘어갑니다...</span>
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default function ArtGamePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#1c0f1f]" />}>
            <ArtGameContent />
        </Suspense>
    );
}
