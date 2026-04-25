"use client";
import { useState, use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, Play, CheckCircle, Download, BookOpen, Crown } from 'lucide-react';

const COURSE_DATA: Record<string, any> = {
  "subconscious-power": {
    title: "잠재의식의 비밀",
    mentor: "조셉 머피",
    videoId: "dQw4w9WgXcQ", // 유튜브 ID 더미
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
    <div className="min-h-screen bg-[#050510] text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link href="/school" className="inline-flex items-center gap-2 text-white/40 hover:text-white font-bold mb-8 transition-colors">
          <ChevronLeft size={20} /> 코스 목록으로
        </Link>

        {/* 비디오 섹션 */}
        <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-8 relative">
          <iframe 
            width="100%" height="100%" 
            src={`https://www.youtube.com/embed/${course.videoId}?rel=0`} 
            title="YouTube video player" frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 좌측 요약 */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <p className="text-purple-400 font-black text-sm tracking-widest mb-2">{course.mentor} 마스터 클래스</p>
              <h1 className="text-3xl md:text-4xl font-black mb-6">{course.title}</h1>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                <CheckCircle className="text-emerald-400" size={20} /> 이 영상의 3줄 핵심 요약
              </h3>
              <ul className="space-y-4">
                {course.summary.map((text: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                     <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold shrink-0">{i+1}</span>
                     <span className="text-white/80 leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-white/60 leading-relaxed font-medium">
                단순히 영상을 보는 것만으로는 부족합니다. 당신의 뇌 구조를 물리적으로 바꾸기 위해서는, 이 지혜를 직접 손으로 쓰고 스스로에게 각인시켜야 합니다.
                우주마인드스쿨은 이 영상의 모든 텍스트와 철학적 확언을 분석하여 200페이지 분량의 체계적인 워크북으로 자동 변환했습니다.
              </p>
            </div>
          </div>

          {/* 우측 PDF 구매 위젯 */}
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-gradient-to-b from-purple-900/40 to-blue-900/20 border border-purple-500/30 rounded-3xl p-6 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
              <div className="absolute -top-4 inset-x-0 flex justify-center">
                <div className="px-4 py-1 bg-purple-500 text-white text-xs font-black rounded-full shadow-lg">
                  평생 소장 워크북
                </div>
              </div>
              
              <h3 className="text-xl font-black text-center mb-2 mt-4">이 영상의 모든 지혜를 소장하세요</h3>
              <p className="text-white/40 text-xs text-center mb-6 px-2">
                단순 스크립트가 아닌, AI로 확장된 뇌과학 기반의 공식 실전 가이드북입니다.
              </p>

              <div className="space-y-3 mb-6">
                <button className="w-full relative group overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-4 transition-all flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center gap-2 font-black">
                    <BookOpen size={16} className="text-blue-400" /> 100페이지 요약본
                  </div>
                  <div className="text-xl font-black text-white/90">₩{course.pdf100Price.toLocaleString()}</div>
                </button>

                <button className="w-full relative group overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 active:scale-95 border border-purple-400/50 rounded-2xl p-4 transition-all flex flex-col items-center justify-center gap-1 shadow-lg">
                  <div className="flex items-center gap-2 font-black">
                    <Crown size={16} className="text-amber-300" /> 200페이지 마스터본
                  </div>
                  <div className="text-xl font-black">₩{course.pdf200Price.toLocaleString()}</div>
                </button>
              </div>

              <div className="bg-black/30 rounded-xl p-3 text-center border border-white/5">
                <p className="text-xs text-white/60 font-medium">
                  🌟 <span className="text-amber-400 font-bold">6개월 이상 구독자</span>는<br/>매월 1권 무료 다운로드 혜택이 제공됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
