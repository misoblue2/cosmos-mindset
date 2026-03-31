"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Download, MessageSquareText, Moon, Star, Sun, RefreshCcw } from "lucide-react";

const POSITIVE_FORTUNES = [
    {
        title: "✨ 대기만성(大器晩成)의 황금기",
        content: "현재 겪고 있는 막막함은 어마어마한 재물운과 성공이 터지기 직전 우주가 주는 '액땜'입니다. 큰 그릇은 늦게 완성되듯, 당신의 진짜 전성기는 바로 지금부터 시작됩니다. 의심을 거두고 나아가세요!",
        theme: "from-amber-600 to-yellow-500",
        icon: "🌅"
    },
    {
        title: "✨ 귀인(貴人)을 만나는 사주",
        content: "우주의 기운이 당신을 돕고 있습니다. 조만간 예상치 못한 곳에서 당신을 이끌어줄 귀인을 만나거나 특별한 기회가 찾아올 징조입니다. 지금의 고민은 그 만남을 위한 완벽한 타이밍을 맞추는 중일 뿐입니다.",
        theme: "from-pink-600 to-purple-500",
        icon: "🤝"
    },
    {
        title: "✨ 전화위복(轉禍爲福)의 마법",
        content: "가장 어두운 밤이 지나면 가장 밝은 아침이 오듯, 당신의 고민은 한 달 안에 가장 감사한 경험으로 바뀔 것입니다. 우주가 당신에게 더 크고 좋은 것을 주기 위해 잠시 길을 돌아가게 하는 중입니다.",
        theme: "from-blue-600 to-indigo-500",
        icon: "🦋"
    },
    {
        title: "✨ 만사형통(萬事亨通)의 기운",
        content: "당신이 품고 있는 그 생각, 그 의도는 이미 우주에 닿았습니다. 얽혀있던 매듭이 마법처럼 스르르 풀리며, 원하던 바가 상상 이상의 형태로 이루어집니다. 이미 다 된 일입니다. 편안한 마음으로 축배를 준비하세요!",
        theme: "from-emerald-600 to-teal-500",
        icon: "🍀"
    },
    {
        title: "✨ 무한한 잠재력 폭발",
        content: "스스로를 작게 평가하지 마세요. 당신의 사주에는 남들이 시도조차 못 하는 것을 해내는 거대한 에너지가 숨어있습니다. 지금 당장 작은 행동 하나만 시작해보세요. 생각지도 못한 놀라운 결과가 쏟아질 것입니다.",
        theme: "from-red-600 to-orange-500",
        icon: "🔥"
    },
    {
        title: "✨ 천우신조(天佑神助)",
        content: "보이지 않는 수호천사가 당신을 강하게 보호하고 있습니다. 걱정하고 두려워하던 일들은 기적처럼 흔적도 없이 사라질 것입니다. 모든 것이 당신에게 유리한 방향으로 완벽하게 흘러가고 있습니다.",
        theme: "from-violet-600 to-purple-500",
        icon: "🌟"
    }
];

