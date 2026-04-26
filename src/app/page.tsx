"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ArrowRight, Brain, BookMarked, Users, Star, Quote, ChevronRight, Zap, Target } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white w-full font-sans">
      
      {/* 씬 1: 클린 블랙&화이트 인트로 */}
      <section className="relative h-screen flex flex-col items-center justify-center">
        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black tracking-[0.4em] uppercase mb-8">
              <Sparkles size={14} /> Your subconscious already knows
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.95] mb-8">
              우주마인드스쿨
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-2xl font-bold text-white/60 max-w-2xl leading-relaxed mb-12"
          >
            영상 시청이 아닙니다. 직접 필사하며 뇌 회로를 재배선하세요. <br className="hidden md:block"/>
            <span className="text-white">매일 20분. 30일이면 당신의 현실이 바뀝니다.</span>
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col md:flex-row gap-4 w-full max-w-md"
          >
            <Link href="/training/day1" className="flex-1 py-5 bg-white text-black font-black text-lg rounded-2xl hover:scale-[1.05] transition-all">
              훈련 시작하기
            </Link>
            <Link href="/pricing" className="flex-1 py-5 bg-black border border-white/20 text-white font-black text-lg rounded-2xl hover:bg-white/10 transition-all">
              플랜 확인하기
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 씬 2: 철학 섹션 (Black & White) */}
      <section className="py-32 px-6 bg-white text-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-black leading-tight tracking-tighter">
              왜 직접 손으로<br/>
              타이핑해야 하는가?
            </h2>
            <p className="text-lg text-black/60 leading-relaxed font-semibold">
              많은 이들이 유튜브 영상을 보며 배운다고 착각합니다. 하지만 우리 뇌는 가만히 보는 것만으로는 변화하지 않습니다. 손가락 끝의 신경이 운동 피질을 자극하고, 단어가 뇌리에 박히는 그 순간에만 진정한 성장이 일어납니다.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
               <div className="p-6 bg-black/[0.03] rounded-3xl border border-black/5">
                 <h4 className="text-2xl font-black mb-2">90%</h4>
                 <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">기억 파지 속도</p>
               </div>
               <div className="p-6 bg-black/[0.03] rounded-3xl border border-black/5">
                 <h4 className="text-2xl font-black mb-2">66일</h4>
                 <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">습관 형성 기간</p>
               </div>
            </div>
          </div>
          <div className="relative aspect-square bg-black rounded-[3rem] overflow-hidden group shadow-2xl">
             <div className="absolute inset-0 flex items-center justify-center">
                <Brain size={120} className="text-white/20 group-hover:scale-110 transition-transform duration-1000" />
             </div>
             <div className="absolute bottom-10 left-10 right-10 p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10">
                <p className="text-sm font-bold text-white leading-relaxed">
                  "뇌의 신경 가소성은 오직 반복된 시각-청각-운동의 결합에서만 극대화됩니다."
                </p>
             </div>
          </div>
        </div>
      </section>

      <Header />
    </div>
  );
}
