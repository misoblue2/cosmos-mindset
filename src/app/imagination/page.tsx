"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Star, Rocket, ExternalLink, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ImaginationPage() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div className="min-h-screen bg-black" />;

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
            {/* Background Layer Fixed */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-black" />
            </div>

            <div className="container mx-auto px-4 max-w-5xl py-12 relative z-10">
                <div className="mb-8 flex">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-white/40 hover:text-white transition-all font-bold cursor-pointer z-50 bg-transparent border-none p-0 outline-none no-underline"
                    >
                        <ChevronLeft size={20} /> 메인으로
                    </Link>
                </div>

                {/* Title Section */}
                <div className="text-center mb-16 mt-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block mb-6 relative"
                    >
                        <h1 className="text-4xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2 leading-tight">
                            상상학교
                        </h1>
                        <p className="text-sm md:text-2xl text-blue-200/80 font-black tracking-[0.3em] uppercase">
                            Imagination Academy
                        </p>
                    </motion.div>
                </div>

                {/* Main Grid - Click conflicts resolved by using onClick on motion.div */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-50">
                    {[
                        { title: "코딩 우주선", desc: "나만의 게임 만들기", color: "from-blue-600 to-cyan-500", icon: <Zap />, href: "/imagination/coding" },
                        { title: "아트 유니버스", desc: "디지털 드로잉 체험", color: "from-purple-600 to-pink-500", icon: <Star />, href: "/imagination/art" },
                        { title: "미래 과학자", desc: "AI 체험 센터", color: "from-green-600 to-emerald-500", icon: <Rocket />, href: "/imagination/science" }
                    ].map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="block w-full h-full no-underline outline-none z-50 pointer-events-auto cursor-pointer group"
                        >
                            <motion.div
                                whileHover={{ y: -12, scale: 1.03 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl h-full flex flex-col"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 text-white shadow-xl relative z-10`}>
                                    {item.icon}
                                </div>
                                <div className="relative z-10 flex-1">
                                    <h3 className="text-2xl font-black text-white mb-3 tracking-tighter">{item.title}</h3>
                                    <p className="text-white/40 text-sm mb-6 leading-relaxed">{item.desc}</p>
                                </div>
                                <div className="relative z-10 text-blue-400 flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                                    Launch Lab <ExternalLink size={14} />
                                </div>

                                {/* Hover Glow Effect */}
                                <div className={`absolute -inset-1 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 z-0`} />
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}