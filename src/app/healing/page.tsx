"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, ChevronLeft, Sparkles, Loader2, Download, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

const HEALING_BG_OPTIONS = [
    { id: "paper1", label: "📜 고전 명화", url: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=1600&fit=crop", color: "#f3e5ab", textColor: "#ffffff" },
    { id: "night", label: "🌌 우주 일러스트", url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&fit=crop", color: "#0c1445", textColor: "#ffffff" },
    { id: "flower", label: "🌸 인상주의 정원", url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1600&fit=crop", color: "#fff0f5", textColor: "#ffffff" },
    { id: "nature", label: "🌿 풍경화의 미학", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&fit=crop", color: "#e8f5e9", textColor: "#ffffff" },
    { id: "minimal", label: "🐚 추상 화원", url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1600&fit=crop", color: "#f5f5dc", textColor: "#ffffff" },
];

const DOWNLOAD_SIZES = [
    { label: "📱 모바일 배경화면", width: 1080, height: 1920 },
    { label: "⬛ 정사각 공유용 (1:1)", width: 1080, height: 1080 },
];

export default function HealingPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [story, setStory] = useState("");
    const [reply, setReply] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [step, setStep] = useState(0);
    const [selectedBg, setSelectedBg] = useState(HEALING_BG_OPTIONS[0]);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const analyzeSteps = [
        "마음의 소리에 귀 기울이는 중...",
        "당신의 감정을 깊이 공감하고 있습니다...",
        "과거의 기억을 따뜻하게 어루만지는 중...",
        "진심 어린 위로의 문장을 고르는 중...",
        "지혜의 신전에서 답장을 준비 중..."
    ];

    const handleSend = async () => {
        if (!story.trim()) return;
        setIsAnalyzing(true);
        setReply("");
        
        for (let i = 0; i < analyzeSteps.length; i++) {
            setStep(i);
            await new Promise(r => setTimeout(r, 1500));
        }

        const responses = [
            "보내주신 사연에서 당신의 깊은 진심이 느껴집니다. 그동안 얼마나 애써오셨을지 감히 짐작해봅니다. 지금 이 순간, 당신의 마음이 조금이나마 편안해지기를 바랍니다. 당신은 충분히 잘해왔고, 앞으로도 그럴 것입니다.",
            "당신의 이야기를 들으니 제 마음도 따뜻해집니다. 힘든 시간 속에서도 희망을 잃지 않으려는 당신의 모습이 정말 아름답습니다. 우주는 언제나 당신의 행복을 지지하고 있다는 사실을 잊지 마세요.",
            "누구에게도 말하지 못했던 그 감정들을 용기 내어 적어주셔서 감사합니다. 글을 적는 것만으로도 치유는 이미 시작되었습니다. 당신은 혼자가 아닙니다. 지혜의 신전이 당신의 안식을 기원합니다."
        ];
        
        setReply(responses[Math.floor(Math.random() * responses.length)]);
        setIsAnalyzing(false);
    };

    const downloadLetter = async (width: number, height: number, label: string) => {
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
                await new Promise(res => { img.onload = res; img.onerror = res; });
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

            // 2. Overlay for readability
            ctx.fillStyle = selectedBg.textColor === "#ffffff" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)";
            ctx.fillRect(0, 0, width, height);

            // 3. Paper Overlay
            const margin = width * 0.1;
            const paperW = width - margin * 2;
            const paperH = height - margin * 2;
            ctx.fillStyle = "rgba(255,255,255,0.95)";
            ctx.shadowBlur = 30;
            ctx.shadowColor = "rgba(0,0,0,0.15)";
            ctx.fillRect(margin, margin, paperW, paperH);

            // 4. Content
            ctx.textAlign = "center";
            ctx.fillStyle = "#1a202c";
            ctx.font = `bold ${width * 0.05}px sans-serif`;
            ctx.fillText("✉️ 당신에게 도착한 따뜻한 위로 ✉️", width / 2, margin + height * 0.08);

            ctx.font = `italic ${width * 0.03}px sans-serif`;
            ctx.fillStyle = "#A0AEC0";
            ctx.fillText(new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }), width / 2, margin + height * 0.12);

            // Wrap Text Logic
            const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
                const words = text.split("");
                let line = "";
                for (let n = 0; n < words.length; n++) {
                    const testLine = line + words[n];
                    const metrics = ctx.measureText(testLine);
                    if (metrics.width > maxWidth && n > 0) {
                        ctx.fillText(line, x, y);
                        line = words[n];
                        y += lineHeight;
                    } else {
                        line = testLine;
                    }
                }
                ctx.fillText(line, x, y);
                return y;
            };

            ctx.textAlign = "center";
            ctx.fillStyle = "#2d3748";
            ctx.font = `${width * 0.035}px 'Malgun Gothic', sans-serif`;
            wrapText(reply, width / 2, margin + height * 0.25, paperW * 0.8, height * 0.06);

            ctx.font = `bold ${width * 0.025}px sans-serif`;
            ctx.fillStyle = "#CBD5E0";
            ctx.fillText("Temple of Wisdom - Memory Mailbox", width / 2, height - margin - height * 0.05);

            const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, "image/jpeg", 0.95));
            if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Healing_Letter_${label.replace(/\s+/g, "_")}.jpg`;
                a.click();
                URL.revokeObjectURL(url);
            }
        } catch (e) {
            console.error(e);
            alert("다운로드 중 오류가 발생했습니다.");
        } finally {
            setIsDownloading(false);
        }
    };

    if (!isMounted) return <div className="min-h-screen bg-[#050510]" />;

    return (
        <div className="relative min-h-screen text-white selection:bg-indigo-500/30 font-sans pb-20 transition-all duration-1000 overflow-x-hidden">
            {/* Full-page Background Layer */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedBg.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="fixed inset-0 z-0 pointer-events-none"
                >
                    <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${selectedBg.url})` }}
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                </motion.div>
            </AnimatePresence>

            {/* Nav */}
            <div className="max-w-4xl mx-auto p-6 flex items-center justify-between relative z-50">
                <Link href="/temple" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-bold group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 지혜의 신전 로비
                </Link>
                <div className="text-xs font-bold bg-white/5 px-4 py-2 rounded-full border border-white/10 uppercase tracking-widest text-indigo-300">
                    Memory Mailbox
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 space-y-12 py-10">
                {/* Header */}
                <div className="text-center space-y-4">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="inline-block p-4 rounded-[2.5rem] bg-indigo-500/10 border border-indigo-500/20 mb-4 shadow-2xl">
                        <Mail size={48} className="text-indigo-400" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">추억의 우체통</h1>
                    <p className="text-gray-400 leading-relaxed font-medium">당신만 아는 소중한 기억, 혹은 묻어둔 고민을 적어주세요.<br/>지혜의 신전이 당신을 위한 따뜻한 답장을 보내드립니다.</p>
                </div>

                {/* Input Section */}
                {!reply && !isAnalyzing && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <textarea
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
                            placeholder="이곳에 당신의 사연을 자유롭게 적어보세요..."
                            className="w-full h-64 bg-white/5 border border-white/10 rounded-[2rem] p-8 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 transition-all resize-none text-lg leading-relaxed shadow-inner"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!story.trim()}
                            className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white font-black rounded-3xl shadow-[0_20px_40px_rgba(79,70,229,0.3)] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 text-lg"
                        >
                            <Send size={20} /> 신전에 편지 보내기
                        </button>
                    </motion.div>
                )}

                {/* Loading State */}
                {isAnalyzing && (
                    <div className="text-center space-y-10 py-20">
                        <div className="relative inline-block">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-24 h-24 border-t-4 border-indigo-500 rounded-full" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Sparkles size={32} className="text-indigo-400 animate-pulse" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 italic">{analyzeSteps[step]}</p>
                            <p className="text-white/20 text-xs uppercase tracking-widest font-black">AI Emotion Analysis In Progress</p>
                        </div>
                    </div>
                )}

                {/* Reply Section */}
                {reply && (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 relative z-10">
                        <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[4rem] p-12 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                           <div className="absolute -top-24 -right-24 p-8 opacity-10 group-hover:opacity-20 transition-all duration-700 blur-2xl">
                               <Sparkles size={300} className="text-white" />
                           </div>
                            
                            <div className="flex flex-col items-center text-center space-y-10">
                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="px-6 py-2 bg-white/20 rounded-full border border-white/30 text-[10px] uppercase tracking-[0.4em] font-black text-white/80"
                                >
                                    Divine Message from the Stars
                                </motion.div>

                                <motion.p 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-2xl md:text-3xl leading-[1.8] font-bold text-white drop-shadow-xl font-serif"
                                >
                                    &quot;{reply}&quot;
                                </motion.p>

                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    className="w-16 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" 
                                />

                                <div className="flex flex-col items-center gap-4">
                                    <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]">— Your Cosmic Guide</p>
                                    <button 
                                        onClick={() => { setStory(""); setReply(""); }} 
                                        className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                                    >
                                        새로운 사연 적기
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Download Options */}
                        <div className="bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 space-y-10 shadow-2xl">
                            <div className="space-y-6">
                                <h3 className="text-white/80 font-black text-xs tracking-[0.3em] flex items-center justify-center gap-3 uppercase">
                                    <ImageIcon size={16} className="text-indigo-400" /> 배경 이미지 테마 선택
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                    {HEALING_BG_OPTIONS.map(bg => (
                                        <button key={bg.id} onClick={() => setSelectedBg(bg)}
                                            className={`px-4 py-3 rounded-2xl text-[10px] font-black transition-all border ${selectedBg.id === bg.id ? "border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"}`}
                                        >
                                            {bg.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Letter Preview */}
                            <div className="pt-6 border-t border-white/10 space-y-4">
                                <h3 className="text-white font-bold text-sm tracking-wide">🖼️ 편지 이미지 미리보기</h3>
                                <div className="flex justify-center scale-90 md:scale-100 origin-top">
                                    <div className="relative w-full max-w-[260px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/20"
                                        style={{ backgroundColor: selectedBg.color, backgroundImage: selectedBg.url ? `url(${selectedBg.url})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                        <div className={`absolute inset-0 ${selectedBg.textColor === "#ffffff" ? "bg-black/40" : "bg-white/40"} backdrop-blur-[1px]`} />
                                        <div className="absolute inset-4 bg-white/95 rounded-lg p-6 flex flex-col items-center shadow-inner">
                                            <h4 className="text-[#1a202c] font-black text-[9px] mb-3 italic">✉️ 당신을 위한 따뜻한 위로 ✉️</h4>
                                            <div className="w-full h-[1px] bg-gray-200 mb-4" />
                                            <div className="flex-1 flex items-center justify-center">
                                                <p className="text-[#2d3748] text-[9px] font-medium leading-relaxed italic text-center px-2">
                                                    &quot;{reply}&quot;
                                                </p>
                                            </div>
                                            <div className="mt-4 text-[6px] text-gray-400 font-extrabold uppercase tracking-widest italic opacity-50">Temple of Wisdom</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-3">
                                {DOWNLOAD_SIZES.map(s => (
                                    <button key={s.label} onClick={() => downloadLetter(s.width, s.height, s.label)} disabled={isDownloading}
                                        className="py-4 bg-white/10 hover:bg-indigo-500 hover:text-white rounded-2xl text-white text-xs font-black transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                                        {s.label} 저장
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
