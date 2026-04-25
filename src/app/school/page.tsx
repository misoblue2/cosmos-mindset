"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, Play, BookOpen, Clock, Users } from 'lucide-react';

const COURSES = [
  { id: "subconscious-power", title: "잠재의식의 비밀", desc: "조셉 머피의 잠재의식 프로그래밍 원리를 실전에 적용하는 30일 코스", lessons: 30, students: 847, duration: "10시간", color: "from-purple-600 to-indigo-700", mentor: "조셉 머피" },
  { id: "quantum-leap", title: "양자도약 마인드셋", desc: "양자역학의 관찰자 효과를 활용한 현실 창조 실습", lessons: 20, students: 623, duration: "7시간", color: "from-blue-600 to-cyan-700", mentor: "네빌 고다드" },
  { id: "law-of-attraction", title: "끌어당김의 법칙 마스터", desc: "론다 번의 시크릿 원리를 체계적으로 훈련하는 코스", lessons: 25, students: 1205, duration: "8시간", color: "from-amber-600 to-orange-700", mentor: "론다 번" },
  { id: "stoic-mind", title: "스토아 철학 마스터", desc: "마르쿠스 아우렐리우스의 명상록으로 배우는 멘탈 관리", lessons: 15, students: 412, duration: "5시간", color: "from-emerald-600 to-green-700", mentor: "마르쿠스 아우렐리우스" },
  { id: "success-principles", title: "성공의 법칙", desc: "나폴레온 힐의 불타는 열망과 마스터마인드 그룹 실전", lessons: 20, students: 956, duration: "6시간", color: "from-pink-600 to-rose-700", mentor: "나폴레온 힐" },
  { id: "positive-power", title: "긍정 사고의 힘", desc: "노먼 빈센트 필의 긍정적 사고법으로 기적 만들기", lessons: 15, students: 378, duration: "5시간", color: "from-violet-600 to-purple-700", mentor: "노먼 빈센트 필" },
];

export default function SchoolPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[200px]" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white font-bold mb-8 group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 메인으로
        </Link>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-black uppercase tracking-[0.3em] text-blue-300 mb-6">
            <BookOpen size={14} /> Mindset School Courses
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">마인드셋 스쿨</h1>
          <p className="text-white/40 max-w-lg mx-auto">10명의 세계적 멘토와 함께하는 뇌과학 기반 마인드셋 훈련 코스</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((course, i) => (
            <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Link href={`/school/${course.id}`} className="block group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-1">
                <div className={`h-40 bg-gradient-to-br ${course.color} flex items-center justify-center relative`}>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={24} className="text-white ml-1" fill="white" />
                  </div>
                  <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/40 backdrop-blur rounded-full text-[10px] font-black">{course.mentor}</div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-black text-lg">{course.title}</h3>
                  <p className="text-white/40 text-sm line-clamp-2">{course.desc}</p>
                  <div className="flex items-center gap-4 pt-2 border-t border-white/5 text-white/30 text-xs font-bold">
                    <span className="flex items-center gap-1"><Play size={12} /> {course.lessons}강</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {course.students.toLocaleString()}</span>
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
