"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, PenTool, Brain, Zap, ChevronDown, Trophy, Heart } from "lucide-react";

// 양자 파티클이 모여드는 시각적 캔버스 효과 (v2.0 골드 테마 반영)
const QuantumMindEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: any[] = [];
    const bookWidth = 300;
    const bookHeight = 400;

    for (let i = 0; i < 400; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 1.5,
            speedY: (Math.random() - 0.5) * 1.5,
            // 책 형태의 랜덤 구역을 타겟으로 설정
            targetX: (canvas.width / 2 - bookWidth / 2) + Math.random() * bookWidth,
            targetY: (canvas.height / 2 - bookHeight / 2) + Math.random() * bookHeight,
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    let animationFrameId: number;
    let time = 0;

    const render = () => {
        time++;
        ctx.fillStyle = 'rgba(7, 7, 15, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 중앙에 황금빛 에너지 (잠재의식/뇌 구체)
        const centerGlow = ctx.createRadialGradient(
            canvas.width/2, canvas.height/2, 5,
            canvas.width/2, canvas.height/2, 350 + Math.sin(time*0.04)*40
        );
        centerGlow.addColorStop(0, 'rgba(200, 168, 75, 0.15)');
        centerGlow.addColorStop(1, 'rgba(7, 7, 15, 0)');
        
        ctx.fillStyle = centerGlow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
            const dx = p.targetX - p.x;
            const dy = p.targetY - p.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            // 물질화 효과: 타겟으로 부드럽게 수렴
            p.x += dx * 0.02 + p.speedX;
            p.y += dy * 0.02 + p.speedY;

            // 경계면에서 은은하게 반짝임
            const drawOpacity = dist < 50 ? p.opacity * (dist/50) : p.opacity;

            ctx.fillStyle = `rgba(200, 168, 75, ${drawOpacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            // 가끔씩 원래 위치로 튕겨나가게 하여 변화 무쌍한 양자 상태 표현
            if (Math.random() < 0.001) {
                p.x = Math.random() * canvas.width;
                p.y = Math.random() * canvas.height;
            }
        });
        
        animationFrameId = requestAnimationFrame(render);
    };
    render();
    
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-50" />;
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative min-h-screen bg-[#07070f] overflow-hidden text-white w-full font-sans">
      
      {/* 씬 1: 코스믹마인드 하이엔드 인트로 */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <QuantumMindEffect />
        
        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c8a84b]/10 border border-[#c8a84b]/20 text-[#c8a84b] text-[10px] font-black tracking-[0.4em] uppercase mb-8 shadow-[0_0_20px_rgba(200,168,75,0.1)]">
              <Sparkles size={14} /> Your subconscious already knows
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.95] mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                COSMIC
              </span>
              <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8a84b] via-[#ffd700] to-[#c8a84b] drop-shadow-[0_0_30px_rgba(200,168,75,0.4)]">
                MINDSET
              </span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 1, duration: 1 }}
            className="text-lg md:text-2xl font-bold text-white/40 max-w-2xl leading-relaxed mb-12"
          >
            읽고 보는 교육은 잊혀집니다. <br className="hidden md:block"/>
            직접 타이핑하며 뇌 회로를 물리적으로 재배선하세요.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col md:flex-row gap-4 w-full max-w-md"
          >
            <Link href="/training/day1" className="flex-1 py-5 bg-[#c8a84b] text-black font-black text-lg rounded-2xl hover:scale-[1.05] transition-all shadow-[0_0_50px_rgba(200,168,75,0.3)]">
              무료 체험 시작
            </Link>
            <Link href="/pricing" className="flex-1 py-5 bg-white/5 border border-white/10 text-white font-black text-lg rounded-2xl hover:bg-white/10 transition-all">
              플랜 확인하기
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 text-white/20"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* 씬 2: 왜 코스믹마인드인가? (철학) */}
      <section className="relative z-20 py-48 bg-[#07070f] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
             <div className="lg:w-1/2 space-y-8">
                <span className="text-[#c8a84b] font-black tracking-widest text-sm uppercase">Mission Statement</span>
                <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">
                  우리는 단순한 <br/>
                  강의 플랫폼이 아닙니다.
                </h2>
                <p className="text-white/50 text-lg leading-relaxed max-w-xl">
                  손끝 신경 각인 방식으로 뇌 회로를 물리적으로 재배선하는 인간 개조 훈련소입니다.
                  직접 타이핑하면 운동, 언어, 시각 피질이 동시에 점화되어 장기 기억 회로가 형성됩니다.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-8 text-center md:text-left">
                   <div>
                     <div className="text-3xl font-black text-[#c8a84b] mb-1">20min</div>
                     <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">일일 루틴 시간</div>
                   </div>
                   <div>
                     <div className="text-3xl font-black text-[#c8a84b] mb-1">30 Days</div>
                     <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">뇌 회로 고착 기간</div>
                   </div>
                </div>
             </div>
             
             <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: <Brain />, title: "신경 필사 기술", desc: "오타 시 다음 문장 잠금, 강제 각인 시스템" },
                  { icon: <Zap />, title: "432Hz 주파수", desc: "세포 진동을 안정시키는 힐링 사운드 세션" },
                  { icon: <Heart />, title: "감사 주파수 고정", desc: "심층 감사 일기를 통한 풍요 마인드 셋팅" },
                  { icon: <Trophy />, title: "디지털 졸업장", desc: "성취를 증명하는 글로벌 인증 시스템" },
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-[#c8a84b]/30 transition-all group">
                     <div className="text-[#c8a84b] mb-6 group-hover:scale-110 transition-transform">
                        {item.icon}
                     </div>
                     <h4 className="text-lg font-black mb-2">{item.title}</h4>
                     <p className="text-xs text-white/30 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 씬 3: 5대 핵심 서비스 프리뷰 */}
      <section className="relative z-20 py-32 bg-white/[0.01]">
         <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black mb-20 tracking-tighter uppercase relative inline-block">
               Core Experience
               <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#c8a84b]" />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <Link href="/training" className="group p-10 rounded-[2.5rem] bg-black/40 border border-white/5 hover:border-[#c8a84b]/50 transition-all text-left">
                  <span className="text-[10px] font-black text-[#c8a84b] tracking-[0.3em] uppercase mb-12 block">01 Training</span>
                  <h3 className="text-2xl font-black mb-4 group-hover:translate-x-2 transition-transform italic">훈련소 입장</h3>
                  <p className="text-white/30 text-sm leading-relaxed">30일 마스터 커리큘럼 기반 실제 6단계 훈련 수행 코스</p>
               </Link>
               <Link href="/healing" className="group p-10 rounded-[2.5rem] bg-black/40 border border-white/5 hover:border-[#c8a84b]/50 transition-all text-left">
                  <span className="text-[10px] font-black text-[#9b7fd4] tracking-[0.3em] uppercase mb-12 block">02 Healing</span>
                  <h3 className="text-2xl font-black mb-4 group-hover:translate-x-2 transition-transform italic">마음상담소</h3>
                  <p className="text-white/30 text-sm leading-relaxed">온도계 측정, 자유 저널링, 432Hz 힐링 콘텐츠 라이브러리</p>
               </Link>
               <Link href="/library" className="group p-10 rounded-[2.5rem] bg-black/40 border border-white/5 hover:border-[#c8a84b]/50 transition-all text-left">
                  <span className="text-[10px] font-black text-amber-200 tracking-[0.3em] uppercase mb-12 block">03 Library</span>
                  <h3 className="text-2xl font-black mb-4 group-hover:translate-x-2 transition-transform italic">우주서재</h3>
                  <p className="text-white/30 text-sm leading-relaxed">전자책 및 실물책 구매, 사인본 큐레이션 통합 스토어</p>
               </Link>
            </div>
         </div>
      </section>

      <footer className="relative z-20 py-20 text-center border-t border-white/5 bg-[#050510]">
         <div className="mb-8 text-[#c8a84b] font-bold tracking-widest text-[10px]">✦ COSMOSMINDSET ✦</div>
         <p className="text-white/20 text-[10px] font-bold tracking-widest uppercase mb-12">
            © 2025 코스믹마인드 | 긍정마인드셋 학교 | 모든 권리 보유
         </p>
         <Link href="/login" className="px-6 py-2 border border-white/10 rounded-full text-[10px] font-bold text-white/30 hover:bg-white/5 transition-all">
            로그인 / 회원가입
         </Link>
      </footer>
    </div>
  );
}
