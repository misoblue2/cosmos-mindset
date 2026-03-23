"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronRight } from "lucide-react";

const MENTORS = [
    { id: 1, name: "소크라테스", emoji: "🏛️", era: "고대 그리스", specialty: "자기 성찰 · 철학적 탐구", bio: "너 자신을 알라. 진정한 지혜는 자신의 무지를 아는 것에서 시작된다." },
    { id: 2, name: "플라톤", emoji: "📚", era: "고대 그리스", specialty: "이상적 삶 · 진리 탐구", bio: "최선의 삶이란 지혜를 사랑하며 끊임없이 성장하는 삶이다." },
    { id: 3, name: "아리스토텔레스", emoji: "🌿", era: "고대 그리스", specialty: "실천적 지혜 · 덕의 윤리", bio: "탁월함은 행동이 아니라 습관이다. 우리는 반복하는 것들의 결과물이다." },
    { id: 4, name: "마더 테레사", emoji: "🕊️", era: "20세기", specialty: "사랑 · 봉사 · 자비", bio: "사랑은 가까운 곳에서 시작됩니다. 지금 당신 곁에 있는 한 사람을 먼저 사랑하세요." },
    { id: 5, name: "법정스님", emoji: "🍃", era: "현대 한국", specialty: "무소유 · 내면의 자유", bio: "무소유란 아무것도 갖지 않는 것이 아니라, 불필요한 것에 집착하지 않는 것이다." },
    { id: 6, name: "에크하르트 톨레", emoji: "🌀", era: "현대", specialty: "지금 이 순간 · 깨어남", bio: "지금 이 순간을 살아가는 것. 그것이 인생의 전부이며 기쁨의 근원이다." },
    { id: 7, name: "밥 프록터", emoji: "💎", era: "현대", specialty: "끌어당김의 법칙 · 마인드셋", bio: "당신의 생각이 당신의 현실을 창조한다. 생각을 바꾸면 인생이 바뀐다." },
    { id: 8, name: "론다 번", emoji: "✨", era: "현대", specialty: "시크릿 · 긍정의 힘", bio: "당신이 집중하는 모든 것이 현실로 끌려온다. 원하는 것을 강렬히 원하라." },
    { id: 9, name: "얼 나이팅게일", emoji: "🌅", era: "20세기", specialty: "인간의 가장 이상한 비밀 · 성공", bio: "우리는 우리가 생각하는 것이 된다. 생각이 운명을 만든다." },
    { id: 10, name: "조셉 머피", emoji: "🔮", era: "20세기", specialty: "잠재의식의 힘 · 기도와 확언", bio: "잠재의식은 당신의 명령에 따른다. 확언으로 프로그래밍하면 현실이 된다." },
];

const REACTIONS = [
    { mood: "thinking", emoji: "🤔" },
    { mood: "nodding", emoji: "😌" },
    { mood: "smiling", emoji: "😊" },
    { mood: "inspired", emoji: "✨" },
];

const SCENARIOS = [
    {
        type: "현상 유지",
        icon: "🔄",
        color: "from-gray-600/30 to-slate-600/20",
        border: "border-gray-500/30",
        textColor: "text-gray-300",
    },
    {
        type: "과감한 혁신",
        icon: "🚀",
        color: "from-blue-600/30 to-indigo-600/20",
        border: "border-blue-400/30",
        textColor: "text-blue-300",
    },
    {
        type: "내면 성찰",
        icon: "🌸",
        color: "from-purple-600/30 to-violet-600/20",
        border: "border-purple-400/30",
        textColor: "text-purple-300",
    },
];

