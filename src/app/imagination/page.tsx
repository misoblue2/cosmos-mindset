"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, School, ArrowRight, User, Check, BrickWall, Coins, Building, Crown, Play } from 'lucide-react';
import { getTotalFund, addDonation, addIdea, getIdeas, type Idea } from '@/lib/db';

export default function ImaginationPage() {
    const [totalFund, setTotalFund] = useState(0);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [ideas, setIdeas] = useState<Idea[]>([]);

    // Idea Board State
    const [newIdeaName, setNewIdeaName] = useState('');
    const [newIdeaContent, setNewIdeaContent] = useState('');

    // Goal: 100,000,000 KRW for the first school
    const GOAL_AMOUNT = 100000000;
    const progress = Math.min((totalFund / GOAL_AMOUNT) * 100, 100);

    const loadData = async () => {
        const fund = await getTotalFund();
        setTotalFund(fund);
        const storedIdeas = await getIdeas();
        setIdeas(storedIdeas);
    };

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleIdeaSubmit = async () => {
        if (!newIdeaContent.trim()) {
            alert("내용을 입력해주세요!");
            return;
        }

        const idea: Idea = {
            id: `idea-${Date.now()}`,
            author: newIdeaName.trim() || "익명의 상상가",
            content: newIdeaContent,
            createdAt: Date.now()
        };

        setIdeas(prev => [idea, ...prev]);
        setNewIdeaName('');
        setNewIdeaContent('');
        await addIdea(idea);
    };

    // PortOne SDK Type Definition (Mock)
    interface PortOneParam {
        pg: string;
        pay_method: string;
        merchant_uid: string;
        name: string;
        amount: number;
        buyer_email?: string;
        buyer_name?: string;
        buyer_tel?: string;
    }

    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [selectedLabel, setSelectedLabel] = useState('');

    const openPaymentModal = (amount: number, label: string) => {
        setSelectedAmount(amount);
        setSelectedLabel(label);
        setPaymentModalOpen(true);
    };

    const handlePayment = async (method: 'card' | 'trans' | 'kakaopay') => {
        // PortOne Integration Logic (Ready for connection)
        const pgProvider = method === 'kakaopay' ? 'kakaopay' : 'html5_inicis';
        const payMethod = method; // 'card' or 'trans' or 'kakaopay' (converted later if needed)

        // Simulate SDK Call
        setPaymentModalOpen(false);

        // Mock Success
        alert(`[테스트] ${method}로 ${selectedAmount.toLocaleString()}원 결제가 완료되었습니다.`);
        await new Promise(resolve => setTimeout(resolve, 500));
        await addDonation(selectedAmount);
        await loadData();
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
    };

    const DonationTier = ({ amount, label, icon: Icon, color }: { amount: number, label: string, icon: any, color: string }) => (
        <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openPaymentModal(amount, label)}
            className={`relative flex flex-col items-center justify-center p-6 bg-white border-2 border-transparent hover:border-${color}-400 rounded-3xl shadow-xl shadow-${color}-100 transition-all group overflow-hidden`}
        >
            <div className={`w-16 h-16 bg-${color}-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-${color}-100 transition-colors`}>
                <Icon className={`text-${color}-500`} size={32} />
            </div>
            <h3 className="font-black text-lg text-stone-800 mb-1">{label}</h3>
            <p className={`text-sm font-bold text-${color}-600`}>{amount.toLocaleString()}원</p>
            <div className={`absolute inset-0 bg-${color}-400/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
        </motion.button>
    );

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            {/* Confetti Overlay */}
            <AnimatePresence>
                {showConfetti && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden"
                    >
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: -50, x: (Math.random() - 0.5) * window.innerWidth, rotate: 0 }}
                                animate={{ y: window.innerHeight, rotate: 360 }}
                                transition={{ duration: 3 + Math.random() * 2, ease: "linear" }}
                                className="absolute top-0 text-4xl"
                            >
                                {['🧱', '✨', '💖', '🏫'][Math.floor(Math.random() * 4)]}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Payment Modal */}
            <AnimatePresence>
                {paymentModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={() => setPaymentModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-8 bg-stone-50 border-b border-stone-100 text-center">
                                <h3 className="text-xl font-bold text-stone-800 mb-1">후원하기</h3>
                                <div className="mt-6">
                                    <span className="text-stone-400 text-sm font-bold block mb-1">{selectedLabel}</span>
                                    <span className="text-4xl font-black text-primary">{selectedAmount.toLocaleString()}원</span>
                                </div>
                            </div>
                            <div className="p-8 space-y-3">
                                <button onClick={() => handlePayment('kakaopay')} className="w-full py-4 bg-[#FAE100] hover:bg-[#FADB00] text-[#371D1E] font-bold rounded-xl flex items-center justify-center gap-2">
                                    카카오페이로 후원
                                </button>
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={() => handlePayment('card')} className="py-4 bg-white border border-stone-200 rounded-xl font-bold hover:bg-stone-50">신용카드</button>
                                    <button onClick={() => handlePayment('trans')} className="py-4 bg-white border border-stone-200 rounded-xl font-bold hover:bg-stone-50">계좌이체</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Video Section */}
            <div className="relative w-full h-[600px] bg-black overflow-hidden group">
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute inset-0 bg-[url('/images/imagination_hero.png')] bg-cover bg-center opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-8 border border-white/50 cursor-pointer hover:bg-white/30 transition-colors group-hover:scale-110"
                    >
                        <Play size={32} className="fill-white text-white ml-2" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white font-serif mb-4 drop-shadow-lg"
                    >
                        아이들의 상상이 현실이 되는 곳
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed drop-shadow-md"
                    >
                        우리가 모은 작은 정성이 아이들에게는<br />
                        세상을 바꾸는 커다란 학교가 됩니다.
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl py-20">
                {/* Donation Area */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-stone-200/50 border border-stone-100 mb-20">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
                        <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Heart className="text-red-500 fill-red-500" />
                                마음 보태기
                            </h2>
                            <p className="text-stone-500 mt-1">
                                기부금은 아이들의 책과 교육 자재로 사용됩니다.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full cursor-pointer hover:bg-stone-200 transition-colors" onClick={() => setIsAnonymous(!isAnonymous)}>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isAnonymous ? 'bg-primary text-white' : 'bg-stone-300 text-white'}`}>
                                {isAnonymous && <Check size={12} />}
                            </div>
                            <span className="text-sm font-bold text-stone-600">익명으로 기부하기</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <DonationTier amount={10000} label="벽돌 한 장" icon={BrickWall} color="orange" />
                        <DonationTier amount={50000} label="튼튼한 벽" icon={Building} color="stone" />
                        <DonationTier amount={100000} label="창문 하나" icon={School} color="sky" />
                        <DonationTier amount={500000} label="작은 교실" icon={Crown} color="purple" />
                        <DonationTier amount={1000000} label="도서관 현판" icon={Heart} color="rose" />
                    </div>
                </div>

                {/* Participation Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Roadmap */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-lg border border-stone-100">
                        <h3 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                            <span className="text-3xl">🗺️</span> 상상학교 건립 로드맵
                        </h3>
                        {/* Roadmap Content */}
                        <div className="space-y-6 relative ml-2">
                            <div className="absolute top-2 bottom-2 left-[11px] w-0.5 bg-stone-200" />
                            {[
                                { status: 'done', title: "부지 선정 및 기획", date: "2024.12", desc: "아이들이 가장 행복할 수 있는 공간을 찾았습니다." },
                                { status: 'current', title: "건축 기금 모금", date: "2025.02 ~", desc: "여러분의 소중한 후원을 기다리고 있습니다." },
                                { status: 'future', title: "설계 공모 및 확정", date: "2025.06", desc: "아이들의 아이디어가 반영된 설계를 시작합니다." },
                                { status: 'future', title: "착공 및 공사", date: "2025.09", desc: "안전하고 튼튼하게 학교를 짓습니다." },
                                { status: 'future', title: "상상학교 개교", date: "2026.03", desc: "아이들의 웃음소리가 울려 퍼지는 날입니다." },
                            ].map((step, idx) => (
                                <div key={idx} className="relative pl-10">
                                    <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 flex items-center justify-center bg-white z-10 
                                        ${step.status === 'done' ? 'border-primary' : step.status === 'current' ? 'border-amber-400 animate-pulse' : 'border-stone-300'}`}>
                                        {step.status === 'done' && <div className="w-2 h-2 bg-primary rounded-full" />}
                                        {step.status === 'current' && <div className="w-2 h-2 bg-amber-400 rounded-full" />}
                                    </div>
                                    <span className="text-xs font-bold text-stone-400 block mb-1">{step.date}</span>
                                    <h4 className={`text-lg font-bold ${step.status === 'future' ? 'text-stone-400' : 'text-stone-800'}`}>{step.title}</h4>
                                    <p className="text-sm text-stone-500">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Idea Board */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-lg border border-stone-100 flex flex-col">
                        <h3 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                            <span className="text-3xl">💡</span> 아이디어 칠판
                        </h3>
                        <div className="flex-1 bg-stone-50 rounded-2xl p-6 mb-6 overflow-y-auto max-h-[300px] space-y-4 border border-stone-100">
                            {ideas.map((idea) => (
                                <div key={idea.id} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100">
                                    <p className="text-stone-700 text-sm mb-2">&quot;{idea.content}&quot;</p>
                                    <div className="flex justify-end text-xs text-stone-400">- {idea.author}</div>
                                </div>
                            ))}
                            {ideas.length === 0 && (
                                <div className="text-center text-stone-400 py-10">
                                    첫 번째 아이디어를 남겨주세요!
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newIdeaContent}
                                onChange={(e) => setNewIdeaContent(e.target.value)}
                                placeholder="학교에 바라는 점을 적어주세요!"
                                className="flex-1 bg-stone-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                            />
                            <button onClick={handleIdeaSubmit} className="px-6 py-3 bg-stone-800 text-white font-bold rounded-xl text-sm hover:bg-black transition-colors">
                                등록
                            </button>
                        </div>
                    </div>
                </div>

                {/* Construction Progress - Moved to Bottom & Resized */}
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-stone-800">실시간 건축 현황</h3>
                        <p className="text-sm text-stone-500">여러분의 후원으로 학교가 자라나고 있어요!</p>
                    </div>

                    <div className="relative w-full aspect-video bg-sky-100 rounded-[2rem] overflow-hidden shadow-lg border-2 border-white">
                        <div className="absolute inset-0">
                            <motion.div
                                animate={{ x: [0, 100, 0] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute top-10 left-10 text-white/40"
                            >
                                <div className="i-lucide-cloud w-16 h-16" /> ☁️
                            </motion.div>
                        </div>
                        <div className="absolute bottom-0 w-full h-1/4 bg-[#8BC34A] flex items-end justify-center overflow-hidden">
                            <div className="w-full h-4 bg-[#7CB342]" />
                        </div>
                        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 flex flex-col items-center transform scale-75 origin-bottom">
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: progress > 60 ? 1 : 0, opacity: progress > 60 ? 1 : 0 }}
                                className="w-64 h-24 border-b-[60px] border-b-amber-700 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent relative z-20 mb-[-1px]"
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                                    <div className="bg-amber-800 text-white text-[10px] font-bold px-2 py-1 rounded">상상학교</div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: progress > 40 ? 80 : 0, opacity: progress > 40 ? 1 : 0 }}
                                className="w-56 bg-amber-100 border-2 border-amber-200 flex justify-around items-center px-4 overflow-hidden relative z-10"
                            >
                                <div className="w-12 h-12 bg-sky-200 border-2 border-white rounded-t-full opacity-80" />
                                <div className="w-12 h-12 bg-sky-200 border-2 border-white rounded-t-full opacity-80" />
                                <div className="w-12 h-12 bg-sky-200 border-2 border-white rounded-t-full opacity-80" />
                            </motion.div>
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: progress > 10 ? 100 : 0, opacity: progress > 10 ? 1 : 0 }}
                                className="w-64 bg-amber-50 border-2 border-amber-200 flex justify-around items-end px-6 pb-0 overflow-hidden relative z-10"
                            >
                                <div className="w-14 h-20 bg-sky-200 border-2 border-white mb-4" />
                                <div className="w-16 h-24 bg-amber-900 rounded-t-xl border-4 border-amber-950" />
                                <div className="w-14 h-20 bg-sky-200 border-2 border-white mb-4" />
                            </motion.div>
                            <div className="w-72 h-4 bg-stone-300 rounded-full mt-[-2px] relative z-0" />
                        </div>
                        <AnimatePresence>
                            {progress > 80 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute bottom-[10%] left-[20%] text-4xl"
                                >
                                    🏃
                                </motion.div>
                            )}
                            {progress > 90 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute bottom-[12%] right-[20%] text-4xl"
                                >
                                    🤸‍♀️
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow border border-white/50 text-right">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">Progress</p>
                            <div className="text-xl font-black text-primary font-mono tabular-nums">
                                {progress.toFixed(1)}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