export default function Phase4Mentors() {
    const [concern, setConcern] = useState("");
    const [isDrawing, setIsDrawing] = useState(false);
    const [fortune, setFortune] = useState<typeof POSITIVE_FORTUNES[0] | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDrawFortune = () => {
        if (!concern.trim()) return;
        setIsDrawing(true);
        setFortune(null);

        // Simulate drawing delay for suspense
        setTimeout(() => {
            const random = POSITIVE_FORTUNES[Math.floor(Math.random() * POSITIVE_FORTUNES.length)];
            setFortune(random);
            setIsDrawing(false);
        }, 2000);
    };

    const resetDraw = () => {
        setConcern("");
        setFortune(null);
    };

    const downloadFortuneCard = async () => {
        if (!fortune) return;
        setIsDownloading(true);

        try {
            const canvas = document.createElement("canvas");
            canvas.width = 1080;
            canvas.height = 1920; 
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Background
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, "#0f172a"); 
            gradient.addColorStop(1, "#1e1b4b"); 
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Stars
            ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
            for (let i = 0; i < 200; i++) {
                ctx.beginPath();
                ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3, 0, Math.PI * 2);
                ctx.fill();
            }

            // Central Card
            const margin = 100;
            const pmWidth = canvas.width - margin * 2;
            const pmHeight = canvas.height - margin * 2;
            
            ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
            ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
            ctx.shadowBlur = 50;
            ctx.shadowOffsetY = 20;
            ctx.fillRect(margin, margin, pmWidth, pmHeight);
            ctx.shadowColor = "transparent";

            // Golden Inner Border
            ctx.strokeStyle = "#D4AF37"; 
            ctx.lineWidth = 6;
            ctx.strokeRect(margin + 30, margin + 30, pmWidth - 60, pmHeight - 60);

            // Icon
            ctx.font = "140px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(fortune.icon, canvas.width/2, margin + 250);

            // Title
            ctx.fillStyle = "#1e293b";
            ctx.font = "bold 65px 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif";
            ctx.fillText(fortune.title, canvas.width/2, margin + 420);

            // Separator
            ctx.beginPath();
            ctx.moveTo(canvas.width/2 - 150, margin + 500);
            ctx.lineTo(canvas.width/2 + 150, margin + 500);
            ctx.strokeStyle = "#D4AF37";
            ctx.lineWidth = 3;
            ctx.stroke();

            // Concern Reference (Italic)
            ctx.font = "italic 40px 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif";
            ctx.fillStyle = "#94a3b8";
            let shortConcern = concern.length > 25 ? concern.substring(0, 25) + "..." : concern;
            ctx.fillText(`"${shortConcern}" 에 대한 우주의 계시`, canvas.width/2, margin + 630);

            // Content Wrap
            ctx.font = "45px 'Pretendard', 'Malgun Gothic', sans-serif";
            ctx.fillStyle = "#334155";
            const words = fortune.content.split(" ");
            let line = "";
            let y = margin + 800;
            const lineHeight = 85;
            const maxWidth = pmWidth - 160;

            for (let i = 0; i < words.length; i++) {
                const testLine = line + words[i] + " ";
                if (ctx.measureText(testLine).width > maxWidth) {
                    ctx.fillText(line, canvas.width / 2, y);
                    line = words[i] + " ";
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, canvas.width / 2, y);

            // Footer
            ctx.font = "bold 35px sans-serif";
            ctx.fillStyle = "#D4AF37";
            ctx.fillText("✨ Temple of Wisdom ✨", canvas.width / 2, canvas.height - margin - 150);

            // Download Trigger
            const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, "image/jpeg", 0.95));
            if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `CosmicFortune.jpg`;
                a.click();
                URL.revokeObjectURL(url);
            }
        } catch (e) {
            console.error(e);
            alert("부적 이미지 저장에 실패했습니다.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <div className="text-5xl mb-4">🔮</div>
                <h2 className="text-2xl font-bold text-white">Phase 4: 우주의 긍정 운세 뽑기</h2>
                <p className="text-indigo-200/70 text-sm">답답한 고민을 적어주세요. 우주가 당신에게 가장 완벽하고 기분 좋은 해답을 내려줍니다.</p>
            </div>

            <AnimatePresence mode="wait">
                {!fortune && !isDrawing ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="space-y-4"
                    >
                        <div className="relative">
                            <MessageSquareText className="absolute top-4 left-4 text-white/30" />
                            <textarea
                                value={concern}
                                onChange={e => setConcern(e.target.value)}
                                placeholder="지금 어떤 고민이나 걱정이 있나요?&#10;예: 새로운 도전을 앞두고 실패할까 봐 너무 두려워요."
                                rows={5}
                                className="w-full bg-white/5 border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white text-[15px] placeholder-white/30 focus:outline-none focus:border-indigo-400/60 resize-none shadow-inner"
                            />
                        </div>
                        <button 
                            onClick={handleDrawFortune} 
                            disabled={!concern.trim()}
                            className="w-full py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/30"
                        >
                            <Sparkles size={22} /> 내 운세와 사주 뽑아보기
                        </button>
                    </motion.div>
                ) : isDrawing ? (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20 px-4 space-y-8"
                    >
                        <div className="relative w-32 h-40">
                            {/* Card Shuffle Animation */}
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ 
                                        rotate: [0, 10, -10, 0], 
                                        y: [0, -20, 0],
                                        x: [0, (i - 1) * 20, 0]
                                    }}
                                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                                    className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-xl border border-white/20 shadow-2xl flex items-center justify-center"
                                >
                                    <Star className="text-white/20 w-12 h-12" />
                                </motion.div>
                            ))}
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-2 tracking-widest animate-pulse">우주의 기운을 읽는 중...</h3>
                            <p className="text-white/50 text-sm">당신을 위한 가장 완벽한 긍정의 메시지를 찾고 있습니다.</p>
                        </div>
                    </motion.div>
                ) : fortune ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="space-y-6"
                    >
                        {/* The Fortune Card */}
                        <div className={`relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br ${fortune.theme} p-1 shadow-2xl`}>
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                            
                            <div className="bg-[#0f172a]/90 backdrop-blur-xl rounded-[2.4rem] p-8 md:p-10 relative z-10 border border-white/10 text-center space-y-6">
                                <div className="text-6xl mb-2 drop-shadow-2xl animate-bounce-slow">
                                    {fortune.icon}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-500">
                                    {fortune.title}
                                </h3>
                                
                                <div className="py-2">
                                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto opacity-50" />
                                </div>

                                <p className="text-white/90 text-lg md:text-xl leading-relaxed font-medium break-keep">
                                    &quot;{fortune.content}&quot;
                                </p>

                                <div className="pt-6 border-t border-white/10 mt-6">
                                    <p className="text-indigo-300/50 text-sm italic">
                                        고민: {concern.length > 20 ? concern.substring(0,20)+"..." : concern}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button 
                                onClick={downloadFortuneCard}
                                disabled={isDownloading}
                                className="flex-1 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-white font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                            >
                                {isDownloading ? (
                                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> 저장 중...</>
                                ) : (
                                    <><Download size={20} /> 부적(행운의 카드)으로 폰에 저장</>
                                )}
                            </button>
                            <button 
                                onClick={resetDraw}
                                className="w-full sm:w-auto px-6 py-4 bg-black/50 hover:bg-black/80 border border-white/5 rounded-2xl text-white/60 hover:text-white font-bold flex items-center justify-center gap-2 transition-all"
                            >
                                <RefreshCcw size={20} />
                            </button>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
}
