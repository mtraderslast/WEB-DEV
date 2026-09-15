"use client";

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
    Lightbulb, Target, TrendingUp, ShieldAlert, Compass,
    CheckCircle2, Briefcase, PieChart
} from 'lucide-react';
import PortfolioButton from './PortfolioButton';
import ServiceCard from './ServiceCard';

export default function ITConsultingSection() {
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

    const consultingServices = [
        {
            title: "Digital Transformation Strategy",
            desc: "Modernize legacy systems, optimize business workflows, and adopt modern tech stacks effectively.",
            icon: TrendingUp
        },
        {
            title: "Software Architecture & Tech Advisory",
            desc: "Expert guidance on choosing scalable frameworks, databases, and microservice architectures.",
            icon: Compass
        },
        {
            title: "Cybersecurity & Risk Management",
            desc: "Comprehensive security assessments, compliance readiness, and threat mitigation strategies.",
            icon: ShieldAlert
        },
        {
            title: "IT Project & Process Optimization",
            desc: "Streamline engineering workflows, adopt Agile practices, and maximize tech ROI.",
            icon: Target
        }
    ];

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="relative w-full py-10 px-4 sm:px-8 lg:px-16 transition-colors duration-300 bg-[#EDE8F5] dark:bg-[#000000] text-gray-800 dark:text-gray-100 overflow-hidden">

            <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
                <motion.div
                    animate={{
                        x: ['-40%', '60%', '-40%'],
                        y: ['-25%', '45%', '-25%'],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-gradient-to-r from-[#3D52A0]/30 via-purple-500/20 to-indigo-500/40 dark:from-[#3D52A0]/40 dark:via-purple-600/20 dark:to-indigo-900/40 rounded-full blur-[150px] opacity-70"
                />
            </div>

            <div className="relative z-10 w-full space-y-16">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ staggerChildren: 0.15 }}
                        className="lg:col-span-7 space-y-6"
                    >
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-[#3D52A0]/10 text-[#3D52A0] dark:bg-[#3D52A0]/20 dark:text-blue-400 border border-[#3D52A0]/20 backdrop-blur-md">
                            <Lightbulb className="w-4 h-4 animate-pulse" />
                            Strategic Technology Advisory
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                            Strategic <span className="text-[#3D52A0] dark:text-blue-400">IT Consulting</span> & Advisory Services
                        </motion.h2>

                        <motion.p variants={fadeUp} className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Align your technical investments with your business goals. We deliver actionable insights, expert software architecture advice, and roadmap planning to minimize technical debt and accelerate your growth.
                        </motion.p>

                        <motion.div variants={fadeUp} className="pt-2">
                            <PortfolioButton />
                        </motion.div>
                    </motion.div>

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
                            <div className="absolute -inset-[1.5px] bg-gradient-to-r from-[#3D52A0] via-purple-500 to-[#3D52A0] dark:from-blue-500 dark:via-purple-500 dark:to-blue-500 rounded-2xl opacity-40 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-500 animate-[pulse_3s_infinite]" style={{ transform: "translateZ(-10px)" }} />

                            <div
                                className="relative p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-[#09090b]/90 border border-gray-200 dark:border-gray-800 shadow-2xl backdrop-blur-md space-y-6"
                                style={{ transform: "translateZ(15px)" }}
                            >
                                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-[#3D52A0] dark:text-blue-400" /> Advisory Highlights
                                    </span>
                                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                                        <Target className="w-4 h-4" />
                                        <TrendingUp className="w-4 h-4" />
                                        <PieChart className="w-4 h-4" />
                                    </div>
                                </div>

                                <ul className="space-y-4 relative z-10">
                                    {[
                                        "Tailored Technology Roadmaps & Growth Audits",
                                        "Cost & Resource Optimization Strategy",
                                        "Security, Risk Mitigation & Compliance Focus",
                                        "End-to-End System Integration Guidance"
                                    ].map((feature, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 0.3 + (idx * 0.1) }}
                                            className="flex items-start gap-3 group/item"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-[#3D52A0] dark:text-blue-400 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover/item:text-[#3D52A0] dark:group-hover/item:text-white transition-colors">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>

                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Consulting Expertise
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Data-backed strategies to overcome technology roadblocks and scale efficiently.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {consultingServices.map((item, index) => (
                            <ServiceCard key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}