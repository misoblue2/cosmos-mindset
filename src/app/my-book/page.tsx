"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, PenTool, BookTemplate, Sparkles, CheckCircle, ArrowRight, Wand2 } from 'lucide-react';

export default function MyBookLandingPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white font-bold mb-12 group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 메인으로
        </Link>

        {/* 히어로 */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-black uppercase tracking-widest text-orange-400 mb-6">
            <PenTool size={14} /> My Book Creator
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            당신의 원고가 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">실물책</span>이 됩니다
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto font-medium">
            작성하신 원고만 업로드하세요. 우주마인드스쿨의 AI 고스트라이터가 
            결여된 분량을 채우고 완벽한 출판용 파일로 변환해 드립니다.
          </p>
        </div>

        {/* 프로세스 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
          {[
            { step: 1, title: "업로드", desc: "초안 형태의 원고 파일 전송" },
            { step: 2, title: "AI 분석", desc: "챕터 구조화 및 부족분 파악" },
            { step: 3, title: "에디터 수정", desc: "AI와 함께 원고 다듬기" },
            { step: 4, title: "출판 다운로드", desc: "PDF 및 EPUB 동시 발급" }
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="text-center relative">
              <div className="w-16 h-16 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-2xl font-black mb-4 relative z-10">
                {s.step}
              </div>
              {i < 3 && <div className="hidden md:block absolute top-8 left-1/2 w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent" />}
              <h3 className="font-bold mb-2">{s.title}</h3>
              <p className="text-white/40 text-xs">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 플랜 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* 100페이지 플랜 */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all flex flex-col">
            <h3 className="text-2xl font-black mb-2 flex items-center gap-2">
              <BookTemplate className="text-blue-400" /> A5 100페이지 출판
            </h3>
            <div className="text-4xl font-black mb-6">₩500,000</div>
            <p className="text-white/40 text-sm mb-6 pb-6 border-b border-white/5">
              원고 기준: A4 30페이지 이상 (약 36,000자)<br/>
              * 분량이 부족해도 AI 확장 집필로 채워드립니다.
            </p>
            <ul className="space-y-4 mb-8 flex-1">
              {['AI 원고 분석 및 챕터 구조화', '교보문고/부크크 출판용 PDF 2종', '리디북스 유통용 EPUB 전자책', '맞춤형 표지 디자인 생생', '30일 무제한 에디터 수정 권한'].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-white/80">{text}</span>
                </li>
              ))}
            </ul>
            <Link href="/my-book/upload?plan=100" className="w-full py-4 text-center bg-blue-600/20 text-blue-400 font-black rounded-xl hover:bg-blue-600/30 border border-blue-500/30 transition-all">
              100페이지 플랜 시작하기
            </Link>
          </div>

          {/* 200페이지 플랜 */}
          <div className="bg-gradient-to-b from-amber-500/10 to-orange-900/20 border border-amber-500/30 rounded-3xl p-8 transform md:-translate-y-4 shadow-[0_0_50px_rgba(245,158,11,0.15)] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1 bg-amber-500 text-black text-[10px] font-black rounded-bl-xl">BEST 마스터피스</div>
            
            <h3 className="text-2xl font-black mb-2 flex items-center gap-2">
              <Sparkles className="text-amber-400" /> A5 200페이지 출판
            </h3>
            <div className="text-4xl font-black mb-6 text-amber-400">₩1,000,000</div>
            <p className="text-white/40 text-sm mb-6 pb-6 border-b border-white/5">
              원고 기준: A4 60페이지 이상 (약 72,000자)<br/>
              * 코스믹마스터 스타일의 확언 파트 무제한 삽입.
            </p>
            <ul className="space-y-4 mb-8 flex-1">
              {['100페이지 플랜의 모든 기능', '심층 이론 배경 (뇌과학/심리학) 자동 보강', '거장 명언 큐레이션 매 챕터 삽입', '독자 참여 유도 워크북 페이지 생성', '우주마인드스쿨 공식 도서 등록 기회'].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-white/80">{text}</span>
                </li>
              ))}
            </ul>
            <Link href="/my-book/upload?plan=200" className="w-full py-4 text-center bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
              <Wand2 size={18} /> 200페이지 플랜 시작하기
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
