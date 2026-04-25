"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, PenTool, Brain, Zap, ChevronDown } from "lucide-react";

// 양자 파티클이 모여드는 시각적 캔버스 효과
const QuantumBookEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: any[] = [];
    for (let i = 0; i < 200; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            targetX: canvas.width / 2,
            targetY: canvas.height / 2 + 50,
        });
    }

    let animationFrameId: number;
    let time = 0;

    const render = () => {
        time++;
        ctx.fillStyle = 'rgba(5, 5, 16, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 중앙에 책 형태의 거대한 빛 (물질화)
        const bookGlow = ctx.createRadialGradient(
            canvas.width/2, canvas.height/2 + 50, 10,
            canvas.width/2, canvas.height/2 + 50, 300 + Math.sin(time*0.05)*50
        );
        bookGlow.addColorStop(0, 'rgba(168, 85, 247, 0.4)');
        bookGlow.addColorStop(0.5, 'rgba(59, 130, 246, 0.1)');
        bookGlow.addColorStop(1, 'rgba(5, 5, 16, 0)');
        
        ctx.fillStyle = bookGlow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 파티클들을 중앙(책)으로 끌어당김
        particles.forEach((p) => {
            const dx = p.targetX - p.x;
            const dy = p.targetY - p.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            // 중앙에 가까워질수록 속도가 빨라지며 빨려들어가는 효과
            if (dist > 50) {
                p.x += dx * 0.01 + p.speedX;
                p.y += dy * 0.01 + p.speedY;
            } else {
                p.x = Math.random() * canvas.width;
                p.y = Math.random() * canvas.height;
            }

            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, 50/dist)})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        animationFrameId = requestAnimationFrame(render);
    };
    render();
    
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />;
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative min-h-screen bg-[#050510] overflow-hidden text-white w-full">
      
      {/* 씬 1: 양자 파티클 인트로 */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <QuantumBookEffect />
        
        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-8"
          >
            <p className="text-purple-400 font-black tracking-[0.5em] text-sm md:text-base uppercase mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
              당신의 잠재의식은 이미 알고 있다
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">
                우주마인드스쿨
              </span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 1, duration: 1 }}
            className="text-xl md:text-3xl font-medium text-white/50 max-w-3xl leading-relaxed mt-6"
          >
            생각을 물질로. 당신의 마인드가 현실의 책이 되는 곳.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 inset-x-0 flex justify-center animate-bounce text-white/30"
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </section>

      {/* 씬 2: 양대 핵심 기능 하이라이트 (출판 / 교육) */}
      <section className="relative z-20 bg-[#050510] py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black mb-6">마인드셋 교육과 자동 출판의 완벽한 결합</h2>
            <p className="text-xl text-white/40">오직 가치토커의 철학을 기반으로 설계된 국내 최초의 통합 플랫폼입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            
            {/* 교육 코스 제안 */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative p-1 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-[3rem] overflow-hidden hover:from-blue-500/50 hover:to-purple-500/50 transition-all duration-500"
            >
              <div className="h-full bg-[#0a0a1a] p-12 md:p-16 rounded-[2.9rem] flex flex-col">
                <Brain className="w-16 h-16 text-blue-400 mb-8" />
                <h3 className="text-3xl font-black mb-4">마인드셋 코스 수강 🚀</h3>
                <p className="text-lg text-white/50 mb-12 flex-1 leading-relaxed">
                  유튜브 영상을 넘어선 압도적인 깊이. 조셉 머피, 네빌 고다드 등 10명의 세계적인 거장들의 철학을 바탕으로 AI가 즉시 생성한 200페이지의 신경 필사 워크북을 통해 뇌 회로를 완전히 재배선합니다.
                </p>
                <Link href="/school" className="inline-flex items-center justify-between w-full p-6 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-2xl font-black text-xl transition-all border border-blue-500/20 group-hover:border-blue-400/50">
                  코스 입장하기 <ArrowRight />
                </Link>
              </div>
            </motion.div>

            {/* 자가 출판 제안 */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative p-1 bg-gradient-to-br from-amber-500/30 to-orange-500/30 rounded-[3rem] overflow-hidden hover:from-amber-500/50 hover:to-orange-500/50 transition-all duration-500"
            >
              <div className="h-full bg-[#0a0a1a] p-12 md:p-16 rounded-[2.9rem] flex flex-col">
                <PenTool className="w-16 h-16 text-amber-400 mb-8" />
                <h3 className="text-3xl font-black mb-4">나만의 책 출판하기 ✍️</h3>
                <p className="text-lg text-white/50 mb-12 flex-1 leading-relaxed">
                  작성하신 초안 원고만 업로드하세요. 우주마인드스쿨의 AI 고스트라이터가 가치토커 특유의 확언을 더해 200페이지 분량으로 채우고, 교보문고와 부크크에 즉시 등록 가능한 출판용 파일 3종을 자동 생성합니다.
                </p>
                <Link href="/my-book" className="inline-flex items-center justify-between w-full p-6 bg-amber-600/10 hover:bg-amber-600/20 text-amber-400 rounded-2xl font-black text-xl transition-all border border-amber-500/20 group-hover:border-amber-400/50">
                  출판 시스템 열기 <ArrowRight />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 씬 3: PDF 전자책 스토어 미리보기 */}
      <section className="relative z-20 bg-white/[0.02] py-24 border-t border-white/5">
         <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-black mb-4">우주서재 (PDF Store)</h2>
            <p className="text-white/40 mb-12">가치토커의 영상 철학이 200페이지의 워크북 실물책으로 물질화된 곳입니다.</p>
            
            <div className="flex justify-center mb-12">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                  {/* 단행본 목업 */}
                  {["잠재의식의 비밀", "양자도약 마인드", "끌어당김 실전 워크북"].map((book, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left hover:border-purple-500/50 transition-all">
                       <div className="h-40 bg-gradient-to-br from-purple-600/50 to-indigo-900/50 rounded-xl mb-4 flex items-center justify-center">
                          <BookOpen className="text-white/30" size={40} />
                       </div>
                       <h4 className="font-bold mb-2">{book}</h4>
                       <p className="text-white/40 text-xs">A5 실물 규격 / 200페이지 PDF 전자책</p>
                    </div>
                  ))}
               </div>
            </div>

            <Link href="/pdf-store" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-bold transition-all">
               우주서재 전체보기 <ArrowRight size={16} />
            </Link>
         </div>
      </section>

      <footer className="relative z-20 py-12 text-center border-t border-white/10 bg-[#020205]">
        <p className="text-white/20 text-xs font-bold tracking-widest uppercase">
          © 2025 우주마인드스쿨 | Cosmic Mindset School
        </p>
      </footer>
    </div>
  );
}
