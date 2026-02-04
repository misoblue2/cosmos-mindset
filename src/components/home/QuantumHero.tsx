"use client";

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, X, Sparkles, Zap } from 'lucide-react';

const BOOKS = [
    { id: 1, title: "시선의 연금술", subtitle: "보이지 않는 것을 보는 힘", color: "#00FFFF", concept: "관찰하는 순간 파동이 입자가 되는 원리" },
    { id: 2, title: "당신이 볼 때만 존재하는 세상", subtitle: "이중 슬릿 실험과 파동의 붕괴", color: "#FF00FF", concept: "이중 슬릿 실험과 파동의 붕괴" },
    { id: 3, title: "텅 빈 공간의 춤", subtitle: "공간을 채우는 에너지의 진동", color: "#39FF14", concept: "텅 빈 공간을 채우는 에너지의 진동" },
    { id: 4, title: "99.99%의 침묵", subtitle: "거대한 디바인 매트릭스", color: "#8F00FF", concept: "눈에 보이지 않는 거대한 디바인 매트릭스" },
    { id: 5, title: "미래에서 온 기억", subtitle: "원하는 현실을 미리 느끼는 법", color: "#FFD700", concept: "원하는 현실을 미리 느끼고 기억하는 법" }
];

export function QuantumHero() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    const [selectedBook, setSelectedBook] = useState<typeof BOOKS[0] | null>(null);
    const [showVisualizer, setShowVisualizer] = useState(false);
    const [visualizerMessage, setVisualizerMessage] = useState("");
    const [isVisualizing, setIsVisualizing] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [typedVision, setTypedVision] = useState("");

    useEffect(() => {
        if (!sceneRef.current) return;

        const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

        // Create engine
        const engine = Engine.create();
        engine.gravity.y = 0; // Wave state: No gravity
        engineRef.current = engine;

        // Create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: sceneRef.current.clientWidth,
                height: sceneRef.current.clientHeight,
                background: 'transparent',
                wireframes: false,
                pixelRatio: window.devicePixelRatio
            }
        });
        renderRef.current = render;

        // Boundaries
        const width = sceneRef.current.clientWidth;
        const height = sceneRef.current.clientHeight;
        const wallOptions = { isStatic: true, render: { visible: false } };

        const walls = [
            Bodies.rectangle(width / 2, -50, width, 100, wallOptions),
            Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions),
            Bodies.rectangle(-50, height / 2, 100, height, wallOptions),
            Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions)
        ];

        // Create book objects
        const bookBodies = BOOKS.map((book) => {
            const x = width / 2 + (Math.random() - 0.5) * 200;
            const y = height / 2 + (Math.random() - 0.5) * 200;
            const b = Bodies.rectangle(x, y, 220, 280, {
                chamfer: { radius: 20 },
                restitution: 0.8,
                frictionAir: 0.02,
                render: {
                    fillStyle: '#000000',
                    strokeStyle: book.color,
                    lineWidth: 3
                },
                label: `book-${book.id}`
            });

            // Random initial force (Big Bang)
            Matter.Body.applyForce(b, b.position, {
                x: (Math.random() - 0.5) * 0.1,
                y: (Math.random() - 0.5) * 0.1
            });

            return b;
        });

        // Create Stardust (Background particles)
        const stardust = Array.from({ length: 50 }).map(() => {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const radius = Math.random() * 2 + 1;
            return Bodies.circle(x, y, radius, {
                isStatic: false,
                frictionAir: 0.05, // Float slowly
                restitution: 0.5,
                render: {
                    fillStyle: Math.random() > 0.5 ? '#ffffff' : '#88ccff',
                    opacity: Math.random() * 0.5 + 0.1
                },
                collisionFilter: { mask: 0 } // Don't collide with anything
            });
        });

        // Add to world
        Composite.add(engine.world, [...walls, ...bookBodies, ...stardust]);

        // Mouse Constraint
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });
        Composite.add(engine.world, mouseConstraint);

        // Runner
        const runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);

        // Interaction Events
        Events.on(mouseConstraint, 'mousedown', (event) => {
            const body = event.source.body;
            if (body && body.label?.startsWith('book-')) {
                const bookId = parseInt(body.label.split('-')[1]);
                const book = BOOKS.find(b => b.id === bookId);
                if (book) {
                    // Reality Collapse
                    Runner.stop(runner);
                    setSelectedBook(book);
                }
            }
        });

        // Slow motion on hover (simulated by checking mouse proximity)
        Events.on(engine, 'beforeUpdate', () => {
            const { position } = mouse;
            bookBodies.forEach(b => {
                const dist = Math.sqrt(Math.pow(b.position.x - position.x, 2) + Math.pow(b.position.y - position.y, 2));
                if (dist < 150) {
                    // Observer effect: slow down and glow (simulated by color change if possible, but we'll use CSS overlays for complex effects)
                    b.frictionAir = 0.1;
                } else {
                    b.frictionAir = 0.02;
                }
            });
        });

        // Handle Re-start
        const restartRunner = () => Runner.run(runner, engine);
        window.addEventListener('restart-quantum', restartRunner);

        return () => {
            Render.stop(render);
            Runner.stop(runner);
            Engine.clear(engine);
            render.canvas.remove();
            window.removeEventListener('restart-quantum', restartRunner);
        };
    }, []);

    const handleConfirmReality = () => {
        window.open('https://buy.stripe.com/example', '_blank');
    };

    const runVisualizer = () => {
        setIsVisualizing(true);
        // Simulate particleization
        setTimeout(() => {
            setIsVisualizing(false);
            setShowVisualizer(false);
            setShowDashboard(true);

            // Auto-typing effect for the vision on the dashboard
            let i = 0;
            const text = visualizerMessage;
            setTypedVision("");
            const timer = setInterval(() => {
                setTypedVision(prev => prev + text[i]);
                i++;
                if (i >= text.length) clearInterval(timer);
            }, 100);
        }, 3000);
    };

    return (
        <div className="relative w-full h-[90vh] bg-black overflow-hidden select-none">
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <h2 className="text-[20vw] font-black text-white whitespace-nowrap">QUANTUM VOID</h2>
            </div>

            {/* Matter.js Canvas Container */}
            <div ref={sceneRef} className="absolute inset-0 w-full h-full" />

            {/* Floating UI Elements */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white/40 text-sm font-black tracking-[0.5em] uppercase"
                >
                    Observer Effect Mode Active
                </motion.h1>
                <p className="text-white/20 text-[10px] mt-2 font-bold tracking-widest">드래그하여 파동을 조작하고, 클릭하여 현실을 확정하세요</p>
            </div>

            {/* Quantum Mirror Button */}
            <button
                onClick={() => setShowVisualizer(true)}
                className="absolute bottom-12 right-12 z-30 p-4 border border-accent/30 rounded-full bg-black/50 backdrop-blur-xl text-accent hover:bg-accent hover:text-black transition-all flex items-center gap-2 group shadow-2xl shadow-accent/20"
            >
                <Zap size={20} className="group-hover:animate-pulse" />
                <span className="text-xs font-black uppercase tracking-tighter pr-2">미래 관찰하기</span>
            </button>

            {/* Modals */}
            <AnimatePresence>
                {selectedBook && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-10 relative shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: selectedBook.color }} />

                            <button
                                onClick={() => {
                                    setSelectedBook(null);
                                    window.dispatchEvent(new CustomEvent('restart-quantum'));
                                }}
                                className="absolute top-6 right-6 text-white/40 hover:text-white"
                            >
                                <X size={24} />
                            </button>

                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: selectedBook.color }}>Reality Found</span>
                                    <h2 className="text-3xl font-serif font-bold text-white leading-tight">{selectedBook.title}</h2>
                                    <p className="text-lg text-white/60 font-medium italic">{selectedBook.subtitle}</p>
                                </div>

                                <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                    <p className="text-sm text-center text-white/90 leading-relaxed font-bold">
                                        이 책은 단순한 정보 전달을 넘어, <br />
                                        당신의 <span style={{ color: selectedBook.color }}>지적 성취와 현실 창조 역량</span>을 획기적으로 높여줍니다.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 pt-4">
                                    <button
                                        onClick={handleConfirmReality}
                                        className="w-full py-5 rounded-2xl font-black text-black bg-white hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 group animate-pulse shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                                    >
                                        <span>지금 현실로 확정하기 (₩15,000)</span>
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <div className="flex justify-between items-center text-[9px] text-white/30 font-bold uppercase tracking-widest px-2">
                                        <span>98%의 독자가 변화를 경험했습니다</span>
                                        <span>Limited Wave State</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {showVisualizer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl"
                    >
                        <motion.div className="w-full max-w-md space-y-8 text-center">
                            <Sparkles size={48} className="mx-auto text-accent animate-pulse" />
                            <div className="space-y-4">
                                <h3 className="text-2xl font-serif font-bold text-white uppercase tracking-tighter">퀀텀 미러: 미래 투영</h3>
                                <p className="text-sm text-white/40">당신이 원하는 미래를 현재형으로 적고 &apos;관찰&apos;하세요.</p>
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="나는 이미 ...을 이루었다."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-accent/50 transition-all font-bold text-lg text-center"
                                    value={visualizerMessage}
                                    onChange={(e) => setVisualizerMessage(e.target.value)}
                                />
                                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform" />
                            </div>

                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={runVisualizer}
                                    disabled={isVisualizing || !visualizerMessage}
                                    className="w-full py-5 bg-accent text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 transition-all shadow-2xl shadow-accent/20"
                                >
                                    {isVisualizing ? (
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            <span>파동 입자화 중...</span>
                                        </div>
                                    ) : (
                                        "미래 현실로 고정하기 (Observe)"
                                    )}
                                </button>
                                <button
                                    onClick={() => {
                                        setShowVisualizer(false);
                                        setVisualizerMessage("");
                                    }}
                                    className="text-xs text-white/30 font-black uppercase tracking-widest hover:text-white transition-colors"
                                >
                                    Cancel Observation
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {showDashboard && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 z-[60] flex items-center justify-center p-6 bg-[#000000] overflow-y-auto"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a3c34_0%,transparent_70%)] opacity-30" />

                        <div className="w-full max-w-4xl relative space-y-12 py-20 text-center">
                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-[10px] font-black uppercase tracking-[0.3em]"
                                >
                                    Future Probability Collapsed
                                </motion.div>
                                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                                    {typedVision}
                                    <span className="inline-block w-1 h-12 md:h-16 bg-accent ml-2 animate-pulse" />
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1 }}
                                    className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-accent text-black rounded-2xl"><Zap size={20} /></div>
                                        <h4 className="text-xl font-bold text-white font-serif">당신을 위한 출력(Guide)</h4>
                                    </div>
                                    <ul className="space-y-4 text-sm text-white/60 leading-relaxed">
                                        <li className="flex gap-3"><div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" /> <span>이미 이루어진 사람처럼 생각하고 결정을 내리세요 (Being).</span></li>
                                        <li className="flex gap-3"><div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" /> <span>당신의 관점이 변하는 순간, 연관된 양자장(환경)이 재배치됩니다.</span></li>
                                        <li className="flex gap-3"><div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" /> <span>오늘부터 당신의 모든 행동은 &apos;성공한 결과&apos;의 확인 절차입니다.</span></li>
                                    </ul>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.5 }}
                                    className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-primary text-accent rounded-2xl"><Sparkles size={20} /></div>
                                        <h4 className="text-xl font-bold text-white font-serif">시각화 도구 추천</h4>
                                    </div>
                                    <p className="text-sm text-white/70 mb-6 italic">&quot;이 루틴을 통해 확정된 현실을 더 견고히 하세요.&quot;</p>
                                    <Link href="/originals" className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all group">
                                        <span className="text-xs font-bold text-white/90">Cosmic Mind 오리지널 북으로 주파수 맞추기</span>
                                        <ArrowRight size={16} className="text-accent group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>
                            </div>

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2 }}
                                onClick={() => {
                                    setShowDashboard(false);
                                    setVisualizerMessage("");
                                    window.dispatchEvent(new CustomEvent('restart-quantum'));
                                }}
                                className="px-10 py-5 border border-white/20 text-white/40 hover:text-white rounded-full text-xs font-black uppercase tracking-widest transition-all hover:bg-white/5"
                            >
                                Reality Field로 복귀
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
