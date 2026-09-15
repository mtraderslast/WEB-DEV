"use client";
import React, { useEffect, useRef, useState } from 'react';

export default function OurStory() {
    /* STREAMING_CHUNK:Initializing Interactive States */
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 } // Triggers when 20% of the section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    /* STREAMING_CHUNK:Mouse Parallax Handler */
    const handleMouseMove = (e) => {
        if (!sectionRef.current) return;
        // Calculate mouse position relative to the center of the screen
        const x = (e.clientX / window.innerWidth - 0.5) * 30; // Max 15px movement
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        setMousePos({ x, y });
    };

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative w-full bg-[#EDE8F5] dark:bg-[#000000] transition-colors duration-500 overflow-hidden"
        >
            {/* Background Grid Pattern (Subtle) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3D52A00a_1px,transparent_1px),linear-gradient(to_bottom,#3D52A00a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            {/* Full Width Container */}
            <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between">

                {/* --- Left Column: Edge-to-Edge Parallax Image --- */}
                <div className="w-full lg:w-1/2 relative h-[600px] sm:h-[600px] overflow-hidden lg:rounded-r-[4rem] group perspective-1000">

                    {/* Main Story Image with dynamic mouse parallax */}
                    <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                        alt="Our team collaborating"
                        className="absolute inset-[-1%] w-[110%] h-[110%] object-cover transition-transform duration-200 ease-out"
                        style={{
                            transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.05)`,
                        }}
                    />

                    {/* Gradient Overlay for subtle depth */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent lg:rounded-r-[4rem] pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#EDE8F5]/80 via-transparent to-transparent dark:from-black/80 lg:hidden pointer-events-none"></div>

                    {/* Interactive Floating Experience Badge */}
                    <div
                        className={`absolute bottom-8 right-8 lg:bottom-20 lg:-right-10 z-10 bg-white/70 dark:bg-[#09090b]/70 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.15)] rounded-3xl p-6 lg:p-8 flex items-center space-x-5 transition-all duration-700 ease-out hover:bg-white dark:hover:bg-[#0f172a] hover:scale-105 hover:shadow-[0_0_40px_rgba(61,82,160,0.3)]
                        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
                        style={{ transitionDelay: '300ms' }}
                    >
                        {/* Glowing orb behind badge */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#3D52A0] to-indigo-500 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>

                        <div className="relative text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#3D52A0] to-indigo-400 dark:from-indigo-400 dark:to-blue-400 drop-shadow-sm">
                            12+
                        </div>
                        <div className="relative flex flex-col">
                            <span className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-widest">Years of</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Digital Excellence</span>
                        </div>
                    </div>
                </div>

                {/* --- Right Column: Premium Text Content with Scroll Reveal --- */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:pl-24 xl:pl-32 lg:pr-16 xl:pr-24 py-10 relative">

                    {/* Ambient Glow behind text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3D52A0]/5 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                    {/* Subheading / Section Label */}
                    <div
                        className={`flex items-center space-x-3 mb-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        <div className="h-[2px] w-12 bg-[#3D52A0] relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/50 animate-[slide_2s_ease-in-out_infinite]"></div>
                        </div>
                        <span className="text-[#3D52A0] dark:text-indigo-400 font-bold uppercase tracking-[0.2em] text-sm">
                            Our Origin
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h2
                        className={`text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-8 transition-all duration-700 ease-out delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        We didn't just adapt to the digital age. <br className="hidden xl:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D52A0] to-indigo-500 dark:to-indigo-400 relative inline-block">
                            We shape it.
                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-indigo-400/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </span>
                    </h2>

                    {/* Paragraphs */}
                    <div className={`space-y-6 text-lg text-gray-700 dark:text-gray-300 font-medium dark:font-light leading-relaxed transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <p className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                            Starting in a small collaborative workspace, our vision was simple: bridge the gap between complex engineering and beautiful, intuitive human experiences.
                        </p>
                        <p className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                            Today, we are a global collective of visionary thinkers, developers, and designers. We don't just build software; we engineer ecosystems that empower top-tier businesses to scale seamlessly and dominate their markets.
                        </p>
                    </div>

                    {/* Premium Checkmarks / Bullet Points (Staggered Animation) */}
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            "Award-Winning UI/UX",
                            "Enterprise-Grade Security",
                            "Agile Development",
                            "24/7 Global Support"
                        ].map((item, index) => (
                            <div
                                key={index}
                                className={`flex items-center space-x-4 group cursor-pointer transition-all duration-700 ease-out`}
                                style={{
                                    transitionDelay: `${300 + (index * 100)}ms`,
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(15px)'
                                }}
                            >
                                <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-white dark:bg-white/5 flex items-center justify-center border border-gray-200 dark:border-white/10 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#3D52A0] group-hover:border-[#3D52A0] group-hover:shadow-[0_0_20px_rgba(61,82,160,0.4)] overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <svg className="relative w-5 h-5 text-[#3D52A0] dark:text-indigo-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <span className="text-gray-900 dark:text-gray-200 font-semibold text-base group-hover:text-[#3D52A0] dark:group-hover:text-indigo-300 transition-colors">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* CEO / Founder Signature Area */}
                    <div
                        className={`mt-14 pt-8 border-t border-gray-300 dark:border-white/10 flex items-center justify-between transition-all duration-700 ease-out delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        <div className="flex items-center space-x-5 group cursor-pointer">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-[3px] border-white dark:border-[#09090b] shadow-lg transition-transform duration-500 group-hover:scale-105">
                                <img src="https://i.ibb.co.com/679hzvrz/linkdin-profile-photo.jpg" alt="CEO" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 border border-black/10 rounded-full"></div>
                            </div>
                            <div>
                                <div className="font-extrabold text-gray-900 dark:text-white text-xl tracking-tight group-hover:text-[#3D52A0] dark:group-hover:text-indigo-400 transition-colors">Ziaul Hoque</div>
                                <div className="text-sm text-[#3D52A0] dark:text-indigo-500 font-bold uppercase tracking-wider mt-1">Founder & CEO</div>
                            </div>
                        </div>

                        {/* Minimal stylized signature image */}
                        <div className="hidden sm:block opacity-40 dark:opacity-30 transition-opacity duration-500 hover:opacity-80 dark:hover:opacity-100 cursor-crosshair">
                            <svg width="140" height="50" viewBox="0 0 200 60" fill="none" stroke="currentColor" className="text-gray-900 dark:text-white">
                                <path d="M20,40 Q40,10 60,30 T100,20 T140,40 T180,20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M40,50 Q70,30 110,45" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>

                </div>
            </div>

            {/* Inline keyframes for subtle accents */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slide {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
            `}} />
        </section>
    );
}