"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronRight, Download, Loader2 } from "lucide-react";

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
        type: "단단한 뿌리 내리기",
        icon: "🌱",
        color: "from-emerald-600/30 to-teal-600/20",
        border: "border-emerald-500/30",
        textColor: "text-emerald-300",
        bgUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1080&h=1920&fit=crop"
    },
    {
        type: "상식을 깨는 결단",
        icon: "⚡",
        color: "from-blue-600/30 to-indigo-600/20",
        border: "border-blue-400/30",
        textColor: "text-blue-300",
        bgUrl: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=1080&h=1920&fit=crop"
    },
    {
        type: "완전한 비움과 통찰",
        icon: "🌌",
        color: "from-purple-600/30 to-violet-600/20",
        border: "border-purple-400/30",
        textColor: "text-purple-300",
        bgUrl: "https://images.unsplash.com/photo-1518774780512-4fb37a912165?w=1080&h=1920&fit=crop"
    },
];

function generateAdvice(mentor: (typeof MENTORS)[0]): string {
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

function generateScenario(type: string): { metaphor: string; description: string } {
    const scenarios: Record<string, { metaphor: string; description: string }> = {
        "단단한 뿌리 내리기": {
            metaphor: "🧱 매일 벽돌 한 장을 쌓듯",
            description: `거창한 목표에 압도되지 말고, 오늘 당장 실천할 수 있는 가장 작은 행동 하나에 집중하세요. 현실의 제약을 인정하고, 그 안에서 무리 없이 실행 가능한 것부터 차근차근 해결해나가는 것이 지금 가장 빠르고 확실한 길입니다.`,
        },
        "상식을 깨는 결단": {
            metaphor: "🚀 중력의 궤도를 벗어나는 로켓처럼",
            description: `지금까지 유지해온 안전한 방식과 남들의 견해에서 완전히 벗어나세요. 가슴 속에서 가장 두려워하면서도 끌리는 그 '미친 생각'을 실행할 때입니다. 과감한 결단만이 현재의 교착 상태를 뚫고 퀀텀 점프를 만들어냅니다.`,
        },
        "완전한 비움과 통찰": {
            metaphor: "🪞 고요한 호수 수면처럼",
            description: `애써 정답을 찾으려는 모든 노력을 멈추고 내면을 비워내세요. 통제하고 해결해야 한다는 억지스러운 집착을 내려놓을 때, 텅 빈 무의식의 공간으로 전혀 예상치 못한 기발한 영감과 본질적인 해답이 선명하게 떠오르게 될 것입니다.`,
        },
    };
    return scenarios[type] || scenarios["완전한 비움과 통찰"];
}

export default function Phase4Mentors() {
    const [concern, setConcern] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [recommendedMentors, setRecommendedMentors] = useState<(typeof MENTORS)>([]);
    const [activeMentor, setActiveMentor] = useState<(typeof MENTORS)[0] | null>(null);
    const [mentorReaction, setMentorReaction] = useState(0);
    const [advice, setAdvice] = useState("");
    const [downloadingScenario, setDownloadingScenario] = useState<string | null>(null);

    const handleSubmit = () => {
        if (!concern.trim()) return;
        const shuffled = [...MENTORS].sort(() => Math.random() - 0.5);
        setRecommendedMentors(shuffled.slice(0, 3));
        setSubmitted(true);
    };

    const handleMentorClick = (mentor: typeof MENTORS[0]) => {
        setActiveMentor(mentor);
        setMentorReaction(1);
        setTimeout(() => setMentorReaction(2), 1200);
        setTimeout(() => setMentorReaction(3), 2400);
        setAdvice(generateAdvice(mentor));
    };

    const downloadScenarioFrame = async (s: typeof SCENARIOS[0], sc: { metaphor: string; description: string }) => {
        setDownloadingScenario(s.type);
        try {
            const canvas = document.createElement("canvas");
            canvas.width = 1080;
            canvas.height = 1920; 
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Background Collage Image
            const bgImg = new window.Image();
            bgImg.crossOrigin = "anonymous";
            bgImg.src = s.bgUrl; 
            
            await new Promise((res) => {
                bgImg.onload = res;
                bgImg.onerror = res; 
            });

            if (bgImg.width > 0) {
                ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
            } else {
                ctx.fillStyle = "#EAE6DF";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // Darken overlay
            ctx.fillStyle = "rgba(10, 15, 25, 0.4)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Passpartout Mat (White Frame)
            const margin = 80;
            const pmWidth = canvas.width - margin * 2;
            const pmHeight = canvas.height - margin * 2;
            
            ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
            ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
            ctx.shadowBlur = 40;
            ctx.shadowOffsetX = 10;
            ctx.shadowOffsetY = 20;
            ctx.fillRect(margin, margin, pmWidth, pmHeight);
            ctx.shadowColor = "transparent";

            // Inner Goldline
            ctx.strokeStyle = "#D4AF37"; 
            ctx.lineWidth = 4;
            ctx.strokeRect(margin + 20, margin + 20, pmWidth - 40, pmHeight - 40);

            // Text Setup
            ctx.textAlign = "center";
            ctx.fillStyle = "#222222";
            
            ctx.font = "80px sans-serif";
            ctx.fillText(s.icon, canvas.width / 2, margin + 250);
            
            ctx.font = "bold 60px 'Pretendard', 'Malgun Gothic', 'Noto Sans KR', sans-serif";
            ctx.fillText(s.type, canvas.width / 2, margin + 380);
            
            ctx.font = "italic 38px 'Pretendard', 'Malgun Gothic', 'Noto Sans KR', sans-serif";
            ctx.fillStyle = "#666666";
            ctx.fillText(sc.metaphor, canvas.width / 2, margin + 480);

            // Line Separator
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 120, margin + 580);
            ctx.lineTo(canvas.width / 2 + 120, margin + 580);
            ctx.strokeStyle = "#D4AF37";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Word wrap description
            ctx.font = "38px 'Pretendard', 'Malgun Gothic', 'Noto Sans KR', sans-serif";
            ctx.fillStyle = "#444444";
            const words = sc.description.split(" ");
            let line = "";
            let y = margin + 740;
            const lineHeight = 65;
            const maxWidth = pmWidth - 140;

            for (let i = 0; i < words.length; i++) {
                const testLine = line + words[i] + " ";
                const metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && i > 0) {
                    ctx.fillText(line, canvas.width / 2, y);
                    line = words[i] + " ";
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, canvas.width / 2, y);

            // Footer / Logo Space
            ctx.font = "bold 32px 'Pretendard', sans-serif";
            ctx.fillStyle = "#A38634";
            ctx.fillText("✨ Temple of Wisdom", canvas.width / 2, canvas.height - margin - 140);
            ctx.font = "24px 'Pretendard', sans-serif";
            ctx.fillStyle = "#BBBBBB";
            ctx.fillText("Guidance that moves your heart", canvas.width / 2, canvas.height - margin - 80);

            // Trigger Download
            const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, "image/jpeg", 0.95));
            if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Wisdom_Guidance_${s.type.replace(/\s+/g, "_")}.jpg`;
                a.click();
                URL.revokeObjectURL(url);
            }
        } catch(e) {
            console.error(e);
            alert("액자 이미지 생성 중 오류가 발생했습니다.");
        } finally {
            setDownloadingScenario(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <div className="text-5xl mb-4">🧙</div>
                <h2 className="text-2xl font-bold text-white">Phase 4: 10대 멘토 상담</h2>
                <p className="text-indigo-200/70 text-sm">동서양 10대 현자들이 당신의 고민을 들어드립니다</p>
            </div>

            <div className="grid grid-cols-5 gap-2">
                {MENTORS.map((m) => (
                    <motion.div key={m.id} whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-indigo-400/40 transition-all text-center">
                        <span className="text-2xl">{m.emoji}</span>
                        <span className="text-white/70 text-[10px] leading-tight">{m.name}</span>
                    </motion.div>
                ))}
            </div>

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
                        <Send size={18} /> 현자들에게 조언 구하기
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/70 text-sm italic">
                        💬 &quot;{concern}&quot;
                    </div>

                    <div className="space-y-2">
                        <p className="text-indigo-300 text-xs font-bold uppercase tracking-wide">✨ 당신을 위한 맞춤 추천 현자 3인</p>
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

                    {/* 3 Actionable Scenarios */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                        <p className="text-white/90 text-sm font-bold tracking-wide">💡 제안하는 행동 솔루션 3가지</p>
                        <p className="text-white/50 text-xs mb-2">가장 마음에 와닿는 해답 하나를 선택해 액자 카드로 소장하세요.</p>
                        {SCENARIOS.map((s) => {
                            const sc = generateScenario(s.type);
                            const isDownloading = downloadingScenario === s.type;
                            return (
                                <button key={s.type} 
                                    onClick={() => downloadScenarioFrame(s, sc)}
                                    disabled={isDownloading}
                                    className={`w-full text-left bg-gradient-to-r hover:brightness-110 ${s.color} border ${s.border} rounded-2xl p-5 space-y-3 group transition-all`}>
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{s.icon}</span>
                                        <div>
                                            <span className={`block font-bold text-[15px] ${s.textColor}`}>{s.type}</span>
                                            <span className="text-white/60 text-[11px]">{sc.metaphor}</span>
                                        </div>
                                        <div className="ml-auto flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full text-white/80 group-hover:bg-white/20 transition-all text-xs">
                                            {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                                            저장
                                        </div>
                                    </div>
                                    <p className="text-white/80 text-[13px] leading-relaxed font-medium">{sc.description}</p>
                                </button>
                            );
                        })}
                    </div>

                    <button onClick={() => { setSubmitted(false); setConcern(""); setActiveMentor(null); setAdvice(""); }}
                        className="w-full py-4 text-white/40 hover:text-white/70 text-sm transition-colors font-semibold">
                        ← 새로운 고민 질문하기
                    </button>
                </div>
            )}
        </div>
    );
}
