"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Zap, ShieldCheck, Clock, Layers, ArrowRight, CheckCircle2, Sparkles, Trophy, BarChart3, Cpu } from "lucide-react";

export default function WhyChooseUs() {
    // 3D Tilt Effect Setup
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the tilt
    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-200, 200], [7, -7]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-7, 7]), springConfig);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Animation Variants
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const keyAdvantages = [
        { icon: Zap, title: "Ultra-Fast Execution", description: "High-performance architecture ensuring lightning-fast load times and seamless operations." },
        { icon: ShieldCheck, title: "Enterprise-Grade Security", description: "Bank-grade encryption, PCI-DSS compliance, and end-to-end data privacy protections." },
        { icon: Clock, title: "24/7 Dedicated Support", description: "Around-the-clock technical monitoring and direct chat assistance whenever you need it." },
        { icon: Layers, title: "Scalable Infrastructure", description: "Future-proof MERN & Next.js systems engineered to grow effortlessly with your business." },
        { icon: Cpu, title: "API-First Architecture", description: "Modular and clean RESTful or GraphQL APIs designed for seamless third-party integrations." },
        { icon: BarChart3, title: "Advanced Analytics Dashboard", description: "Real-time data tracking, performance metrics, and actionable insights built right into your system." }
    ];

    const quickStats = [
        { value: "99.9%", label: "Uptime Guaranteed" },
        { value: "250+", label: "Projects Delivered" },
        { value: "100%", label: "Client Satisfaction" },
    ];

    return (
        <section className="relative w-full py-10 bg-[#EDE8F5] dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden">
            {/* Ambient Background Glows */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-10 w-80 h-80 bg-[#3D52A0]/10 dark:bg-[#3D52A0]/20 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 right-10 w-96 h-96 bg-[#3D52A0]/15 dark:bg-[#3D52A0]/25 rounded-full blur-[120px] pointer-events-none"
            />

            {/* Changed from max-w-7xl to full width layout with padding */}
            <div className="relative mx-auto px-5 sm:px-8 lg:px-12 z-10 w-full">

                {/* Main Content Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                >

                    {/* Left Column: Image Showcase with Floating Glassmorphism Badges */}
                    <motion.div variants={fadeUp} className="lg:col-span-6 relative group perspective-[1000px]">

                        {/* 3D Tilt Container applied to original image structure */}
                        <motion.div
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            className="relative w-full"
                        >
                            {/* Decorative Background Frame */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#3D52A0]/30 to-[#3D52A0]/10 dark:from-[#3D52A0]/40 dark:to-slate-800 rounded-3xl blur-xl transition duration-500 group-hover:blur-2xl opacity-70" style={{ transform: "translateZ(-50px)" }} />

                            <div className="relative rounded-2xl overflow-hidden border border-[#3D52A0]/20 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 shadow-2xl" style={{ transform: "translateZ(0px)" }}>
                                <div className="relative aspect-[4/3] w-full">
                                    <Image
                                        src="/why-choose-us.jpg"
                                        alt="Why Choose Us Showcase"
                                        fill
                                        priority
                                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                </div>

                                {/* Floating Glassmorphism Card 2 (Bottom Left) */}
                                <motion.div
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ transform: "translateZ(30px)" }}
                                    className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 sm:right-auto bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border border-[#3D52A0]/20 dark:border-slate-800 p-4 rounded-xl shadow-xl flex items-center justify-between sm:justify-start gap-4"
                                >
                                    <div className="flex -space-x-3">
                                        {/* Avatar 1 with Image */}
                                        <div className="relative w-9 h-9 rounded-full border-2 border-white dark:border-slate-900 shadow-sm z-30 overflow-hidden bg-slate-200">
                                            <Image src="/avatar1.jpg" alt="Client 1" fill className="object-cover" />
                                        </div>
                                        {/* Avatar 2 with Image */}
                                        <div className="relative w-9 h-9 rounded-full border-2 border-white dark:border-slate-900 shadow-sm z-20 overflow-hidden bg-slate-300">
                                            <Image src="/avatar2.jpg" alt="Client 2" fill className="object-cover" />
                                        </div>
                                        {/* Plus Icon / More Count */}
                                        <div className="relative w-9 h-9 rounded-full bg-[#3D52A0]/90 text-white flex items-center justify-center text-xs font-bold border-2 border-white dark:border-slate-900 shadow-sm z-10">
                                            +
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <Sparkles size={14} className="text-[#3D52A0] dark:text-slate-300" />
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">Trusted Partner</span>
                                        </div>
                                        <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-0.5">For 100+ Businesses</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Quick Stats Grid Under Image */}
                        <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 mt-6 relative z-20">
                            {quickStats.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-950/60 border border-[#3D52A0]/15 dark:border-slate-800 text-center backdrop-blur-sm transition-all duration-300 shadow-sm"
                                >
                                    <h4 className="text-lg sm:text-xl font-bold text-[#3D52A0] dark:text-white">{stat.value}</h4>
                                    <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-0.5">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Action CTA Button */}
                        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
                            <Link
                                href="/pricing"
                                className="relative z-10 inline-flex items-center justify-center overflow-hidden rounded-xl p-[2px] font-semibold text-sm active:scale-[0.98] transition-all duration-300 group shadow-lg shadow-[#3D52A0]/25 hover:shadow-[0_4px_20px_rgba(61,82,160,0.35)] cursor-pointer"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-[#3D52A0] via-[#7088D6] to-[#3D52A0] bg-[length:200%_100%] bg-left transition-all duration-500 ease-out group-hover:bg-right" />
                                <span className="relative flex items-center gap-3 px-7 py-3 rounded-[10px] bg-[#3D52A0] text-white transition-all duration-300 dark:bg-slate-900 dark:text-white w-full h-full">
                                    <span>Explore Our Packages & Pricing</span>
                                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </Link>

                            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium relative z-10">
                                Transparent Pricing · No Hidden Fees
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Text & Advantages */}
                    <div className="lg:col-span-6 flex flex-col justify-center">

                        {/* Section Tag */}
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-[#3D52A0] dark:text-slate-300 bg-[#3D52A0]/10 dark:bg-slate-900/80 border border-[#3D52A0]/20 dark:border-slate-800 uppercase tracking-widest mb-4 w-fit backdrop-blur-md">
                            <CheckCircle2 size={14} /> Unmatched Value
                        </motion.div>

                        {/* Heading */}
                        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#3D52A0] dark:text-white leading-tight">
                            Why Choose Us <br className="hidden sm:inline" />
                            <span className="text-slate-700 dark:text-slate-400">Over Other Agencies?</span>
                        </motion.h2>

                        {/* Description */}
                        <motion.p variants={fadeUp} className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
                            We don’t just build software—we craft tailored digital experiences that drive real business revenue. Combining enterprise reliability with modern innovation to keep you ahead of the competition.
                        </motion.p>

                        {/* Interactive Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                            {keyAdvantages.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        variants={fadeUp}
                                        key={index}
                                        className="group p-4 rounded-xl bg-white/70 dark:bg-slate-950/80 border border-[#3D52A0]/15 dark:border-slate-800 hover:border-[#3D52A0] dark:hover:border-slate-700 hover:shadow-lg transition-all duration-300 backdrop-blur-md"
                                    >
                                        <div className="p-2.5 rounded-lg bg-[#3D52A0]/10 text-[#3D52A0] group-hover:bg-[#3D52A0] group-hover:text-white dark:bg-slate-900 dark:text-slate-300 dark:group-hover:bg-white dark:group-hover:text-slate-900 w-fit transition-colors duration-300 mb-3">
                                            <Icon size={20} />
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}