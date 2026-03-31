"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Plus, Trash2, Sparkles, CheckCircle2, Loader2 } from "lucide-react";

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

const BACKGROUND_OPTIONS = [
    { id: "white", label: "📄 심플 화이트", url: "", color: "#ffffff", textColor: "#2d3748" },
    { id: "starry", label: "🌌 고흐 - 별이 빛나는 밤", url: "https://images.unsplash.com/photo-1541450202166-704dddc43745?w=1080&h=1920&fit=crop", color: "#1e1e2f", textColor: "#ffffff" },
    { id: "monet", label: "🌸 모네 - 수련", url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1080&h=1920&fit=crop", color: "#e8f4f8", textColor: "#2d3748" },
    { id: "frame1", label: "🖼️ 빈티지 골드 액자", url: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1080&h=1920&fit=crop", color: "#fef3c7", textColor: "#451a03" },
    { id: "frame2", label: "🏛️ 클래식 월넛 액자", url: "https://images.unsplash.com/photo-1544411047-c491584222f0?w=1080&h=1920&fit=crop", color: "#451a03", textColor: "#fef3c7" },
    { id: "illus1", label: "🎨 평온한 숲 (힐링)", url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1080&h=1920&fit=crop", color: "#f7fafc", textColor: "#2d3748" },
    { id: "illus2", label: "✨ 우주의 신비 (추상)", url: "https://images.unsplash.com/photo-1464802686167-b939a67e06a1?w=1080&h=1920&fit=crop", color: "#0f172a", textColor: "#f8fafc" },
    { id: "minimal", label: "🐚 미니멀 베이지", url: "https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?w=1080&h=1920&fit=crop", color: "#f5f5dc", textColor: "#333333" },
];

const DOWNLOAD_SIZES = [
    { label: "📱 폰 배경화면", width: 1080, height: 1920 },
    { label: "📄 A4 출력용", width: 2480, height: 3508 },
    { label: "🖼️ A3 포스터", width: 3508, height: 4960 },
];

export default function Phase1Gratitude() {
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [gratitudeList, setGratitudeList] = useState<string[]>([]);
    const [newItem, setNewItem] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [praiseIndex, setPraiseIndex] = useState(0);
    const [showPraise, setShowPraise] = useState(false);
    
    const [selectedBg, setSelectedBg] = useState(BACKGROUND_OPTIONS[0]);
    const [isDownloading, setIsDownloading] = useState(false);

    const addGratitude = () => {
        if (newItem.trim() && gratitudeList.length < 10) {
            const updated = [...gratitudeList, newItem.trim()];
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

    const downloadGratitudeCard = async (width: number, height: number, sizeLabel: string) => {
        setIsDownloading(true);
        try {
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // 1. Background
            if (selectedBg.url) {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.src = selectedBg.url;
                await new Promise((res) => {
                    img.onload = res;
                    img.onerror = res;
                });
                if (img.width > 0) {
                    const scale = Math.max(width / img.width, height / img.height);
                    const x = (width / 2) - (img.width / 2) * scale;
                    const y = (height / 2) - (img.height / 2) * scale;
                    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                } else {
                    ctx.fillStyle = selectedBg.color;
                    ctx.fillRect(0, 0, width, height);
                }
            } else {
                ctx.fillStyle = selectedBg.color;
                ctx.fillRect(0, 0, width, height);
            }

            // 2. Overlay
            ctx.fillStyle = selectedBg.textColor === "#ffffff" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)";
            ctx.fillRect(0, 0, width, height);

            // 3. Card Base
            const margin = width * 0.08;
            const cardW = width - margin * 2;
            const cardH = height - margin * 2;
            ctx.fillStyle = "rgba(255,255,255,0.95)";
            ctx.shadowBlur = 40;
            ctx.shadowColor = "rgba(0,0,0,0.2)";
            ctx.fillRect(margin, margin, cardW, cardH);
            ctx.shadowBlur = 0;

            // 4. Content
            ctx.textAlign = "center";
            ctx.fillStyle = "#1a202c";
            
            ctx.font = `bold ${width * 0.06}px sans-serif`;
            ctx.fillText("✨ 오늘의 감사의 정원 ✨", width / 2, margin + height * 0.08);
            
            ctx.font = `${width * 0.03}px sans-serif`;
            ctx.fillStyle = "#718096";
            const date = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
            ctx.fillText(date, width / 2, margin + height * 0.12);

            ctx.strokeStyle = "#e2e8f0";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(margin + 50, margin + height * 0.15);
            ctx.lineTo(width - margin - 50, margin + height * 0.15);
            ctx.stroke();

            ctx.textAlign = "left";
            ctx.fillStyle = "#2d3748";
            ctx.font = `${width * 0.035}px sans-serif`;
            const startY = margin + height * 0.22;
            const lineGap = height * 0.055;

            gratitudeList.forEach((text, i) => {
                ctx.fillText(`🌿 ${text}`, margin + width * 0.06, startY + i * lineGap);
            });

            ctx.textAlign = "center";
            ctx.font = `bold ${width * 0.025}px sans-serif`;
            ctx.fillStyle = "#A0AEC0";
            ctx.fillText("Temple of Wisdom - Garden of Gratitude", width / 2, height - margin - height * 0.05);

            const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, "image/jpeg", 0.95));
            if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Gratitude_${sizeLabel.replace(/\s+/g, "_")}.jpg`;
                a.click();
                URL.revokeObjectURL(url);
            }
        } catch (e) {
            console.error(e);
            alert("이미지 생성 중 오류가 발생했습니다.");
        } finally {
            setIsDownloading(false);
        }
    };

    const filledCount = gratitudeList.length;

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <div className="text-5xl mb-4">🌺</div>
                <h2 className="text-2xl font-bold text-white">Phase 1: 감사의 정원</h2>
                <p className="text-yellow-200/70 text-sm">매일 감사를 심으면, 신전이 더욱 빛나게 됩니다</p>
            </div>

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
                    <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="absolute -top-2 -right-2">
                        <Sparkles className="text-yellow-400 w-8 h-8 animate-spin" />
                    </motion.div>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-xs text-yellow-200/60">
                    <span>감사 목록 ({filledCount}/10)</span>
                    <span>{filledCount >= 10 ? "완성! 🎉" : `${10 - filledCount}개 더 추가하세요`}</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div animate={{ width: `${(filledCount / 10) * 100}%` }} transition={{ duration: 0.5 }} className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full" />
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                    <Heart size={18} className="text-pink-400" /> 오늘의 감정 상태는?
                </h3>
                <div className="flex flex-wrap gap-3">
                    {MOOD_OPTIONS.map((mood) => (
                        <button
                            key={mood.value} onClick={() => setSelectedMood(mood.value)}
                            className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-all ${selectedMood === mood.value ? "bg-yellow-400/20 border-2 border-yellow-400 scale-110" : "bg-white/5 border border-white/10 hover:border-white/30"}`}
                        >
                            <span className="text-2xl">{mood.emoji}</span>
                            <span className="text-xs text-white/70">{mood.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex gap-2">
                    <input
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addGratitude()}
                        placeholder="오늘 감사한 것을 적거나 아래 예시를 누르세요..."
                        disabled={filledCount >= 10}
                        className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-yellow-400/60 transition-colors disabled:opacity-50 text-sm"
                    />
                    <button onClick={addGratitude} disabled={!newItem.trim() || filledCount >= 10} className="px-4 py-3 bg-yellow-500/80 hover:bg-yellow-500 disabled:opacity-40 rounded-xl text-black font-bold transition-all">
                        <Plus size={20} />
                    </button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {GRATITUDE_EXAMPLES.map((ex, i) => (
                        <button
                            key={i}
                            onClick={() => { if (filledCount < 10) { setGratitudeList(prev => [...prev, ex]); if (gratitudeList.length + 1 >= 10) setIsCompleted(true); } }}
                            className="text-[10px] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-yellow-200 hover:border-yellow-400/40 hover:bg-yellow-400/10 transition-all font-bold"
                        >
                            + {ex.replace("감사합니다.", "")}
                        </button>
                    ))}
                </div>

                <div className="space-y-2">
                    <AnimatePresence>
                        {gratitudeList.map((item, i) => (
                            <motion.div key={item + i} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 20 }} className="flex items-center gap-3 bg-white/5 border border-yellow-400/20 rounded-xl px-4 py-3">
                                <CheckCircle2 size={16} className="text-yellow-400 flex-shrink-0" />
                                <span className="text-white/90 text-sm flex-1">{item}</span>
                                <button onClick={() => removeGratitude(i)} className="text-white/30 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {filledCount > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-br from-yellow-900/30 to-amber-900/20 border border-yellow-400/20 rounded-2xl p-6 space-y-6">
                    <div className="space-y-3">
                        <h3 className="text-white font-bold text-sm tracking-wide">🎨 배경 이미지 선택 (명화/일러스트)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {BACKGROUND_OPTIONS.map(bg => (
                                <button key={bg.id} onClick={() => setSelectedBg(bg)}
                                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${selectedBg.id === bg.id ? "border-yellow-400 bg-yellow-400/20 text-yellow-200" : "border-white/10 bg-white/5 text-white/50 hover:border-white/30"}`}
                                >
                                    {bg.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 space-y-4">
                        <h3 className="text-white font-bold text-sm tracking-wide">🖼️ 감사 카드 미리보기</h3>
                        <div className="flex justify-center">
                            <div className="relative w-full max-w-[260px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/20"
                                style={{ backgroundColor: selectedBg.color, backgroundImage: selectedBg.url ? `url(${selectedBg.url})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <div className={`absolute inset-0 ${selectedBg.textColor === "#ffffff" ? "bg-black/40" : "bg-white/40"} backdrop-blur-[2px]`} />
                                <div className="absolute inset-4 bg-white/90 rounded-lg p-5 flex flex-col items-center shadow-inner">
                                    <h4 className="text-[#1a202c] font-black text-[10px] mb-2 italic">✨ 오늘의 감사의 정원 ✨</h4>
                                    <div className="w-full h-[1px] bg-gray-200 mb-3" />
                                    <div className="space-y-2 w-full flex-1 overflow-y-auto pr-1">
                                        {gratitudeList.map((t, i) => (
                                            <p key={i} className="text-[#2d3748] text-[8px] font-bold flex items-start gap-1 leading-tight">
                                                <span className="text-yellow-600">🌿</span> {t}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="mt-4 text-[6px] text-gray-400 font-extrabold uppercase tracking-widest">Temple of Wisdom</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/10">
                        <h3 className="text-white font-bold text-sm tracking-wide">📥 감사 카드 다운로드 (출력 가이드)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {DOWNLOAD_SIZES.map(s => (
                                <button key={s.label} onClick={() => downloadGratitudeCard(s.width, s.height, s.label)} disabled={isDownloading}
                                    className="px-4 py-3 bg-white/10 hover:bg-yellow-500/80 hover:text-black rounded-xl text-white text-xs font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            <AnimatePresence>
                {showPraise && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-gradient-to-r from-yellow-900/40 to-amber-800/30 border border-yellow-400/30 rounded-2xl p-4 text-sm text-yellow-100/90 italic">
                        {MENTOR_PRAISES[praiseIndex]}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
