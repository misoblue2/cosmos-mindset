import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink, Instagram, Youtube } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-muted/30 border-t border-border pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-4 md:col-span-1">
                        <h3 className="text-xl font-bold font-serif text-primary">Cosmic Mind</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            우주의 마음으로 세상을 바라봅니다.<br />
                            당신의 무한한 가능성을 깨우는<br />
                            콘텐츠와 이야기를 만듭니다.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-foreground">Service</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/legacy-ai" className="hover:text-primary transition-colors">나만의 자서전 만들기</Link></li>
                            <li><Link href="/healing" className="hover:text-primary transition-colors">마음 상담소</Link></li>
                            <li><Link href="/originals" className="hover:text-primary transition-colors">우주의 서재</Link></li>
                            <li><Link href="/imagination" className="hover:text-primary transition-colors">어린이 상상학교</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-foreground">Support</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/shop" className="hover:text-primary transition-colors">Store</Link></li>
                            <li><Link href="/notice" className="hover:text-primary transition-colors">공지사항</Link></li>
                            <li><Link href="/faq" className="hover:text-primary transition-colors">자주 묻는 질문</Link></li>
                            <li><Link href="/admin" className="hover:text-primary transition-colors">Admin Login</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-foreground">Contact Info</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-start gap-3">
                                <MapPin size={16} className="mt-0.5 shrink-0" />
                                <span>
                                    서울특별시 강남구 테헤란로 123<br />
                                    코스믹 타워 8층
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={16} />
                                <span>02-1234-5678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={16} />
                                <span>contact@cosmicmind.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex flex-col md:flex-row gap-4 text-center md:text-left">
                        <p>© 2024 Cosmic Mind. All rights reserved.</p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/terms" className="hover:text-foreground">이용약관</Link>
                            <Link href="/privacy" className="hover:text-foreground font-bold">개인정보처리방침</Link>
                        </div>
                    </div>
                    <div>
                        <p>사업자등록번호: 123-45-67890 | 대표: 정셀리나</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
