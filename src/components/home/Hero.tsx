
import Link from 'next/link';
import { BookOpen, Video, Bot, Heart } from 'lucide-react';
import { QuantumHero } from './QuantumHero';

export function Hero() {
    return (
        <section className="relative w-full bg-[#050510] overflow-hidden flex flex-col">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[60%] h-[60%] bg-indigo-900/10 rounded-full blur-[100px]" />
            </div>
            {/* NEW: Quantum Interactive Engine */}
            <div className="w-full relative">
                <QuantumHero />
            </div>

            {/* --- SECTIONS BELOW --- */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Category 1: Legacy AI */}
                    <Link href="/legacy-ai" className="group relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative h-full p-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] hover:border-accent/50 transition-all duration-500 flex flex-col items-center gap-6 overflow-hidden text-center">
                            <div className="p-5 rounded-3xl bg-primary text-accent group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                                <Bot size={40} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-white leading-tight">나만의 자서전 만들기</h3>
                                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Life Explorer AI</p>
                            </div>
                            <p className="text-sm text-balance text-white/60 leading-relaxed">
                                대화만으로 완성되는 세상에 단 하나뿐인<br />당신만의 철학이 담긴 기록관
                            </p>
                        </div>
                    </Link>

                    {/* Category 2: Originals */}
                    <Link href="/originals" className="group relative">
                        <div className="absolute inset-0 bg-accent/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative h-full p-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] hover:border-accent/50 transition-all duration-500 flex flex-col items-center gap-6 overflow-hidden text-center">
                            <div className="p-5 rounded-3xl bg-accent text-primary group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                                <BookOpen size={40} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-white leading-tight">Cosmic Mind 우주의 서재</h3>
                                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Premium Wisdom</p>
                            </div>
                            <p className="text-sm text-balance text-white/60 leading-relaxed">
                                관점을 바꾸는 통찰과 깊이가 담긴<br />Cosmic Mind 오리지널 도서 시리즈
                            </p>
                        </div>
                    </Link>

                    {/* Category 3: Curations */}
                    <Link href="/curations" className="group relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative h-full p-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] hover:border-accent/50 transition-all duration-500 flex flex-col items-center gap-6 overflow-hidden text-center">
                            <div className="p-5 rounded-3xl bg-primary text-accent group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                                <Video size={40} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-white leading-tight">Cosmic Mind 추천 아이템</h3>
                                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Selected Insight</p>
                            </div>
                            <p className="text-sm text-balance text-white/60 leading-relaxed">
                                시선을 사로잡는 영감과 큐레이션<br />엄선된 브랜드와 영상 갤러리
                            </p>
                        </div>
                    </Link>

                    {/* Category 4: Imagination School (NEW) */}
                    <Link href="/imagination" className="group relative">
                        <div className="absolute inset-0 bg-yellow-400/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative h-full p-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] hover:border-yellow-400/50 transition-all duration-500 flex flex-col items-center gap-6 overflow-hidden text-center">
                            <div className="absolute top-0 right-0 p-4">
                                <span className="flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                                </span>
                            </div>
                            <div className="p-5 rounded-3xl bg-yellow-400 text-black group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                                <Heart size={40} className="fill-black" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-white leading-tight">어린이 상상학교</h3>
                                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Donation & Hope</p>
                            </div>
                            <p className="text-sm text-balance text-white/60 leading-relaxed">
                                수익의 10%가 아이들의 꿈이 됩니다<br />
                                <span className="text-yellow-400 font-bold">실시간 기부 현황 보기</span>
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="mt-24 text-center">
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-[1em]">Everything is Energy and Information</p>
                </div>
            </div>
        </section>
    );
}
