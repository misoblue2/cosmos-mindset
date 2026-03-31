"use client";

import { motion } from "framer-motion";
import { MessageCircle, Copy, CheckCircle2, Share2, Sparkles, Award } from "lucide-react";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function Phase5Thermometer({ completedPhases }: { completedPhases?: number }) {
    const [isCopied, setIsCopied] = useState(false);
    const [canNativeShare, setCanNativeShare] = useState(false);

    useEffect(() => {
        // Check if Web Share API is available
        if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
            setCanNativeShare(true);
        }
        
        // Trigger celebration confetti on mount
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FCD34D', '#FDE68A', '#ffffff']
            });
        }, 500);
    }, []);

    const todayDate = new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' }).format(new Date());

    const summaryText = `✨ [지혜의 신전] 오늘의 긍정 마인드 충전 완료! ✨

📅 일시: ${todayDate}
🌡️ 마음 온도: 100°C (열정 최고조🔥)

당신은 오늘 지혜의 신전에서 다음과 같은 위대한 작업을 완수했습니다:
✅ 1. 감사의 정원: 내면의 평화를 다졌습니다.
✅ 2. 성공의 주파수: 나만의 긍정 확언을 새겼습니다.
✅ 3. 꿈의 캔버스: 부와 성공의 시각화를 완료했습니다.
✅ 4. 우주의 계시: 대기만성과 만사형통의 행운을 뽑았습니다.

🌟 "당신의 생각이 현실을 창조합니다. 오늘은 가장 빛나는 하루가 될 것입니다."

우주의 기운이 당신과 함께합니다. 늘 자신을 믿으세요! 🚀
- 상상학교 지혜의 신전 -`;

    const handleShare = async () => {
        if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
            try {
                await navigator.share({
                    title: '지혜의 신전 긍정 충전 요약',
                    text: summaryText,
                });
            } catch (err) {
                console.log('공유 취소됨 또는 실패', err);
            }
        } else {
            handleCopy();
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(summaryText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="text-center space-y-2 relative z-10">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="text-6xl mb-4 inline-block drop-shadow-2xl"
                >
                    🏅
                </motion.div>
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 pb-1">
                    퍼펙트 데이 달성!
                </h2>
                <p className="text-yellow-100/80 text-sm">
                    오늘의 긍정 마인드 충전을 성공적으로 마쳤습니다.
                </p>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-b from-[#1a1c29]/90 to-[#0f111a]/90 backdrop-blur-xl border border-yellow-500/30 rounded-[2.5rem] p-6 md:p-10 shadow-[0_0_50px_rgba(234,179,8,0.15)] relative overflow-hidden"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Sparkles className="w-32 h-32 text-yellow-400" />
                </div>
                
                <div className="relative z-10 space-y-8">
                    <div className="flex items-center justify-between border-b border-white/10 pb-6">
                        <div>
                            <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">RECORD OF SUCCESS</p>
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Award className="text-yellow-400" /> 오늘의 긍정 마인드 요약본
                            </h3>
                        </div>
                        <div className="text-right">
                            <p className="text-white/40 text-xs">{todayDate}</p>
                            <p className="text-yellow-400 font-bold text-lg">심박수: 100°C 🔥</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-green-400 mt-0.5" size={20} shrink-0 />
                                <div>
                                    <h4 className="text-white font-bold text-sm">마음의 평화와 결단</h4>
                                    <p className="text-white/60 text-xs mt-1">감사의 주파수를 맞추고 과거의 짐을 내려놓았습니다.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-green-400 mt-0.5" size={20} shrink-0 />
                                <div>
                                    <h4 className="text-white font-bold text-sm">성공의 시각화 완수</h4>
                                    <p className="text-white/60 text-xs mt-1">부와 행복이 가득한 비전보드로 미래를 명확히 그렸습니다.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-green-400 mt-0.5" size={20} shrink-0 />
                                <div>
                                    <h4 className="text-white font-bold text-sm">우주의 무한한 지지</h4>
                                    <p className="text-white/60 text-xs mt-1">대기만성의 거대한 행운과 긍정의 메시지를 수신했습니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-500/10 to-transparent p-5 rounded-2xl border-l-4 border-yellow-400">
                        <p className="text-yellow-200/90 text-sm leading-relaxed italic font-medium">
                            "당신의 무한한 잠재력은 이미 깨어났습니다. 내일도 긍정의 주파수로 세상을 호령하시길 바랍니다."
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
            >
                {canNativeShare ? (
                    <button 
                        onClick={handleShare}
                        className="flex-1 py-5 bg-[#FEE500] hover:bg-[#FEE500]/90 text-black font-black text-lg rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 cursor-pointer"
                    >
                        <MessageCircle size={24} className="text-[#3A1D1D]" /> 
                        카카오톡으로 요약 전송하기
                    </button>
                ) : (
                    <button 
                        onClick={handleShare}
                        className="flex-1 py-5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-[1.02] text-white font-black text-lg rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer"
                    >
                        <Share2 size={22} /> 기기 공유 메뉴 열기
                    </button>
                )}
                
                <button 
                    onClick={handleCopy}
                    className="w-full sm:w-auto px-8 py-5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                    {isCopied ? <><CheckCircle2 size={20} className="text-green-400" /> 복사됨</> : <><Copy size={20} /> 텍스트 복사</>}
                </button>
            </motion.div>

            <div className="text-center pt-8">
               <button onClick={() => window.location.href = "/"} className="text-white/40 hover:text-white text-sm font-semibold transition-colors underline underline-offset-4">
                   메인 홀로 돌아가기
               </button>
            </div>
        </div>
    );
}
