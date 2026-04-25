"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, Download, GraduationCap, Star, Award, Calendar } from 'lucide-react';
import { getSubscription, type SubscriptionData } from '@/lib/subscriptionStore';

const GRADUATION_DESIGNS = [
    {
        id: '1month',
        title: '긍정마인드셋 학교 1단계 수료증',
        subtitle: 'Newborn — 긍정의 눈을 뜨다',
        badgeColor: '#34d399',
        borderColor: '#10b981',
        requirement: '30일 연속 출석 + 누적 타이핑 10,000자',
    },
    {
        id: '6month',
        title: '긍정마인드셋 학교 6단계 수료증',
        subtitle: 'Architect — 현실의 창조자',
        badgeColor: '#818cf8',
        borderColor: '#6366f1',
        requirement: '누적 타이핑 100,000자 + 월별 미션 5개 완료',
    },
    {
        id: '12month',
        title: '긍정마인드셋 학교 마스터 수료증',
        subtitle: 'Grand Master — 마인드 마스터',
        badgeColor: '#fbbf24',
        borderColor: '#f59e0b',
        requirement: '누적 타이핑 300,000자 + 커스텀 코스 개설',
    },
];

export default function GraduationPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [userName, setUserName] = useState('');
    const [selectedCert, setSelectedCert] = useState(0);
    const [sub, setSub] = useState<SubscriptionData | null>(null);
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        const load = async () => {
            const s = await getSubscription();
            setSub(s);
            setIsMounted(true);
        };
        load();
    }, []);

    const generatePDF = async () => {
        if (!userName.trim()) {
            alert('졸업생 이름을 입력해주세요.');
            return;
        }
        setGenerating(true);

        try {
            // jsPDF 동적 임포트 (클라이언트 전용)
            const { default: jsPDF } = await import('jspdf');
            const cert = GRADUATION_DESIGNS[selectedCert];
            const today = new Date().toLocaleDateString('ko-KR', {
                year: 'numeric', month: 'long', day: 'numeric'
            });

            const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
            const w = doc.internal.pageSize.getWidth();
            const h = doc.internal.pageSize.getHeight();

            // 배경
            doc.setFillColor(10, 10, 25);
            doc.rect(0, 0, w, h, 'F');

            // 금빛 테두리
            doc.setDrawColor(cert.borderColor);
            doc.setLineWidth(3);
            doc.rect(10, 10, w - 20, h - 20);
            doc.setLineWidth(1);
            doc.rect(14, 14, w - 28, h - 28);

            // 코너 장식
            const cornerSize = 15;
            [[15, 15], [w - 15, 15], [15, h - 15], [w - 15, h - 15]].forEach(([cx, cy]) => {
                doc.setDrawColor(cert.borderColor);
                doc.setLineWidth(0.5);
                doc.line(cx - cornerSize / 2, cy, cx + cornerSize / 2, cy);
                doc.line(cx, cy - cornerSize / 2, cx, cy + cornerSize / 2);
            });

            // 상단 뱃지
            doc.setFontSize(10);
            doc.setTextColor(cert.badgeColor);
            doc.text('★ CERTIFICATE OF COMPLETION ★', w / 2, 35, { align: 'center' });

            // 메인 타이틀
            doc.setFontSize(28);
            doc.setTextColor(255, 255, 255);
            doc.text(cert.title, w / 2, 55, { align: 'center' });

            // 서브타이틀
            doc.setFontSize(14);
            doc.setTextColor(180, 180, 200);
            doc.text(cert.subtitle, w / 2, 68, { align: 'center' });

            // 구분선
            doc.setDrawColor(cert.borderColor);
            doc.setLineWidth(0.3);
            doc.line(w / 2 - 60, 75, w / 2 + 60, 75);

            // 본문
            doc.setFontSize(12);
            doc.setTextColor(200, 200, 220);
            doc.text('This is to certify that', w / 2, 90, { align: 'center' });

            // 졸업생 이름
            doc.setFontSize(32);
            doc.setTextColor(cert.badgeColor);
            doc.text(userName, w / 2, 110, { align: 'center' });

            // 이름 아래 밑줄
            const nameWidth = doc.getTextWidth(userName);
            doc.setDrawColor(cert.borderColor);
            doc.setLineWidth(0.5);
            doc.line(w / 2 - nameWidth / 2 - 10, 114, w / 2 + nameWidth / 2 + 10, 114);

            // 완료 안내문
            doc.setFontSize(11);
            doc.setTextColor(200, 200, 220);
            doc.text(
                'has successfully completed the Positive Mindset Training Program',
                w / 2, 128, { align: 'center' }
            );
            doc.text(
                'at Cosmos Mind Positive Mindset School (cosmosmindset.com)',
                w / 2, 136, { align: 'center' }
            );

            // 날짜
            doc.setFontSize(12);
            doc.setTextColor(150, 150, 170);
            doc.text(today, w / 2, 155, { align: 'center' });

            // 하단 교명
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 120);
            doc.text('Cosmos Mind | Positive Mindset School | cosmosmindset.com', w / 2, h - 22, { align: 'center' });

            // PDF 저장
            doc.save(`Cosmos_Mindset_${cert.id}_Certificate_${userName}.pdf`);
        } catch (err) {
            console.error('PDF 생성 실패:', err);
            alert('PDF 생성 중 오류가 발생했습니다.');
        } finally {
            setGenerating(false);
        }
    };

    if (!isMounted) return <div className="min-h-screen bg-[#050510]" />;

    return (
        <div className="min-h-screen bg-[#050510] text-white overflow-hidden relative">
            {/* 배경 */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[200px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[200px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
                <Link href="/pricing" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 font-bold group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 가격표로 돌아가기
                </Link>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16 space-y-4">
                    <div className="inline-block p-4 bg-amber-500/10 rounded-[2rem] border border-amber-500/20 mb-4">
                        <GraduationCap size={48} className="text-amber-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">졸업장 발급소</h1>
                    <p className="text-white/40 font-medium max-w-lg mx-auto">
                        긍정마인드셋 학교의 여정을 완수한 당신에게 드리는 수료증입니다.<br/>
                        이름을 입력하고 원하는 코스의 졸업장을 PDF로 즉시 다운로드하세요.
                    </p>
                </motion.div>

                {/* 졸업장 종류 선택 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    {GRADUATION_DESIGNS.map((cert, i) => (
                        <button
                            key={cert.id}
                            onClick={() => setSelectedCert(i)}
                            className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
                                selectedCert === i
                                    ? 'border-amber-400 bg-amber-500/10 shadow-[0_0_30px_rgba(251,191,36,0.2)]'
                                    : 'border-white/10 bg-white/5 hover:border-white/20'
                            }`}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <Award size={24} style={{ color: cert.badgeColor }} />
                                <span className="font-black text-sm">{cert.id === '1month' ? '1개월' : cert.id === '6month' ? '6개월' : '12개월'}</span>
                            </div>
                            <h3 className="font-bold text-sm mb-1">{cert.subtitle}</h3>
                            <p className="text-white/30 text-xs">{cert.requirement}</p>
                        </button>
                    ))}
                </div>

                {/* 졸업장 미리보기 */}
                <motion.div
                    layout
                    className="relative max-w-2xl mx-auto mb-12"
                >
                    <div
                        className="aspect-[297/210] rounded-2xl overflow-hidden border-4 shadow-2xl p-10 md:p-16 flex flex-col items-center justify-center text-center relative"
                        style={{
                            background: 'linear-gradient(135deg, #0a0a19, #111133)',
                            borderColor: GRADUATION_DESIGNS[selectedCert].borderColor
                        }}
                    >
                        {/* 장식 코너 */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: GRADUATION_DESIGNS[selectedCert].borderColor }} />
                        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: GRADUATION_DESIGNS[selectedCert].borderColor }} />
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: GRADUATION_DESIGNS[selectedCert].borderColor }} />
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: GRADUATION_DESIGNS[selectedCert].borderColor }} />

                        <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: GRADUATION_DESIGNS[selectedCert].badgeColor }}>
                            ★ Certificate of Completion ★
                        </p>
                        <h2 className="text-lg md:text-2xl font-black mb-1">{GRADUATION_DESIGNS[selectedCert].title}</h2>
                        <p className="text-white/40 text-xs mb-6">{GRADUATION_DESIGNS[selectedCert].subtitle}</p>
                        <div className="w-24 h-[1px] mb-6" style={{ backgroundColor: GRADUATION_DESIGNS[selectedCert].borderColor }} />
                        <p className="text-white/50 text-xs mb-2">This is to certify that</p>
                        <h3 className="text-2xl md:text-4xl font-black mb-2" style={{ color: GRADUATION_DESIGNS[selectedCert].badgeColor }}>
                            {userName || '당신의 이름'}
                        </h3>
                        <p className="text-white/40 text-[10px]">has completed the Positive Mindset Training</p>
                        <p className="text-white/20 text-[8px] absolute bottom-6">cosmosmindset.com</p>
                    </div>
                </motion.div>

                {/* 이름 입력 및 다운로드 */}
                <div className="max-w-md mx-auto space-y-6">
                    <input
                        type="text"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        placeholder="졸업생 이름을 입력하세요"
                        className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-5 text-white text-center text-xl font-bold outline-none focus:border-amber-400 transition-colors placeholder:text-white/20"
                    />

                    <button
                        onClick={generatePDF}
                        disabled={!userName.trim() || generating}
                        className="w-full py-5 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-black text-lg rounded-2xl shadow-[0_0_40px_rgba(251,191,36,0.4)] transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        {generating ? (
                            <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        ) : (
                            <><Download size={20} /> 졸업장 PDF 다운로드</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
