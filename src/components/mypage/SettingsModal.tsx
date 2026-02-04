"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Bell, LogOut, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

export interface UserProfile {
    name: string;
    email: string;
    phone: string;
    notification?: boolean;
}

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentProfile: UserProfile;
    onSave: (newProfile: UserProfile) => void;
    onLogout: () => void;
}

export function SettingsModal({
    isOpen,
    onClose,
    currentProfile,
    onSave,
    onLogout
}: SettingsModalProps) {
    const [profile, setProfile] = useState<UserProfile>(currentProfile);

    // Sync when modal opens
    useEffect(() => {
        if (isOpen) {
            setProfile(currentProfile);
        }
    }, [isOpen, currentProfile]);

    const handleSave = () => {
        onSave(profile);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="relative p-8 pb-6 border-b border-stone-800">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 text-stone-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                            <h3 className="text-2xl font-serif font-bold text-stone-200">설정</h3>
                            <p className="text-stone-500 text-sm mt-1">프로필과 계정 환경을 관리하세요.</p>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-8">

                            {/* Profile Section */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2">
                                    <User size={14} /> Profile Info
                                </h4>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-stone-400 block mb-1.5 ml-1">이름</label>
                                        <input
                                            type="text"
                                            value={profile.name}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-stone-200 focus:border-purple-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-stone-400 block mb-1.5 ml-1">이메일 (변경불가)</label>
                                        <input
                                            type="email"
                                            value={profile.email}
                                            disabled
                                            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-stone-500 cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-stone-400 block mb-1.5 ml-1">연락처</label>
                                        <input
                                            type="tel"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-stone-200 focus:border-purple-500 focus:outline-none transition-colors"
                                            placeholder="010-0000-0000"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="space-y-4 pt-4 border-t border-stone-800">
                                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2">
                                    <Bell size={14} /> Alerts
                                </h4>
                                <div className="flex items-center justify-between bg-stone-800/50 p-4 rounded-xl border border-stone-800">
                                    <span className="text-sm text-stone-300">이벤트 및 마케팅 알림</span>
                                    <button
                                        onClick={() => setProfile({ ...profile, notification: !profile.notification })}
                                        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${profile.notification ? 'bg-purple-600' : 'bg-stone-700'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${profile.notification ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3 pt-6">
                                <button
                                    onClick={handleSave}
                                    className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-900/20 active:scale-95"
                                >
                                    저장하기
                                </button>

                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <button
                                        onClick={onLogout}
                                        className="py-3 bg-stone-800 hover:bg-stone-700 text-stone-400 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                                    >
                                        <LogOut size={14} /> 로그아웃
                                    </button>
                                    <button className="py-3 bg-stone-800 hover:bg-red-900/20 text-stone-400 hover:text-red-400 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2">
                                        <Trash2 size={14} /> 회원탈퇴
                                    </button>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
