"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ArrowRight, Brain, BookMarked, Users, Star, Quote, ChevronRight, Zap, Target, FileText, MousePointer2 } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

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
              <Sparkles size={14} /> Beyond simple learning
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
            영상 시청은 학습이 아닙니다. <br className="hidden md:block"/>
            <span className="text-white">직접 필사하며 당신의 뇌 회로를 물리적으로 재배선하세요.</span>
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
      <section className="py-48 px-6 bg-white text-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 rounded-full text-[10px] font-black tracking-widest uppercase">Philosophy</div>
            <h2 className="text-5xl md:text-6xl font-black leading-[0.95] tracking-tighter">
              왜 영상을 버리고<br/>
              직접 타이핑하는가?
            </h2>
            <p className="text-xl text-black/60 leading-relaxed font-semibold">
              영상을 보는 행위는 뇌를 수동적인 상태로 만듭니다. 우리는 '보기만 하는 가짜 공부'를 거부합니다. 손가락 끝의 근육 감각과 언어 지능이 결합될 때 비로소 잠재의식의 문이 열리고 현실이 바뀝니다.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
               <div className="p-8 bg-black/[0.03] rounded-3xl border border-black/5">
                 <h4 className="text-3xl font-black mb-2">90%</h4>
                 <p className="text-[11px] font-black text-black/30 uppercase tracking-widest">기억 파지 속도</p>
               </div>
               <div className="p-8 bg-black/[0.03] rounded-3xl border border-black/5">
                 <h4 className="text-3xl font-black mb-2">66일</h4>
                 <p className="text-[11px] font-black text-black/30 uppercase tracking-widest">본질적 변화 기간</p>
               </div>
            </div>
          </div>
          <div className="relative aspect-[4/5] bg-black rounded-[3.5rem] overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.2)]">
             <div className="absolute inset-0 flex items-center justify-center">
                <FileText size={180} className="text-white/5 group-hover:scale-110 transition-transform duration-1000" />
             </div>
             <div className="absolute top-12 left-12">
                <MousePointer2 size={32} className="text-white animate-bounce" />
             </div>
             <div className="absolute bottom-12 left-12 right-12 p-10 rounded-[2rem] bg-white text-black">
                <p className="text-lg font-black leading-tight mb-4">
                  "쓰는 것이 곧 존재를 규정한다."
                </p>
                <p className="text-sm font-bold opacity-40 uppercase tracking-widest">Mindset mastery</p>
             </div>
          </div>
        </div>
      </section>

      <Header />
    </div>
  );
}
