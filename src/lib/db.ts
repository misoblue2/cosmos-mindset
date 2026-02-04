
import { set, get, del, keys } from 'idb-keyval';

export interface BookFile {
    id: string;
    name: string;
    file: Blob;
    uploadedAt: number;
}

export interface ProductMetadata {
    id: string;
    price?: string;
    quantity?: number;
    colors?: string[];
    description?: string;
    buyUrl?: string; // For POD (Physical Books)
    updatedAt: number;
}

export interface Product {
    id: string;
    title: string;
    price: number;
    images: string[]; // Blob URLs or storage keys
    category: 'digital' | 'physical' | 'goods';
    options: string[]; // e.g. ["Red", "Blue", "S", "M"]
    description: string;
    externalLink?: string; // Optional: Link to external shop (e.g. Bookk)
    salesVolume?: number; // [NEW] Total copies sold (Synced from Bookk)
    salesRevenue?: number; // [NEW] Total revenue (Synced from Bookk)
    lastSyncedAt?: number; // [NEW] Timestamp of last sync
    createdAt: number;
    updatedAt?: number;
}

export interface User {
    id: string;
    email: string;
    name: string;
    phone?: string;
    address?: string;
    createdAt: number;
}

export interface Order {
    id: string;
    userId: string;
    productId: string;
    productTitle: string;
    productOption?: string; // Selected Option
    type: 'digital' | 'physical' | 'goods';
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    deliveryInfo?: {
        recipient: string;
        phone: string;
        address: string;
        trackingNumber?: string;
        courier?: string;
    };
    createdAt: number;
}

export interface CounselingSession {
    id: string;
    userId: string;
    userName: string; // [NEW] Added for personalized reply
    userEmail?: string; // [NEW] Added for email notification
    emailConsent?: boolean; // [NEW] Added for email consent
    mood: string;
    content: string;
    aiReply?: string;
    adminReply?: string;
    status: 'pending' | 'replied' | 'completed';
    isRead?: boolean; // [NEW] For inbox read status
    createdAt: number;
    repliedAt?: number;
}

const BOOK_STORE_PREFIX = 'book-file-';
const BOOK_COVER_PREFIX = 'book-cover-';
const PRODUCT_META_PREFIX = 'product-meta-';
const PRODUCT_IMAGE_PREFIX = 'product-detail-';
const USER_PREFIX = 'user-';
const ORDER_PREFIX = 'order-';
const COUNSELING_PREFIX = 'counseling-';

export async function setUser(user: User) {
    if (typeof window !== 'undefined') {
        await set(`${USER_PREFIX}${user.id}`, user);
    }
}

export async function getUser(userId: string): Promise<User | undefined> {
    if (typeof window === 'undefined') return undefined;
    return await get<User>(`${USER_PREFIX}${userId}`);
}

export async function setOrder(order: Order) {
    if (typeof window !== 'undefined') {
        await set(`${ORDER_PREFIX}${order.id}`, order);
    }
}

export async function getOrder(orderId: string): Promise<Order | undefined> {
    if (typeof window === 'undefined') return undefined;
    return await get<Order>(`${ORDER_PREFIX}${orderId}`);
}

export async function getUserOrders(userId: string): Promise<Order[]> {
    if (typeof window === 'undefined') return [];
    const allKeys = await keys();
    const orderKeys = allKeys.filter(k => typeof k === 'string' && k.startsWith(ORDER_PREFIX));
    const orders: Order[] = [];
    for (const key of orderKeys) {
        const order = await get<Order>(key as string);
        if (order && order.userId === userId) {
            orders.push(order);
        }
    }
    return orders;
}

// Book Files
export async function storedBookFile(bookId: string, file: File) {
    if (typeof window !== 'undefined') {
        const bookFile: BookFile = {
            id: bookId,
            name: file.name,
            file: file,
            uploadedAt: Date.now(),
        };
        await set(`${BOOK_STORE_PREFIX}${bookId}`, bookFile);
    }
}

