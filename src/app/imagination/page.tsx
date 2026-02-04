"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, School, ArrowRight, User, Check, BrickWall, Coins, Building, Crown, Play, Rocket, Star, Moon } from 'lucide-react';
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
            author: newIdeaName.trim() || "익명의 우주비행사",
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
        // Mock Success
        setPaymentModalOpen(false);
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
            className="relative flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl hover:bg-white/10 hover:border-purple-400/50 transition-all group overflow-hidden"
        >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors bg-gradient-to-br from-white/10 to-transparent border border-white/5 group-hover:border-${color}-400/50`}>
                <Icon className="text-white group-hover:text-purple-300 transition-colors" size={32} />
            </div>
            <h3 className="font-bold text-lg text-white mb-1">{label}</h3>
            <p className="text-sm font-medium text-white/60">{amount.toLocaleString()}원</p>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
    );

    return (
        <div className="min-h-screen bg-[#050510] text-white relative overflow-hidden">
            {/* Cosmic Background - Fixed */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#050510] to-[#050510]" />
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/20 rounded-full blur-[120px]" />

                {/* Twinkling Stars */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0.2, scale: 0.5 }}
                        animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.5, 1, 0.5] }}
                        transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
                        className="absolute bg-white rounded-full"
                        style={{
                            width: Math.random() * 3 + 1 + 'px',
                            height: Math.random() * 3 + 1 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%'
                        }}
                    />
                ))}
            </div>

            {/* Confetti Overlay */}
            <AnimatePresence>
                {showConfetti && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden"
                    >
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: -50, x: (Math.random() - 0.5) * window.innerWidth, rotate: 0 }}
                                animate={{ y: window.innerHeight, rotate: 360 }}
                                transition={{ duration: 3 + Math.random() * 2, ease: "linear" }}
                                className="absolute top-0 text-4xl"
                            >
                                {['🚀', '⭐', '🪐', '💫'][Math.floor(Math.random() * 4)]}
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
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                        onClick={() => setPaymentModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-[#1a1a2e] border border-white/10 rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
                            <div className="p-8 text-center bg-gradient-to-b from-white/5 to-transparent">
                                <h3 className="text-xl font-bold text-white mb-2">미래의 별들에게 후원하기</h3>
                                <div className="mt-8 relative">
                                    <span className="text-white/40 text-sm font-bold block mb-1">{selectedLabel}</span>
                                    <span className="text-4xl font-black text-white tracking-tight">{selectedAmount.toLocaleString()}<span className="text-lg text-white/50 ml-1">원</span></span>
                                    <div className="absolute -inset-4 bg-purple-500/20 blur-xl -z-10 rounded-full" />
                                </div>
                            </div>
                            <div className="p-8 space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={() => handlePayment('card')} className="py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-white hover:bg-white/10 transition-colors">신용카드</button>
                                    <button onClick={() => handlePayment('trans')} className="py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-white hover:bg-white/10 transition-colors">계좌이체</button>
                                </div>
                                <button onClick={() => handlePayment('kakaopay')} className="w-full py-4 bg-[#FAE100] text-[#371D1E] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#FADB00] transition-colors">
                                    카카오페이
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-4 max-w-5xl py-12 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-20 md:mb-32 mt-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="inline-flex items-center justify-center p-3 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                    >
                        <span className="text-2xl mr-2">🪐</span>
                        <span className="text-sm font-bold text-purple-200 tracking-wider uppercase">Project Imagination School</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-white to-blue-400">
                            우주를 꿈꾸는<br />아이들의 학교
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed"
                    >
                        여러분의 반짝이는 아이디어가 모여<br />
                        아이들의 꿈을 지키는 튼튼한 우주정거장이 됩니다.
                    </motion.p>
                </div>

                {/* Donation Area */}
                <div className="mb-24">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 px-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-500/10 rounded-xl">
                                <Rocket className="text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">건축 보급품 지원하기</h2>
                                <p className="text-xs text-white/40">아이들의 꿈을 위한 연료가 되어주세요</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsAnonymous(!isAnonymous)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${isAnonymous ? 'bg-purple-500/20 border-purple-500/50 text-purple-200' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'}`}
                        >
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${isAnonymous ? 'bg-purple-500 border-transparent' : 'border-current'}`}>
                                {isAnonymous && <Check size={10} className="text-white" />}
                            </div>
                            <span className="text-xs font-bold">익명 사령관으로 참여</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <DonationTier amount={10000} label="작은 별똥별" icon={Star} color="yellow" />
                        <DonationTier amount={50000} label="달의 조각" icon={Moon} color="indigo" />
                        <DonationTier amount={100000} label="탐사선 벽돌" icon={BrickWall} color="orange" />
                        <DonationTier amount={500000} label="우주 실험실" icon={School} color="blue" />
                        <DonationTier amount={1000000} label="관제탑 이름표" icon={Crown} color="purple" />
                    </div>
                </div>

                {/* Participation Section - Galactic Blueprint */}
                <div className="max-w-4xl mx-auto mb-24">
                    <div className="bg-[#121225] rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden group">
                        {/* Blueprint decorative grid */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                        />

                        <div className="relative z-10 text-center mb-12">
                            <span className="inline-block px-4 py-1.5 bg-white/5 text-purple-300 rounded-full text-[10px] font-black mb-4 uppercase tracking-[0.2em] border border-white/5">
                                Captain's Log : Ideas
                            </span>
                            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 font-serif">
                                상상학교 설계도
                            </h3>
                            <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
                                이곳은 중력이 없습니다. 여러분의 상상력만 있다면 무엇이든 가능합니다.<br />
                                <span className="text-purple-400 font-bold">학교에 무엇이 있었으면 좋겠나요?</span>
                            </p>
                        </div>

                        {/* Cosmic Idea Board */}
                        <div className="bg-black/40 backdrop-blur-md rounded-3xl p-6 md:p-8 mb-8 border border-white/5 min-h-[300px] max-h-[500px] overflow-y-auto custom-scrollbar relative">
                            {ideas.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <Sparkles size={48} className="mb-4 text-purple-400" />
                                    </motion.div>
                                    <p className="font-bold text-white/60">아직 발견된 행성이 없습니다.<br />첫 번째 좌표를 찍어주세요!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {ideas.map((idea) => (
                                        <motion.div
                                            key={idea.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:bg-white/10 transition-colors group"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center shrink-0 border border-white/10">
                                                    <span className="text-lg">🪐</span>
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium text-lg leading-snug">&quot;{idea.content}&quot;</p>
                                                    <p className="text-xs text-white/30 font-bold mt-1 group-hover:text-purple-400 transition-colors">Commander {idea.author}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-green-400/80 bg-green-900/20 px-3 py-1.5 rounded-full border border-green-500/20 text-[10px] font-black uppercase tracking-wider shrink-0">
                                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                                <span>Transmission Received</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Input Control Panel */}
                        <div className="bg-white/5 p-2 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-2">
                            <input
                                type="text"
                                value={newIdeaName}
                                onChange={(e) => setNewIdeaName(e.target.value)}
                                placeholder="이름 (선택)"
                                className="w-full md:w-32 bg-transparent border-none text-white text-sm font-bold placeholder:text-white/20 px-4 py-3 focus:outline-none focus:bg-white/5 rounded-xl transition-all"
                            />
                            <div className="w-px bg-white/10 hidden md:block" />
                            <input
                                type="text"
                                value={newIdeaContent}
                                onChange={(e) => setNewIdeaContent(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleIdeaSubmit()}
                                placeholder="예: 무중력 도서관이 필요해요!"
                                className="flex-1 bg-transparent border-none text-white text-sm placeholder:text-white/20 px-4 py-3 focus:outline-none focus:bg-white/5 rounded-xl transition-all"
                            />
                            <button
                                onClick={handleIdeaSubmit}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 group"
                            >
                                <span>신호 전송</span>
                                <Rocket size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Construction Progress - Galactic Map */}
                <div className="max-w-2xl mx-auto p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="text-center mb-8">
                        <h3 className="text-xl font-bold text-white mb-2">기지 건설 현황</h3>
                        <p className="text-sm text-white/40">목표 달성률 {progress.toFixed(1)}%</p>
                    </div>

                    <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        />
                    </div>
                    <div className="flex justify-between mt-4 text-xs font-bold text-white/30 uppercase tracking-widest">
                        <span>Ground Zero</span>
                        <span>Ignition</span>
                        <span>Orbit</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
