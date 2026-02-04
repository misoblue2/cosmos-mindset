"use client";

import { motion } from "framer-motion";

export default function GlobalCounter() {
    return (
        <div className="w-full bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white overflow-hidden py-3 border-b border-white/10 relative z-50">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="font-bold text-sm tracking-wide text-green-300">LIVE</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                >
                    <span className="text-xs md:text-sm font-light text-white/80">
                        여러분의 상상이 <b className="text-white font-bold">현실</b>이 되는 곳
                    </span>
                </motion.div>

                <div className="flex items-center gap-2">
                    <span className="text-[10px] md:text-xs font-mono text-white/50 bg-white/10 px-2 py-1 rounded">
                        BETA
                    </span>
                </div>
            </div>
        </div>
    );
}
