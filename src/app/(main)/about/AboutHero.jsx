import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutHero() {
    return (
        <>
            <section className="relative w-full pt-30 min-h-[90vh] flex items-center bg-[#EDE8F5] dark:bg-[#000000] overflow-hidden transition-colors duration-500">

                {/* === Full-width Background Image Layer === */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                        alt="Abstract technology background"
                        className="w-full h-full object-cover opacity-80 dark:opacity-80"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#EDE8F5] via-[#EDE8F5]/90 to-transparent dark:from-[#000000] dark:via-[#000000]/95 dark:to-transparent"></div>
                </div>

                {/* Subtle Grid Pattern Layer */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#3D52A00d_1px,transparent_1px),linear-gradient(to_bottom,#3D52A00d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:32px_32px]" />

                {/* === Main Content Container (Full Width, No max-w limits) === */}
                <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between">

                    {/* --- Left Column: Text Content  --- */}
                    <div className="w-full lg:w-[55%] flex flex-col items-start text-left space-y-8 px-6 md:px-12 lg:pl-15 lg:pr-12 py-20 lg:py-0">

                        {/* Premium Badge */}
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/60 dark:bg-[#09090b]/60 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#3D52A0] animate-pulse" />
                            <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200 uppercase">
                                Discover Our Story
                            </span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.05]">
                            Engineering the <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D52A0] to-indigo-500 dark:from-indigo-400 dark:to-blue-500">
                                Future of Digital
                            </span> <br className="hidden md:block" />
                            Experiences.
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-400 max-w-2xl leading-relaxed font-medium dark:font-light">
                            We are a premium software agency blending cutting-edge technology with world-class design to build scalable solutions for tomorrow's industry leaders.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto pt-4">
                            <Link
                                href="/portfolio"
                                className="relative inline-flex items-center justify-center overflow-hidden rounded-xl p-[2px] font-medium active:scale-95 transition-all duration-300 group shadow-lg shadow-[#3D52A0]/25 hover:shadow-[0_4px_20px_rgba(61,82,160,0.35)]"
                            >
                                {/* Animated Dual Gradient Layer */}
                                <span className="absolute inset-0 bg-gradient-to-r from-[#3D52A0] via-[#7088D6] to-[#3D52A0] bg-[length:200%_100%] bg-left transition-all duration-500 ease-out group-hover:bg-right" />

                                {/* Button Inner Content */}
                                <span className="relative flex items-center gap-3 px-7 py-3.5 rounded-[10px] text-white transition-all duration-300">
                                    <span>See Our Portfolio</span>
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </Link>
                        </div>

                        {/* Trust Indicator */}
                        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="flex -space-x-3">
                                <div className="w-12 h-12 rounded-full border-2 border-[#EDE8F5] dark:border-black overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="Team member" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-12 h-12 rounded-full border-2 border-[#EDE8F5] dark:border-black overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" alt="Team member" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-12 h-12 rounded-full border-2 border-[#EDE8F5] dark:border-black bg-[#3D52A0] flex items-center justify-center text-white text-xs font-bold">
                                    99+
                                </div>
                            </div>
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-bold text-gray-900 dark:text-white">Trusted by</span> industry leaders <br /> and 50+ global experts.
                            </div>
                        </div>
                    </div>

                    {/* --- Right Column: Image Content --- */}
                    <div className="w-full lg:w-[45%] h-[500px] relative mt-10 lg:mt-0">
                        {/* The main image stretching to the right edge but curved on the left */}
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                            alt="Our collaborative agency team"
                            className="absolute inset-0 w-full h-full object-cover lg:rounded-l-[3rem] shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
                        />

                        {/* Inner shadow/overlay on the image for premium feel */}
                        <div className="absolute inset-0 lg:rounded-l-[4rem] border-l border-white/20 dark:border-white/10 pointer-events-none"></div>

                        {/* Floating Glass Card Over Image (Using only Tailwind utilities) */}
                        <div className="absolute bottom-10 left-10 lg:-left-12 max-w-[280px] p-6 rounded-3xl bg-white/70 dark:bg-[#09090b]/80 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                            <div className="flex items-center space-x-4 mb-3">
                                <div className="w-12 h-12 rounded-full bg-[#3D52A0] flex items-center justify-center text-white">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Business Growth</div>
                                    <div className="text-xl font-bold text-gray-900 dark:text-white">+240% Yearly</div>
                                </div>
                            </div>
                            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="w-[85%] h-full bg-gradient-to-r from-[#3D52A0] to-indigo-400"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}