export async function getBookFile(bookId: string): Promise<BookFile | undefined> {
    if (typeof window === 'undefined') return undefined;
    return await get<BookFile>(`${BOOK_STORE_PREFIX}${bookId}`);
}

export async function deleteBookFile(bookId: string) {
    if (typeof window !== 'undefined') {
        await del(`${BOOK_STORE_PREFIX}${bookId}`);
    }
}

// Book Cover Images
export async function setBookCoverImage(bookId: string, file: Blob) {
    if (typeof window !== 'undefined') {
        await set(`${BOOK_COVER_PREFIX}${bookId}`, file);
    }
}

export async function getBookCoverImage(bookId: string): Promise<Blob | undefined> {
    if (typeof window === 'undefined') return undefined;
    return await get<Blob>(`${BOOK_COVER_PREFIX}${bookId}`);
}

export async function deleteBookCoverImage(bookId: string) {
    if (typeof window !== 'undefined') {
        await del(`${BOOK_COVER_PREFIX}${bookId}`);
    }
}

// Product Metadata (Options, etc.)
export async function setProductMetadata(productId: string, data: Partial<ProductMetadata>) {
    if (typeof window === 'undefined') return;
    const existing = await getProductMetadata(productId) || { id: productId, updatedAt: Date.now() };
    const updated = { ...existing, ...data, updatedAt: Date.now() };
    await set(`${PRODUCT_META_PREFIX}${productId}`, updated);
}

export async function getProductMetadata(productId: string): Promise<ProductMetadata | undefined> {
    if (typeof window === 'undefined') return undefined;
    return await get<ProductMetadata>(`${PRODUCT_META_PREFIX}${productId}`);
}

// Product Detail Images
export async function setProductDetailImage(productId: string, file: Blob) {
    if (typeof window !== 'undefined') {
        await set(`${PRODUCT_IMAGE_PREFIX}${productId}`, file);
    }
}

export async function getProductDetailImage(productId: string): Promise<Blob | undefined> {
    if (typeof window === 'undefined') return undefined;
    return await get<Blob>(`${PRODUCT_IMAGE_PREFIX}${productId}`);
}

export async function deleteProductDetailImage(productId: string) {
    if (typeof window !== 'undefined') {
        await del(`${PRODUCT_IMAGE_PREFIX}${productId}`);
    }
}

// -------------------------------------------------------------
// New Shop System (Product CRUD)
// -------------------------------------------------------------
const SHOP_PRODUCT_PREFIX = 'shop-product-';

export async function createProduct(product: Product) {
    if (typeof window !== 'undefined') {
        await set(`${SHOP_PRODUCT_PREFIX}${product.id}`, product);
    }
}

export async function updateProduct(product: Product) {
    if (typeof window === 'undefined') return;
    const existing = await getProduct(product.id);
    const updated = { ...existing, ...product, updatedAt: Date.now() };
    await set(`${SHOP_PRODUCT_PREFIX}${product.id}`, updated);
}

export async function getProduct(productId: string): Promise<Product | undefined> {
    if (typeof window === 'undefined') return undefined;
    return await get<Product>(`${SHOP_PRODUCT_PREFIX}${productId}`);
}

