"use client";
import React, { useEffect, useRef, useState } from 'react';

const StatCard = ({ stat, index }) => {
    const cardRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [currentCount, setCurrentCount] = useState(0);

    const numericTarget = parseInt(stat.number.replace(/[^0-9]/g, ''));
    const prefix = stat.number.includes('$') ? '$' : '';
    const suffix = stat.number.includes('+') ? '+' : stat.number.includes('%') ? '%' : '';
    const formatBillion = stat.number.includes('B') ? 'B' : '';

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let startTimestamp = null;
                    const duration = 2000;

                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        setCurrentCount(Math.floor(easeOutQuart * numericTarget));

                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        }
                    };
                    window.requestAnimationFrame(step);
                }
            },
            { threshold: 0.5 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }
        return () => observer.disconnect();
    }, [hasAnimated, numericTarget]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
    };

    const tiltX = isHovered ? (mousePosition.y / cardRef.current?.clientHeight - 0.5) * -15 : 0;
    const tiltY = isHovered ? (mousePosition.x / cardRef.current?.clientWidth - 0.5) * 15 : 0;

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setMousePosition({ x: 0, y: 0 }); }}
            style={{
                transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
                transition: isHovered ? 'none' : 'transform 0.5s ease-out'
            }}
            className="relative h-full w-full rounded-3xl bg-white/5 dark:bg-[#09090b]/40 border border-gray-200 dark:border-white/10 p-8 cursor-pointer overflow-hidden backdrop-blur-md"
        >
            <div
                className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(61,82,160,0.15), transparent 40%)`
                }}
            />
            <div
                className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none rounded-3xl"
                style={{
                    opacity: isHovered ? 1 : 0,
                    boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.1)`,
                    background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.4), transparent 40%)`,
                    maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: '1px'
                }}
            />

            <div className="relative z-10 flex flex-col h-full pointer-events-none">
                <div className="flex justify-between items-start mb-12">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isHovered ? 'bg-[#3D52A0] text-white shadow-[0_0_30px_rgba(61,82,160,0.5)]' : 'bg-[#EDE8F5] dark:bg-white/5 text-[#3D52A0] dark:text-indigo-400 border border-gray-200 dark:border-white/10'}`}>
                        {stat.icon}
                    </div>
                </div>

                <div className="mt-auto">
                    <h3 className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500 dark:from-white dark:to-gray-500 mb-2 drop-shadow-sm">
                        {prefix}{currentCount}{formatBillion}{suffix}
                    </h3>
                    <div className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {stat.label}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium dark:font-light leading-relaxed">
                        {stat.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

/* STREAMING_CHUNK:Main Component Container */
export default function CompanyStatistics() {
    const stats = [
        {
            id: 1,
            number: "500+",
            label: "Products Shipped",
            description: "Enterprise & SaaS solutions delivered with precision globally.",
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        {
            id: 2,
            number: "$2B+",
            label: "Client Revenue",
            description: "Generated by platforms engineered and scaled by our team.",
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            )
        },
        {
            id: 3,
            number: "99%",
            label: "Retention Rate",
            description: "Long-term tech partnerships built on pure trust and performance.",
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            id: 4,
            number: "24/7",
            label: "Global Support",
            description: "Continuous infrastructure monitoring across all time zones.",
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    return (
        <section className="relative w-full py-10 flex items-center bg-[#EDE8F5] dark:bg-[#000000] overflow-hidden transition-colors duration-500">

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3D52A01a_1px,transparent_1px),linear-gradient(to_bottom,#3D52A01a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:64px_64px] animate-[slide_40s_linear_infinite] opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#EDE8F5] via-transparent to-[#EDE8F5] dark:from-[#000000] dark:via-transparent dark:to-[#000000]" />

            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[#3D52A0] rounded-full blur-[150px] opacity-10 dark:opacity-30 pointer-events-none mix-blend-multiply dark:mix-blend-screen animate-[pulse_10s_ease-in-out_infinite]"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] dark:opacity-[0.02]">
                <h1 className="text-[15vw] font-black leading-none whitespace-nowrap">IMPACT</h1>
            </div>

            <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24 gap-8">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center space-x-3 mb-6">
                            <span className="h-[2px] w-12 bg-[#3D52A0]"></span>
                            <span className="text-[#3D52A0] dark:text-indigo-400 font-bold uppercase tracking-[0.3em] text-sm">
                                Scale & Impact
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.05]">
                            Engineering success <br className="hidden md:block" />
                            at a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D52A0] to-indigo-500">Global Scale.</span>
                        </h2>
                    </div>
                    <div className="max-w-md pb-2">
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-400 font-medium dark:font-light leading-relaxed border-l-2 border-[#3D52A0]/30 pl-6">
                            We measure our success not just by the lines of code we deploy, but by the exponential growth and operational efficiency we bring to our partners.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 h-full">
                    {stats.map((stat, index) => (
                        <div key={stat.id} className="h-[300px]">
                            <StatCard stat={stat} index={index} />
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slide {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(64px); }
                }
            `}} />
        </section>
    );
}