"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";

export default function Home() {
  const [stars, setStars] = useState<{ id: number; style: { top: string; left: string }; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      style: { top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` },
      size: Math.random() * 4 + 2,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
    }));
    setStars(newStars);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-center items-center text-center">
      {/* Background with Cosmic Image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 40, repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full bg-[url('/images/cosmic_main_hero.png')] bg-cover bg-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
      </div>

      {/* Floating Stars Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: -50 }}
            transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
            className="absolute text-yellow-100"
            style={star.style}
          >
            <Star size={star.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 max-w-5xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/80 text-sm font-light tracking-widest uppercase">
            <Sparkles size={14} className="text-purple-300" />
            <span>Cosmic Mind Universe</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-pink-200 font-serif leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            Starting<br />Infinite Possibilities
          </h1>

          <p className="text-lg md:text-2xl text-stone-300 font-light max-w-2xl mx-auto leading-relaxed">
            꿈과 환상, 그리고 새로운 시작.<br />
            당신의 무한한 가능성이 열리는 문 앞에 서 있습니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Link href="/pricing" className="group relative px-8 py-4 bg-gradient-to-r from-purple-500/30 to-blue-500/30 backdrop-blur-md border border-purple-400/40 rounded-full overflow-hidden hover:from-purple-500/40 hover:to-blue-500/40 transition-all shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-3 text-white font-black tracking-wide">
              💳 긍정마인드셋 학교 입학하기 <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link href="/imagination" className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full overflow-hidden hover:bg-white/20 transition-all">
            <span className="relative flex items-center gap-3 text-white font-medium tracking-wide">
              🚀 상상학교 무료 체험 <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <div className="flex gap-4 items-center">
            <Link href="/graduation" className="text-amber-300 hover:text-amber-200 transition-colors font-bold text-sm tracking-wide">
              🎓 졸업장 발급
            </Link>
            <span className="text-white/10">|</span>
            <Link href="/shop" className="text-stone-400 hover:text-white transition-colors font-light text-sm tracking-widest uppercase">
              Shop
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-0 w-full text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.3em]">Designed by Cosmic Mind</p>
      </div>
    </div>
  );
}
