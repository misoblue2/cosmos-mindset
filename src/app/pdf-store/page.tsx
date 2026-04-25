"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Download, Search, Star, ChevronLeft } from 'lucide-react';

const PDFS = [
  { id: 1, title: "잠재의식의 비밀: 마음의 문을 여는 법", author: "가치토커", pages: 200, price: 20000, category: "잠재의식", color: "from-purple-600 to-indigo-800", rating: 4.9 },
  { id: 2, title: "양자도약: 현실을 창조하는 마인드셋", author: "가치토커", pages: 100, price: 10000, category: "양자역학", color: "from-blue-600 to-cyan-800", rating: 4.8 },
  { id: 3, title: "끌어당김의 법칙 실전 워크북", author: "가치토커", pages: 100, price: 10000, category: "끌어당김", color: "from-amber-600 to-orange-800", rating: 4.7 },
  { id: 4, title: "뇌과학으로 증명된 확언의 힘", author: "가치토커", pages: 200, price: 20000, category: "뇌과학", color: "from-emerald-600 to-green-800", rating: 4.9 },
  { id: 5, title: "네빌 고다드의 상상 현실화 기법", author: "가치토커", pages: 100, price: 10000, category: "상상력", color: "from-pink-600 to-rose-800", rating: 4.6 },
  { id: 6, title: "조셉 머피의 잠재의식 프로그래밍", author: "가치토커", pages: 200, price: 20000, category: "잠재의식", color: "from-violet-600 to-purple-800", rating: 4.8 },
];

export default function PdfStorePage() {
  const [search, setSearch] = useState('');
  const filtered = PDFS.filter(p => p.title.includes(search) || p.category.includes(search));

  return (
    <div className="min-h-screen bg-[#050510] text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[200px]" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white font-bold mb-8 group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 메인으로
        </Link>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-black uppercase tracking-[0.3em] text-purple-300 mb-6">
            <BookOpen size={14} /> PDF E-Book Store
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">PDF 전자책 스토어</h1>
          <p className="text-white/40 max-w-lg mx-auto">가치토커의 영상 철학을 AI로 확장한 워크북 포함 공식 가이드북</p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3 gap-3">
            <Search size={18} className="text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="책 제목 또는 카테고리 검색..."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/20" />
          </div>
        </div>

        <div className="text-sm text-white/30 font-bold mb-6">6개월 이상 구독자: 매월 1권 무료 다운로드</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((book, i) => (
            <motion.div key={book.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-1">
              <div className={`h-44 bg-gradient-to-br ${book.color} flex items-center justify-center relative`}>
                <BookOpen size={48} className="text-white/20" />
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/40 backdrop-blur rounded text-[10px] font-black">{book.category}</div>
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/40 backdrop-blur rounded text-[10px] font-black">{book.pages}p</div>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-sm line-clamp-2 leading-snug">{book.title}</h3>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star size={12} fill="currentColor" /><span className="text-xs font-bold">{book.rating}</span>
                  <span className="text-white/20 text-xs ml-1">| {book.author}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-xl font-black">₩{book.price.toLocaleString()}</span>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-black flex items-center gap-2 transition-all hover:scale-105">
                    <Download size={14} /> 구매하기
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