function generateAdvice(mentor: (typeof MENTORS)[0], concern: string): string {
    const templates: Record<number, string[]> = {
        1: [
            `그 고민에 대해 먼저 물어봐야 합니다 — 당신은 정말 그것을 원하는가, 아니면 두려움으로부터 도망치는 것인가? 참된 자아를 탐구하면 답을 찾을 것입니다.`,
            `내가 무소부지(無所不知)라 생각했지만, 결국 내가 아는 것은 아무것도 모른다는 것이었습니다. 말씀하신 상황도 마찬가지 - 먼저 겸손히 배우려는 자세가 필요합니다.`
        ],
        2: [
            `마음속에 품은 그 목표의 이상적인 모습을 먼저 그려보세요. 이데아의 세계에서 완벽한 해답이 이미 존재합니다. 그 진리를 향해 한 걸음씩 나아가세요.`,
            `현실은 이상적 형태의 그림자일 뿐입니다. 안고 계신 문제에서 진정한 선(善)이 무엇인지 바라보면 길이 보입니다.`
        ],
        3: [
            `말씀하신 바람은 한 번의 큰 결정이 아니라 매일의 작은 습관으로 이루어집니다. 탁월함은 반복에서 나옵니다.`,
            `중용(中庸)이 답입니다. 지금의 상황에서 극단을 피하고 균형 잡힌 접근으로 덕(德)을 실천하세요.`
        ],
        4: [
            `사랑이 모든 것의 답입니다. 현재의 막막함을 두려움이 아닌 사랑의 관점으로 바라보면 어떨까요? 가장 가까운 사람에게 작은 선행을 베풀어보세요.`,
            `그 목표를 향해 달려가다 지쳐있다면, 잠시 멈추고 다른 누군가를 도와보세요. 봉사 속에서 자신을 잃고, 자신을 찾습니다.`
        ],
        5: [
            `원하시는 결과에 대한 집착을 잠시 내려놓아 보세요. 무소유의 마음으로 바라보면 진정 필요한 것만 남습니다.`,
            `지금 이 순간, 당신에게 진정으로 필요한 것은 무엇인가요? 마음을 채우고 있는 불필요한 것들을 덜어내면 본질이 드러납니다.`
        ],
        6: [
            `지금 이 순간, 그 고민은 오직 당신의 생각 속에만 존재합니다. 머릿속 목소리를 끄고 현재로 돌아오세요. 진정한 힘은 지금 여기에 있습니다.`,
            `불안한 마음에 대한 생각들을 그저 관찰하되, 그 생각과 자신을 동일시하지 마세요. 당신은 생각이 아니라, 생각을 알아차리는 존재입니다.`
        ],
        7: [
            `당신의 잠재의식은 그 질문에 대한 답을 이미 알고 있습니다. 그것을 현실로 끌어당기기 위해, 이미 생생하게 다 이루어진 것처럼 느껴보세요!`,
            `끌어당김의 법칙은 흔들리지 않습니다. 원하는 결과를 선명하게 머릿속에 그리고, 그 성취의 감정을 먼저 느끼세요. 우주가 그 진동에 반응할 것입니다.`
        ],
        8: [
            `바라시는 상황이 완벽하게 해결된 모습을 지금 당장 상상하세요. 깊은 감사함과 기쁨을 느끼면서요! 시크릿이 작동하기 시작합니다.`,
            `오직 원하는 것에만 집중하세요. 지금 두려워하는 것이 아닌, 간절히 바라는 것을 바라보면 그것이 곧 현실이 됩니다.`
        ],
        9: [
            `성공이란 가치 있는 목표를 향해 점진적으로 나아가는 것입니다. 말씀하신 목표를 위해 오늘 당장 할 수 있는 가장 작은 행동 하나를 찾아 실행하세요.`,
            `우리는 우리가 생각하는 것이 됩니다. 그토록 바라는 모습으로 이미 성공한 자신을 매일 아침 상상하세요. 인간의 가장 위대한 비밀이 바로 여기에 있습니다.`
        ],
        10: [
            `잠재의식 깊은 곳에 그 목표가 반드시 이루어진다는 확신을 심어놓으세요. 주무시기 전 긍정 확언을 반복하면, 수면 중 잠재의식이 그것을 현실로 빚어냅니다.`,
            `당신의 잠재의식은 24시간 일하고 있습니다. 원하시는 그 모습에 대한 긍정적 이미지를 명확히 밀어 넣으면, 잠재의식이 알아서 가장 완벽한 길을 찾아낼 것입니다.`
        ],
    };
    const arr = templates[mentor.id] || [mentor.bio];
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateScenario(type: string, concern: string): { timeline: string; metaphor: string; description: string } {
    const scenarios: Record<string, { timeline: string; metaphor: string; description: string }> = {
        "현상 유지": {
            timeline: "6개월 ~ 1년",
            metaphor: "🌊 잔잔한 강물처럼",
            description: `지금의 사고방식과 행동을 유지한다면, 말씀하신 상황은 시간이 지남에 따라 서서히 안정화될 것입니다. 큰 변화 없이 무난하게 흘러가며, 안전하지만 폭발적인 성장의 속도는 기대하기 어려울 수 있습니다.`,
        },
        "과감한 혁신": {
            timeline: "3~6개월",
            metaphor: "🚀 로켓처럼 도약하다",
            description: `두려움을 밀어내고 평소 직관에 반하는 과감한 행동을 선택한다면, 이 상황은 3개월 내 극적인 전환점을 맞이할 것입니다. 처음엔 엄청난 저항감과 혼란이 따르지만, 6개월 후엔 목표하시던 전혀 다른 차원의 성취가 펼쳐집니다.`,
        },
        "내면 성찰": {
            timeline: "1~3개월",
            metaphor: "🌸 꽃망울이 피어나듯",
            description: `외부의 해결책을 찾기보다 조용히 내면으로 돌아와 진정한 동기를 바라보면, 1개월 안에 명확한 깨달음과 통찰이 찾아옵니다. 서두르지 말고 자기 자신과의 대화를 통해 근본적인 해답을 발견하게 될 것입니다.`,
        },
    };
    return scenarios[type] || scenarios["내면 성찰"];
}

export default function Phase4Mentors() {
    const [concern, setConcern] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [recommendedMentors, setRecommendedMentors] = useState<(typeof MENTORS)>([]);
    const [activeMentor, setActiveMentor] = useState<(typeof MENTORS)[0] | null>(null);
    const [mentorReaction, setMentorReaction] = useState(0);
    const [advice, setAdvice] = useState("");

    const handleSubmit = () => {
        if (!concern.trim()) return;
        // Pick 3 random mentors (weighted by concern keywords)
        const shuffled = [...MENTORS].sort(() => Math.random() - 0.5);
        setRecommendedMentors(shuffled.slice(0, 3));
        setSubmitted(true);
    };

    const handleMentorClick = (mentor: typeof MENTORS[0]) => {
        setActiveMentor(mentor);
        setMentorReaction(1); // thinking
        setTimeout(() => setMentorReaction(2), 1200); // nodding
        setTimeout(() => setMentorReaction(3), 2400); // smiling
        setAdvice(generateAdvice(mentor, concern));
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <div className="text-5xl mb-4">🧙</div>
                <h2 className="text-2xl font-bold text-white">Phase 4: 10대 멘토 상담</h2>
                <p className="text-indigo-200/70 text-sm">동서양 10대 현자들이 당신의 고민을 들어드립니다</p>
            </div>

            {/* All 10 Mentors Display */}
            <div className="grid grid-cols-5 gap-2">
                {MENTORS.map((m) => (
                    <motion.div key={m.id} whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-indigo-400/40 transition-all text-center">
                        <span className="text-2xl">{m.emoji}</span>
                        <span className="text-white/70 text-[10px] leading-tight">{m.name}</span>
                    </motion.div>
                ))}
            </div>

            {/* Concern Input */}
            {!submitted ? (
                <div className="space-y-3">
                    <textarea
                        value={concern}
                        onChange={e => setConcern(e.target.value)}
                        placeholder="지금 당신의 고민이나 질문을 자유롭게 적어주세요...&#10;예: 사업을 시작하려는데 두렵습니다. 어떻게 해야 할까요?"
                        rows={4}
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-indigo-400/60 resize-none"
                    />
                    <button onClick={handleSubmit} disabled={!concern.trim()}
                        className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 disabled:opacity-40 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all">
                        <Send size={18} /> 현자들에게 질문하기
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/70 text-sm italic">
                        💬 &quot;{concern}&quot;
                    </div>

                    {/* Recommended 3 Mentors */}
                    <div className="space-y-2">
                        <p className="text-indigo-300 text-xs font-bold uppercase tracking-wide">✨ 추천 현자 3인</p>
                        <div className="grid gap-3">
                            {recommendedMentors.map((mentor) => (
                                <motion.button key={mentor.id} onClick={() => handleMentorClick(mentor)}
                                    whileHover={{ scale: 1.02 }}
                                    className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${activeMentor?.id === mentor.id
                                            ? "bg-indigo-500/20 border-indigo-400/50"
                                            : "bg-white/5 border-white/10 hover:border-indigo-400/30"
                                        }`}>
                                    <motion.div
                                        animate={{ rotate: activeMentor?.id === mentor.id ? [0, -5, 5, -3, 0] : 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="text-4xl flex-shrink-0"
                                    >
                                        {activeMentor?.id === mentor.id ? REACTIONS[mentorReaction]?.emoji || mentor.emoji : mentor.emoji}
                                    </motion.div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-white font-bold text-sm">{mentor.name}</span>
                                            <span className="text-white/40 text-xs">{mentor.era}</span>
                                        </div>
                                        <p className="text-white/60 text-xs mt-0.5">{mentor.specialty}</p>
                                    </div>
                                    <ChevronRight size={16} className="text-white/30 flex-shrink-0" />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Mentor Advice */}
                    <AnimatePresence>
                        {activeMentor && advice && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="bg-gradient-to-br from-indigo-900/40 to-purple-900/30 border border-indigo-400/30 rounded-2xl p-5 space-y-3"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{REACTIONS[mentorReaction]?.emoji || activeMentor.emoji}</span>
                                    <div>
                                        <p className="text-white font-bold text-sm">{activeMentor.name}</p>
                                        <p className="text-indigo-300/60 text-xs">{activeMentor.specialty}</p>
                                    </div>
                                </div>
                                <p className="text-indigo-100/90 text-sm leading-relaxed italic">&quot;{advice}&quot;</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 3 Future Scenarios */}
                    <div className="space-y-3">
                        <p className="text-white/60 text-xs font-bold uppercase tracking-wide">🔭 3가지 미래 시나리오</p>
                        {SCENARIOS.map((s) => {
                            const sc = generateScenario(s.type, concern);
                            return (
                                <div key={s.type} className={`bg-gradient-to-r ${s.color} border ${s.border} rounded-2xl p-4 space-y-2`}>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">{s.icon}</span>
                                        <span className={`font-bold text-sm ${s.textColor}`}>{s.type}</span>
                                        <span className="ml-auto text-white/40 text-xs">{sc.timeline}</span>
                                    </div>
                                    <p className="text-white/50 text-xs">{sc.metaphor}</p>
                                    <p className="text-white/75 text-xs leading-relaxed">{sc.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    <button onClick={() => { setSubmitted(false); setConcern(""); setActiveMentor(null); setAdvice(""); }}
                        className="w-full py-2 text-white/40 hover:text-white/70 text-sm transition-colors">
                        ← 다른 고민 상담하기
                    </button>
                </div>
            )}
        </div>
    );
}
