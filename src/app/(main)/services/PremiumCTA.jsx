"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Rocket, ArrowRight, Sparkles, Code2, Globe, Layers } from 'lucide-react';

export default function PremiumCTA() {
    const containerRef = useRef(null);

    // Mouse Tracking Logic for Spotlight Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springing for the spotlight
    const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120 });
    const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120 });

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <section className="relative w-full py-10 px-4 sm:px-8 lg:px-16 bg-[#EDE8F5] dark:bg-black transition-colors duration-500 overflow-hidden flex items-center justify-center">

            {/* CTA Container with Spotlight Interaction */}
            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-6xl mx-auto rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-slate-900 dark:bg-[#0a0f1c] shadow-2xl group border border-[#3D52A0]/20"
            >
                {/* 1. Dynamic Mouse Spotlight */}
                <motion.div
                    className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: useTransform(
                            [smoothX, smoothY],
                            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(112,136,214,0.15), transparent 80%)`
                        )
                    }}
                />

                {/* 2. Base Background Gradients (Strict Brand Colors) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1],
                            rotate: [0, 90, 0]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-1/2 -left-1/4 w-[80%] h-[80%] bg-[#3D52A0] blur-[120px] rounded-full"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.1, 0.25, 0.1],
                            x: [0, 50, 0]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-1/2 -right-1/4 w-[70%] h-[70%] bg-[#7088D6] blur-[100px] rounded-full"
                    />
                </div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] z-0" />

                {/* Content Wrapper */}
                <div className="relative z-10 px-6 py-16 sm:py-20 lg:py-24 text-center flex flex-col items-center justify-center">

                    {/* Floating Background Icons */}
                    <motion.div animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 left-10 lg:top-20 lg:left-24 text-[#7088D6]/10 dark:text-[#7088D6]/20">
                        <Code2 size={56} />
                    </motion.div>
                    <motion.div animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-10 right-10 lg:bottom-20 lg:right-24 text-[#3D52A0]/10 dark:text-[#3D52A0]/20">
                        <Globe size={72} />
                    </motion.div>
                    <motion.div animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-1/2 right-10 lg:right-32 text-[#7088D6]/10 dark:text-[#7088D6]/20">
                        <Layers size={40} />
                    </motion.div>

                    {/* Badge */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#3D52A0]/20 border border-[#7088D6]/30 backdrop-blur-md shadow-sm mb-8 cursor-default"
                    >
                        <Sparkles className="w-4 h-4 text-[#7088D6] animate-pulse" />
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#EDE8F5]">
                            Let's Build The Future
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl leading-[1.15]">
                        Ready to Transform Your <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7088D6] to-[#EDE8F5]">
                            Digital Landscape?
                        </span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mb-12">
                        Join industry leaders who trust our enterprise-grade engineering. Whether you need a complex web app, AI integration, or cloud migration—we make it happen.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto relative z-20">
                        {/* Primary Button */}
                        <Link
                            href="/contact"
                            className="relative flex items-center justify-center overflow-hidden rounded-xl p-[2px] font-semibold text-base active:scale-[0.98] transition-all duration-300 group shadow-[0_0_30px_rgba(61,82,160,0.4)] hover:shadow-[0_0_50px_rgba(112,136,214,0.5)] w-full sm:w-auto"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-[#3D52A0] via-[#7088D6] to-[#3D52A0] bg-[length:200%_100%] bg-left transition-all duration-500 ease-out group-hover:bg-right" />
                            <span className="relative flex items-center justify-center gap-3 px-10 py-4 rounded-[10px] bg-slate-900 group-hover:bg-transparent text-white transition-colors duration-300 w-full h-full">
                                <Rocket size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                                Start Your Project
                            </span>
                        </Link>

                        {/* Secondary Button */}
                        <Link
                            href="/pricing"
                            className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-white/5 border border-[#7088D6]/30 text-white font-medium text-base backdrop-blur-md transition-all duration-300 hover:bg-[#3D52A0]/20 hover:border-[#7088D6]/50 hover:scale-[1.02] w-full sm:w-auto group"
                        >
                            View Pricing Plans
                            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300 text-[#7088D6]" />
                        </Link>
                    </div>

                </div>
            </motion.div>
        </section>
    );
}