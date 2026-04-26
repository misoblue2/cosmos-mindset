"use client";
import { useState, use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, Play, CheckCircle, Download, BookOpen, Crown, FileText } from 'lucide-react';

const COURSE_DATA: Record<string, any> = {
  "subconscious-power": {
    title: "잠재의식의 비밀",
    mentor: "조셉 머피",
    summary: [
      "당신의 잠재의식은 명령을 거부하지 않는다. 입력된 대로 창조할 뿐이다.",
      "잠들기 전 5분, 알파파 상태에서 심어준 이미지가 다음 날의 현실이 된다.",
      "부정적인 자기 암시를 긍정으로 바꾸는 순간 운명이 뒤바뀐다."
    ],
    pdf100Price: 10000,
    pdf200Price: 20000,
  }
};

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const course = COURSE_DATA[resolvedParams.id] || COURSE_DATA["subconscious-power"];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <Link href="/school" className="inline-flex items-center gap-2 text-white/40 hover:text-white font-bold mb-16 transition-all group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 코스 목록으로
        </Link>

        {/* 도서/콘텐츠 헤더 섹션 - 비디오 대신 심플한 그래픽적 요소 */}
        <div className="w-full bg-white/[0.03] rounded-[2.5rem] border border-white/5 mb-20 p-16 flex flex-col items-center justify-center text-center shadow-2xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10"
          >
            <FileText size={40} className="text-white/40" />
          </motion.div>
          <p className="text-white/40 font-black text-xs tracking-[0.4em] uppercase mb-4">{course.mentor} Wisdom Engine</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">{course.title}</h1>
          <p className="text-white/20 text-sm font-medium max-w-md">본 코스는 영상 수강이 아닌, 고농축 지혜가 담긴<br/>전자책/워크북 전용 마스터 클래스입니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* 좌측 상세 정보 */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-10">
              <h3 className="font-black text-xl mb-8 flex items-center gap-3">
                <CheckCircle className="text-white" size={24} /> 코스 핵심 요약
              </h3>
              <ul className="space-y-6">
                {course.summary.map((text: string, i: number) => (
                  <li key={i} className="flex items-start gap-4">
                     <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-black shrink-0">{i+1}</span>
                     <span className="text-white/60 leading-relaxed font-medium pt-1 text-lg">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-white/40 leading-relaxed font-medium text-lg">
                가만히 앉아 영상을 시청하는 것만으로는 뇌 회로를 바꿀 수 없습니다. 진정한 변화는 손끝에서 시작됩니다. 
                <br/><br/>
                <span className="text-white">우주마인드스쿨은 멘토의 지혜를 텍스트로 고도로 압축했습니다. 직접 읽고, 쓰고, 각인하는 과정을 통해 당신의 잠재의식을 물리적으로 재배선하세요.</span>
              </p>
            </div>
          </div>

          {/* 우측 구매 유도 위젯 */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8">
              <div className="mb-10 text-center">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40 mb-6">Master Workbook</div>
                 <h3 className="text-xl font-black mb-4 tracking-tight">마스터 워크북 소장</h3>
                 <p className="text-white/30 text-xs leading-relaxed">
                   AI로 확장된 뇌과학 기반의<br/>공식 실전 가이드북입니다.
                 </p>
              </div>
              
              <div className="space-y-4 mb-10">
                <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all flex flex-col items-center justify-center gap-2 group">
                  <div className="flex items-center gap-2 font-black text-sm text-white/60 group-hover:text-white transition-colors">
                    <BookOpen size={16} /> 100페이지 요약본
                  </div>
                  <div className="text-2xl font-black">₩{course.pdf100Price.toLocaleString()}</div>
                </button>

                <button className="w-full bg-white text-black hover:opacity-90 active:scale-95 rounded-2xl p-6 transition-all flex flex-col items-center justify-center gap-2 shadow-xl shadow-white/5">
                  <div className="flex items-center gap-2 font-black text-sm opacity-60">
                    <Crown size={18} /> 200페이지 마스터본
                  </div>
                  <div className="text-2xl font-black">₩{course.pdf200Price.toLocaleString()}</div>
                </button>
              </div>

              <div className="bg-white/[0.02] rounded-2xl p-5 text-center border border-white/5">
                <p className="text-[10px] text-white/30 font-bold leading-relaxed">
                   <span className="text-white">구독 프리미엄 혜택</span><br/>매월 1권 무료 소장 권한이 제공됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
