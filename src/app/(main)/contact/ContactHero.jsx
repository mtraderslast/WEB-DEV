"use client";
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Phone, Clock, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ContactHero() {
    // Framer Motion Variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemFade = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    // Your Specific Contact Data
    const contactLinks = [
        {
            id: 1,
            label: "Email Support",
            value: "hello@mtraderslastllc.com",
            icon: <Mail className="w-6 h-6" />,
            href: "mailto:hello@mtraderslastllc.com"
        },
        {
            id: 2,
            label: "Phone / WhatsApp",
            value: "+1 (316) 361-7579",
            icon: <Phone className="w-6 h-6" />,
            href: "https://wa.me/13163617579"
        },
        {
            id: 3,
            label: "24/7 Chat Support",
            value: "@Mtradersla_bot",
            icon: <MessageCircle className="w-6 h-6" />,
            href: "https://t.me/Mtradersla_bot"
        },
        {
            id: 4,
            label: "Business Hours",
            value: "Mon-Fri · 9 AM – 6 PM PST",
            icon: <Clock className="w-6 h-6" />,
            href: null // No link for hours
        }
    ];

    return (
        <section className="relative w-full pt-32 bg-[#EDE8F5] dark:bg-[#000000] flex items-center overflow-hidden transition-colors duration-500">

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3D52A00d_1px,transparent_1px),linear-gradient(to_bottom,#3D52A00d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* Subtle Background Pattern (Very minimal) */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(61,82,160,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent_50%)] pointer-events-none" />

            <div className="relative z-10 w-full mx-auto px-6 md:px-12 lg:px-20">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-24"
                >

                    {/* === Left Column: Header & Company Details === */}
                    <div className="w-full lg:w-5/12 flex flex-col justify-between">

                        <div className="mb-16 lg:mb-0">
                            <motion.div variants={itemFade} className="inline-flex items-center space-x-3 mb-6">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3D52A0] opacity-40"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3D52A0] dark:bg-indigo-500"></span>
                                </span>
                                <span className="text-[#3D52A0] dark:text-indigo-400 font-bold uppercase tracking-widest text-sm">
                                    Get In Touch
                                </span>
                            </motion.div>

                            {/* Controlled Heading Size */}
                            <motion.h1 variants={itemFade} className="text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.05] tracking-tight mb-8">
                                Let's bring your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D52A0] to-indigo-500">
                                    vision to life.
                                </span>
                            </motion.h1>

                            <motion.p variants={itemFade} className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium dark:font-light leading-relaxed max-w-md">
                                Whether you need immediate support, have a project in mind, or just want to say hello—our team is ready to help.
                            </motion.p>
                        </div>

                        {/* Company Registered Info Box */}
                        <motion.div variants={itemFade} className="mt-12 p-8 rounded-3xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-md">
                            <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-200 dark:border-white/10">
                                <ShieldCheck className="w-6 h-6 text-[#3D52A0] dark:text-indigo-400" />
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg">M Traders LLC</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-900 dark:text-gray-200 font-semibold mb-1">Headquarters</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                            7901 4th St N Suite 6573<br />
                                            St. Petersburg, FL 33702
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-5 h-5 flex items-center justify-center mt-1 flex-shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 dark:text-gray-200 font-semibold mb-1">Registration</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                                            Florida LLC · Doc# L26000290590
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>

                    {/* === Right Column: Interactive Contact List === */}
                    <div className="w-full lg:w-7/12 flex flex-col justify-center">
                        <div className="border-t border-gray-300 dark:border-white/10">
                            {contactLinks.map((item) => {
                                const ContentWrapper = item.href ? Link : 'div';

                                return (
                                    <motion.div key={item.id} variants={itemFade}>
                                        <ContentWrapper
                                            href={item.href}
                                            target="_blank"
                                            className={`group flex items-center justify-between py-8 md:py-10 border-b border-gray-300 dark:border-white/10 transition-all duration-500 ${item.href ? 'cursor-pointer hover:pl-6' : ''}`}
                                        >
                                            <div className="flex items-center space-x-6 md:space-x-8">
                                                {/* Icon Box */}
                                                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#09090b] border border-gray-200 dark:border-white/10 shadow-sm flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:bg-[#3D52A0] group-hover:border-[#3D52A0] dark:group-hover:bg-indigo-500 dark:group-hover:border-indigo-500 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                                                    {item.icon}
                                                </div>

                                                {/* Text Content */}
                                                <div>
                                                    <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 group-hover:text-[#3D52A0] dark:group-hover:text-indigo-400 transition-colors duration-500">
                                                        {item.label}
                                                    </p>
                                                    <h3 className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white transition-colors duration-500">
                                                        {item.value}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Action Arrow (Only if there is a link) */}
                                            {item.href && (
                                                <div className="hidden sm:flex w-12 h-12 rounded-full border border-gray-300 dark:border-white/20 items-center justify-center text-gray-400 group-hover:border-[#3D52A0] group-hover:text-[#3D52A0] dark:group-hover:border-indigo-400 dark:group-hover:text-indigo-400 transition-all duration-500 group-hover:rotate-45">
                                                    <ArrowUpRight className="w-6 h-6" />
                                                </div>
                                            )}
                                        </ContentWrapper>
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