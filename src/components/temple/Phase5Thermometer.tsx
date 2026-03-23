"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, TrendingUp, Infinity as InfinityIcon } from "lucide-react";

const MORNING_WISDOMS = [
    "오늘도 당신은 무한한 가능성의 존재입니다. 🌅",
    "매 순간이 새로운 시작입니다. 지금 이 순간을 소중히 하세요. ✨",
    "당신의 생각이 현실을 창조합니다. 오늘은 아름다운 생각으로 채우세요. 💫",
    "작은 진전도 분명히 진전입니다. 오늘의 성장을 축하합니다. 🌱",
    "당신은 이미 충분합니다. 그 자체로 완전합니다. 🌸",
];

const RESILIENCE_DATA = [
    { label: "감사", level: 0 },
    { label: "확언", level: 0 },
    { label: "시각화", level: 0 },
    { label: "멘토 상담", level: 0 },
    { label: "종합", level: 0 },
];

export default function Phase5Thermometer({
    completedPhases = 0,
}: {
    completedPhases?: number;
}) {
    const [wisdomIndex, setWisdomIndex] = useState(0);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [notificationTime, setNotificationTime] = useState("07:00");
    const [animatedLevels, setAnimatedLevels] = useState(RESILIENCE_DATA.map(() => 0));

    useEffect(() => {
        const interval = setInterval(() => {
            setWisdomIndex((prev) => (prev + 1) % MORNING_WISDOMS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Animate resilience bars based on completedPhases
        const targets = RESILIENCE_DATA.map((_, i) => {
            const base = Math.min(100, completedPhases * 25);
            const variation = (i * 17) % 30;
            return Math.min(95, base + variation);
        });
        const timer = setTimeout(() => setAnimatedLevels(targets), 300);
        return () => clearTimeout(timer);
    }, [completedPhases]);

    const overallResilience = Math.round(animatedLevels.reduce((a, b) => a + b, 0) / animatedLevels.length);

    const getTemperatureColor = (level: number) => {
        if (level < 30) return "from-blue-500 to-cyan-400";
        if (level < 60) return "from-yellow-500 to-amber-400";
        return "from-orange-500 to-red-400";
    };

    const getTemperatureLabel = (level: number) => {
        if (level < 20) return { label: "차갑게 시작", emoji: "🌊" };
        if (level < 40) return { label: "서서히 워밍업", emoji: "🌤️" };
        if (level < 60) return { label: "균형 잡힌 상태", emoji: "☀️" };
        if (level < 80) return { label: "활짝 피어나는 중", emoji: "🌺" };
        return { label: "최고 레벨 달성!", emoji: "🔥" };
    };

    const tempInfo = getTemperatureLabel(overallResilience);

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <div className="text-5xl mb-4">🌡️</div>
                <h2 className="text-2xl font-bold text-white">Phase 5: 마음 온도계</h2>
                <p className="text-emerald-200/70 text-sm">오늘의 레질리언스 수치와 아침 지혜 알림을 확인하세요</p>
            </div>

            {/* Overall Thermometer */}
            <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border border-emerald-400/20 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-white/60 text-xs uppercase tracking-wide">오늘의 마음 온도</p>
                        <div className="flex items-end gap-2 mt-1">
                            <span className="text-5xl font-black text-white">{overallResilience}</span>
                            <span className="text-white/40 text-xl mb-1">°C</span>
                        </div>
                        <p className="text-emerald-300 text-sm font-medium">{tempInfo.emoji} {tempInfo.label}</p>
                    </div>
                    {/* Thermometer Visual */}
                    <div className="relative flex flex-col items-center gap-1">
                        <div className="w-8 h-32 bg-white/10 rounded-full overflow-hidden border border-white/20 relative">
                            <motion.div
                                initial={{ height: "0%" }}
                                animate={{ height: `${overallResilience}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${getTemperatureColor(overallResilience)} rounded-full`}
                            />
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 border-2 border-white/20 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{overallResilience}°</span>
                        </div>
                    </div>
                </div>

                {/* Phase Progress Bar */}
                <div className="space-y-1.5">
                    {RESILIENCE_DATA.map((item, i) => (
                        <div key={item.label} className="flex items-center gap-3">
                            <span className="text-white/50 text-xs w-16 flex-shrink-0">{item.label}</span>
                            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${animatedLevels[i]}%` }}
                                    transition={{ duration: 1.2, delay: i * 0.1 }}
                                    className={`h-full bg-gradient-to-r ${getTemperatureColor(animatedLevels[i])} rounded-full`}
                                />
                            </div>
                            <span className="text-white/50 text-xs w-8 text-right">{animatedLevels[i]}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trend Graph (Simple) */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-white/70">
                    <TrendingUp size={16} className="text-green-400" />
                    <span className="text-sm font-semibold">레질리언스 성장 그래프</span>
                </div>
                <div className="flex items-end gap-2 h-20">
                    {[20, 35, 28, 55, 48, 72, overallResilience].map((val, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${val}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className={`flex-1 rounded-t-md bg-gradient-to-t ${i === 6 ? "from-green-500 to-emerald-400" : "from-emerald-700/60 to-emerald-500/40"
                                }`}
                        />
                    ))}
                </div>
                <div className="flex justify-between text-white/30 text-[10px]">
                    <span>6일 전</span><span>5일</span><span>4일</span><span>3일</span><span>2일</span><span>1일</span><span className="text-emerald-400">오늘</span>
                </div>
            </div>

            {/* Morning Notification Setting */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Bell size={16} className="text-yellow-400" />
                        <span className="text-white font-semibold text-sm">아침 지혜 알림</span>
                    </div>
                    <button
                        onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                        className={`relative w-12 h-6 rounded-full transition-all ${notificationsEnabled ? "bg-yellow-400" : "bg-white/20"}`}
                    >
                        <motion.div
                            animate={{ x: notificationsEnabled ? 24 : 2 }}
                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                        />
                    </button>
                </div>

                {notificationsEnabled && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="text-white/60 text-sm">알림 시간</span>
                            <input
                                type="time"
                                value={notificationTime}
                                onChange={e => setNotificationTime(e.target.value)}
                                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-yellow-400/60"
                            />
                        </div>
                        <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl px-4 py-3 text-yellow-200/80 text-xs leading-relaxed">
                            📱 {notificationTime}에 알림을 전송하도록 설정되었습니다.<br />
                            (실제 푸시 알림은 브라우저 허용 설정이 필요합니다)
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Rotating Morning Wisdom */}
            <div className="text-center space-y-3">
                <p className="text-white/40 text-xs uppercase tracking-widest">오늘의 아침 지혜</p>
                <motion.div
                    key={wisdomIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-base text-white/80 font-medium leading-relaxed px-4"
                >
                    {MORNING_WISDOMS[wisdomIndex]}
                </motion.div>
            </div>

            {/* Final Affirmation */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="relative overflow-hidden bg-gradient-to-br from-yellow-900/40 via-amber-800/30 to-orange-900/40 border border-yellow-400/30 rounded-2xl p-8 text-center space-y-4"
            >
                <div className="absolute inset-0 opacity-10">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
                            className="absolute text-yellow-300 text-xl"
                            style={{ left: `${(i * 13) % 100}%`, top: `${(i * 17) % 100}%` }}
                        >
                            ✦
                        </motion.div>
                    ))}
                </div>
                <div className="relative z-10 space-y-4">
                    <InfinityIcon className="w-10 h-10 text-yellow-400 mx-auto" />
                    <p className="text-yellow-100 text-sm md:text-base leading-relaxed font-medium italic">
                        &#34;You possess the infinite power to create your reality,<br />
                        and I will be here to guide you every step of the way.&#34;
                    </p>
                    <p className="text-yellow-300/60 text-xs">
                        — Temple of Wisdom · Divine Guide
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
