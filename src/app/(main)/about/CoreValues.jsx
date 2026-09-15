"use client";
import React, { useState } from 'react';

export default function CoreValues() {
    const [active, setActive] = useState(0);

    const values = [
        {
            id: "01",
            title: "Relentless Innovation",
            subtitle: "Pushing the boundaries of the digital frontier.",
            description: "We don't follow trends; we set them. By leveraging bleeding-edge technology, AI, and modern web architectures, we engineer solutions that define tomorrow's industry standards and keep our clients years ahead of their competition.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
            points: ["AI-Driven Architectures", "Web3 Integration", "Next-Gen UI/UX"]
        },
        {
            id: "02",
            title: "Uncompromising Quality",
            subtitle: "Pixel-perfect precision in every line of code.",
            description: "Every pixel, every interaction, and every database query is meticulously crafted. We refuse to settle for 'good enough'. Our rigorous QA and performance testing ensure enterprise-grade stability and flawless user experiences.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
            points: ["Zero-Downtime Deployments", "Sub-second Load Times", "Automated QA"]
        },
        {
            id: "03",
            title: "Absolute Transparency",
            subtitle: "No black boxes. Just honest collaboration.",
            description: "We build trust through continuous communication. From sprint planning to final deployment, you have full visibility into our workflows, codebase, and decision-making processes. We are your technical partners, not just vendors.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
            points: ["Real-time Dashboards", "Weekly Sprint Reviews", "Open Codebase Access"]
        },
        {
            id: "04",
            title: "User-Centric Design",
            subtitle: "Technology that adapts to human behavior.",
            description: "We engineer experiences that feel completely natural. By combining deep behavioral psychology with stunning visual aesthetics, we create interfaces that users don't just use—they fall in love with.",
            image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop",
            points: ["Behavioral Analytics", "Accessibility First", "Immersive Interactions"]
        }
    ];

    return (
        <section className="relative w-full flex items-center bg-[#EDE8F5] dark:bg-[#000000] overflow-hidden">

            {values.map((val, index) => (
                <div
                    key={val.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${active === index ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <img
                        src={val.image}
                        alt={val.title}
                        className="w-full h-full object-cover transition-transform duration-[10s] ease-out scale-105"
                        style={{ transform: active === index ? "scale(1)" : "scale(1.1)" }}
                    />
                </div>
            ))}

            <div className="absolute inset-0 bg-white/80 dark:bg-black/85 backdrop-blur-[8px] transition-colors duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-white dark:via-black/50 dark:to-black"></div>

            <div className="relative z-10 w-full px-6 md:px-12 py-15 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">

                <div className="w-full lg:w-3/5 flex flex-col space-y-8 lg:space-y-12">
                    <div className="inline-flex items-center space-x-4 mb-4">
                        <div className="h-[2px] w-12 bg-[#3D52A0]"></div>
                        <span className="text-[#3D52A0] dark:text-indigo-400 font-bold uppercase tracking-[0.3em] text-sm">
                            Our Core DNA
                        </span>
                    </div>

                    <div className="flex flex-col w-full space-y-2">
                        {values.map((val, index) => (
                            <div
                                key={val.id}
                                onMouseEnter={() => setActive(index)}
                                className="group cursor-pointer flex items-center py-4 border-b border-gray-300 dark:border-white/10 last:border-0 transition-all duration-500"
                            >
                                <span
                                    className={`text-xl lg:text-3xl font-light transition-all duration-500 mr-8 ${active === index ? "text-[#3D52A0] dark:text-indigo-400" : "text-gray-400 dark:text-gray-600"
                                        }`}
                                >
                                    {val.id}
                                </span>
                                <h2
                                    className={`text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight transition-all duration-500`}
                                    style={{
                                        color: active === index ? "transparent" : "transparent",
                                        WebkitTextStroke: active === index
                                            ? "0px transparent"
                                            : "1.5px rgba(156, 163, 175, 0.4)",
                                        backgroundImage: active === index
                                            ? "linear-gradient(to right, #3D52A0, #6366f1)"
                                            : "none",
                                        WebkitBackgroundClip: active === index ? "text" : "none",
                                        transform: active === index ? "translateX(20px)" : "translateX(0px)"
                                    }}
                                >
                                    {val.title}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-2/5 flex justify-end">
                    <div className="w-full max-w-lg min-h-[400px] bg-white/40 dark:bg-[#09090b]/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/50 dark:border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-10 lg:p-12 relative overflow-hidden transition-all duration-700">

                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3D52A0]/10 dark:bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <div
                            key={active}
                            className="relative z-10 flex flex-col h-full animate-[fadeIn_0.5s_ease-in-out]"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                                {values[active].subtitle}
                            </h3>

                            <p className="text-gray-700 dark:text-gray-400 font-medium dark:font-light leading-relaxed mb-8">
                                {values[active].description}
                            </p>

                            <div className="mt-auto space-y-4">
                                {values[active].points.map((point, i) => (
                                    <div key={i} className="flex items-center space-x-3">
                                        <div className="w-2 h-2 rounded-full bg-[#3D52A0] dark:bg-indigo-500"></div>
                                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-300 tracking-wide">
                                            {point}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
        </section>
    );
}