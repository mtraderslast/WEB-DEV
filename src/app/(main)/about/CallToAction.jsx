"use client";
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Mail } from 'lucide-react';
import Link from 'next/link';

export default function CallToAction() {
    const sectionRef = useRef(null);
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // Scroll reveal observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Mouse tracking for the spotlight effect inside the glass card
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full flex items-center justify-center py-10 px-6 md:px-12 bg-[#EDE8F5] dark:bg-[#000000] overflow-hidden transition-colors duration-500"
        >
            {/* === Animated Ambient Background Orbs === */}
            <div className="absolute top-1/2 left-1/4 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#3D52A0]/20 dark:bg-indigo-600/20 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none animate-[blob_10s_infinite_alternate]"></div>
            <div className="absolute top-1/2 right-1/4 w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-[120px] -translate-y-1/3 pointer-events-none animate-[blob_12s_infinite_alternate-reverse]"></div>

            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3D52A00d_1px,transparent_1px),linear-gradient(to_bottom,#3D52A00d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* === Massive Glassmorphic CTA Card === */}
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`relative z-10 w-full max-w-[1200px] rounded-[3rem] lg:rounded-[4rem] bg-white/40 dark:bg-[#09090b]/40 backdrop-blur-3xl border border-white/60 dark:border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-1000 ease-out
                ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-20'}`}
            >
                {/* Dynamic Mouse Spotlight Overlay */}
                <div
                    className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(61,82,160,0.08), transparent 40%)`
                    }}
                />

                {/* Dynamic Border Glow (Masked) */}
                <div
                    className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none rounded-[3rem] lg:rounded-[4rem]"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.5), transparent 40%)`,
                        maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        padding: '1px'
                    }}
                />

                <div className="relative z-10 flex flex-col items-center text-center px-6 py-10">

                    {/* Floating Avatars / Trust Signal */}
                    <div className="flex -space-x-4 mb-8">
                        <div className="w-16 h-16 rounded-full border-[3px] border-white dark:border-[#09090b] shadow-xl overflow-hidden relative z-30 transition-transform hover:-translate-y-2 hover:scale-110 duration-300">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop" alt="Expert" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-16 h-16 rounded-full border-[3px] border-white dark:border-[#09090b] shadow-xl overflow-hidden relative z-20 transition-transform hover:-translate-y-2 hover:scale-110 duration-300">
                            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" alt="Expert" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-16 h-16 rounded-full border-[3px] border-white dark:border-[#09090b] shadow-xl overflow-hidden relative z-10 transition-transform hover:-translate-y-2 hover:scale-110 duration-300">
                            <img src="https://i.ibb.co.com/679hzvrz/linkdin-profile-photo.jpg" alt="Expert" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-16 h-16 rounded-full border-[3px] border-white dark:border-[#09090b] shadow-xl bg-gradient-to-br from-[#3D52A0] to-indigo-600 flex items-center justify-center relative z-0">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    {/* Main Headline */}
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-[1.05] tracking-tight mb-8">
                        Ready to engineer your <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D52A0] to-indigo-500 dark:from-indigo-400 dark:to-blue-400">
                            next big leap?
                        </span>
                    </h2>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium dark:font-light max-w-2xl mx-auto mb-5 leading-relaxed">
                        Join 50+ enterprise clients who transformed their digital infrastructure with our award-winning team. Let’s build something extraordinary together.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">

                        {/* Primary Button */}
                        <Link
                            href="/quote"
                            className="relative inline-flex items-center justify-center overflow-hidden rounded-xl p-[2px] font-medium active:scale-95 transition-all duration-300 group shadow-lg shadow-[#3D52A0]/25 hover:shadow-[0_4px_20px_rgba(61,82,160,0.35)]"
                        >
                            {/* Animated Dual Gradient Layer */}
                            <span className="absolute inset-0 bg-gradient-to-r from-[#3D52A0] via-[#7088D6] to-[#3D52A0] bg-[length:200%_100%] bg-left transition-all duration-500 ease-out group-hover:bg-right" />

                            {/* Button Inner Content */}
                            <span className="relative flex items-center gap-3 px-7 py-3.5 rounded-[10px] text-white transition-all duration-300">
                                <span>Get a Quote</span>
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </Link>

                        {/* Secondary Button */}
                        {/* Secondary Button */}
                        <Link
                            href="/contact"
                            className="relative inline-flex items-center justify-center overflow-hidden rounded-xl p-[2px] font-medium active:scale-95 transition-all duration-300 group shadow-md hover:shadow-lg w-full sm:w-auto"
                        >
                            {/* Hover Border Gradient */}
                            <span className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-white/20 dark:via-white/10 dark:to-white/20 bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:bg-right" />

                            {/* Button Inner Content */}
                            <span className="relative flex items-center gap-3 px-7 py-3.5 rounded-[10px] bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-md border border-gray-200/50 dark:border-white/5 text-gray-900 dark:text-white transition-all duration-300 group-hover:bg-white dark:group-hover:bg-white/10 w-full sm:w-auto justify-center">
                                <Mail className="w-4 h-4 text-[#3D52A0] dark:text-indigo-400" />
                                <span>Contact Us</span>
                            </span>
                        </Link>


                    </div>

                    {/* Trust Footnote */}
                    <div className="mt-10 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span>Typically replies within 2 hours</span>
                    </div>

                </div>
            </div>

            {/* Inline keyframes for blobs & shimmer */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                @keyframes shimmer {
                    0% { background-position: 200% center; }
                    100% { background-position: 0% center; }
                }
            `}} />
        </section>
    );
}