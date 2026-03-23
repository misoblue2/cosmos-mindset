"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Plus, Trash2, Sparkles, CheckCircle2 } from "lucide-react";

const MOOD_OPTIONS = [
    { emoji: "😞", label: "힘들어요", value: 1 },
    { emoji: "😕", label: "우울해요", value: 2 },
    { emoji: "😐", label: "보통이에요", value: 3 },
    { emoji: "🙂", label: "괜찮아요", value: 4 },
    { emoji: "😊", label: "좋아요", value: 5 },
    { emoji: "🤩", label: "최고예요!", value: 6 },
];

const GRATITUDE_EXAMPLES = [
    "오늘 따뜻한 햇빛을 느낄 수 있어서 감사합니다.",
    "건강하게 하루를 시작할 수 있어서 감사합니다.",
    "나를 사랑해주는 사람들이 있어서 감사합니다.",
    "배우고 성장할 기회가 있어서 감사합니다.",
    "맛있는 음식을 먹을 수 있어서 감사합니다.",
];

const MENTOR_PRAISES = [
    "🌟 소크라테스: 자신을 아는 것이 모든 지혜의 시작입니다. 당신은 이미 그 길을 걷고 있어요!",
    "🌸 법정스님: 작은 것에서 큰 행복을 찾아내는 당신의 눈이 아름답습니다.",
    "💫 에크하르트 톨레: 지금 이 순간에 감사하는 것, 그것이 바로 깨달음의 시작입니다.",
    "🔥 밥 프록터: 감사하는 마음은 풍요를 끌어당기는 가장 강력한 자석입니다!",
    "✨ 론다 번: 감사는 당신의 인생을 즉시 바꾸어 놓는 마법의 열쇠입니다.",
];

export default function Phase1Gratitude() {
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [gratitudeList, setGratitudeList] = useState<string[]>([""]);
    const [newItem, setNewItem] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [praiseIndex, setPraiseIndex] = useState(0);
    const [showPraise, setShowPraise] = useState(false);

    const addGratitude = () => {
        if (newItem.trim() && gratitudeList.filter(g => g).length < 10) {
            const updated = [...gratitudeList.filter(g => g), newItem.trim()];
            setGratitudeList(updated);
            setNewItem("");
            setPraiseIndex(Math.floor(Math.random() * MENTOR_PRAISES.length));
            setShowPraise(true);
            setTimeout(() => setShowPraise(false), 4000);
            if (updated.length >= 10) setIsCompleted(true);
        }
    };

    const removeGratitude = (index: number) => {
        setGratitudeList(prev => prev.filter((_, i) => i !== index));
        if (isCompleted) setIsCompleted(false);
    };

    const filledCount = gratitudeList.filter(g => g).length;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="text-5xl mb-4">🌺</div>
                <h2 className="text-2xl font-bold text-white">Phase 1: 감사의 정원</h2>
                <p className="text-yellow-200/70 text-sm">매일 감사를 심으면, 신전이 더욱 빛나게 됩니다</p>
            </div>

            {/* Temple Glow Animation */}
            <div className="relative flex justify-center">
                <motion.div
                    animate={{
                        boxShadow: isCompleted
                            ? ["0 0 20px #fbbf24", "0 0 80px #f59e0b", "0 0 20px #fbbf24"]
                            : filledCount > 0
                                ? [`0 0 ${filledCount * 4}px rgba(251,191,36,0.4)`]
                                : ["0 0 0px transparent"],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-600/30 to-amber-400/20 border border-yellow-400/40 flex items-center justify-center"
                >
                    <span className="text-4xl">{isCompleted ? "🏛️" : "🕌"}</span>
                </motion.div>
                {isCompleted && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -top-2 -right-2"
                    >
                        <Sparkles className="text-yellow-400 w-8 h-8 animate-spin" />
                    </motion.div>
                )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="flex justify-between text-xs text-yellow-200/60">
                    <span>감사 목록 ({filledCount}/10)</span>
                    <span>{filledCount >= 10 ? "완성! 🎉" : `${10 - filledCount}개 더 추가하세요`}</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        animate={{ width: `${(filledCount / 10) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full"
                    />
                </div>
            </div>

            {/* Mood Check */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                    <Heart size={18} className="text-pink-400" />
                    오늘의 감정 상태는?
                </h3>
                <div className="flex flex-wrap gap-3">
                    {MOOD_OPTIONS.map((mood) => (
                        <button
                            key={mood.value}
                            onClick={() => setSelectedMood(mood.value)}
                            className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-all ${selectedMood === mood.value
                                    ? "bg-yellow-400/20 border-2 border-yellow-400 scale-110"
                                    : "bg-white/5 border border-white/10 hover:border-white/30"
                                }`}
                        >
                            <span className="text-2xl">{mood.emoji}</span>
                            <span className="text-xs text-white/70">{mood.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Gratitude Examples */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">💡 감사 예시 (참고하세요)</h3>
                <div className="space-y-2">
                    {GRATITUDE_EXAMPLES.map((example, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2 text-sm text-yellow-100/60 cursor-pointer hover:text-yellow-100/90 transition-colors"
                            onClick={() => setNewItem(example)}
                        >
                            <span className="text-yellow-400 mt-0.5">✦</span>
                            <span>{example}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Gratitude Input */}
            <div className="space-y-3">
                <div className="flex gap-2">
                    <input
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addGratitude()}
                        placeholder="오늘 감사한 것을 적어보세요..."
                        disabled={filledCount >= 10}
                        className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/60 transition-colors disabled:opacity-50 text-sm"
                    />
                    <button
                        onClick={addGratitude}
                        disabled={!newItem.trim() || filledCount >= 10}
                        className="px-4 py-3 bg-yellow-500/80 hover:bg-yellow-500 disabled:opacity-40 rounded-xl text-black font-bold transition-all"
                    >
                        <Plus size={20} />
                    </button>
                </div>

                {/* List */}
                <div className="space-y-2">
                    <AnimatePresence>
                        {gratitudeList.filter(g => g).map((item, i) => (
                            <motion.div
                                key={item + i}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex items-center gap-3 bg-white/5 border border-yellow-400/20 rounded-xl px-4 py-3"
                            >
                                <CheckCircle2 size={16} className="text-yellow-400 flex-shrink-0" />
                                <span className="text-white/90 text-sm flex-1">{item}</span>
                                <button onClick={() => removeGratitude(i)} className="text-white/30 hover:text-red-400 transition-colors">
                                    <Trash2 size={14} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Mentor Praise */}
            <AnimatePresence>
                {showPraise && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-gradient-to-r from-yellow-900/40 to-amber-800/30 border border-yellow-400/30 rounded-2xl p-4 text-sm text-yellow-100/90 italic"
                    >
                        {MENTOR_PRAISES[praiseIndex]}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Completion Message */}
            {isCompleted && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center bg-gradient-to-br from-yellow-500/20 to-amber-400/10 border border-yellow-400/40 rounded-2xl p-6 space-y-2"
                >
                    <div className="text-4xl">🏛️✨</div>
                    <p className="text-yellow-300 font-bold text-lg">지혜의 신전이 밝게 빛납니다!</p>
                    <p className="text-yellow-100/60 text-sm">10가지 감사를 모두 완성했습니다. 오늘 하루도 풍요롭게 될 것입니다.</p>
                </motion.div>
            )}
        </div>
    );
}
