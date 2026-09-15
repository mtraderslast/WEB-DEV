"use client";

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
    Bot, Workflow, Zap, Database, BarChart3, Settings,
    Cpu, TrendingDown, Link as LinkIcon, Clock, PieChart
} from 'lucide-react';
import PortfolioButton from './PortfolioButton';
import ServiceCard from './ServiceCard';

export default function BusinessAutomationSection() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { damping: 25, stiffness: 150 });
    const mouseY = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { damping: 25, stiffness: 150 });

    function handleTilt(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = event.clientX - rect.left;
        const mouseYPos = event.clientY - rect.top;
        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleLeave() {
        x.set(0);
        y.set(0);
    }

    const automationServices = [
        {
            title: "Workflow & Process Automation",
            desc: "Eliminate repetitive tasks by automating end-to-end operational and departmental workflows.",
            icon: Workflow
        },
        {
            title: "Custom CRM & ERP Solutions",
            desc: "Centralize business operations, sales pipelines, and customer management into unified systems.",
            icon: Database
        },
        {
            title: "AI & Bot Integration",
            desc: "Deploy smart chatbots, automated data processing, and AI-driven customer support tools.",
            icon: Bot
        },
        {
            title: "Data Analytics & Reporting",
            desc: "Automate reporting pipelines with real-time dashboards to drive data-backed decisions.",
            icon: BarChart3
        }
    ];

    const highlightFeatures = [
        {
            text: "Up to 80% Reduction in Manual Tasks & Errors",
            icon: TrendingDown
        },
        {
            text: "Seamless Third-Party API & Tool Integration",
            icon: LinkIcon
        },
        {
            text: "24/7 Automated Customer & Lead Workflows",
            icon: Clock
        },
        {
            text: "Centralized Real-Time Operational Dashboards",
            icon: PieChart
        }
    ];

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="relative w-full py-10 px-4 sm:px-8 lg:px-16 transition-colors duration-300 bg-[#EDE8F5] dark:bg-[#000000] text-gray-800 dark:text-gray-100 overflow-hidden">

            {/* 💡 Slowly Sliding Ambient Background Glow (Aurora Effect) */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
                <motion.div
                    animate={{
                        x: ['-40%', '60%', '-40%'],
                        y: ['-25%', '45%', '-25%'],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-gradient-to-r from-[#3D52A0]/30 via-indigo-500/20 to-blue-500/40 dark:from-[#3D52A0]/40 dark:via-indigo-600/20 dark:to-blue-900/40 rounded-full blur-[150px] opacity-70"
                />
            </div>

            {/* Full-width container */}
            <div className="relative z-10 w-full space-y-16">

                {/* Header & Hero Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                    {/* Main Info */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ staggerChildren: 0.15 }}
                        className="lg:col-span-7 space-y-6"
                    >
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-[#3D52A0]/10 text-[#3D52A0] dark:bg-[#3D52A0]/20 dark:text-blue-400 border border-[#3D52A0]/20 backdrop-blur-md">
                            <Zap className="w-4 h-4 animate-pulse" />
                            Process Efficiency & Automation
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                            Intelligent <span className="text-[#3D52A0] dark:text-blue-400">Business Automation</span> Solutions
                        </motion.h2>

                        <motion.p variants={fadeUp} className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Scale your operations faster by eliminating manual bottlenecks. We build custom automation tools, integrate cross-platform systems, and streamline business processes so your team can focus on growth.
                        </motion.p>

                        <motion.div variants={fadeUp} className="pt-2">
                            <PortfolioButton />
                        </motion.div>
                    </motion.div>

                    {/* Key Advantages Card with 3D Tilt & Rotating Border */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="lg:col-span-5 relative group perspective-[1000px]"
                    >
                        <motion.div
                            onMouseMove={handleTilt}
                            onMouseLeave={handleLeave}
                            style={{ rotateX: mouseY, rotateY: mouseX, transformStyle: "preserve-3d" }}
                            className="relative w-full h-full"
                        >
                            {/* 💡 Animated Border Light Effect */}
                            <div className="absolute -inset-[1.5px] bg-gradient-to-r from-[#3D52A0] via-indigo-400 to-[#3D52A0] dark:from-blue-500 dark:via-indigo-500 dark:to-blue-500 rounded-2xl opacity-40 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-500 animate-[pulse_3s_infinite]" style={{ transform: "translateZ(-10px)" }} />

                            <div
                                className="relative p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-[#09090b]/90 border border-gray-200 dark:border-gray-800 shadow-2xl backdrop-blur-md space-y-6"
                                style={{ transform: "translateZ(15px)" }}
                            >
                                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                        <Settings className="w-4 h-4 text-[#3D52A0] dark:text-blue-400" /> Automation Benefits
                                    </span>
                                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                                        <Bot className="w-4 h-4" />
                                        <Workflow className="w-4 h-4" />
                                        <Cpu className="w-4 h-4" />
                                    </div>
                                </div>

                                <ul className="space-y-4 relative z-10">
                                    {/* 💡 কাস্টম আইকন সহ লিস্ট রেন্ডারিং */}
                                    {highlightFeatures.map((feature, idx) => {
                                        const FeatureIcon = feature.icon;
                                        return (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, x: 20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: 0.3 + (idx * 0.1) }}
                                                className="flex items-start gap-3.5 group/item"
                                            >
                                                <div className="relative mt-0.5">
                                                    <div className="absolute inset-0 bg-[#3D52A0]/20 dark:bg-blue-500/20 rounded-full scale-0 group-hover/item:scale-150 transition-transform duration-300" />
                                                    <FeatureIcon className="w-5 h-5 text-[#3D52A0] dark:text-blue-400 relative z-10 group-hover/item:scale-110 transition-transform" strokeWidth={2} />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover/item:text-[#3D52A0] dark:group-hover/item:text-white transition-colors">
                                                    {feature.text}
                                                </span>
                                            </motion.li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>

                {/* Automation Services Grid */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Automation Capabilities
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            End-to-end automation strategies tailored to optimize productivity and reduce operational costs.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {automationServices.map((item, index) => (
                            <ServiceCard key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}