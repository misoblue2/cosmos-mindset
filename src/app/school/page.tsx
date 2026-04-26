"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, FileText, BookOpen, Clock, Users, ArrowRight } from 'lucide-react';

const COURSES = [
  { id: "subconscious-power", title: "잠재의식의 비밀", desc: "조셉 머피의 잠재의식 프로그래밍 원리를 실전에 적용하는 집중 워크북", lessons: "30 Modules", students: 847, duration: "Mastery", color: "bg-white/[0.03]", mentor: "조셉 머피" },
  { id: "quantum-leap", title: "양자도약 마인드셋", desc: "양자역학의 관찰자 효과를 활용한 현실 창조 필사 코스", lessons: "20 Modules", students: 623, duration: "Elite", color: "bg-white/[0.03]", mentor: "네빌 고다드" },
  { id: "law-of-attraction", title: "끌어당김의 법칙", desc: "론다 번의 시크릿 원리를 체계적으로 훈련하는 텍스트 클래스", lessons: "25 Modules", students: 1205, duration: "Grand", color: "bg-white/[0.03]", mentor: "론다 번" },
  { id: "stoic-mind", title: "스토아 철학 마스터", desc: "마르쿠스 아우렐리우스의 명상록 기반 멘탈 관리 가이드", lessons: "15 Modules", students: 412, duration: "Steel", color: "bg-white/[0.03]", mentor: "아우렐리우스" },
  { id: "success-principles", title: "성공의 법칙", desc: "나폴레온 힐의 열망과 마스터마인드 그룹 실전 지침서", lessons: "20 Modules", students: 956, duration: "Prime", color: "bg-white/[0.03]", mentor: "나폴레온 힐" },
  { id: "positive-power", title: "긍정 사고의 힘", desc: "노먼 빈센트 필의 사고법으로 기적을 만드는 필사 훈련", lessons: "15 Modules", students: 378, duration: "Power", color: "bg-white/[0.03]", mentor: "노먼 필" },
];

export default function SchoolPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white font-bold mb-16 group transition-all">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 메인으로
        </Link>

        <div className="text-center mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-black uppercase tracking-[0.4em] text-white/60 mb-8">
            <FileText size={14} /> Wisdom Training Center
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">마인드셋 스쿨</h1>
          <p className="text-white/40 max-w-lg mx-auto text-xl leading-relaxed font-medium">영상을 보는 것이 아닌,<br/>지혜를 읽고 직접 새기는 훈련소</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course, i) => (
            <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Link href={`/school/${course.id}`} className="block group bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-white/40 hover:bg-white/[0.06] transition-all hover:-translate-y-2">
                <div className={`h-56 ${course.color} flex items-center justify-center relative border-b border-white/5`}>
                  <div className="w-20 h-20 bg-white/5 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white text-white/40 group-hover:text-black transition-all duration-500 shadow-2xl">
                    <BookOpen size={32} />
                  </div>
                  <div className="absolute bottom-6 left-8 px-4 py-1.5 bg-black/60 backdrop-blur rounded-full text-[10px] font-black uppercase tracking-widest text-white/60 border border-white/5">{course.mentor}</div>
                </div>
                <div className="p-10 space-y-5">
                  <h3 className="font-black text-2xl tracking-tight group-hover:text-white transition-colors">{course.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed line-clamp-2 font-medium">{course.desc}</p>
                  <div className="flex items-center gap-4 pt-8 border-t border-white/5 text-white/20 text-[10px] font-black uppercase tracking-widest">
                    <span className="flex items-center gap-2 tracking-tighter"><FileText size={12} /> {course.lessons}</span>
                    <span className="flex items-center gap-2 tracking-tighter"><Clock size={12} /> {course.duration}</span>
                    <span className="flex items-center gap-2 tracking-tighter"><Users size={12} /> {course.students.toLocaleString()} </span>
                  </div>
                  <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-white text-xs font-black uppercase tracking-widest">
                    코스 상세 보기 <ArrowRight size={14} className="animate-pulse" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
