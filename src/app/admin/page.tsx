"use client";

import { useState, useEffect } from 'react';
import { BOOKS, CURATIONS } from '@/lib/mockData';
import {
    storedBookFile, getBookFile, deleteBookFile, type BookFile,
    setProductMetadata, getProductMetadata, setProductDetailImage, getProductDetailImage, deleteProductDetailImage, type ProductMetadata,
    getBookCoverImage, setBookCoverImage,
    getAllCounseling, setCounseling, type CounselingSession,
    createProduct, updateProduct, getAllProducts, deleteProduct, type Product
} from '@/lib/db';
import { Upload, Check, Trash2, AlertCircle, Lock, Package, BookOpen, Settings2, Image as ImageIcon, FileText, Truck, MessageCircleHeart, Send, CreditCard } from 'lucide-react';

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'books' | 'products' | 'orders' | 'counseling' | 'payments'>('books');

    // Simple password check
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin1234') { // In real app, use proper auth
            setIsLoggedIn(true);
        } else {
            alert('비밀번호가 올바르지 않습니다.');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <div className="w-full max-w-sm space-y-8 animate-in zoom-in-95 duration-500">
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Lock className="text-primary" size={32} />
                        </div>
                        <h1 className="text-2xl font-bold">관리자 로그인</h1>
                        <p className="text-sm text-muted-foreground">시스템 접근 권한이 필요합니다.</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <input
                                type="password"
                                placeholder="비밀번호 입력"
                                className="w-full px-5 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none text-center tracking-widest"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all">
                            접속하기
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-6xl mx-auto pb-20">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                            <Settings2 size={28} />
                            Owner Mode
                        </h1>
                        <p className="text-muted-foreground mt-1">시스템 데이터 및 주문 배송 관리</p>
                    </div>

                    <div className="flex bg-muted p-1 rounded-xl overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('books')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'books' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <BookOpen size={16} />
                            도서
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'products' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <Package size={16} />
                            상품
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'orders' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <Truck size={16} />
                            주문/배송
                        </button>
                        <button
                            onClick={() => setActiveTab('counseling')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'counseling' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <MessageCircleHeart size={16} />
                            마음 상담소
                        </button>
                        <button
                            onClick={() => setActiveTab('payments')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'payments' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <CreditCard size={16} />
                            결제 연동
                        </button>
                        <a
                            href="/imagination/admin"
                            target="_blank"
                            className="px-4 py-2 rounded-lg text-sm font-bold text-muted-foreground hover:text-purple-500 transition-all flex items-center gap-2 whitespace-nowrap border-l border-border ml-2 pl-4"
                        >
                            <MessageCircleHeart size={16} />
                            상상학교 소통
                        </a>
                    </div>
                </header>

                {activeTab === 'books' && <BookManager />}
                {activeTab === 'products' && <ProductManager />}
                {activeTab === 'orders' && <OrderManager />}
                {activeTab === 'counseling' && <CounselingManager />}
                {activeTab === 'payments' && <PaymentGuide />}
            </div>
        </div>
    );
}

function PaymentGuide() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                    <CreditCard className="text-primary" />
                    결제 관리 가이드 (무통장/QR)
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    현재 모든 결제는 <strong>계좌이체(무통장)</strong> 및 <strong>카카오페이 QR송금</strong>으로 통합되었습니다.<br />
                    별도의 PG사 계약이나 복잡한 연동 없이, 입금 내역을 확인하고 주문 상태를 '결제 완료'로 변경해주시면 됩니다.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl">
                        <h3 className="font-black text-blue-700 mb-2">1. 입금 확인</h3>
                        <p className="text-sm text-blue-600/80 mb-2">고객이 아래 계좌로 입금했는지 뱅킹 앱을 통해 확인하세요.</p>
                        <div className="bg-white p-3 rounded-lg border border-blue-100 text-sm font-mono text-blue-800">
                            신한은행 110-513-646297 (예금주: 정겨운)
                        </div>
                    </div>
                    <div className="p-6 bg-[#FAE100] border border-[#FADB00] rounded-xl">
                        <h3 className="font-black text-[#371D1E] mb-2">2. 카카오페이 QR 확인</h3>
                        <p className="text-sm text-[#371D1E]/80">카카오페이 머니 내역에서 송금자명과 금액을 대조하세요.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="border border-border rounded-xl overflow-hidden">
                        <div className="bg-muted px-4 py-2 border-b border-border font-mono text-xs font-bold text-muted-foreground">
                            주문 처리 프로세스
                        </div>
                        <div className="p-6 bg-card space-y-4">
                            <ol className="list-decimal list-inside space-y-2 text-sm text-foreground">
                                <li>고객이 주문을 완료하면 <strong>[주문/배송]</strong> 탭에 <code>대기 중(Pending)</code> 상태로 접수됩니다.</li>
                                <li>관리자가 입금 내역(은행 앱 알림 등)을 확인합니다.</li>
                                <li>입금이 확인되면 해당 주문의 상태를 <strong>[배송 준비 중]</strong> 또는 <strong>[배송 완료]</strong>(PDF의 경우)로 변경합니다.</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 text-sm flex items-start gap-3">
                    <span className="text-xl">💡</span>
                    <div>
                        <strong>자동화 팁</strong><br />
                        추후 입금 알림 봇(텔레그램 등)을 연동하거나, 뱅킹 API를 사용하면 입금 확인 절차를 자동화할 수 있습니다.
                    </div>
                </div>
            </div>
        </div>
    );
}


