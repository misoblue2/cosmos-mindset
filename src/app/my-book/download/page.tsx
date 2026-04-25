"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Download, CheckCircle, FileText, Smartphone, Image as ImageIcon, Book, ArrowUpRight, Sparkles } from 'lucide-react';

export default function DownloadPage() {
  const [generating, setGenerating] = useState(true);

  // 최종 병합 생성 시뮬레이션 (5초)
  useEffect(() => {
    const timer = setTimeout(() => setGenerating(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050510] text-white flex flex-col items-center justify-center p-4">
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px]" />
      </div>

      <AnimatePresence mode="wait">
        {generating ? (
          <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="text-center z-10">
            <div className="relative w-32 h-32 mx-auto mb-12">
              <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Book className="text-blue-400 w-8 h-8 animate-pulse" />
              </div>
            </div>
            <h2 className="text-3xl font-black mb-4">최종 출판 파일을<br/>생성하고 있습니다</h2>
            <div className="text-white/40 max-w-sm mx-auto space-y-2 text-sm">
              <p className="flex items-center justify-between"><span>표지 디자인 렌더링</span> <span className="text-emerald-400">완료</span></p>
              <p className="flex items-center justify-between"><span>목차 및 페이지 번호 매핑</span> <span className="text-emerald-400">완료</span></p>
              <p className="flex items-center justify-between opacity-50 animate-pulse"><span>A5 규격 PDF 병합</span> <span>진행 중...</span></p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="complete" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="z-10 max-w-5xl w-full">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/20 border border-emerald-500/50 rounded-3xl mb-8 shadow-[0_0_40px_rgba(16,185,129,0.3)] text-emerald-400">
                <CheckCircle size={40} />
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-4"><span className="text-emerald-400">출판 준비가</span> 완료되었습니다</h1>
              <p className="text-xl text-white/50">생성된 파일 3종과 표지를 다운로드하여 즉시 유통을 시작하세요.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { title: '부크크 출판용 PDF', desc: '종이책 인쇄 최적화 규격 (A5 무선제본)', icon: <FileText size={32} />, color: 'blue' },
                { title: '교보 바로출판 PDF', desc: 'PDF/X-1a 전자책/종이책 겸용 규격', icon: <FileText size={32} />, color: 'purple' },
                { title: 'EPUB 전자책 파일', desc: '교보/리디/밀리 등 유통용 포맷', icon: <Smartphone size={32} />, color: 'amber' },
                { title: '표지 디자인 원본', desc: '고해상도 커버 이미지 (2400x3600px)', icon: <ImageIcon size={32} />, color: 'pink' }
              ].map((file, i) => (
                <div key={i} className="bg-white/5 border border-white/10 hover:border-white/20 transition-all rounded-3xl p-8 flex flex-col items-center text-center group">
                  <div className={`w-16 h-16 rounded-2xl bg-${file.color}-500/20 text-${file.color}-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {file.icon}
                  </div>
                  <h3 className="font-black text-lg mb-2">{file.title}</h3>
                  <p className="text-xs text-white/40 mb-8 flex-1">{file.desc}</p>
                  <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                    <Download size={16} /> 다운로드
                  </button>
                </div>
              ))}
            </div>

            {/* 바로 출판 안내 */}
            <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-3xl p-8 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left flex-1">
                <h4 className="font-black text-2xl mb-2 flex items-center justify-center md:justify-start gap-2">
                  <Sparkles className="text-blue-400" /> 지금 바로 출판 신청하기
                </h4>
                <p className="text-white/60 text-sm">
                  다운로드하신 파일로 교보문고와 부크크에 바로 등록할 수 있습니다. 
                  우주마인드스쿨에서 검토 후 공식 도서 스토어에도 입점해 드립니다.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
                <a href="https://bookk.co.kr" target="_blank" rel="noreferrer" className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl text-sm flex items-center justify-between gap-4 transition-colors">
                  부크크 등록하러 가기 <ArrowUpRight size={16} />
                </a>
                <a href="https://pubple.kyobobook.co.kr/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm border border-white/10 flex items-center justify-between gap-4 transition-colors">
                  교보 퍼플퍼블리싱 가기 <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
