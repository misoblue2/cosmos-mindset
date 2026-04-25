import { get, set } from 'idb-keyval';

export interface SubscriptionData {
    plan: 'none' | '1month' | '6month' | '12month';
    planLabel: string;
    price: number;
    startDate: number | null;
    endDate: number | null;
    isActive: boolean;
    paymentId: string | null; // 아임포트 결제 고유번호
}

const SUB_KEY = 'cosmos-subscription';

const DEFAULT_SUB: SubscriptionData = {
    plan: 'none',
    planLabel: '',
    price: 0,
    startDate: null,
    endDate: null,
    isActive: false,
    paymentId: null
};

export const getSubscription = async (): Promise<SubscriptionData> => {
    try {
        const data = await get(SUB_KEY);
        if (!data) return DEFAULT_SUB;
        // 만료 체크
        if (data.endDate && Date.now() > data.endDate) {
            return { ...data, isActive: false };
        }
        return data;
    } catch {
        return DEFAULT_SUB;
    }
};

export const activateSubscription = async (
    plan: SubscriptionData['plan'],
    planLabel: string,
    price: number,
    durationMonths: number,
    paymentId: string
): Promise<SubscriptionData> => {
    const now = Date.now();
    const end = new Date(now);
    end.setMonth(end.getMonth() + durationMonths);

    const sub: SubscriptionData = {
        plan,
        planLabel,
        price,
        startDate: now,
        endDate: end.getTime(),
        isActive: true,
        paymentId
    };
    await set(SUB_KEY, sub);
    return sub;
};

export const PLANS = [
    {
        id: '1month' as const,
        name: '🌱 뉴본 코스',
        nameEn: 'Newborn',
        duration: '1개월',
        durationMonths: 1,
        price: 10000,
        priceLabel: '₩10,000',
        monthlyPrice: '₩10,000/월',
        features: [
            '30일 긍정 마인드셋 훈련',
            '10 멘토 × 150+ 명언 필사',
            '매일 호흡명상 + 음악명상',
            '매일 감사일기 5가지',
            '1개월 졸업장 PDF 발급',
        ],
        badge: '',
        gradient: 'from-emerald-500 to-green-600',
        popular: false
    },
    {
        id: '6month' as const,
        name: '⚡ 아키텍트 코스',
        nameEn: 'Architect',
        duration: '6개월',
        durationMonths: 6,
        price: 60000,
        priceLabel: '₩60,000',
        monthlyPrice: '₩10,000/월',
        features: [
            '뉴본 코스 전체 포함',
            '부의 마인드 / 건강 마인드 확장',
            '논리적 사고 / 관계 / 창조 마인드',
            '6개월 아키텍트 졸업장 PDF',
            '나만의 철학 선언문 자동 생성',
        ],
        badge: '인기',
        gradient: 'from-blue-500 to-indigo-600',
        popular: true
    },
    {
        id: '12month' as const,
        name: '👑 그랜드마스터',
        nameEn: 'Grand Master',
        duration: '12개월',
        durationMonths: 12,
        price: 120000,
        priceLabel: '₩120,000',
        monthlyPrice: '₩10,000/월',
        features: [
            '아키텍트 코스 전체 포함',
            '나만의 커스텀 코스 개설 권한',
            '멘토 활동 권한',
            '글로벌 동문 네트워크 등재',
            '골드 마스터 졸업장 PDF',
        ],
        badge: '최고등급',
        gradient: 'from-yellow-400 to-amber-600',
        popular: false
    }
];