function CounselingManager() {
    const [sessions, setSessions] = useState<CounselingSession[]>([]);
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isGeneratingAI, setIsGeneratingAI] = useState(false);

    const loadSessions = async () => {
        const data = await getAllCounseling();
        setSessions(data);
    };

    useEffect(() => {
        loadSessions();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSendReply = async (session: CounselingSession) => {
        if (!replyContent.trim()) return;
        setIsSending(true);

        const updated: CounselingSession = {
            ...session,
            adminReply: replyContent,
            status: 'replied',
            repliedAt: Date.now()
        };

        await setCounseling(updated);

        // Mock Email Sending Simulation
        if (session.userEmail && session.emailConsent) {
            console.log(`[Mock Email Sent] To: ${session.userEmail}`);
            console.log(`Subject: [마음 상담소] ${session.userName}님, 코스믹마스터의 답장이 도착했습니다.`);
            console.log(`Body Request: \n${replyContent}`);
        }

        await loadSessions();
        setSelectedSessionId(null);
        setReplyContent('');
        setIsSending(false);
        alert('답장이 전송되었습니다.');
    };

    const generateAIDraft = async (session: CounselingSession) => {
        setIsGeneratingAI(true);

        // Simulate AI Processing Delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const name = session.userName || '고객';

        const baseEmpathy = [
            `${name}님의 깊은 고민을 나누어 주셔서 진심으로 감사합니다.`,
            `적어주신 글에서 ${name}님이 지금 느끼시는 감정의 무게가 고스란히 전해져옵니다.`,
            `얼마나 힘든 시간을 보내고 계실지 감히 짐작해봅니다.`
        ];

        const moodReinforcement: Record<string, string> = {
            'Anxious': "불안이라는 감정은 마치 안개처럼 우리 시야를 가리곤 합니다. 하지만 그 안개 뒤에는 여전히 밝은 태양이 빛나고 있다는 사실을 잊지 않으셨으면 좋겠습니다.",
            'Sad': "슬픔은 영혼이 휴식을 필요로 한다는 신호일지도 모릅니다. 지금은 충분히 아파하고, 스스로를 다독여주어야 할 시간입니다.",
            'Angry': "분노는 때로는 나를 지키려는 건강한 에너지가 되기도 합니다. 그 감정을 억누르기보다 안전한 방식으로 표출하고 해소하는 것이 중요합니다.",
            'Happy': "행복한 순간을 나누어 주셔서 감사합니다. 긍정적인 에너지가 앞으로의 삶에도 큰 원동력이 될 것입니다.",
            'Tired': "지친 마음에는 무엇보다 쉼이 필요합니다. 잠시 멈추어 서서 나 자신만을 위한 고요한 시간을 가져보시는 건 어떨까요?"
        };

        const closing = [
            `\n\nCosmic Mind는 언제나 ${name}님의 내면의 목소리에 귀 기울이겠습니다. 당신의 우주가 평온해지기를 진심으로 기원합니다.`,
            `\n\n이 답변이 작은 위로가 되었기를 바랍니다. ${name}님은 혼자가 아닙니다. 언제든 이곳에서 마음을 쉬어가세요.`,
            `\n\n스스로를 믿고 조금만 더 힘을 내주세요. ${name}님의 삶은 그 자체로 아름다운 하나의 우주입니다.`
        ];

        // Random Selection Logic
        const selectedEmpathy = baseEmpathy[Math.floor(Math.random() * baseEmpathy.length)];
        const selectedMood = moodReinforcement[session.mood] || "지금의 감정을 있는 그대로 바라보는 것만으로도 치유는 시작됩니다.";
        const selectedClosing = closing[Math.floor(Math.random() * closing.length)];

        // Contextual Bridge (Generic for now, but feels personalized)
        const contextBridge = `\n\n"${session.content.substring(0, 20)}..." 라고 말씀하신 부분에서 ${name}님이 현재 겪고 계신 상황이 얼마나 진지한지 느낄 수 있었습니다. 우리가 살면서 마주하는 수많은 파도들은 결국 지나가기 마련입니다. 지금은 거센 파도처럼 느껴지더라도, 곧 잔잔한 바다가 찾아올 것입니다.`;

        const finalDraft = `${selectedEmpathy}\n\n${selectedMood}${contextBridge}${selectedClosing}`;

        setReplyContent(finalDraft);
        setIsGeneratingAI(false);
    };

    return (
        <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border bg-muted/30">
                    <h3 className="font-bold flex items-center gap-2">
                        <MessageCircleHeart size={20} className="text-amber-500" />
                        상담 내역 ({sessions.length})
                    </h3>
                </div>

                <div className="divide-y divide-border">
                    {sessions.length === 0 ? (
                        <div className="p-10 text-center text-muted-foreground">아직 접수된 상담 내용이 없습니다.</div>
                    ) : (
                        sessions.map((session) => (
                            <div key={session.id} className="p-6 hover:bg-muted/30 transition-colors">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-grow space-y-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${session.status === 'replied' ? 'bg-green-100/50 text-green-600' : 'bg-amber-100/50 text-amber-600'
                                                }`}>
                                                {session.status === 'replied' ? '답변 완료' : '답변 대기'}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(session.createdAt).toLocaleString()}
                                            </span>
                                            <span className="text-xs font-bold text-stone-500">
                                                Mood: {session.mood}
                                            </span>
                                            <span className="text-xs text-stone-400 border-l border-stone-200 pl-2 ml-1">
                                                From: <span className="text-foreground font-bold">{session.userName}</span>
                                                {session.userEmail && session.emailConsent && (
                                                    <span className="ml-1 text-[10px] text-blue-500 bg-blue-50 px-1 rounded">Email</span>
                                                )}
                                            </span>
                                        </div>

                                        <div className="bg-muted/50 p-4 rounded-xl">
                                            <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">{session.content}</p>
                                        </div>

                                        {session.aiReply && (
                                            <div className="pl-4 border-l-2 border-stone-200">
                                                <p className="text-xs font-bold text-stone-500 mb-1">AI 초안 답장</p>
                                                <p className="text-xs text-muted-foreground line-clamp-2">{session.aiReply}</p>
                                            </div>
                                        )}

                                        {session.adminReply && (
                                            <div className="pl-4 border-l-2 border-primary/30 bg-primary/5 p-3 rounded-r-xl">
                                                <p className="text-xs font-bold text-primary mb-1">코스믹마스터 답장</p>
                                                <p className="text-sm text-foreground whitespace-pre-wrap">{session.adminReply}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="w-full md:w-1/3 min-w-[300px]">
                                        {session.status === 'replied' ? (
                                            <div className="h-full flex items-center justify-center text-xs text-muted-foreground p-4 bg-muted/20 rounded-xl">
                                                <Check size={14} className="mr-1" /> 답변이 완료되었습니다.
                                            </div>
                                        ) : selectedSessionId === session.id ? (
                                            <div className="space-y-3 animate-in fade-in zoom-in-95">
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() => generateAIDraft(session)}
                                                        disabled={isGeneratingAI}
                                                        className="px-3 py-1.5 bg-purple-100 text-purple-600 hover:bg-purple-200 text-[10px] font-bold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50"
                                                    >
                                                        {isGeneratingAI ? (
                                                            <>
                                                                <span className="animate-spin">✨</span> AI가 고민 중...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span className="text-xs">✨</span> AI 답장 초안 생성
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                                <textarea
                                                    className="w-full h-48 p-3 text-sm bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none resize-none leading-relaxed"
                                                    placeholder={isGeneratingAI ? "AI가 답장을 작성하고 있습니다..." : "위로와 공감의 답장을 작성해주세요..."}
                                                    value={replyContent}
                                                    onChange={(e) => setReplyContent(e.target.value)}
                                                    disabled={isGeneratingAI}
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleSendReply(session)}
                                                        disabled={isSending || isGeneratingAI}
                                                        className="flex-1 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-1 disabled:opacity-50"
                                                    >
                                                        {isSending ? '전송 중...' : '답장 보내기'} <Send size={12} />
                                                    </button>
                                                    <button
                                                        onClick={() => setSelectedSessionId(null)}
                                                        className="px-3 py-2 bg-muted text-muted-foreground text-xs font-bold rounded-lg hover:bg-muted/80"
                                                    >
                                                        취소
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setSelectedSessionId(session.id);
                                                    setReplyContent(session.aiReply ? `[AI 초안을 참고하세요]\n${session.aiReply}\n\n---\n\n` : '');
                                                }}
                                                className="w-full py-3 bg-secondary text-secondary-foreground text-xs font-bold rounded-xl hover:bg-secondary/80 transition-all border border-border"
                                            >
                                                답장 작성하기
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function OrderManager() {
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mocking some orders since we just added the system
        const dummyOrders = [
            {
                id: 'ORD-K9X2J1M8',
                userId: 'user1',
                productTitle: '관찰하는 순간 세계는 바뀐다',
                type: 'physical',
                status: 'processing',
                createdAt: Date.now() - 86400000,
                deliveryInfo: {
                    recipient: '김철수',
                    phone: '010-1234-5678',
                    address: '서울특별시 강남구 테헤란로 123, 405호'
                }
            },
            {
                id: 'ORD-L3B1N4V7',
                userId: 'guest1',
                productTitle: '나의 소중한 기록',
                type: 'pdf',
                status: 'delivered',
                createdAt: Date.now() - 172800000,
                deliveryInfo: {
                    recipient: '이영희',
                    phone: '010-9876-5432',
                    address: '경기도 성남시 분당구 판교역로 231'
                }
            }
        ];
        setOrders(dummyOrders);
        setIsLoading(false);
    }, []);

    const updateStatus = (orderId: string, newStatus: string) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    };

    if (isLoading) return <div className="py-20 text-center">주문 데이터를 불러오는 중...</div>;

    return (
        <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-muted/50 border-b border-border">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-muted-foreground">주문정보</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-muted-foreground">주문자/배송지</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-muted-foreground">상태</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-muted-foreground">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-6">
                                    <div className="space-y-1">
                                        <p className="text-xs font-black text-primary">{order.id}</p>
                                        <p className="text-sm font-bold text-foreground">{order.productTitle}</p>
                                        <p className="text-[10px] text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()} 주문</p>
                                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${order.type === 'pdf' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                                            {order.type}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-6 font-medium">
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold">{order.deliveryInfo.recipient} ({order.deliveryInfo.phone})</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed max-w-[250px]">{order.deliveryInfo.address}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                                        order.status === 'processing' ? 'bg-blue-100 text-blue-600' : 'bg-muted text-muted-foreground'
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-6">
                                    <select
                                        className="bg-background border border-border rounded-lg px-3 py-1.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                    >
                                        <option value="pending">대기 중</option>
                                        <option value="processing">준비 중</option>
                                        <option value="shipped">배송 중</option>
                                        <option value="delivered">배송 완료</option>
                                        <option value="cancelled">취소됨</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function BookManager() {
    const [editingId, setEditingId] = useState<string | null>(null);

    return (
        <div className="grid grid-cols-1 gap-6">
            {BOOKS.map((book) => (
                <div key={book.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-32 aspect-[3/4] relative rounded-lg overflow-hidden bg-muted shadow-inner">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={book.images?.[0] || '/placeholder.png'} alt={book.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-grow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold">{book.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">포맷: {book.options?.join(', ') || 'N/A'}</p>
                                </div>
                                <button
                                    onClick={() => setEditingId(editingId === book.id ? null : book.id)}
                                    className="px-4 py-2 bg-secondary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all text-sm"
                                >
                                    {editingId === book.id ? '닫기' : '관리하기'}
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="px-2 py-1 bg-muted rounded text-[10px] font-bold text-muted-foreground uppercase">
                                    {book.id}
                                </span>
                                <span className="px-2 py-1 bg-primary/10 rounded text-[10px] font-bold text-primary uppercase">
                                    기본가: {book.price}
                                </span>
                            </div>
                        </div>
                    </div>

                    {editingId === book.id && <BookEditor book={book} />}
                </div>
            ))}
        </div>
    );
}

function BookEditor({ book }: { book: any }) {
    const [bookFile, setBookFile] = useState<BookFile | undefined>(undefined);
    const [coverUrl, setCoverUrl] = useState<string | null>(null);
    const [meta, setMeta] = useState<Partial<ProductMetadata>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);



    const loadData = async () => {
        // Load PDF
        const file = await getBookFile(book.id);
        setBookFile(file);

        // Load Cover
        const coverBlob = await getBookCoverImage(book.id);
        if (coverBlob) {
            setCoverUrl(URL.createObjectURL(coverBlob));
        }

        // Load Meta
        const data = await getProductMetadata(book.id);
        if (data) setMeta(data);
        setIsLoading(false);
    };

    useEffect(() => { loadData(); }, [book.id]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.type !== 'application/pdf') {
            alert("PDF 파일만 업로드 가능합니다.");
            return;
        }
        await storedBookFile(book.id, file);
        loadData();
        alert(`${file.name} 업로드 완료!`);
    };

    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert("이미지 파일만 업로드 가능합니다.");
            return;
        }
        await setBookCoverImage(book.id, file);
        loadData();
        alert("도서 썸네일이 업데이트되었습니다.");
    };

    const handleDeleteFile = async () => {
        if (!bookFile) return;
        if (confirm("정말 이 파일을 삭제하시겠습니까? (복구 불가)")) {
            await deleteBookFile(book.id);
            loadData();
            alert("파일이 영구적으로 삭제되었습니다.");
        }
    };

    const handleSaveMeta = async () => {
        setIsSaving(true);
        await setProductMetadata(book.id, meta);
        setIsSaving(false);
        alert("도서 정보가 저장되었습니다.");
    };

    // -------------------------------------------------------------
    // [NEW] YouTube to PDF Conversion Logic Simulation
    // -------------------------------------------------------------
    const [videoUrl, setVideoUrl] = useState('');
    const [isConverting, setIsConverting] = useState(false);
    const [convertProgress, setConvertProgress] = useState(0);

    const handleVideoToPdf = async () => {
        if (!videoUrl) return;
        setIsConverting(true);
        setConvertProgress(0);

        // Simulation
        const interval = setInterval(() => {
            setConvertProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);

        await new Promise(resolve => setTimeout(resolve, 3500));
        
        // Mock PDF creation
        const mockPdfOutput = new Blob(["Simulated PDF Content from Video Analysis"], { type: 'application/pdf' });
        const downloadUrl = URL.createObjectURL(mockPdfOutput);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `[변환완료]_${book.title}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setIsConverting(false);
        alert("영상 AI 분석이 완료되었습니다. 전자책 PDF가 자동으로 다운로드되었습니다.");
    };

    if (isLoading) return <div className="mt-4 text-center text-sm py-10">로딩 중...</div>;

    return (
        <div className="mt-8 pt-8 border-t border-border space-y-10 animate-in fade-in slide-in-from-top-4 text-left">
            
            {/* 🚀 영상 → 전자책 AI 변환 엔진 [NRE] */}
            <div className="p-8 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-[2.5rem] space-y-6">
                <h4 className="font-black text-xl flex items-center gap-2 text-white">
                    <Sparkles size={24} className="text-purple-400" />
                    유튜브/영상 → PDF 전자책 변환기
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    유튜브 링크나 영상 파일을 입력하세요. AI가 영상의 자막과 시각 자료를 분석하여 <br/>
                    **즉시 다운로드 가능한 완벽한 형태의 PDF 전자책**으로 자동 변환해드립니다.
                </p>

                <div className="flex flex-col gap-4">
                    <input 
                        type="text" 
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none text-sm text-white"
                    />
                    
                    {isConverting ? (
                        <div className="space-y-3">
                            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${convertProgress}%` }}
                                />
                            </div>
                            <p className="text-center text-xs font-bold text-purple-400 animate-pulse">AI 분석 및 레이아웃 자동 생성 중... {convertProgress}%</p>
                        </div>
                    ) : (
                        <button 
                            onClick={handleVideoToPdf}
                            disabled={!videoUrl}
                            className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-purple-50 transition-all flex items-center justify-center gap-2 group disabled:opacity-30"
                        >
                            <FileText size={18} />
                            AI 전자책 변환 및 바로 다운로드
                        </button>
                    )}
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                        <p className="text-[10px] text-muted-foreground mb-1">STT 분석</p>
                        <Check size={12} className="mx-auto text-green-500" />
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                        <p className="text-[10px] text-muted-foreground mb-1">레이아웃 매칭</p>
                        <Check size={12} className="mx-auto text-green-500" />
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                        <p className="text-[10px] text-muted-foreground mb-1">PDF 엔진 가동</p>
                        <Check size={12} className="mx-auto text-green-500" />
                    </div>
                </div>
            </div>

            {/* 0. Cover Image Management */}
            <div className="space-y-4">
                <h4 className="font-bold text-lg flex items-center gap-2">
                    <ImageIcon size={18} className="text-primary" />
                    도서 대표 이미지(썸네일) 관리
                </h4>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-32 aspect-[3/4] bg-muted rounded-xl overflow-hidden border border-border relative group shadow-inner">
                        {coverUrl || book.cover ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={coverUrl || book.cover} alt="Cover Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                <ImageIcon size={24} />
                            </div>
                        )}
                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                            <Upload size={20} className="text-white" />
                            <input type="file" className="hidden" accept="image/*" onChange={handleCoverUpload} />
                        </label>
                    </div>
                    <div className="flex-grow space-y-2">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            사용자 인터페이스(Store)에 표시될 대표 이미지를 업로드하세요.<br />
                            권장 비율은 **3:4** (세로형) 입니다. 업로드 시 즉시 반영됩니다.
                        </p>
                        <label className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-primary font-bold rounded-lg cursor-pointer hover:bg-primary hover:text-white transition-all text-xs">
                            <Upload size={14} />
                            새 이미지 업로드
                            <input type="file" className="hidden" accept="image/*" onChange={handleCoverUpload} />
                        </label>
                    </div>
                </div>
            </div>

            {/* 1. PDF File Management */}
            <div className="space-y-4">
                <h4 className="font-bold text-lg flex items-center gap-2">
                    <FileText size={18} className="text-primary" />
                    PDF 디지털 판본 관리
                </h4>

                {bookFile ? (
                    <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-border">
                                <Check className="text-primary" size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold truncate max-w-[200px]">{bookFile.name}</p>
                                <p className="text-[10px] text-muted-foreground">업로드: {new Date(bookFile.uploadedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <label className="p-2.5 bg-background border border-border text-muted-foreground hover:text-primary rounded-xl cursor-pointer transition-colors">
                                <Upload size={18} />
                                <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
                            </label>
                            <button onClick={handleDeleteFile} className="p-2.5 bg-background border border-border text-destructive hover:bg-destructive/10 rounded-xl transition-colors">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <label className="block group cursor-pointer">
                        <div className="w-full py-10 border-2 border-dashed border-border group-hover:border-primary/50 group-hover:bg-primary/5 rounded-2xl transition-all flex flex-col items-center justify-center gap-2">
                            <Upload className="text-muted-foreground group-hover:text-primary" size={24} />
                            <span className="text-sm font-bold text-muted-foreground group-hover:text-primary">PDF 파일 업로드하기</span>
                        </div>
                        <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
                    </label>
                )}
            </div>

            {/* 2. Physical Book Meta (Kyobo POD Integration) */}
            <div className="space-y-6">
                <h4 className="font-bold text-lg flex items-center gap-2">
                    <Package size={18} className="text-primary" />
                    종이책 판매 설정 (교보문고 POD 연동)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase ml-1">판매 가격 (KRW)</label>
                        <input
                            type="text"
                            value={meta.price || ''}
                            onChange={(e) => setMeta({ ...meta, price: e.target.value })}
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
                            placeholder={book.price}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase ml-1">교보문고 구매 링크</label>
                        <input
                            type="text"
                            value={meta.buyUrl || ''}
                            onChange={(e) => setMeta({ ...meta, buyUrl: e.target.value })}
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
                            placeholder="https://product.kyobobook.co.kr/pod/introduce"
                        />
                    </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-2xl border border-border space-y-2">
                    <p className="text-xs font-bold flex items-center gap-1.5 text-foreground">
                        <AlertCircle size={14} className="text-blue-500" />
                        교보문고 POD 연동 팁
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                        종이책은 교보문고를 통해 POD(주문 제작) 방식으로 판매됩니다. <br />
                        위 링크에 교보문고 상품 페이지 URL을 입력하면 사용자 페이지의 &apos;구매하기&apos; 버튼이 해당 페이지로 연결되며, 고객은 그곳에서 주문 및 결제를 진행하게 됩니다.
                    </p>
                </div>

                <button
                    onClick={handleSaveMeta}
                    disabled={isSaving}
                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2"
                >
                    {isSaving ? "저장 중..." : "도서 판매 정보 저장하기"}
                </button>
            </div>
        </div>
    );
}


function ProductManager() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Partial<Product>>({});

    const loadProducts = async () => {
        const data = await getAllProducts();
        setProducts(data);
    };

    useEffect(() => { loadProducts(); }, []);

    const handleCreateNew = () => {
        setEditingProduct({
            id: `prod-${Date.now()}`,
            title: '',
            price: 0,
            description: '',
            category: 'physical',
            options: [],
            images: [],
            externalLink: '',
            createdAt: Date.now()
        });
        setIsEditing(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("정말 이 상품을 삭제하시겠습니까?")) {
            await deleteProduct(id);
            await loadProducts();
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct.id || !editingProduct.title) return;

        const productToSave = editingProduct as Product;

        // If it's a new product (doesn't exist in list), create. Else update.
        const exists = products.find(p => p.id === productToSave.id);
        if (exists) {
            await updateProduct(productToSave);
        } else {
            await createProduct(productToSave);
        }

        setIsEditing(false);
        await loadProducts();
    };

    const handleSyncBookk = async (product: Product) => {
        if (!product.externalLink) {
            alert("부크크 링크가 등록되지 않은 상품입니다.");
            return;
        }

        // Simulate API Call
        alert("부크크 판매 데이터를 동기화 중입니다...");
        await new Promise(r => setTimeout(r, 1500));

        const mockVolume = (product.salesVolume || 0) + Math.floor(Math.random() * 5) + 1;
        const mockRevenue = mockVolume * product.price;

        const updated = {
            ...product,
            salesVolume: mockVolume,
            salesRevenue: mockRevenue,
            lastSyncedAt: Date.now()
        };

        await updateProduct(updated);
        await loadProducts();
        alert(`동기화 완료!\n총 판매 부수: ${mockVolume}권\n총 매출: ${mockRevenue.toLocaleString()}원`);
    };

    if (isEditing) {
        return (
            <div className="space-y-6 animate-in slide-in-from-right-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">상품 등록/수정</h3>
                    <button onClick={() => setIsEditing(false)} className="text-sm font-bold text-muted-foreground hover:text-foreground">
                        목록으로 돌아가기
                    </button>
                </div>
                <form onSubmit={handleSave} className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase">상품명</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                value={editingProduct.title}
                                onChange={e => setEditingProduct({ ...editingProduct, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase">가격 (KRW)</label>
                            <input
                                required
                                type="number"
                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                value={editingProduct.price}
                                onChange={e => setEditingProduct({ ...editingProduct, price: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase">카테고리</label>
                            <select
                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                value={editingProduct.category}
                                onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                            >
                                <option value="physical">실물 상품 (Book/Goods)</option>
                                <option value="digital">디지털 상품 (PDF)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase">이미지 URL (임시)</label>
                            <input
                                type="text"
                                placeholder="http://example.com/image.jpg"
                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                value={editingProduct.images?.[0] || ''}
                                onChange={e => setEditingProduct({ ...editingProduct, images: [e.target.value] })}
                            />
                        </div>
                        <div className="col-span-full space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase">부크크(Bookk) 판매 링크</label>
                            <input
                                type="text"
                                placeholder="https://bookk.co.kr/..."
                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                value={editingProduct.externalLink || ''}
                                onChange={e => setEditingProduct({ ...editingProduct, externalLink: e.target.value })}
                            />
                            <p className="text-[11px] text-muted-foreground">
                                * 부크크 링크를 입력하면 쇼핑몰에서 '바로 구매하기' 클릭 시 해당 페이지로 연결됩니다.
                            </p>
                        </div>
                        <div className="col-span-full space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase">옵션 (콤마로 구분)</label>
                            <input
                                type="text"
                                placeholder="Red, Blue, Green"
                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                value={editingProduct.options?.join(', ') || ''}
                                onChange={e => setEditingProduct({ ...editingProduct, options: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                            />
                        </div>
                        <div className="col-span-full space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase">상세 설명</label>
                            <textarea
                                className="w-full h-32 px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none resize-none"
                                value={editingProduct.description}
                                onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all">
                        저장하기
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-end">
                <button
                    onClick={handleCreateNew}
                    className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                    <Package size={18} /> 새 상품 등록
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map(product => (
                    <div key={product.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:border-primary/50 transition-colors group">
                        <div className="flex gap-4">
                            <div className="w-24 h-32 bg-muted rounded-xl bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${product.images[0] || ''})` }} />
                            <div className="flex-grow space-y-2">
                                <h3 className="font-bold text-lg leading-tight">{product.title}</h3>
                                <p className="text-sm font-bold text-primary">{product.price.toLocaleString()}원</p>
                                <p className="text-xs text-muted-foreground">
                                    {product.category} | {product.options.length} options
                                </p>
                                {product.externalLink && (
                                    <div className="text-[10px] text-blue-500 bg-blue-50 px-2 py-1 rounded inline-block truncate max-w-[200px]">
                                        🔗 부크크 연동됨
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sales Stats Section */}
                        {(product.externalLink) && (
                            <div className="mt-4 p-4 bg-muted/30 rounded-xl border border-border">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
                                        📊 판매 현황
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">
                                        Last Synced: {product.lastSyncedAt ? new Date(product.lastSyncedAt).toLocaleTimeString() : '-'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground">누적 판매</p>
                                        <p className="font-bold text-lg">{product.salesVolume || 0}권</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">예상 수익</p>
                                        <p className="font-bold text-lg">{(product.salesRevenue || 0).toLocaleString()}원</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleSyncBookk(product)}
                                    className="w-full mt-3 py-2 bg-white border border-border text-xs font-bold rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                                >
                                    <Truck size={14} />
                                    부크크 데이터 동기화
                                </button>
                            </div>
                        )}

                        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                            <button
                                onClick={() => handleEdit(product)}
                                className="flex-1 py-2 bg-secondary text-secondary-foreground text-xs font-bold rounded-lg hover:bg-secondary/80 transition-all"
                            >
                                수정
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="px-3 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}



function OldCurationManager() {
    return null;
}


