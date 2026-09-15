"use client";

import { motion } from "framer-motion";
import { Search, Code2, TestTube2, Rocket, Sparkles, CheckCircle2 } from "lucide-react";

export default function ProcessSection() {
    const steps = [
        {
            number: "01",
            icon: Search,
            title: "Discovery & Planning",
            description: "We analyze your project goals, user needs, and business requirements to craft a clear technical roadmap.",
            badge: "Phase 1",
            features: [
                "In-depth Requirement Analysis",
                "Technology Stack Selection",
                "Wireframing & Architecture"
            ]
        },
        {
            number: "02",
            icon: Code2,
            title: "Agile Development",
            description: "Building scalable, clean, and modern web applications using cutting-edge technologies like React & Next.js.",
            badge: "Phase 2",
            features: [
                "Component-Driven UI Design",
                "Custom API Integration",
                "Weekly Sprint Reviews"
            ]
        },
        {
            number: "03",
            icon: TestTube2,
            title: "Testing & QA",
            description: "Rigorous testing across multiple browsers and mobile devices to ensure peak performance and zero bugs.",
            badge: "Phase 3",
            features: [
                "Automated & Manual Testing",
                "Performance & Load Audits",
                "Security Vulnerability Checks"
            ]
        },
        {
            number: "04",
            icon: Rocket,
            title: "Launch & Support",
            description: "Seamless deployment to production servers accompanied by 24/7 continuous monitoring and dedicated support.",
            badge: "Phase 4",
            features: [
                "CI/CD Pipeline Setup",
                "Zero-Downtime Deployment",
                "Post-Launch Monitoring"
            ]
        }
    ];

    // Animation Variants
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const lineAnimation = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 1.2, ease: "easeInOut", delay: 0.5 }
        }
    };

    return (
        <section className="relative w-full py-10 bg-[#EDE8F5] dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden">

            {/* Animated Ambient Lighting FX */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.25, 0.1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#3D52A0]/20 dark:bg-[#3D52A0]/30 rounded-full blur-[140px] pointer-events-none"
            />

            <div className="relative w-full mx-auto px-5 sm:px-8 lg:px-12 z-10">

                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeUp}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#3D52A0] dark:text-slate-300 bg-[#3D52A0]/10 dark:bg-slate-900/80 border border-[#3D52A0]/20 dark:border-slate-800 uppercase tracking-widest mb-5 backdrop-blur-md shadow-sm">
                        <Sparkles size={14} className="text-[#3D52A0] dark:text-slate-300 animate-pulse" /> How We Work
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#3D52A0] dark:text-white leading-[1.15]">
                        Our Proven <br className="sm:hidden" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-300 dark:to-slate-500">Development Process</span>
                    </h2>
                    <p className="mt-5 text-base sm:text-lg text-slate-700 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
                        A structured, step-by-step approach designed to turn your idea into a high-performing digital product efficiently.
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
                >
                    {/* Animated Connecting Line for Large Screens */}
                    <motion.div
                        variants={lineAnimation}
                        style={{ originX: 0 }}
                        className="hidden lg:block absolute top-[22%] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-transparent via-[#3D52A0]/40 dark:via-slate-700 to-transparent z-0 pointer-events-none"
                    />

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                variants={fadeUp}
                                key={index}
                                whileHover={{ y: -8 }}
                                className="group relative z-10 flex flex-col items-start p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-slate-900/80 border border-[#3D52A0]/15 dark:border-slate-800 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:shadow-[#3D52A0]/10 hover:border-[#3D52A0]/40 dark:hover:border-slate-600 dark:hover:bg-slate-800/90 h-full"
                            >
                                {/* Step Header & Badges */}
                                <div className="w-full flex items-center justify-between mb-6">
                                    <div className="p-3.5 rounded-xl bg-[#3D52A0] text-white dark:bg-slate-800 dark:border dark:border-slate-700 dark:text-white shadow-lg shadow-[#3D52A0]/30 dark:shadow-none group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 flex-shrink-0">
                                        <Icon size={24} strokeWidth={1.8} />
                                    </div>
                                    <span className="text-3xl font-black font-mono text-[#3D52A0]/15 dark:text-slate-800 group-hover:text-[#3D52A0]/30 dark:group-hover:text-slate-600 transition-colors duration-300">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="space-y-3 flex-grow w-full">
                                    <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-[#3D52A0] dark:text-slate-300 bg-[#3D52A0]/10 dark:bg-slate-800 uppercase tracking-widest transition-colors group-hover:bg-[#3D52A0] group-hover:text-white dark:group-hover:bg-slate-700">
                                        {step.badge}
                                    </span>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                                        {step.description}
                                    </p>

                                    {/* 💡 Additional Information (Features List) */}
                                    <div className="pt-4 mt-2 border-t border-[#3D52A0]/10 dark:border-slate-700/50 space-y-2.5">
                                        {step.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <CheckCircle2 size={16} className="text-[#3D52A0] dark:text-slate-400 mt-0.5 flex-shrink-0" />
                                                <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300 leading-snug">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}