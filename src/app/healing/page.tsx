"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { setCounseling, type CounselingSession } from '@/lib/db';
import { DonationModal } from '@/components/common/DonationModal';

// ----------------------------------------------------------------------
// Constants & Data (The Alchemy Dictionary)
// ----------------------------------------------------------------------

const CATEGORIES = [
    { id: 'money', label: '돈 / 경제적 문제', color: 'text-amber-500', question: "어떤 금전적 문제가 당신을 무겁게 하나요?" },
    { id: 'love', label: '사랑 / 관계', color: 'text-rose-500', question: "누구와의 관계가 당신을 아프게 하나요?" },
    { id: 'career', label: '진로 / 커리어', color: 'text-blue-500', question: "앞길이 어떻게 막막한가요?" },
    { id: 'health', label: '건강 / 육체', color: 'text-emerald-500', question: "몸의 어디가 불편한가요?" },
    { id: 'self', label: '자아 / 멘탈', color: 'text-purple-500', question: "어떤 부정적인 생각이 드나요?" },
];

const ALCHEMY_SCRIPTS: Record<string, { reframe: string; affirmation: string }> = {
    money: {
        reframe: "당신이 받은 그 고지서는 '청구서'가 아니라 '영수증'입니다. 당신은 이미 그만큼의 가치를 누렸고, 지불할 능력이 있음을 우주가 증명한 것입니다.",
        affirmation: "나는 내게 온 모든 풍요에 감사합니다. 나의 지출은 더 큰 부가 되어 돌아옵니다."
    },
    love: {
        reframe: "지금의 갈등은 이별의 신호가 아니라, 두 우주가 서로를 더 깊이 이해하기 위해 충돌하는 '빅뱅'입니다. 이 과정을 통해 관계는 더 단단해집니다.",
        affirmation: "모든 갈등은 사랑의 또 다른 표현입니다. 나는 이미 그 사람과 완벽하게 화해했습니다."
    },
    career: {
        reframe: "지금의 막막함은 길이 없는 것이 아니라, 당신이 갈 수 있는 길이 너무나 많아서 잠시 멈춘 '가능성의 상태'입니다. 당신은 이미 성공한 미래에 도착해 있습니다.",
        affirmation: "나는 내가 원하는 곳에 이미 도달해 있습니다. 지금은 그저 그 과정을 즐길 뿐입니다."
    },
    health: {
        reframe: "통증은 몸이 잘못된 것이 아니라, 당신에게 '휴식'과 '사랑'을 요청하는 몸의 간절한 대화입니다. 몸은 스스로 치유할 힘을 가지고 있습니다.",
        affirmation: "내 몸의 모든 세포는 매 순간 건강한 상태로 재생되고 있습니다. 나는 건강합니다."
    },
    self: {
        reframe: "불안과 의심은 당신이 성장하고 있다는 증거입니다. 안주하는 사람은 불안해하지 않습니다. 그 감정을 거부하지 말고, 더 큰 나로 나아가는 연료로 쓰세요.",
        affirmation: "나는 나의 모든 감정을 환영합니다. 모든 경험은 나를 최고의 버전으로 이끌어줍니다."
    }
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

export default function HealingPage() {
    const [step, setStep] = useState<'category' | 'worry' | 'shift' | 'reality'>('category');
    const [category, setCategory] = useState<string>('');
    const [worryText, setWorryText] = useState('');
    const [isShifting, setIsShifting] = useState(false);
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

    // Initial Atmosphere (Dark/Shadow Mode)
    // As steps progress, we will lighten the mood properly in the 'reality' step.

    const handleCategorySelect = (id: string) => {
        setCategory(id);
        setStep('worry');
    };

    const handleWorrySubmit = () => {
        if (!worryText.trim()) return;
        setIsShifting(true);
        setTimeout(() => {
            setIsShifting(false);
            setStep('shift');
        }, 1500); // "Burning" delay
    };

    const handleShiftConfirm = async () => {
        setIsShifting(true);

        // Save to DB (Log the transition)
        const session: CounselingSession = {
            id: crypto.randomUUID(),
            userId: 'anonymous',
            userName: 'Cosmic Traveler',
            mood: category,
            content: `[WORRY]: ${worryText}\n[SHIFT]: ${ALCHEMY_SCRIPTS[category]?.affirmation}`,
            status: 'completed',
            createdAt: Date.now(),
            aiReply: "Your reality has been shifted.",
            isRead: false
        };
        await setCounseling(session);

        setTimeout(() => {
            setIsShifting(false);
            setStep('reality');
        }, 3000); // "Materializing" delay
    };

    const resetJourney = () => {
        setCategory('');
        setWorryText('');
        setStep('category');
    };

    return (
        <main className={`min-h-screen relative overflow-hidden transition-colors duration-1000 ${step === 'reality' ? 'bg-[#FFFBF0] text-amber-950' : 'bg-[#050505] text-stone-300'
            }`}>
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none transition-opacity duration-1000">
                {step === 'reality' ? (
                    // Light/Gold Mode Background
                    <>
                        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-amber-200/40 blur-[150px] rounded-full animate-pulse" />
                        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-rose-200/40 blur-[150px] rounded-full animate-pulse delay-700" />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
                    </>
                ) : (
                    // Dark/Shadow Mode Background
                    <>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-stone-900/40 blur-[100px] rounded-full" />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
                    </>
                )}
            </div>

            <AnimatePresence mode="wait">

                {/* 1. SELECT CATEGORY (The Shadow Realm) */}
                {step === 'category' && (
                    <motion.div
                        key="category"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex flex-col justify-center items-center"
                    >
                        <header className="text-center mb-16 max-w-2xl">
                            <motion.span
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                                className="text-xs font-bold text-stone-600 uppercase tracking-[0.3em] mb-4 block"
                            >
                                Reality Shifter
                            </motion.span>
                            <h1 className="text-3xl md:text-5xl font-serif text-stone-200 mb-6 leading-tight">
                                무엇이 당신의 현실을<br />가로막고 있나요?
                            </h1>
                            <p className="text-stone-500 font-light">
                                부정적인 감정을 거부하지 마세요.<br />그것을 마주하는 순간, 변화는 시작됩니다.
                            </p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategorySelect(cat.id)}
                                    className="group relative p-8 border border-stone-800 bg-stone-900/30 hover:bg-stone-900 hover:border-stone-700 transition-all duration-300 rounded-xl text-left"
                                >
                                    <h3 className={`text-xl font-bold mb-2 group-hover:text-white transition-colors ${cat.id === 'money' ? 'text-amber-700' : 'text-stone-400'}`}>
                                        {cat.label}
                                    </h3>
                                    <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                        <ArrowRight className="text-stone-500" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* 2. WORRY INPUT (Acceptance) */}
                {step === 'worry' && (
                    <motion.div
                        key="worry"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex flex-col justify-center max-w-2xl"
                    >
                        <button onClick={() => setStep('category')} className="absolute top-10 left-0 text-stone-600 hover:text-stone-400 transition-colors">
                            ← 뒤로
                        </button>

                        <h2 className="text-2xl md:text-3xl font-serif text-stone-200 mb-8 leading-relaxed">
                            {CATEGORIES.find(c => c.id === category)?.question}
                        </h2>

                        <div className="relative mb-8">
                            <textarea
                                value={worryText}
                                onChange={(e) => setWorryText(e.target.value)}
                                placeholder="예: 카드값이 200만원이나 나왔어요. 어떻게 갚아야 할지 막막해요."
                                className="w-full h-64 bg-transparent border-b border-stone-800 text-xl md:text-2xl font-light text-stone-300 placeholder:text-stone-800 resize-none focus:outline-none focus:border-stone-600 transition-colors leading-relaxed"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleWorrySubmit}
                                disabled={!worryText.trim() || isShifting} // Disabled while animating
                                className={`
                                    flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all
                                    ${worryText.trim()
                                        ? 'bg-stone-100 text-stone-900 hover:scale-105'
                                        : 'bg-stone-900 text-stone-600 cursor-not-allowed'}
                                `}
                            >
                                {isShifting ? (
                                    <span className="flex items-center gap-2">
                                        <RefreshCw className="animate-spin" size={16} />
                                        분해하는 중...
                                    </span>
                                ) : (
                                    <span>이 현실 직시하기</span>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 3. THE SHIFT (Alchemy) */}
                {step === 'shift' && (
                    <motion.div
                        key="shift"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex flex-col justify-center items-center max-w-3xl text-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="mb-12"
                        >
                            <h3 className="text-stone-500 font-bold uppercase tracking-widest mb-6">Perspective Shift</h3>
                            <p className="text-xl md:text-2xl font-serif text-stone-200 leading-relaxed mb-8">
                                "{worryText}"
                            </p>
                            <div className="w-px h-12 bg-stone-800 mx-auto mb-8" />
                            <p className="text-lg md:text-xl text-amber-200/80 leading-relaxed font-light italic">
                                "{ALCHEMY_SCRIPTS[category]?.reframe}"
                            </p>
                        </motion.div>

                        <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-8 w-full backdrop-blur-sm">
                            <p className="text-stone-400 text-sm mb-4">아래 문장을 마음으로 읽고, 동의한다면 버튼을 누르세요.</p>
                            <p className="text-xl md:text-2xl font-bold text-white mb-8">
                                {ALCHEMY_SCRIPTS[category]?.affirmation}
                            </p>
                            <button
                                onClick={handleShiftConfirm}
                                disabled={isShifting}
                                className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-amber-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-wait"
                            >
                                {isShifting ? "현실 재구성 중..." : "나는 이 새로운 현실을 선택합니다"}
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 4. REALITY (Living in the End) */}
                {step === 'reality' && (
                    <motion.div
                        key="reality"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex flex-col justify-center items-center text-center"
                    >
                        <DonationModal
                            isOpen={isDonationModalOpen}
                            onClose={() => setIsDonationModalOpen(false)}
                            title="우주에 마음 보내기"
                            description={`당신의 변화된 에너지를 우주와 나누세요.\n보내주신 후원금은 또 다른 이의 치유를 위해 사용됩니다.`}
                        />

                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 1, type: "spring" }}
                            className="w-24 h-24 rounded-full bg-amber-400 text-white flex items-center justify-center mb-8 shadow-2xl shadow-amber-400/50"
                        >
                            <CheckCircle2 size={48} strokeWidth={3} />
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-serif text-amber-900 mb-6 tracking-tight">
                            It is Done.
                        </h1>
                        <p className="text-xl text-amber-900/60 font-light mb-12 max-w-xl leading-relaxed">
                            이미 이루어졌습니다. 당신의 의식이 변했기에, 현실은 자연스럽게 그 뒤를 따를 것입니다.<br />
                            지금 이 평온함과 충만함을 기억하세요.
                        </p>

                        <div className="bg-white/50 backdrop-blur-md border border-amber-900/10 p-8 rounded-2xl shadow-xl max-w-md w-full transform rotate-1 hover:rotate-0 transition-transform duration-500 mb-10">
                            <div className="flex justify-between items-center text-xs text-amber-900/40 uppercase tracking-widest mb-6 border-b border-amber-900/10 pb-4">
                                <span>우주에서 온 영수증</span>
                                <span>{new Date().toLocaleDateString()}</span>
                            </div>

                            <div className="space-y-4 text-left mb-8">
                                <div>
                                    <span className="text-xs text-amber-900/40 block mb-1">맡기신 무거운 짐 (고민)</span>
                                    <p className="text-sm line-through text-stone-400">{worryText.substring(0, 30)}...</p>
                                </div>
                                <div>
                                    <span className="text-xs text-amber-900/40 block mb-1">해결된 마음 (새로운 현실)</span>
                                    <p className="text-lg font-serif font-bold text-amber-700">
                                        해결됨 & 풍요로움 (Completed)
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsDonationModalOpen(true)}
                                className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <Sparkles size={16} />
                                우주에 감사 표시하기 (자율후원)
                            </button>
                        </div>

                        <button
                            onClick={resetJourney}
                            className="text-amber-900/40 hover:text-amber-700 transition-colors text-sm underline underline-offset-4"
                        >
                            다른 현실도 변화시키기
                        </button>
                    </motion.div>
                )}

            </AnimatePresence>
        </main>
    );
}
