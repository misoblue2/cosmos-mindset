"use client";
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, Play, Music, MessageCircle, Heart, Sparkles } from 'lucide-react';

const CATEGORY_DATA: Record<string, any> = {
  comfort: {
    title: "위로가 필요할 때",
    desc: "지금 당신의 마음을 안아줄 따뜻한 목소리와 음악들입니다.",
    color: "#9b7fd4",
    items: [
      { type: "audio", title: "괜찮아, 다 잘될 거야", duration: "10:00", mentor: "정셀리나" },
      { type: "text", title: "오늘 하루를 견뎌낸 당신에게", author: "조셉 머피" },
      { type: "audio", title: "비 내리는 밤의 평온", duration: "15:00", mentor: "Nature" }
    ]
  },
  motivation: {
    title: "동기가 필요할 때",
    desc: "잠든 거인을 깨우는 강력한 확언과 열정의 주파수입니다.",
    color: "#c8a84b",
    items: [
      { type: "audio", title: "부를 끌어당기는 주문", duration: "08:00", mentor: "가치토커" },
      { type: "audio", title: "한계를 부수는 용기", duration: "12:00", mentor: "얼 나이팅게일" },
      { type: "text", title: "당신은 이미 승자입니다", author: "나폴레온 힐" }
    ]
  },
  sleep: {
    title: "잠이 오지 않을 때",
    desc: "깊은 수면으로 안내하는 델타파와 이완 명상입니다.",
    color: "#3b82f6",
    items: [
      { type: "audio", title: "깊은 델타파 명상", duration: "30:00", mentor: "Silence" },
      { type: "audio", title: "온몸의 긴장 풀기", duration: "20:00", mentor: "정셀리나" }
    ]
  },
  anger: {
    title: "화가 가라앉지 않을 때",
    desc: "끓어오르는 감정을 식혀줄 냉정한 통찰과 호흡법입니다.",
    color: "#ef4444",
    items: [
      { type: "audio", title: "분노를 관찰하는 명상", duration: "05:00", mentor: "아우렐리우스" },
      { type: "audio", title: "파도 소리 호흡법", duration: "10:00", mentor: "Nature" }
    ]
  },
  silence: {
    title: "침묵 속에 머물기",
    desc: "어떠한 소리도, 생각도 없는 순수한 존재의 상태입니다.",
    color: "#ffffff",
    items: [
      { type: "audio", title: "순수 침묵 세션", duration: "60:00", mentor: "Zen" }
    ]
  }
};

export default function DynamicHealingPage() {
  const params = useParams();
  const category = params.category as string;
  const data = CATEGORY_DATA[category] || CATEGORY_DATA.comfort;

  return (
    <div className="min-h-screen bg-[#07070f] text-white pt-24 pb-32 px-6">
      <div className="max-w-[680px] mx-auto">
        <Link href="/healing" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 font-bold text-sm uppercase tracking-widest">
           <ChevronLeft size={16} /> 마음상담소로 돌아가기
        </Link>

        <header className="mb-16">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="text-4xl font-black mb-4"
             style={{ color: data.color }}
           >
             {data.title}
           </motion.div>
           <p className="text-white/40 leading-relaxed text-lg italic">"{data.desc}"</p>
        </header>

        <div className="space-y-4">
           {data.items.map((item: any, i: number) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="group flex items-center justify-between p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all cursor-pointer"
             >
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:scale-110 group-hover:bg-white/10 transition-all">
                     {item.type === 'audio' ? <Music size={20} /> : <MessageCircle size={20} />}
                  </div>
                  <div>
                    <h4 className="text-lg font-black mb-1 group-hover:text-white transition-colors">{item.title}</h4>
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                      {item.author || item.mentor} · {item.duration || 'Article'}
                    </span>
                  </div>
               </div>
               
               <div className="text-white/20 group-hover:text-white transition-colors">
                  <Play size={24} />
               </div>
             </motion.div>
           ))}
        </div>

        <div className="mt-20 p-10 rounded-[2.5rem] bg-gradient-to-br from-white/[0.02] to-transparent border border-white/5 text-center">
            <Sparkles className="mx-auto mb-6 opacity-20" size={32} />
            <h3 className="text-xl font-bold mb-4">새로운 힐링 콘텐츠가 매일 업데이트됩니다</h3>
            <p className="text-white/30 text-sm leading-relaxed">
              코스믹마인드 마스터들이 엄선한 최고의 힐링 지혜를 경험하세요.<br/>
              멤버십 회원은 모든 콘텐츠를 광고 없이 무제한으로 즐길 수 있습니다.
            </p>
            <Link href="/pricing" className="inline-block mt-8 text-[#c8a84b] font-black border-b border-[#c8a84b]/30 pb-0.5">
               전체 혜택 보기 →
            </Link>
        </div>
      </div>
    </div>
  );
}
