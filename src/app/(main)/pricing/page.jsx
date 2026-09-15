'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Code, Smartphone, Layout, TrendingUp, Megaphone,
    Cloud, Zap, ShieldCheck, Bot, Check, X, HelpCircle,
    ArrowRight, Sparkles, Clock, RotateCcw
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchServices } from '@/lib/action/services';

const iconMap = {
    Code: Code, Smartphone: Smartphone, Layout: Layout, TrendingUp: TrendingUp,
    Megaphone: Megaphone, Cloud: Cloud, Zap: Zap, ShieldCheck: ShieldCheck, Bot: Bot
};

export default function PricingPage() {
    const [services, setServices] = useState([]);
    const [activeSlug, setActiveSlug] = useState('');
    const [loading, setLoading] = useState(true);
    const [hoveredTooltip, setHoveredTooltip] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const getServicesData = async () => {
            try {
                setLoading(true);
                const res = await fetchServices();

                if (res?.data && res.data.length > 0) {
                    setServices(res.data);
                    setActiveSlug(res.data[0].slug);
                } else if (res?.success && res?.data?.length > 0) {
                    setServices(res.data);
                    setActiveSlug(res.data[0].slug);
                }
            } catch (error) {
                console.error("Failed to fetch pricing services:", error);
            } finally {
                setLoading(false);
            }
        };
        getServicesData();
    }, []);

    const activeService = services.find(s => s.slug === activeSlug) || services[0];

    const handleChoosePlan = (tier) => {
        router.push(`/checkout?slug=${activeService.slug}&tier=${tier}`);
    };

    return (
        <div className="w-full min-h-screen pt-35 bg-[#EDE8F5] dark:bg-[#000000] text-gray-900 dark:text-gray-100 py-16 px-4 md:px-8 lg:px-12 transition-colors duration-500">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#3D52A00d_1px,transparent_1px),linear-gradient(to_bottom,#3D52A00d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:32px_32px]" />

            <div className="w-full text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3D52A0]/10 text-[#3D52A0] dark:text-gray-200 mb-4 font-semibold text-sm"
                >
                    <Sparkles size={16} className="text-[#3D52A0]" /> Transparent & Scalable Plans
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight break-words"
                >
                    Pick the Right Plan for Your <span className="text-[#3D52A0]">Growth</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto break-words"
                >
                    Explore fixed-price packages designed for high execution speed or request a custom quotation for enterprise-grade projects.
                </motion.p>
            </div>

            {!loading && services.length > 0 && (
                <div className="w-full overflow-x-auto pb-4 mb-12 scrollbar-none">
                    <div className="flex items-center gap-2 p-2 bg-white/70 dark:bg-[#09090b]/80 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg w-max">
                        {services.map((service) => {
                            const IconComponent = iconMap[service.categoryIcon] || Code;
                            const isActive = activeSlug === service.slug;

                            return (
                                <button
                                    key={service.slug}
                                    onClick={() => setActiveSlug(service.slug)}
                                    className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap shrink-0 cursor-pointer ${isActive
                                            ? 'text-white'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabIndicator"
                                            className="absolute inset-0 bg-[#3D52A0] rounded-xl shadow-md shadow-[#3D52A0]/30"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <IconComponent size={18} className="shrink-0" /> {service.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {loading ? (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-[550px] bg-white/50 dark:bg-[#09090b]/50 rounded-3xl animate-pulse p-8 border border-gray-200 dark:border-gray-800" />
                    ))}
                </div>
            ) : activeService ? (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeService.slug}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
                        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
                    >
                        {activeService.packages.map((pkg) => {
                            const isPopular = pkg.isPopular;

                            return (
                                <div
                                    key={pkg.tier}
                                    className={`relative flex flex-col justify-between rounded-3xl p-6 md:p-8 transition-all duration-300 border ${isPopular ? 'bg-white dark:bg-[#09090b] border-[#3D52A0] shadow-2xl shadow-[#3D52A0]/20 lg:-translate-y-2' : 'bg-white/80 dark:bg-[#09090b]/80 border-gray-200 dark:border-gray-800 shadow-xl'}`}
                                >
                                    {isPopular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3D52A0] text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                                            <Sparkles size={14} /> Most Popular
                                        </div>
                                    )}

                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl md:text-2xl font-bold capitalize break-words">{pkg.title}</h3>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 min-h-[40px] break-words">{pkg.subtitle}</p>

                                        <div className="flex items-baseline gap-1 mb-6">
                                            <span className="text-4xl md:text-5xl font-extrabold text-[#3D52A0] dark:text-white">${pkg.price}</span>
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/ project</span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-4 py-3 px-4 rounded-xl bg-gray-50 dark:bg-[#0f172a] mb-6 text-xs font-semibold text-gray-600 dark:text-gray-300">
                                            <div className="flex items-center gap-1.5 shrink-0">
                                                <Clock size={15} className="text-[#3D52A0]" /> <span>{pkg.deliveryDays} Days Delivery</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 shrink-0">
                                                <RotateCcw size={15} className="text-[#3D52A0]" /> <span>{pkg.revisions}</span>
                                            </div>
                                        </div>

                                        <hr className="border-gray-100 dark:border-gray-800 mb-6" />

                                        <div className="space-y-3.5 mb-8">
                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">What's included:</p>
                                            {pkg.features.map((feat, idx) => (
                                                <div key={idx} className="flex items-start justify-between gap-2 group relative">
                                                    <div className="flex items-start gap-3 w-full">
                                                        {feat.isIncluded ? (
                                                            <div className="shrink-0 mt-0.5 p-0.5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400"><Check size={14} /></div>
                                                        ) : (
                                                            <div className="shrink-0 mt-0.5 p-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400"><X size={14} /></div>
                                                        )}
                                                        <span className={`text-sm break-words ${feat.isIncluded ? 'text-gray-800 dark:text-gray-200 font-medium' : 'text-gray-400 line-through'}`}>{feat.name}</span>
                                                    </div>

                                                    {feat.tooltip && (
                                                        <div
                                                            className="relative cursor-pointer shrink-0 mt-0.5"
                                                            onMouseEnter={() => setHoveredTooltip(`${pkg.tier}-${idx}`)} onMouseLeave={() => setHoveredTooltip(null)}
                                                        >
                                                            <HelpCircle size={15} className="text-gray-400 hover:text-[#3D52A0] transition-colors" />
                                                            {hoveredTooltip === `${pkg.tier}-${idx}` && (
                                                                <div className="absolute right-0 bottom-6 w-48 p-2.5 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-xl z-30 pointer-events-none break-words">
                                                                    {feat.tooltip}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleChoosePlan(pkg.tier)}
                                        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isPopular ? 'bg-[#3D52A0] hover:bg-[#2d3d7a] text-white shadow-lg shadow-[#3D52A0]/30' : 'bg-gray-100 dark:bg-[#0f172a] hover:bg-[#3D52A0] hover:text-white text-gray-900 dark:text-white'} cursor-pointer`}
                                    >
                                        Choose {pkg.tier} <ArrowRight size={18} />
                                    </button>
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            ) : null}

            <div className="w-full mt-20">
                <div className="w-full bg-white dark:bg-[#09090b] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
                    <div className="max-w-2xl text-center lg:text-left">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 break-words">Need Something Unique or Enterprise-Grade?</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg break-words">If our fixed packages don't fit your exact specs, request a tailored quote. We build high-security, custom architectures with milestone-based advance payments.</p>
                    </div>
                    <Link href="/quote" className="shrink-0 bg-[#3D52A0] hover:bg-[#2d3d7a] text-white px-8 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all shadow-xl shadow-[#3D52A0]/30">
                        Request Custom Quote <ArrowRight size={22} />
                    </Link>
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#3D52A0]/10 rounded-full blur-3xl pointer-events-none" />
                </div>
            </div>
        </div>
    );
}