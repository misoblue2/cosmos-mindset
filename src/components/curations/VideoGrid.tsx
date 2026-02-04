
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { CURATIONS } from '@/lib/mockData';
import { VideoModal } from './VideoModal';

export function VideoGrid() {
    const [selectedVideo, setSelectedVideo] = useState<typeof CURATIONS[0] | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {CURATIONS.map((video) => (
                    <div
                        key={video.id}
                        onClick={() => setSelectedVideo(video)}
                        className="group cursor-pointer flex flex-col gap-3"
                    >
                        {/* Thumbnail */}
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted shadow-sm group-hover:shadow-md transition-all border border-border group-hover:border-accent">
                            <Image
                                src={video.thumbnail}
                                alt={video.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Play size={24} className="text-primary fill-primary" />
                                </div>
                            </div>

                            {/* Badge */}
                            <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-md text-white text-xs font-medium rounded-md flex items-center gap-1">
                                ▶ 영상 리뷰 보기
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-lg text-primary leading-snug group-hover:text-accent transition-colors">
                            {video.title}
                        </h3>

                        {/* Product Tag */}
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            {video.product.name}
                        </div>
                    </div>
                ))}
            </div>

            <VideoModal
                video={selectedVideo}
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
            />
        </>
    );
}
