"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Play, Plus, X, CheckCircle2, Clock } from "lucide-react";

const CATEGORIES = [
    { id: "wealth", label: "💰 부 & 풍요", color: "from-yellow-500 to-amber-400" },
    { id: "success", label: "🏆 성공 & 성취", color: "from-blue-500 to-indigo-400" },
    { id: "relationships", label: "❤️ 관계 & 사랑", color: "from-pink-500 to-rose-400" },
    { id: "health", label: "🌿 건강 & 활력", color: "from-green-500 to-emerald-400" },
    { id: "healing", label: "🌙 감정 힐링", color: "from-purple-500 to-violet-400" },
];

const AFFIRMATIONS: Record<string, string[]> = {
    wealth: [
        "나는 풍요로운 삶을 살 자격이 있습니다.",
        "돈은 나에게 자연스럽게 흘러들어 옵니다.",
        "나는 무한한 부의 에너지와 연결되어 있습니다.",
        "나의 수입은 매일 증가하고 있습니다.",
        "나는 재정적 자유를 누리고 있습니다.",
        "풍요는 나의 자연스러운 상태입니다.",
        "나는 돈을 잘 관리하고 증식시킵니다.",
        "기회는 항상 나를 향해 열려 있습니다.",
        "나는 원하는 모든 것을 이룰 재력이 있습니다.",
        "감사함이 더 많은 풍요를 불러옵니다.",
        "나는 부유하고 행복한 삶을 살고 있습니다.",
        "돈은 나의 좋은 친구입니다.",
        "나는 매일 새로운 수입원을 발견합니다.",
        "풍요의 우주는 나를 지지하고 있습니다.",
        "나의 꿈은 현실이 되고 있습니다.",
        "나는 투자에서 탁월한 성과를 거둡니다.",
        "나는 성공한 사람들의 마인드를 가지고 있습니다.",
        "내가 주는 가치만큼 풍요가 돌아옵니다.",
        "나는 매달 더 많은 돈을 벌고 있습니다.",
        "부는 나의 영적 권리입니다.",
    ],
    success: [
        "나는 성공하도록 태어났습니다.",
        "나의 목표는 이미 달성되었습니다.",
        "나는 매일 더 나은 버전의 나를 만들어 갑니다.",
        "성공은 나의 자연스러운 결과입니다.",
        "나는 어떤 도전도 극복할 수 있습니다.",
        "나의 잠재력은 무한합니다.",
        "나는 탁월한 리더십을 가지고 있습니다.",
        "나는 집중력과 결단력으로 목표를 이룹니다.",
        "실패는 없고 오직 배움만 있습니다.",
        "나는 내 분야의 최고가 되고 있습니다.",
        "나의 아이디어는 세상을 변화시킵니다.",
        "나는 매일 생산적이고 의미 있는 삶을 삽니다.",
        "성공한 사람들이 나를 끌어당깁니다.",
        "나는 시간을 현명하게 사용합니다.",
        "나는 위대한 성취를 이루기 위해 존재합니다.",
        "나의 노력은 반드시 빛을 발합니다.",
        "나는 꾸준함으로 모든 것을 이룹니다.",
        "나는 세상에 긍정적인 영향을 미칩니다.",
        "나는 이미 충분히 유능합니다.",
        "나는 지금 이 순간도 성공 중입니다.",
    ],
    relationships: [
        "나는 사랑받을 자격이 있습니다.",
        "나의 주변에는 좋은 사람들이 가득합니다.",
        "나는 깊고 의미 있는 관계를 맺습니다.",
        "나는 진심으로 사랑하고 사랑받습니다.",
        "내가 주는 사랑은 배로 돌아옵니다.",
        "나는 매력적이고 사람들을 끌어당깁니다.",
        "나의 관계는 건강하고 조화롭습니다.",
        "나는 경계를 설정하며 나를 존중합니다.",
        "좋은 사람들이 자연스럽게 내 삶에 들어옵니다.",
        "나는 열린 마음으로 사랑을 받아들입니다.",
        "나의 가족은 건강하고 행복합니다.",
        "나는 갈등을 지혜롭게 해결합니다.",
        "나는 진정한 우정을 소중히 여깁니다.",
        "사랑은 어디에나 있고 나는 그것을 봅니다.",
        "나는 완벽하지 않아도 사랑받습니다.",
        "나의 말은 따뜻하고 힘이 됩니다.",
        "나는 공감과 이해심이 풍부합니다.",
        "나와 함께하는 시간이 특별한 경험이 됩니다.",
        "나는 나 자신을 깊이 사랑합니다.",
        "나는 이미 사랑으로 둘러싸여 있습니다.",
    ],
    health: [
        "나의 몸은 건강하고 활력이 넘칩니다.",
        "나는 매일 더 건강해지고 있습니다.",
        "내 세포 하나하나가 생명력으로 가득 찹니다.",
        "나는 자연스럽게 건강한 선택을 합니다.",
        "나의 면역 체계는 완벽하게 작동합니다.",
        "나는 에너지가 넘치고 활기차게 살아갑니다.",
        "나의 몸은 스스로 치유하는 능력이 있습니다.",
        "나는 깊고 편안한 수면을 취합니다.",
        "나는 내 몸을 사랑하고 감사합니다.",
        "건강은 나의 가장 소중한 자산입니다.",
        "나는 매일 운동을 즐깁니다.",
        "나의 정신과 육체는 완벽한 조화를 이룹니다.",
        "나는 젊고 활력 있게 나이 들어갑니다.",
        "나의 모든 장기는 최적으로 기능합니다.",
        "나는 건강한 음식을 즐겨 먹습니다.",
        "나의 몸무게는 이상적인 상태를 유지합니다.",
        "나는 스트레스를 잘 다스립니다.",
        "나는 자연과 조화롭게 살아갑니다.",
        "나는 장수하며 풍요롭게 살아갑니다.",
        "건강한 삶을 위한 모든 것이 나에게 있습니다.",
    ],
    healing: [
        "나는 과거에서 자유롭습니다.",
        "나는 나 자신을 완전히 용서합니다.",
        "나는 평화롭고 안정된 내면을 가지고 있습니다.",
        "이 순간, 나는 완전합니다.",
        "나는 감정을 건강하게 표현하고 해방합니다.",
        "나는 내면의 고요함을 찾아갑니다.",
        "나의 상처는 아름다운 지혜로 변했습니다.",
        "나는 변화를 두려워하지 않습니다.",
        "나는 나 자신의 가장 좋은 친구입니다.",
        "불안은 지나가는 구름일 뿐입니다.",
        "나는 매 순간 현재에 존재합니다.",
        "나는 나를 비판하지 않고 받아들입니다.",
        "나의 가치는 타인의 시선에 달려있지 않습니다.",
        "나는 트라우마를 치유하고 성장했습니다.",
        "나는 새로운 시작을 기쁘게 맞이합니다.",
        "나는 충분히 좋은 사람입니다.",
        "나는 내 페이스대로 성장합니다.",
        "평온함은 나의 자연스러운 상태입니다.",
        "나는 기쁨을 선택할 수 있습니다.",
        "나는 사랑받기 위해 완벽할 필요가 없습니다.",
    ],
};

