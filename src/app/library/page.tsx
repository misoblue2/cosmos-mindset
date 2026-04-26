"use client";
import { motion } from 'framer-motion';
import { Book, Download, ShoppingBag, Star, Sparkles, Check } from 'lucide-react';
import Link from 'next/link';

const BOOKS = [
  {
    id: "book1",
    title: "잠재의식의 거대한 파도",
    subtitle: "30일간의 신경 재배선 프로젝트 가이드",
    desc: "코스믹마스터의 뇌과학 마인드셋 핵심 이론이 총망라된 1개월 입문 바이블입니다.",
    price_ebook: "15,000",
    price_physical: "18,000",
    price_bundle: "28,000",
    bestseller: true,
    coverColor: "linear-gradient(135deg, #1a1030 0%, #2a2050 100%)"
  },
  {
    id: "book2",
    title: "부의 주파수: 머니 마인드",
    subtitle: "결핍에서 풍요로 전환하는 가장 빠른 기술",
    desc: "돈을 끌어당기는 에너지를 정렬하고 싶다면 반드시 거쳐야 할 Wealth Mind의 실전서입니다.",
    price_ebook: "15,000",
    price_physical: "21,000",
    price_bundle: "31,000",
    bestseller: false,
    coverColor: "linear-gradient(135deg, #102a30 0%, #204050 100%)"
  }
];

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-[#07070f] text-white pt-24 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20 text-center space-y-4">
           <div className="text-[10px] font-black tracking-[0.4em] text-[#c8a84b] uppercase">✦ Cosmic Library ✦</div>
           <h1 className="text-4xl md:text-6xl font-black">우주의 서재</h1>
           <p className="text-white/40 leading-relaxed max-w-lg mx-auto">
             책은 읽는 것이 아닙니다. 책은 당신을 바꾸는 거죠.<br/>
             셀리나의 철학이 담긴 지혜의 정수들을 만나보세요.
           </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {BOOKS.map((book) => (
            <motion.div 
               key={book.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white/[0.03] border border-[#c8a84b]/20 rounded-[2.5rem] overflow-hidden hover:bg-white/[0.06] transition-all hover:scale-[1.01] hover:shadow-[0_20px_80px_rgba(200,168,75,0.1)] group"
            >
               <div className="flex flex-col md:flex-row h-full">
                  {/* 도서 표지 영역 */}
                  <div className="md:w-56 shrink-0 flex items-center justify-center p-10 md:p-0" style={{ background: book.coverColor }}>
                     <Book size={64} className="text-[#c8a84b] group-hover:scale-125 transition-transform duration-700" />
                  </div>

                  {/* 도서 정보 영역 */}
                  <div className="flex-1 p-10 md:p-12 flex flex-col">
                     <div className="mb-6">
                        {book.bestseller && (
                          <div className="text-[10px] font-black text-[#c8a84b] tracking-widest uppercase mb-2 flex items-center gap-1">
                             <Sparkles size={12} /> bestseller
                          </div>
                        )}
                        <h3 className="text-2xl font-black mb-2">{book.title}</h3>
                        <p className="text-[#c8a84b] text-xs font-bold uppercase tracking-tight">{book.subtitle}</p>
                     </div>

                     <p className="text-white/30 text-sm leading-relaxed mb-10 flex-1">
                        {book.desc}
                     </p>

                     <div className="space-y-3">
                        <button className="w-full py-4 bg-[#c8a84b] text-black font-black text-sm rounded-xl flex items-center justify-between px-6 hover:opacity-90 transition-opacity">
                           <span>📱 전자책 (PDF)</span>
                           <span>{book.price_ebook}원</span>
                        </button>
                        <button className="w-full py-4 bg-white/5 border border-[#c8a84b]/30 text-[#c8a84b] font-black text-sm rounded-xl flex items-center justify-between px-6 hover:bg-white/10 transition-colors">
                           <span>📦 실물책 주문</span>
                           <span>{book.price_physical}원</span>
                        </button>
                        <div className="relative pt-2">
                           <button className="w-full py-3 bg-white/5 border-2 border-dashed border-white/10 text-white/50 font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:border-[#c8a84b]/50 hover:text-white transition-all">
                              <Sparkles size={14} /> 전자책 + 실물책 세트 — {book.price_bundle}원
                           </button>
                        </div>
                     </div>

                     {/* 사인본 옵션 */}
                     <label className="mt-6 flex items-center gap-3 cursor-pointer group/label">
                        <input type="checkbox" className="w-4 h-4 bg-transparent border-white/20 rounded accent-[#c8a84b]" />
                        <span className="text-[10px] font-bold text-white/30 group-hover/label:text-white/50 transition-colors">
                          코스믹마스터 친필 사인 포함 (+3,000원 / 배송 3일 추가)
                        </span>
                     </label>
                  </div>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
