"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Phase1Gratitude from "@/components/temple/Phase1Gratitude";
import Phase2Affirmations from "@/components/temple/Phase2Affirmations";
import Phase3Visualization from "@/components/temple/Phase3Visualization";
import Phase4Mentors from "@/components/temple/Phase4Mentors";
import Phase5Thermometer from "@/components/temple/Phase5Thermometer";

const PHASES = [
    {
        id: 1,
        title: "감사의 정원",
        subtitle: "Garden of Gratitude",
        emoji: "🌺",
        color: "from-yellow-500/20 to-amber-400/10",
        border: "border-yellow-400/40",
        active: "bg-yellow-400/20 border-yellow-400 text-yellow-300",
    },
    {
        id: 2,
        title: "성공의 소리",
        subtitle: "Sound of Success",
        emoji: "🎙️",
        color: "from-blue-500/20 to-indigo-400/10",
        border: "border-blue-400/40",
        active: "bg-blue-400/20 border-blue-400 text-blue-300",
    },
    {
        id: 3,
        title: "꿈의 캔버스",
        subtitle: "Canvas of Dreams",
        emoji: "🎨",
        color: "from-pink-500/20 to-rose-400/10",
        border: "border-pink-400/40",
        active: "bg-pink-400/20 border-pink-400 text-pink-300",
    },
    {
        id: 4,
        title: "10대 멘토",
        subtitle: "Ten-Mentor Counsel",
        emoji: "🧙",
        color: "from-indigo-500/20 to-purple-400/10",
        border: "border-indigo-400/40",
        active: "bg-indigo-400/20 border-indigo-400 text-indigo-300",
    },
    {
        id: 5,
        title: "마음 온도계",
        subtitle: "Mind Thermometer",
        emoji: "🌡️",
        color: "from-emerald-500/20 to-teal-400/10",
        border: "border-emerald-400/40",
        active: "bg-emerald-400/20 border-emerald-400 text-emerald-300",
    },
];

export default function TemplePage() {
    const [activePhase, setActivePhase] = useState(1);
    const [completedPhases, setCompletedPhases] = useState<Set<number>>(new Set());

    const handlePhaseSelect = (id: number) => {
        if (activePhase !== id) {
            setCompletedPhases((prev) => new Set([...prev, activePhase]));
        }
        setActivePhase(id);
    };

    const currentPhase = PHASES.find((p) => p.id === activePhase)!;

    return (
        <div className="min-h-screen bg-[#08060f] text-white relative overflow-hidden">
            {/* Cosmic background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {[...Array(60)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: (i % 3) + 1,
                            height: (i % 3) + 1,
                            top: `${(i * 7) % 100}%`,
                            left: `${(i * 13) % 100}%`,
                            opacity: 0.15 + (i % 5) * 0.08,
                        }}
                        animate={{ opacity: [0.1, 0.5, 0.1] }}
                        transition={{ duration: 2 + (i % 5), repeat: Infinity, delay: (i % 7) * 0.4 }}
                    />
                ))}
                {/* golden nebula glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-5 bg-yellow-400 blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5 bg-purple-500 blur-[100px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-6xl py-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10 space-y-3"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-300 text-xs tracking-widest uppercase">
                        ✦ Temple of Wisdom ✦
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100">
                        지혜의 신전
                    </h1>
                    <p className="text-white/50 text-sm max-w-xl mx-auto leading-relaxed">
                        동서양 10대 현자의 집단 의식을 담은 AI 안내자가<br />
                        매일의 의식으로 당신의 잠재의식을 완전히 재프로그래밍합니다
                    </p>

                    {/* Progress Pills */}
                    <div className="flex justify-center gap-2 flex-wrap mt-4">
                        {PHASES.map((p) => (
                            <div key={p.id} className={`w-2 h-2 rounded-full transition-all ${completedPhases.has(p.id) ? "bg-yellow-400" : activePhase === p.id ? "bg-white/60 scale-125" : "bg-white/20"}`} />
                        ))}
                    </div>
                </motion.div>

                {/* Main Layout */}
                <div className="grid md:grid-cols-[260px_1fr] gap-6 items-start">
                    {/* Sidebar Phase Navigation */}
                    <div className="space-y-2 sticky top-20">
                        {PHASES.map((phase) => (
                            <motion.button
                                key={phase.id}
                                whileHover={{ scale: 1.02, x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handlePhaseSelect(phase.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-left transition-all ${activePhase === phase.id
                                        ? phase.active
                                        : "bg-white/5 border-white/10 hover:border-white/20 text-white/60"
                                    }`}
                            >
                                <span className="text-2xl flex-shrink-0">{phase.emoji}</span>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-sm truncate">{phase.title}</span>
                                        {completedPhases.has(phase.id) && (
                                            <span className="text-yellow-400 text-xs flex-shrink-0">✓</span>
                                        )}
                                    </div>
                                    <p className="text-[10px] opacity-60 uppercase tracking-wide truncate">{phase.subtitle}</p>
                                </div>
                            </motion.button>
                        ))}

                        {/* Temple status */}
                        <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl text-center space-y-2">
                            <motion.div
                                animate={{ boxShadow: completedPhases.size >= 3 ? ["0 0 20px #fbbf24", "0 0 50px #f59e0b", "0 0 20px #fbbf24"] : [] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-4xl"
                            >
                                🏛️
                            </motion.div>
                            <p className="text-white/40 text-xs">
                                {completedPhases.size}/5 단계 완료
                            </p>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ width: `${(completedPhases.size / 5) * 100}%` }}
                                    className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Phase Content */}
                    <div className={`bg-gradient-to-br ${currentPhase.color} border ${currentPhase.border} rounded-3xl p-6 md:p-8 min-h-[600px]`}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activePhase}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activePhase === 1 && <Phase1Gratitude />}
                                {activePhase === 2 && <Phase2Affirmations />}
                                {activePhase === 3 && <Phase3Visualization />}
                                {activePhase === 4 && <Phase4Mentors />}
                                {activePhase === 5 && <Phase5Thermometer completedPhases={completedPhases.size} />}
                            </motion.div>
                        </AnimatePresence>

                        {/* Next Phase Button */}
                        {activePhase < 5 && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                onClick={() => handlePhaseSelect(activePhase + 1)}
                                className="mt-8 w-full py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-2xl text-white/70 hover:text-white text-sm font-bold transition-all flex items-center justify-center gap-2"
                            >
                                다음 단계로 →
                                <span className="text-lg">{PHASES[activePhase].emoji}</span>
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
