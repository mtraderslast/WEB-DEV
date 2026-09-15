"use client";
import React, { useEffect, useRef, useState } from 'react';

/* STREAMING_CHUNK:Interactive Timeline Item */
const TimelineItem = ({ item, index }) => {
    const itemRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const isEven = index % 2 === 0;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
        );

        if (itemRef.current) observer.observe(itemRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={itemRef}
            className={`relative flex flex-col md:flex-row items-center w-full mb-20 lg:mb-32 group ${isEven ? 'md:flex-row-reverse' : ''}`}
        >
            {/* === Center Glowing Dot === */}
            <div className="absolute left-[24px] md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-16 h-16 flex items-center justify-center z-20">
                <div className={`absolute inset-0 rounded-full bg-[#3D52A0]/40 dark:bg-indigo-500/30 transition-all duration-700 group-hover:scale-[2] group-hover:bg-[#3D52A0]/50 dark:group-hover:bg-indigo-500/50 ${isVisible ? 'animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]' : ''}`}></div>
                <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-[4px] border-white dark:border-[#09090b] bg-gradient-to-br from-[#3D52A0] to-indigo-600 shadow-[0_0_20px_rgba(61,82,160,0.5)] transition-all duration-500 group-hover:scale-110 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                    <span className="text-[10px] text-white font-black">{item.year.slice(2)}'</span>
                </div>
            </div>

            {/* === Rich Content Card with Image === */}
            <div className={`w-full md:w-1/2 pl-[70px] md:pl-0 ${isEven ? 'md:pr-16 lg:pr-24' : 'md:pl-16 lg:pl-24'}`}>
                <div
                    className={`relative w-full rounded-[2rem] bg-white/70 dark:bg-[#09090b]/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-[1s] ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(61,82,160,0.3)] dark:hover:shadow-[0_30px_60px_rgba(99,102,241,0.2)] overflow-hidden flex flex-col
                    ${isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 translate-y-20 ${isEven ? 'md:-translate-x-20' : 'md:translate-x-20'}`}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                >
                    {/* Embedded Card Image to fill space */}
                    <div className="w-full h-48 sm:h-56 overflow-hidden relative">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/70 dark:from-[#09090b]/80 to-transparent"></div>

                        <div className="absolute bottom-4 left-6 px-4 py-1.5 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
                            <span className="text-sm font-black text-[#3D52A0] dark:text-indigo-400 tracking-widest">{item.year}</span>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 sm:p-8 lg:p-10 pt-4">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-[#3D52A0] dark:group-hover:text-indigo-400 transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-400 font-medium dark:font-light leading-relaxed mb-8">
                            {item.description}
                        </p>

                        {/* Metrics Grid inside card */}
                        <div className="grid grid-cols-2 gap-3 mt-auto border-t border-gray-200 dark:border-white/10 pt-6">
                            {item.metrics.map((metric, i) => (
                                <div key={i} className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#3D52A0] dark:bg-indigo-500"></div>
                                    <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-300">
                                        {metric}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden md:block w-1/2"></div>
        </div>
    );
};

/* STREAMING_CHUNK:Main Journey Component */
export default function CompanyJourney() {
    const [scrollY, setScrollY] = useState(0);

    // Track scroll for background parallax
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const journeyData = [
        {
            year: "2018",
            title: "The Genesis",
            description: "Started in a small collaborative workspace with a vision to bridge the gap between complex engineering and beautiful human experiences.",
            metrics: ["Founded", "First 10 Clients"],
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
        },
        {
            year: "2021",
            title: "Global Scaling",
            description: "Expanded our operations globally, taking on enterprise-level infrastructure projects and growing our team to 50+ world-class engineers.",
            metrics: ["Enterprise Contracts", "50+ Employees"],
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
        },
        {
            year: "2024",
            title: "AI & Web3 Innovation",
            description: "Pioneered the integration of Artificial Intelligence and decentralized technologies into mainstream SaaS products, setting new industry standards.",
            metrics: ["AI Labs Launched", "Award-Winning Tech"],
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
        },
        {
            year: "2026",
            title: "Industry Leadership",
            description: "Recognized as a top-tier global software agency, engineering the digital backbone for Fortune 500 companies and revolutionary startups.",
            metrics: ["$2B+ Revenue Impact", "Fortune 500 Partners"],
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop"
        }
    ];

    return (
        <section className="relative w-full py-10 overflow-hidden bg-[#EDE8F5] dark:bg-[#000000]">

            {/* === Parallax Background Environment === */}
            <div className="absolute inset-0 z-0 h-[120%] -top-[20%]">
                <img
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
                    alt="Agency Office"
                    className="w-full h-full object-cover opacity-20 dark:opacity-20"
                    style={{ transform: `translateY(${scrollY * 0.15}px)` }}
                />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto relative">
                    <div className="inline-flex items-center justify-center space-x-3 mb-6 bg-white/50 dark:bg-black/50 px-6 py-2 rounded-full backdrop-blur-md border border-white/40 dark:border-white/10 shadow-sm">
                        <span className="h-[2px] w-6 bg-[#3D52A0] dark:bg-indigo-500"></span>
                        <span className="text-[#3D52A0] dark:text-indigo-400 font-bold uppercase tracking-[0.3em] text-sm">
                            Our Journey
                        </span>
                        <span className="h-[2px] w-6 bg-[#3D52A0] dark:bg-indigo-500"></span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-6 drop-shadow-sm">
                        A legacy of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D52A0] to-indigo-500 dark:from-indigo-400 dark:to-blue-400">
                            relentless innovation.
                        </span>
                    </h2>
                </div>

                {/* Timeline Container */}
                <div className="relative w-full pb-10">

                    {/* === The Central Glowing Vertical Line === */}
                    <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 bg-gray-200/50 dark:bg-white/5 rounded-full overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]">
                        {/* Animated glowing line that travels down */}
                        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent via-[#3D52A0] dark:via-indigo-400 to-transparent animate-[scrollDown_3s_linear_infinite] shadow-[0_0_20px_#3D52A0]"></div>
                    </div>

                    {/* Timeline Items Loop */}
                    <div className="relative z-10 w-full pt-10">
                        {journeyData.map((item, index) => (
                            <TimelineItem key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>

            </div>

            {/* Keyframes for the traveling line */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scrollDown {
                    0% { top: -30vh; opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}} />
        </section>
    );
}