'use client';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function Page() {
  return (
    <div className='min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8'>
      <h1 className="text-2xl font-black tracking-tighter uppercase opacity-50">Page Loaded Successfully</h1>
      <Link 
        href="/imagination"
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all font-black uppercase tracking-widest text-sm no-underline border border-blue-400/30 px-6 py-3 rounded-full hover:bg-blue-400/10"
      >
        <ChevronLeft size={18} /> Back to Imagination Academy
      </Link>
    </div>
  );
}
