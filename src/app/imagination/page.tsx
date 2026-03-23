"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Rocket, Star, ExternalLink, Zap } from 'lucide-react';
import Link from 'next/link';
import { DonationModal } from '@/components/common/DonationModal';

export default function ImaginationPage() {
    const [showConfetti, setShowConfetti] = useState(false);
    const [progress, setProgress] = useState(0);

    // Donation State
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [selectedLabel, setSelectedLabel] = useState("");

    const handleSupportClick = (amount: number, label: string) => {
        setSelectedAmount(amount);
        setSelectedLabel(label);
        setPaymentModalOpen(true);
    };

    const handlePaymentConfirm = () => {
        setPaymentModalOpen(false);
        // Show success animation
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => (prev >= 100 ? 0 : prev + 1));
        }, 50);
        return () => clearInterval(timer);
    }, []);

    // Trigger confetti on mount or specific event if needed
    // For now, let's just show it periodically or on load
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setShowConfetti(true);
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 overflow-hidden relative">
            {/* Background Stars - Deterministic rendering */}
            <div className="fixed inset-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0.2, scale: 0.5 }}
                        animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.5, 1, 0.5] }}
                        transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: (i % 5) * 0.5 }}
                        className="absolute bg-white rounded-full"
                        style={{
                            width: (i % 3) + 1 + 'px',
                            height: (i % 3) + 1 + 'px',
                            top: (i * 7) % 100 + '%',
                            left: (i * 13) % 100 + '%'
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
                                initial={{ y: -50, x: ((i * 137) % window.innerWidth) - window.innerWidth / 2, rotate: 0 }}
                                animate={{ y: window.innerHeight, rotate: 360 }}
                                transition={{ duration: 3 + (i % 3), ease: "linear" }}
                                className="absolute top-0 text-4xl"
                            >
                                {['🚀', '⭐', '🪐', '💫'][i % 4]}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Donation Modal (Unified) */}
            <DonationModal
                isOpen={paymentModalOpen}
                onClose={() => setPaymentModalOpen(false)}
                onConfirm={handlePaymentConfirm}
                title="미래의 별들에게 후원하기"
                description={`${selectedLabel}\n${selectedAmount.toLocaleString()}원을 후원합니다.\n\n아래 계좌로 입금 후 확인 버튼을 눌러주세요.`}
                confirmText="후원금 입금 완료"
            />

            <div className="container mx-auto px-4 max-w-5xl py-12 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-20 md:mb-32 mt-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="inline-block mb-6 relative"
                    >
                        <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full animate-pulse" />
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 relative z-10">
                            어린이 상상학교
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-200/80 font-bold tracking-widest uppercase">
                            Imagination Academy
                        </p>
                    </motion.div>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        우리의 아이들이 더 넓은 우주를 꿈꿀 수 있도록,<br />
                        <span className="text-white font-bold">무한한 상상력</span>을 지원합니다.
                    </p>
                </div>

                {/* Introduction - Sticky Scroll Effect */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
                    <div className="relative">
                        <div className="aspect-square rounded-[2.5rem] bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-white/10 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Rocket size={64} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-bounce" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-blue-300">꿈을 쏘아 올리다</h2>
                            <p className="text-gray-400 leading-relaxed">
                                모든 아이들은 각자의 우주를 품고 있습니다. 그 작은 불씨가 거대한 별이 될 수 있도록, 우리는 교육과 체험을 통해 아이들의 잠재력을 깨웁니다.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-purple-300">미래를 그리다</h2>
                            <p className="text-gray-400 leading-relaxed">
                                획일화된 교육에서 벗어나, 창의적이고 주도적인 사고를 기르는 특별한 커리큘럼을 제공합니다.
                            </p>
                        </div>
                        <Link
                            href="/imagination/ideas"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-blue-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:scale-105"
                        >
                            상상학교 아이디어 제안하기 <ExternalLink size={16} />
                        </Link>
                    </div>
                </div>

                {/* Programs Section */}
                <div className="mb-32">
                    <h2 className="text-4xl font-black text-center mb-16">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                            탐험 프로그램
                        </span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "코딩 우주선", desc: "블록 코딩으로 나만의 게임 만들기", color: "from-blue-500 to-cyan-500", icon: <Zap /> },
                            { title: "아트 유니버스", desc: "디지털 드로잉과 3D 모델링", color: "from-purple-500 to-pink-500", icon: <Star /> },
                            { title: "미래 과학자", desc: "로봇 공학과 AI 체험", color: "from-green-500 to-emerald-500", icon: <Rocket /> }
                        ].map((item, idx) => (
                            <div key={idx} className="group relative p-1 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent hover:from-white/20 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative bg-black/80 backdrop-blur-xl p-8 rounded-[1.8rem] h-full border border-white/5 group-hover:border-white/20 transition-colors">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 text-white shadow-lg`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                                    <p className="text-gray-400 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Support Section - Simplified and Clean */}
                <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900 border border-white/10 p-8 md:p-16 text-center">
                    <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                    <div className="relative z-10 space-y-8">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">함께 꿈을 키워주세요</h2>
                        <p className="text-indigo-200 max-w-xl mx-auto mb-8">
                            여러분의 작은 후원이 모여 아이들에게 더 넓은 세상을 보여줄 수 있습니다.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => handleSupportClick(10000, "별똥별 후원")}
                                className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 transition-all text-white font-bold backdrop-blur-md"
                            >
                                ✨ 별똥별 (10,000원)
                            </button>
                            <button
                                onClick={() => handleSupportClick(30000, "은하수 후원")}
                                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold shadow-lg shadow-purple-500/20 transform hover:scale-105 transition-all"
                            >
                                🌌 은하수 (30,000원)
                            </button>
                            <button
                                onClick={() => handleSupportClick(50000, "우주선 후원")}
                                className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 transition-all text-white font-bold backdrop-blur-md"
                            >
                                🚀 우주선 (50,000원)
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Progress Bar */}
                <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/10 z-50">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                    />
                </div>
            </div>
        </div>
    );
}
