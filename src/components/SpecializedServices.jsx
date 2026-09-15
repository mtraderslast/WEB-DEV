"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { services } from "@/data/services"; // Ensure this path is correct

export default function SpecializedServices() {
    const [activeTab, setActiveTab] = useState(0);
    const activeService = services[activeTab];

    // Animation Variants
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="relative w-full py-24 bg-[#EDE8F5] dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden">

            {/* Background Image Layer with Parallax-like subtle scale */}
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.09 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat dark:opacity-[0.20] grayscale pointer-events-none"
                style={{ backgroundImage: "url('/services-bg.jpg')" }}
            />

            {/* Animated Ambient Background Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3D52A0]/15 dark:bg-[#3D52A0]/20 rounded-full blur-[120px] pointer-events-none"
            />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 z-10">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-[#3D52A0] dark:text-slate-300 bg-[#3D52A0]/10 dark:bg-slate-900/80 border border-[#3D52A0]/20 dark:border-slate-800 uppercase tracking-widest mb-4 backdrop-blur-md shadow-sm">
                        Enterprise IT Capability
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#3D52A0] dark:text-white leading-tight">
                        Specialized <span className="text-slate-700 dark:text-slate-400">IT & Software Services</span>
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
                        End-to-end software development, cloud infrastructure management, and intelligent digital transformation designed for modern enterprise growth.
                    </p>
                </motion.div>

                {/* Tabbed Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Side Navigation (Tabs) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 flex flex-col gap-3 relative"
                    >
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            const isActive = activeTab === index;

                            return (
                                <button
                                    key={service.id || index}
                                    onClick={() => setActiveTab(index)}
                                    className="group relative w-full flex items-center justify-between p-4 rounded-xl text-left outline-none"
                                >
                                    {/* Active Tab Sliding Background Indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabBackground"
                                            className="absolute inset-0 bg-[#3D52A0] dark:bg-slate-900 rounded-xl shadow-lg shadow-[#3D52A0]/20 dark:shadow-none border border-[#3D52A0] dark:border-slate-700"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}

                                    {/* Default Background for Inactive Tabs */}
                                    {!isActive && (
                                        <div className="absolute inset-0 bg-white/60 dark:bg-slate-950/60 border border-[#3D52A0]/15 dark:border-slate-800 rounded-xl transition-colors duration-300 group-hover:bg-white dark:group-hover:bg-slate-900/80 group-hover:border-[#3D52A0]/30" />
                                    )}

                                    {/* Content */}
                                    <div className="relative z-10 flex items-center gap-4 min-w-0">
                                        <div
                                            className={`p-2.5 rounded-lg transition-all duration-300 ${isActive
                                                ? "bg-white text-[#3D52A0] dark:bg-white dark:text-slate-900 shadow-sm"
                                                : "bg-[#3D52A0]/10 text-[#3D52A0] group-hover:bg-[#3D52A0]/20 dark:bg-slate-900 dark:text-slate-300 dark:group-hover:text-white dark:group-hover:bg-slate-800"
                                                }`}
                                        >
                                            <Icon size={20} strokeWidth={1.8} />
                                        </div>
                                        <div className="truncate">
                                            <h4 className={`text-sm font-semibold truncate transition-colors duration-300 ${isActive ? "text-white dark:text-white" : "text-slate-900 dark:text-slate-200 group-hover:text-[#3D52A0] dark:group-hover:text-white"}`}>
                                                {service.shortTitle}
                                            </h4>
                                            <p className={`text-[12px] truncate mt-0.5 transition-colors duration-300 ${isActive ? "text-slate-200 dark:text-slate-400" : "text-slate-600 dark:text-slate-400"}`}>
                                                {service.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowRight
                                        size={16}
                                        className={`relative z-10 transition-all duration-300 flex-shrink-0 ${isActive
                                            ? "text-white translate-x-0 opacity-100"
                                            : "-translate-x-2 opacity-0 group-hover:opacity-60 group-hover:translate-x-0 dark:group-hover:opacity-40 text-slate-500"
                                            }`}
                                    />
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* Right Side Showcase Panel */}
                    <div className="lg:col-span-7 relative min-h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="bg-white/80 dark:bg-slate-950/80 border border-[#3D52A0]/15 dark:border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-xl shadow-[#3D52A0]/5 w-full h-full"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#3D52A0] to-[#2B3A70] text-white shadow-lg shadow-[#3D52A0]/30 dark:from-slate-800 dark:to-slate-900 dark:border dark:border-slate-700 dark:shadow-none">
                                            <activeService.icon size={28} strokeWidth={1.8} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                                                {activeService.shortTitle}
                                            </h3>
                                            <p className="text-sm font-medium text-[#3D52A0] dark:text-slate-400 mt-1">
                                                {activeService.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="inline-block px-3 py-1.5 text-xs font-mono font-semibold text-[#3D52A0] dark:text-slate-300 bg-[#3D52A0]/10 dark:bg-slate-900 border border-[#3D52A0]/20 dark:border-slate-800 rounded-md">
                                        {activeService.badge}
                                    </span>
                                </div>

                                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed border-b border-[#3D52A0]/15 dark:border-slate-800 pb-6 mb-6">
                                    {activeService.description}
                                </p>

                                {/* Feature Checklist with Staggered Entrance */}
                                <div className="mb-8">
                                    <h5 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-5">
                                        Key Deliverables & Features
                                    </h5>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {activeService.features.map((feature, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 + 0.2, duration: 0.3 }}
                                                className="flex items-start gap-3 group/feature"
                                            >
                                                <div className="mt-0.5 relative flex items-center justify-center">
                                                    <div className="absolute inset-0 bg-[#3D52A0]/20 rounded-full scale-0 group-hover/feature:scale-150 transition-transform duration-300" />
                                                    <CheckCircle2 size={18} className="text-[#3D52A0] dark:text-slate-200 relative z-10" />
                                                </div>
                                                <span className="text-sm text-slate-700 dark:text-slate-300 leading-snug group-hover/feature:text-[#3D52A0] dark:group-hover/feature:text-white transition-colors">
                                                    {feature}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tags Footer */}
                                <div className="flex flex-wrap items-center gap-2 pt-5 border-t border-[#3D52A0]/10 dark:border-slate-800/80">
                                    {activeService.tags.map((tag, idx) => (
                                        <motion.span
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.05 + 0.4 }}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            className="px-3.5 py-1.5 text-[11px] font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md shadow-sm cursor-default hover:border-[#3D52A0]/30 hover:text-[#3D52A0] transition-colors"
                                        >
                                            #{tag}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}