const DURATIONS = [
    { label: "30분", value: 30 },
    { label: "1시간", value: 60 },
    { label: "2시간", value: 120 },
    { label: "4시간", value: 240 },
    { label: "8시간", value: 480 },
    { label: "12시간", value: 720 },
];

export default function Phase2Affirmations() {
    const [activeCategory, setActiveCategory] = useState("wealth");
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [customText, setCustomText] = useState("");
    const [duration, setDuration] = useState(60);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleSelect = (text: string) => {
        setSelected(prev => {
            const next = new Set(prev);
            if (next.has(text)) next.delete(text);
            else if (next.size < 10) next.add(text);
            return next;
        });
    };

    const addCustom = () => {
        if (customText.trim() && selected.size < 10) {
            setSelected(prev => new Set([...prev, customText.trim()]));
            setCustomText("");
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <div className="text-5xl mb-4">🎙️</div>
                <h2 className="text-2xl font-bold text-white">Phase 2: 성공의 소리</h2>
                <p className="text-blue-200/70 text-sm">당신의 목소리가 담긴 확언이 잠재의식을 바꿉니다</p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${activeCategory === cat.id
                                ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                                : "bg-white/5 text-white/60 hover:bg-white/10"
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Selected Counter */}
            <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">선택된 확언: <span className="text-white font-bold">{selected.size}/10</span></span>
                {selected.size > 0 && (
                    <button onClick={() => setSelected(new Set())} className="text-red-400/70 hover:text-red-400 text-xs">
                        모두 해제
                    </button>
                )}
            </div>

            {/* Affirmations Grid */}
            <div className="grid gap-2 max-h-56 overflow-y-auto pr-1">
                {AFFIRMATIONS[activeCategory]?.map((text, i) => (
                    <motion.button
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        onClick={() => toggleSelect(text)}
                        className={`flex items-center gap-3 text-left p-3 rounded-xl border text-sm transition-all ${selected.has(text)
                                ? "bg-blue-500/20 border-blue-400/50 text-white"
                                : "bg-white/5 border-white/10 text-white/70 hover:border-white/30"
                            }`}
                    >
                        {selected.has(text) ? (
                            <CheckCircle2 size={16} className="text-blue-400 flex-shrink-0" />
                        ) : (
                            <div className="w-4 h-4 rounded-full border border-white/30 flex-shrink-0" />
                        )}
                        <span>{text}</span>
                    </motion.button>
                ))}
            </div>

            {/* Custom Input */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                <h3 className="text-white/80 text-sm font-semibold flex items-center gap-2">
                    <Plus size={16} className="text-blue-400" /> 나만의 확언 작성
                </h3>
                <div className="flex gap-2">
                    <input
                        value={customText}
                        onChange={e => setCustomText(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && addCustom()}
                        placeholder="나는..."
                        className="flex-1 bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-blue-400/60"
                    />
                    <button onClick={addCustom} disabled={!customText.trim() || selected.size >= 10}
                        className="px-4 py-2 bg-blue-500/80 hover:bg-blue-500 disabled:opacity-40 rounded-xl text-white font-bold text-sm transition-all">
                        추가
                    </button>
                </div>
            </div>

            {/* Selected List */}
            {selected.size > 0 && (
                <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/20 border border-blue-400/20 rounded-2xl p-4 space-y-2">
                    <h3 className="text-blue-300 text-sm font-bold">✅ 선택된 확언 목록</h3>
                    {[...selected].map((text, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="text-white/80 text-xs flex-1">{i + 1}. {text}</span>
                            <button onClick={() => toggleSelect(text)} className="text-white/30 hover:text-red-400 transition-colors">
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Playback Duration */}
            <div className="space-y-3">
                <h3 className="text-white/80 text-sm font-semibold flex items-center gap-2">
                    <Clock size={16} className="text-purple-400" /> 재생 시간 설정
                </h3>
                <div className="flex flex-wrap gap-2">
                    {DURATIONS.map(d => (
                        <button key={d.value} onClick={() => setDuration(d.value)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${duration === d.value
                                    ? "bg-purple-500 text-white"
                                    : "bg-white/5 text-white/60 hover:bg-white/10"
                                }`}
                        >
                            {d.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Record & Play UI */}
            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/30 border border-purple-400/30 rounded-2xl p-6 space-y-4 text-center">
                <div className="flex justify-center gap-6">
                    <button className="flex flex-col items-center gap-2 group">
                        <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-400/50 group-hover:border-red-400 flex items-center justify-center transition-all">
                            <Mic size={28} className="text-red-400" />
                        </div>
                        <span className="text-xs text-white/60">내 목소리 녹음</span>
                    </button>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        disabled={selected.size === 0}
                        className="flex flex-col items-center gap-2 group disabled:opacity-40"
                    >
                        <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all ${isPlaying
                                ? "bg-green-500/30 border-green-400 animate-pulse"
                                : "bg-green-500/10 border-green-400/40 group-hover:border-green-400"
                            }`}>
                            <Play size={28} className="text-green-400" fill={isPlaying ? "currentColor" : "none"} />
                        </div>
                        <span className="text-xs text-white/60">{isPlaying ? `재생 중 (${duration}분)` : "재생 시작"}</span>
                    </button>
                </div>
                <p className="text-purple-200/60 text-xs leading-relaxed">
                    🎧 당신의 목소리 + 바이노럴 비트가 결합되어<br />
                    잠재의식의 저항을 뛰어넘어 긍정 프로그래밍을 시작합니다
                </p>
            </div>
        </div>
    );
}
