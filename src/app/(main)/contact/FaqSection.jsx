"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FaqSection() {
    const [activeIndex, setActiveIndex] = useState(0); // First item open by default

    // Premium Agency FAQ Data
    const faqs = [
        {
            id: 0,
            question: "How do you handle project pricing and budgets?",
            answer: "We offer flexible engagement models. For well-defined scopes, we provide fixed-price contracts. For dynamic or ongoing projects, we use a Time & Materials (T&M) or dedicated team model. Every quote is completely transparent with no hidden fees.",
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200"
        },
        {
            id: 1,
            question: "What is your typical development timeline?",
            answer: "Timelines vary based on complexity. A standard corporate website might take 4-6 weeks, while a custom SaaS platform or Enterprise mobile app can take 3-6 months. We break every project into agile sprints, delivering usable milestones every 2 weeks.",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=1200"
        },
        {
            id: 2,
            question: "Do you provide ongoing support after deployment?",
            answer: "Absolutely. We view launch day as the beginning, not the end. We offer scalable SLA (Service Level Agreement) packages that include 24/7 server monitoring, security patching, bug fixes, and continuous feature updates.",
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200"
        },
        {
            id: 3,
            question: "How do you ensure the security of our application?",
            answer: "Security is engineered into our DNA. We follow DevSecOps practices, implement end-to-end encryption, conduct regular vulnerability scanning, and ensure compliance with global standards like GDPR, HIPAA, or SOC2 depending on your industry.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
        },
        {
            id: 4,
            question: "Can you integrate AI into our existing system?",
            answer: "Yes. Our AI-driven services team specializes in upgrading legacy systems. We can seamlessly integrate OpenAI, custom LLMs, automated workflows, and predictive analytics into your existing infrastructure without causing downtime.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200"
        }
    ];

    // Framer Motion Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemFade = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section className="relative w-full bg-[#EDE8F5] dark:bg-[#050505] py-16 overflow-hidden transition-colors duration-700">

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3D52A00d_1px,transparent_1px),linear-gradient(to_bottom,#3D52A00d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-[#3D52A0]/10 dark:bg-indigo-600/10 rounded-full blur-[180px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-purple-500/5 dark:bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>

            {/* Maximized Width for Large Screens */}
            <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 md:px-8 xl:px-16 2xl:px-24">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start"
                >
                    {/* === Left Column: Sticky Header & Dynamic Visual === */}
                    <div className="w-full lg:w-5/12 lg:sticky lg:top-24 flex flex-col space-y-8">

                        {/* Text Content */}
                        <div>
                            <motion.div variants={itemFade} className="inline-flex items-center space-x-3 mb-4">
                                <span className="h-[2px] w-12 bg-gradient-to-r from-[#3D52A0] to-transparent"></span>
                                <span className="text-[#3D52A0] dark:text-indigo-400 font-bold uppercase tracking-[0.2em] text-xs">
                                    Knowledge Base
                                </span>
                            </motion.div>

                            {/* Reduced Text Size for Title */}
                            <motion.h2 variants={itemFade} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-5">
                                Everything you <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#3D52A0] via-indigo-500 to-purple-600">
                                    need to know.
                                </span>
                            </motion.h2>

                            {/* Reduced Text Size for Paragraph */}
                            <motion.p variants={itemFade} className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium dark:font-light leading-relaxed max-w-lg">
                                We believe in absolute transparency. Here are the answers to the most common questions our enterprise clients ask before partnering with us.
                            </motion.p>
                        </div>

                        {/* Dynamic Image Container */}
                        <motion.div variants={itemFade} className="hidden lg:block relative w-full h-[350px] xl:h-[400px] rounded-[2rem] overflow-hidden shadow-2xl dark:shadow-indigo-900/20 border border-white/20 dark:border-white/5 bg-gray-200 dark:bg-zinc-900 mt-4">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeIndex}
                                    src={faqs[activeIndex].image}
                                    alt="FAQ contextual visual"
                                    initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        </motion.div>
                    </div>

                    {/* === Right Column: Interactive Accordion === */}
                    {/* Added pt-8 lg:pt-16 xl:pt-24 to push the questions downwards */}
                    <div className="w-full lg:w-7/12 flex flex-col pt-8 lg:pt-16 xl:pt-24">
                        <div className="border-t-2 border-gray-200 dark:border-white/5">
                            {faqs.map((faq, index) => {
                                const isActive = activeIndex === index;

                                return (
                                    <motion.div
                                        variants={itemFade}
                                        key={faq.id}
                                        className={`border-b-2 transition-colors duration-500 ${isActive ? 'border-[#3D52A0] dark:border-indigo-500' : 'border-gray-200 dark:border-white/5'}`}
                                    >
                                        {/* Question Button */}
                                        <button
                                            onClick={() => setActiveIndex(index)}
                                            className="w-full flex items-center justify-between py-6 md:py-8 text-left group outline-none"
                                        >
                                            {/* Reduced Text Size for Question */}
                                            <h3 className={`text-lg md:text-xl lg:text-2xl font-bold pr-6 transition-all duration-500 ${isActive ? 'text-[#3D52A0] dark:text-indigo-400 translate-x-2 md:translate-x-3' : 'text-gray-900 dark:text-white group-hover:text-[#3D52A0] dark:group-hover:text-indigo-400'}`}>
                                                {faq.question}
                                            </h3>

                                            {/* Minimalist Icon */}
                                            <div className="flex-shrink-0 ml-4 relative w-6 h-6 flex items-center justify-center">
                                                <span className={`absolute w-full h-[2px] rounded-full transition-colors duration-500 ${isActive ? 'bg-[#3D52A0] dark:bg-indigo-400' : 'bg-gray-400 dark:bg-white/40 group-hover:bg-[#3D52A0] dark:group-hover:bg-indigo-400'}`}></span>
                                                <span className={`absolute w-full h-[2px] rounded-full transition-all duration-500 ${isActive ? 'bg-[#3D52A0] dark:bg-indigo-400 rotate-0 opacity-0' : 'bg-gray-400 dark:bg-white/40 rotate-90 opacity-100 group-hover:bg-[#3D52A0] dark:group-hover:bg-indigo-400'}`}></span>
                                            </div>
                                        </button>

                                        {/* Answer Area */}
                                        <AnimatePresence initial={false}>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pb-8 pl-2 md:pl-3 pr-4 xl:pr-16">
                                                        {/* Reduced Text Size for Answer */}
                                                        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium dark:font-light leading-relaxed">
                                                            {faq.answer}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
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