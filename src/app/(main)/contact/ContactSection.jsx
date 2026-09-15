"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "../../../components/ContactForm";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function ContactSection() {
    return (
        <section className="relative w-full py-20 bg-[#EDE8F5] dark:bg-[#000000] overflow-hidden transition-colors duration-500 flex items-center">

            <div className="fixed inset-0 bg-[linear-gradient(to_right,#3D52A00d_1px,transparent_1px),linear-gradient(to_bottom,#3D52A00d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* Ambient Background Blob with Pulsing Animation */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#3D52A0]/10 dark:bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"
            />

            {/* Bottom Left Subtle Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"
            />

            <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

                {/* --- Left Column: Text & Info --- */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="w-full lg:w-5/12 flex flex-col items-start text-left space-y-10"
                >
                    <div>
                        <motion.div variants={itemVariants} className="inline-flex items-center space-x-3 mb-6">
                            <span className="h-[2px] w-8 bg-[#3D52A0]"></span>
                            <span className="text-[#3D52A0] dark:text-indigo-400 font-bold uppercase tracking-[0.2em] text-sm">
                                Start A Project
                            </span>
                        </motion.div>

                        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-6">
                            Let's build something <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D52A0] to-indigo-500">
                                extraordinary.
                            </span>
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium dark:font-light leading-relaxed max-w-lg border-l-2 border-[#3D52A0]/20 pl-6">
                            Whether you need a cutting-edge web application, a scalable cloud architecture, or a complete digital transformation, our team of experts is ready to deliver.
                        </motion.p>
                    </div>

                    {/* Interactive Contact Info Cards */}
                    <div className="space-y-4 w-full max-w-lg">

                        {/* Email Card */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ x: 10 }}
                            className="group flex items-start space-x-4 p-4 -ml-4 rounded-2xl hover:bg-[#3D52A0]/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#09090b] border border-gray-200 dark:border-white/10 flex items-center justify-center flex-shrink-0 text-[#3D52A0] dark:text-indigo-400 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                                <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                            </div>
                            <div>
                                <h4 className="text-gray-900 dark:text-white font-bold mb-1">Direct Email</h4>
                                <a href="mailto:hello@mtraderslastllc.com" className="text-gray-600 dark:text-gray-400 font-medium group-hover:text-[#3D52A0] dark:group-hover:text-indigo-400 transition-colors">
                                    hello@mtraderslastllc.com
                                </a>
                            </div>
                        </motion.div>

                        {/* Address Card */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ x: 10 }}
                            className="group flex items-start space-x-4 p-4 -ml-4 rounded-2xl hover:bg-[#3D52A0]/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#09090b] border border-gray-200 dark:border-white/10 flex items-center justify-center flex-shrink-0 text-[#3D52A0] dark:text-indigo-400 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                                <MapPin className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                            </div>
                            <div>
                                <h4 className="text-gray-900 dark:text-white font-bold mb-1">Global Headquarters</h4>
                                <p className="text-gray-600 dark:text-gray-400 font-medium">
                                    7901 4th St N Suite 6573, <br />
                                    St. Petersburg FL 33702
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </motion.div>

                {/* --- Right Column: The Form Component --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-full lg:w-7/12 relative"
                >
                    {/* Animated Decorative element behind form */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-4 bg-gradient-to-br from-[#3D52A0]/20 to-transparent dark:from-white/10 rounded-[3rem] blur-2xl -z-10"
                    />

                    {/* Rendering the separated form component */}
                    <div className="relative z-10 hover:shadow-2xl hover:shadow-[#3D52A0]/10 transition-shadow duration-500 rounded-3xl bg-transparent">
                        <ContactForm />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}