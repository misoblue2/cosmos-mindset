"use client";

import { motion } from 'framer-motion';
import { User, Package, Trophy, Star, Settings, LogOut, ChevronRight, Heart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { SettingsModal, type UserProfile } from '@/components/mypage/SettingsModal';

export default function MyPage() {
    // Initial State (Mock Data persistence simulated with state)
    const [profile, setProfile] = useState<UserProfile>({
        name: "김우주",
        email: "cosmos@example.com",
        phone: "010-1234-5678",
        notification: true
    });

    // Static data for display
    const joinDate = "2024.03.15";
    const level = "Space Traveler";

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const orders = [
        { id: "ORD-20240401-001", title: "시선의 연금술 (Originals)", date: "2024.04.01", status: "배송완료" },
        { id: "ORD-20240320-052", title: "어린이 상상학교 후원 기부", date: "2024.03.20", status: "후원완료" }
    ];

    const stats = {
        booksRead: 5,
        contributions: 15000,
        daysWithCosmos: 48
    };

    const handleSaveProfile = (newProfile: UserProfile) => {
        setProfile(newProfile);
        // Ideally save to DB here
        alert("프로필이 업데이트되었습니다.");
    };

    const handleLogout = () => {
        alert("로그아웃 되었습니다 (데모).");
    };

    return (
        <div className="min-h-screen bg-[#050510] relative overflow-hidden font-sans text-white">
            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                currentProfile={profile}
                onSave={handleSaveProfile}
                onLogout={handleLogout}
            />

            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[0%] left-[20%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-1 text-center md:text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-4xl font-black font-serif tracking-tight"
                        >
                            나의 우주 정거장
                        </motion.h1>
                        <p className="text-white/40 font-medium">My Cosmic Station</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSettingsOpen(true)}
                            className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                            <Settings size={14} />
                            설정
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full text-xs font-bold hover:bg-red-500/20 transition-colors flex items-center gap-2"
                        >
                            <LogOut size={14} />
                            로그아웃
                        </button>
                    </div>
                </div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden"
                >
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <User size={40} className="text-white" />
                    </div>
                    <div className="text-center md:text-left flex-1 space-y-2">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <h2 className="text-2xl font-bold">{profile.name}님</h2>
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-[10px] font-black uppercase tracking-wider">
                                {level}
                            </span>
                        </div>
                        <p className="text-white/60 text-sm">{profile.email} | 가입일: {joinDate}</p>
                    </div>
                    <div className="flex gap-4 md:gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                        <div className="text-center">
                            <p className="text-2xl font-black text-yellow-400">{stats.booksRead}</p>
                            <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-1">Books</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-black text-pink-400">{stats.contributions.toLocaleString()}</p>
                            <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-1">Points</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-black text-blue-400">{stats.daysWithCosmos}</p>
                            <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-1">Days</p>
                        </div>
                    </div>

                    {/* Decorative Background */}
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Mission History (Order) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 space-y-6"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <Package size={20} className="text-blue-400" />
                                최근 탐사 기록
                            </h3>
                            <Link href="#" className="text-xs text-white/40 hover:text-white transition-colors flex items-center gap-1">
                                전체보기 <ChevronRight size={12} />
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {orders.map(order => (
                                <div key={order.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors flex justify-between items-center group cursor-pointer">
                                    <div className="space-y-1">
                                        <p className="font-bold text-sm group-hover:text-purple-300 transition-colors">{order.title}</p>
                                        <p className="text-xs text-white/40">{order.date}</p>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${order.status === '배송완료' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'}`}>
                                        {order.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Achievements & Affirmation */}
                    <div className="space-y-6">
                        {/* Donation Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-[2rem] p-8 relative overflow-hidden group hover:border-orange-500/40 transition-colors"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                <Heart size={100} />
                            </div>
                            <div className="relative z-10 space-y-3">
                                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400 mb-2">
                                    <Star size={24} fill="currentColor" />
                                </div>
                                <h3 className="text-lg font-bold text-orange-100">명예 후원자</h3>
                                <p className="text-sm text-orange-200/60 leading-relaxed">
                                    어린이 상상학교 건립 프로젝트의<br />
                                    소중한 벽돌을 함께 쌓아주셨습니다.
                                </p>
                            </div>
                        </motion.div>

                        {/* Quantum Mirror Recall */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-purple-900/20 border border-purple-500/20 rounded-[2rem] p-8 group hover:bg-purple-900/30 transition-colors cursor-pointer"
                        >
                            <h3 className="text-lg font-bold text-purple-200 mb-2">나의 퀀텀 미러</h3>
                            <p className="text-sm text-purple-300/60">
                                &quot;나는 이미 충분합니다.&quot;
                            </p>
                            <p className="text-xs text-white/20 mt-4 text-right">24.04.10 기록</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div >
    );
}
