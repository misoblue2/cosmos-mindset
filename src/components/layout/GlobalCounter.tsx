"use client";

import { motion } from "framer-motion";

export default function GlobalCounter() {
    return (
        <div className="w-full bg-[#0a0a1a] text-white overflow-hidden py-1.5 border-b border-white/[0.03] relative z-50">
            <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
                <div className="flex items-center gap-2">
                    <span className="flex h-1.5 w-1.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                    </span>
                    <span className="font-bold text-[9px] tracking-[0.2em] text-white/50 uppercase">Live Session</span>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                >
                    <span className="text-[10px] font-medium text-white/30 tracking-tight">
                        <span className="hidden md:inline">현재</span> <b className="text-white font-black">1,284명</b>의 마스터들이 접속 중
                    </span>
                </motion.div>

                <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-white/20 hover:text-white transition-colors cursor-default tracking-tighter">
                        V2.0 ALPHA
                    </span>
                </div>
            </div>
        </div>
    );
}
