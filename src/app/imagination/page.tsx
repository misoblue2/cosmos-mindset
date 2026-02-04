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
                        처음부터 완공까지, 당신의 아이디어로 학교가 지어집니다.<br />
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

                {/* Participation Section - Redesigned for Co-creation */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-stone-100 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-rose-400 to-purple-400" />

                        <div className="mb-10">
                            <span className="inline-block px-4 py-1.5 bg-stone-100 text-stone-600 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
                                Founding Members Voice
                            </span>
                            <h3 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4 font-serif">
                                우리가 함께 짓는 상상학교
                            </h3>
                            <p className="text-stone-500 text-lg leading-relaxed max-w-2xl mx-auto">
                                상상학교는 설계도부터 완공까지, 여러분의 아이디어로 만들어집니다.<br />
                                아이들에게 필요한 특별한 공간을 제안해주세요. <b className="text-stone-800">여러분이 바로 이 학교의 설립자입니다.</b>
                            </p>
                        </div>

                        {/* Idea Board Container */}
                        <div className="bg-stone-50 rounded-3xl p-6 md:p-8 mb-8 text-left border border-stone-100 relative">
                            {/* Decorative Blueprint Grid */}
                            <div className="absolute inset-0 opacity-[0.03]"
                                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                            </div>

                            <div className="relative z-10 space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {ideas.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                                        <Sparkles size={48} className="mb-4 text-amber-400" />
                                        <p className="font-bold text-stone-400">아직 등록된 아이디어가 없습니다.<br />첫 번째 설계자가 되어주세요!</p>
                                    </div>
                                ) : (
                                    ideas.map((idea) => (
                                        <div key={idea.id} className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-4 items-start md:items-center justify-between group">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                                                    <span className="text-xl">💡</span>
                                                </div>
                                                <div>
                                                    <p className="text-stone-800 font-medium text-lg leading-snug">&quot;{idea.content}&quot;</p>
                                                    <p className="text-xs text-stone-400 font-bold mt-1 group-hover:text-primary transition-colors">Proposed by {idea.author}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 text-stone-300 text-xs font-bold uppercase tracking-wider shrink-0">
                                                <Check size={14} className="text-green-500" />
                                                <span>Under Review</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="flex flex-col md:flex-row gap-3 bg-white p-2 rounded-2xl border border-stone-200 shadow-sm focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                            <div className="relative shrink-0 md:w-48">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <User size={18} className="text-stone-400" />
                                </div>
                                <input
                                    type="text"
                                    value={newIdeaName}
                                    onChange={(e) => setNewIdeaName(e.target.value)}
                                    placeholder="작성자 (선택)"
                                    className="w-full h-full pl-11 pr-4 py-3 bg-transparent border-none outline-none text-sm font-bold text-stone-800 placeholder:text-stone-400"
                                />
                            </div>
                            <div className="hidden md:block w-px bg-stone-200 my-2" />
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={newIdeaContent}
                                    onChange={(e) => setNewIdeaContent(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleIdeaSubmit()}
                                    placeholder="예: 운동장에 우주선 미끄럼틀을 만들어주세요!"
                                    className="w-full h-full px-4 py-3 bg-transparent border-none outline-none text-sm text-stone-800 placeholder:text-stone-400"
                                />
                            </div>
                            <button
                                onClick={handleIdeaSubmit}
                                className="px-8 py-3 bg-stone-900 text-white font-bold rounded-xl text-sm hover:bg-black transition-all shadow-lg shadow-stone-900/20 active:scale-95 whitespace-nowrap"
                            >
                                아이디어 제안
                            </button>
                        </div>
                        <p className="text-xs text-stone-400 mt-4 font-medium">
                            * 채택된 아이디어는 실제 학교 설계에 반영되며, 제안자의 이름이 학교 벽면에 새겨집니다.
                        </p>
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