export async function getAllProducts(): Promise<Product[]> {
    if (typeof window === 'undefined') return [];

    // [SAFETY] Check for keys availability in browser
    try {
        const allKeys = await keys();
        const productKeys = allKeys.filter(k => typeof k === 'string' && k.startsWith(SHOP_PRODUCT_PREFIX));
        const products: Product[] = [];

        for (const key of productKeys) {
            const p = await get<Product>(key as string);
            if (p) products.push(p);
        }

        // [SEED] If no products exist, seed with initial data
        if (products.length === 0) {
            const initialProducts: Product[] = [
                {
                    id: `prod-${Date.now()}-1`,
                    title: "Cosmic Diary (2025 Edition)",
                    price: 32000,
                    images: ["/images/cosmic_diary_cover.png"],
                    category: "physical",
                    options: ["Midnight Blue", "Stardust Gold"],
                    description: "우주의 영감을 담은 2025년 프리미엄 다이어리. 당신의 꿈을 기록하세요.",
                    externalLink: "https://bookk.co.kr/author/make/paperBook", // Initial Bookk Link
                    salesVolume: 120,
                    salesRevenue: 3840000,
                    lastSyncedAt: Date.now(),
                    createdAt: Date.now()
                },
                {
                    id: `prod-${Date.now()}-2`,
                    title: "Words of Wisdom 필사 노트",
                    price: 15000,
                    images: ["/images/handwriting_note_cover.png"],
                    category: "physical",
                    options: ["Cream", "White"],
                    description: "마음을 차분하게 가라앉히는 필사 전용 노트. 최고급 종이를 사용했습니다.",
                    externalLink: "https://bookk.co.kr/author/make/paperBook",
                    salesVolume: 45,
                    salesRevenue: 675000,
                    lastSyncedAt: Date.now(),
                    createdAt: Date.now() - 10000
                }
            ];

            for (const p of initialProducts) {
                await createProduct(p);
                products.push(p);
            }
        }

        return products.sort((a, b) => b.createdAt - a.createdAt);
    } catch (e) {
        console.warn("Failed to load products:", e);
        return [];
    }
}

export async function deleteProduct(productId: string) {
    if (typeof window !== 'undefined') {
        await del(`${SHOP_PRODUCT_PREFIX}${productId}`);
    }
}

// Counseling System
export async function setCounseling(session: CounselingSession) {
    if (typeof window !== 'undefined') {
        await set(`${COUNSELING_PREFIX}${session.id}`, session);
    }
}

export async function getCounseling(sessionId: string): Promise<CounselingSession | undefined> {
    if (typeof window === 'undefined') return undefined;
    return await get<CounselingSession>(`${COUNSELING_PREFIX}${sessionId}`);
}

export async function getAllCounseling(): Promise<CounselingSession[]> {
    if (typeof window === 'undefined') return [];
    const allKeys = await keys();
    const sessionKeys = allKeys.filter(k => typeof k === 'string' && k.startsWith(COUNSELING_PREFIX));
    const sessions: CounselingSession[] = [];
    for (const key of sessionKeys) {
        const s = await get<CounselingSession>(key as string);
        if (s) sessions.push(s);
    }
    return sessions.sort((a, b) => b.createdAt - a.createdAt);
}

export async function getCounselingByUser(name: string, email?: string): Promise<CounselingSession[]> {
    const all = await getAllCounseling();
    return all.filter(s =>
        s.userName === name &&
        (!email || s.userEmail === email) // If email is provided, must match. If not, match name only (for now, or require both if email was used)
    );
}

// Donation System (Deprecated - Switched to Voluntary Direct Transfer)
export async function getDonationStats(): Promise<{ totalAmount: number; donorCount: number; lastDonatedAt: number }> {
    return { totalAmount: 0, donorCount: 0, lastDonatedAt: Date.now() };
}

export async function addDonation(amount: number): Promise<void> {
    return;
}

export async function getTotalFund(): Promise<number> {
    return 0;
}

// Imagination School Ideas
export interface Idea {
    id: string;
    author: string;
    content: string;
    createdAt: number;
}

const IDEA_PREFIX = 'idea-';

export async function addIdea(idea: Idea) {
    if (typeof window !== 'undefined') {
        await set(`${IDEA_PREFIX}${idea.id}`, idea);
    }
}

export async function getIdeas(): Promise<Idea[]> {
    if (typeof window === 'undefined') return [];
    const allKeys = await keys();
    const ideaKeys = allKeys.filter(k => typeof k === 'string' && k.startsWith(IDEA_PREFIX));
    const ideas: Idea[] = [];
    for (const key of ideaKeys) {
        const idea = await get<Idea>(key as string);
        if (idea) ideas.push(idea);
    }
    return ideas.sort((a, b) => b.createdAt - a.createdAt);
}
