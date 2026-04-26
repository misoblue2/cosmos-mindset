"use client";

import { motion } from "framer-motion";

export default function GlobalCounter() {
    return (
        <div className="w-full bg-[#0a0a1a] text-white overflow-hidden py-2 border-b border-white/5 relative z-50">
            <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                    <span className="flex h-1.5 w-1.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8a84b] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#c8a84b]"></span>
                    </span>
                    <span className="font-black text-[10px] tracking-widest text-[#c8a84b]">LIVE SESSION</span>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                >
                    <span className="text-[10px] font-bold text-white/30 tracking-tight">
                        현재 <b className="text-[#c8a84b]">1,284명</b>의 마스터들이 뇌 회로를 재배선 중입니다
                    </span>
                </motion.div>

                <div className="flex items-center gap-2">
                    <span className="text-[8px] font-black text-[#c8a84b] border border-[#c8a84b]/30 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                        v2.0 alpha
                    </span>
                </div>
            </div>
        </div>
    );
}
