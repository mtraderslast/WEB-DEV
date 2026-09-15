"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Code2, Sparkles, CheckCircle2 } from "lucide-react";

export default function ServicesHero() {
    // 3D Tilt Effect Setup for the right side image
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 100 };
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), springConfig);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Animations
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
    };

    // Unsplash Avatar URLs for Social Proof
    const avatars = [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
    ];

    return (
        <section className="relative w-full min-h-[85vh] flex items-center py-10 lg:mt-10 lg:py-20 bg-[#EDE8F5] dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden">

            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.09 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat dark:opacity-[0.90] grayscale pointer-events-none"
                style={{ backgroundImage: "url('/services-bg.jpg')" }}
            />

            {/* Premium Animated Background Elements */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-[#3D52A0]/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-[20%] -right-[10%] w-[40vw] h-[40vw] bg-[#7088D6]/20 rounded-full blur-[140px]"
                />
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#3D52A00d_1px,transparent_1px),linear-gradient(to_bottom,#3D52A00d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <div className="relative z-10 w-full mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Text & CTA (Centered on small screens, Left aligned on lg) */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="flex flex-col items-center text-center lg:items-start lg:text-left w-full lg:pr-10 xl:pr-20 pt-10 lg:pt-0"
                    >
                        {/* Top Premium Badge */}
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-900/60 border border-[#3D52A0]/20 dark:border-slate-700/80 backdrop-blur-md shadow-sm mb-6">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3D52A0] dark:bg-[#7088D6] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3D52A0] dark:bg-[#7088D6]"></span>
                            </span>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#3D52A0] dark:text-slate-300">
                                Enterprise Solutions
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white mb-6">
                            Architecting the <br />
                            <span className="relative inline-block mt-2">
                                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#3D52A0] to-[#7088D6] dark:from-white dark:to-[#7088D6]">
                                    Future of Digital
                                </span>
                                {/* Text Highlight Swoosh */}
                                <span className="absolute bottom-1 left-0 w-full h-3 sm:h-4 bg-[#3D52A0]/10 dark:bg-[#7088D6]/20 -z-10 -rotate-1"></span>
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p variants={fadeUp} className="text-base sm:text-lg xl:text-xl text-slate-700 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10">
                            We deliver end-to-end software development, AI integration, and scalable cloud architectures designed exclusively to elevate industry leaders and ambitious enterprises.
                        </motion.p>

                        {/* Action Buttons */}
                        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-5 w-full sm:w-auto">
                            <Link
                                href="/contact"
                                className="relative flex items-center justify-center overflow-hidden rounded-xl p-[2px] font-semibold text-sm sm:text-base active:scale-[0.98] transition-all duration-300 group shadow-lg shadow-[#3D52A0]/20 hover:shadow-[0_8px_30px_rgba(61,82,160,0.4)] w-full sm:w-auto"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-[#3D52A0] via-[#8B9DD4] to-[#3D52A0] bg-[length:200%_100%] bg-left transition-all duration-500 ease-out group-hover:bg-right" />
                                <span className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-[10px] bg-[#3D52A0] group-hover:bg-transparent text-white transition-colors duration-300 w-full h-full">
                                    Start a Project
                                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                                </span>
                            </Link>

                            <Link
                                href="/pricing"
                                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-[#3D52A0]/20 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm sm:text-base backdrop-blur-md transition-all duration-300 hover:bg-white dark:hover:bg-slate-800 hover:scale-[1.02] hover:shadow-md w-full sm:w-auto"
                            >
                                View All Packages
                                <Sparkles size={18} className="text-[#3D52A0] dark:text-[#7088D6]" />
                            </Link>
                        </motion.div>

                        {/* Mini Social Proof */}
                        <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 opacity-80">
                            <div className="flex -space-x-2">
                                {avatars.map((url, i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#EDE8F5] dark:border-black bg-slate-300 dark:bg-slate-700 overflow-hidden relative">
                                        <img src={url} alt={`Client ${i + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 text-center sm:text-left">
                                Trusted by <span className="font-bold text-slate-900 dark:text-white">Fortune 500</span> companies worldwide.
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Interactive 3D Image & Floating Cards */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="relative w-full h-full min-h-[400px] lg:min-h-[600px] flex items-center justify-center perspective-[1200px]"
                    >
                        {/* 3D Tilt Container */}
                        <motion.div
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            className="relative w-full max-w-[600px] aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] xl:aspect-[3/4]"
                        >
                            {/* Glow Behind Image */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-[#3D52A0]/40 to-[#7088D6]/30 dark:from-[#3D52A0]/50 dark:to-slate-700/50 rounded-[2.5rem] blur-2xl opacity-70 transition duration-700 group-hover:opacity-100" style={{ transform: "translateZ(-80px)" }} />

                            {/* Main Image Wrapper */}
                            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/50 dark:border-slate-700/50 shadow-2xl bg-slate-100 dark:bg-slate-900" style={{ transform: "translateZ(0px)" }}>
                                <Image
                                    src="/services-hero-image.jpg"
                                    alt="Premium IT Services"
                                    fill
                                    priority
                                    className="object-cover object-center scale-[1.02]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#3D52A0]/20 via-transparent to-black/30 dark:from-black/60 dark:to-transparent mix-blend-overlay" />
                            </div>

                            {/* Floating Card 1: Tech Stack (Top Right) */}
                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                style={{ transform: "translateZ(50px)" }}
                                className="absolute -right-4 sm:-right-8 top-10 sm:top-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 p-4 rounded-2xl shadow-2xl flex items-center gap-4"
                            >
                                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#3D52A0] to-[#2A3B75] text-white shadow-lg">
                                    <Code2 size={20} />
                                </div>
                                <div className="pr-4 hidden sm:block">
                                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">Core Stack</p>
                                    <p className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">React & Next.js</p>
                                </div>
                            </motion.div>

                            {/* Floating Card 2: Global Reach (Bottom Left) */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                style={{ transform: "translateZ(70px)" }}
                                className="absolute -left-4 sm:-left-10 bottom-16 sm:bottom-24 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 p-4 sm:p-5 rounded-2xl shadow-2xl"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </div>
                                    <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Systems Online</p>
                                </div>
                                <div className="flex items-end gap-2">
                                    <h3 className="text-3xl font-black text-[#3D52A0] dark:text-white leading-none">99.9%</h3>
                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 pb-1">Uptime SLA</p>
                                </div>
                            </motion.div>

                            {/* Floating Card 3: Small checkmark badge (Bottom Right) */}
                            <motion.div
                                animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                style={{ transform: "translateZ(40px)" }}
                                className="absolute -bottom-6 right-6 sm:right-10 bg-[#3D52A0] text-white p-3 sm:p-4 rounded-2xl shadow-[0_10px_30px_rgba(61,82,160,0.4)] flex items-center justify-center gap-2"
                            >
                                <CheckCircle2 size={20} className="text-[#EDE8F5]" />
                                <span className="text-sm font-bold">ISO 27001 Certified</span>
                            </motion.div>

                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}