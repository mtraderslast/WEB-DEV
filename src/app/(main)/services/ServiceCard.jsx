"use client";

import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

export default function ServiceCard({ item, index }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const IconComponent = item.icon;

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            className="p-6 rounded-2xl bg-white dark:bg-[#09090b] border border-gray-200/80 dark:border-gray-800 hover:border-[#3D52A0]/50 dark:hover:border-[#3D52A0]/50 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-[#3D52A0]/10 group relative overflow-hidden h-full"
        >
            {/* Interactive Spotlight Glow on Mouse Hover */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            300px circle at ${mouseX}px ${mouseY}px,
                            rgba(61, 82, 160, 0.15),
                            transparent 80%
                        )
                    `,
                }}
            />

            <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#3D52A0]/10 dark:bg-[#3D52A0]/20 flex items-center justify-center mb-5 text-[#3D52A0] dark:text-blue-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <IconComponent className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-[#3D52A0] dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                </p>
            </div>
        </motion.div>
    );
}