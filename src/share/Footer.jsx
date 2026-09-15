import Link from "next/link";
import { Mail, Send, Phone, Clock, Headphones, ShieldCheck, ArrowRight, MessageSquare } from "lucide-react";

function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Pricing", href: "/pricing" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const legalLinks = [
        { name: "Terms & Conditions", href: "/terms-conditions" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Refund Policy", href: "/refund-policy" },
        { name: "AML Policy", href: "/aml-policy" },
    ];

    const whatsappUrl = "https://wa.me/13163617579";
    const telegramUrl = "https://t.me/Mtradersla_bot";
    const emailAddress = "hello@mtraderslastllc.com";

    return (
        <footer className="w-full relative overflow-hidden transition-colors duration-500 bg-[#EDE8F5] dark:bg-black border-t border-[#3D52A0]/15 dark:border-slate-900 text-slate-700 dark:text-slate-400">

            {/* Background Watermark Text */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center pointer-events-none select-none z-0 overflow-hidden w-full">
                <span className="text-[18vw] font-black leading-none tracking-tighter uppercase whitespace-nowrap opacity-[0.03] dark:opacity-[0.06] text-[#3D52A0] dark:text-white">
                    WEB DEV
                </span>
            </div>

            <div className="mx-auto px-5 sm:px-8 lg:px-10 xl:px-14 pt-16 pb-8 relative z-10">

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-[#3D52A0]/15 dark:border-slate-900">

                    {/* Column 1: Brand Profile & Info */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center">
                            <Link href="/" className="group">
                                <div className="flex items-center gap-2.5">
                                    <div className="relative w-10 h-10 rounded-xl bg-[#3D52A0] dark:from-white dark:to-slate-200 flex items-center justify-center shadow-md transition-colors duration-300">
                                        <img
                                            src="/logo.png"
                                            alt="Logo"
                                            className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
                                        />
                                    </div>
                                    <div className="hidden sm:flex flex-col">
                                        <span className="text-sm font-bold text-[#3D52A0] dark:text-white leading-none tracking-tight transition-colors duration-300">
                                            WEB DEV
                                        </span>
                                        <span className="text-[10px] text-[#3D52A0]/70 dark:text-slate-400 font-medium uppercase tracking-widest transition-colors duration-300">
                                            Next-Gen Software & IT Solutions
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-400">
                            Empowering modern enterprises with scalable full-stack web applications, custom IT infrastructure, and robust software engineering solutions.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 pt-2">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#3D52A0]/20 dark:border-slate-800 bg-white/60 dark:bg-slate-950 text-[#3D52A0] dark:text-slate-400 hover:border-[#3D52A0] hover:text-[#3D52A0] dark:hover:border-white dark:hover:text-white hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer"
                                aria-label="WhatsApp Chat"
                            >
                                <MessageSquare className="w-4 h-4" />
                            </a>
                            <a
                                href={telegramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#3D52A0]/20 dark:border-slate-800 bg-white/60 dark:bg-slate-950 text-[#3D52A0] dark:text-slate-400 hover:border-[#3D52A0] hover:text-[#3D52A0] dark:hover:border-white dark:hover:text-white hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer"
                                aria-label="Telegram"
                            >
                                <Send className="w-4 h-4" />
                            </a>
                            <a
                                href={`mailto:${emailAddress}`}
                                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#3D52A0]/20 dark:border-slate-800 bg-white/60 dark:bg-slate-950 text-[#3D52A0] dark:text-slate-400 hover:border-[#3D52A0] hover:text-[#3D52A0] dark:hover:border-white dark:hover:text-white hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer"
                                aria-label="Email"
                            >
                                <Mail className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-[#3D52A0] dark:text-slate-100 mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-slate-700 dark:text-slate-400 hover:text-[#3D52A0] dark:hover:text-white transition-colors flex items-center gap-2 group">
                                        <ArrowRight className="w-3.5 h-3.5 text-[#3D52A0]/50 dark:text-slate-600 group-hover:text-[#3D52A0] dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-[#3D52A0] dark:text-slate-100 mb-4">
                            Contact
                        </h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="mt-1 text-[#3D52A0] dark:text-slate-100">
                                    <Mail className="w-4 h-4" />
                                </span>
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-slate-200">Email Support</p>
                                    <a href={`mailto:${emailAddress}`} className="text-xs text-slate-600 dark:text-slate-500 hover:text-[#3D52A0] dark:hover:text-white transition-colors">
                                        {emailAddress}
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 text-[#3D52A0] dark:text-slate-100">
                                    <Send className="w-4 h-4" />
                                </span>
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-slate-200">Telegram Bot</p>
                                    <a
                                        href={telegramUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-slate-600 dark:text-slate-500 hover:text-[#3D52A0] dark:hover:text-white transition-colors"
                                    >
                                        @Mtradersla_bot
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 text-[#3D52A0] dark:text-slate-100">
                                    <Phone className="w-4 h-4" />
                                </span>
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-slate-200">Phone / WhatsApp</p>
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-slate-600 dark:text-slate-500 hover:text-[#3D52A0] dark:hover:text-white transition-colors block"
                                    >
                                        +1 (316) 361-7579
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 text-[#3D52A0] dark:text-slate-100">
                                    <Clock className="w-4 h-4" />
                                </span>
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-slate-200">Business Hours</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-500">Mon-Fri · 9 AM – 6 PM PST</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Support & Security */}
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-[#3D52A0] dark:text-slate-100 mb-4">
                            Support
                        </h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="mt-1 text-[#3D52A0] dark:text-slate-100">
                                    <Headphones className="w-4 h-4" />
                                </span>
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-slate-200">24/7 Chat Support</p>
                                    <a
                                        href={telegramUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-slate-600 dark:text-slate-500 hover:text-[#3D52A0] dark:hover:text-white transition-colors"
                                    >
                                        Message us on Telegram
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 text-[#3D52A0] dark:text-slate-100">
                                    <ShieldCheck className="w-4 h-4" />
                                </span>
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-slate-200">Secure Payments</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-500">SSL encrypted · PCI compliant</p>
                                </div>
                            </li>
                        </ul>

                        {/* LLC Documentation info box */}
                        <div className="mt-5 p-3.5 rounded-xl bg-white/60 dark:bg-slate-950 border border-[#3D52A0]/20 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-500 space-y-1">
                            <p className="font-semibold text-[#3D52A0] dark:text-slate-200">Florida LLC · Doc# L26000290590</p>
                            <p className="text-slate-600 dark:text-slate-500">7901 4th St N Suite 6573, St. Petersburg FL 33702</p>
                        </div>
                    </div>

                </div>

                {/* Bottom Section: Legal Links & Copyright */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
                    <p>© {currentYear} M Traders Last LLC. All rights reserved.</p>

                    {/* Important Business Links */}
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        {legalLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-slate-600 hover:text-[#3D52A0] dark:text-slate-400 dark:hover:text-white font-medium transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;