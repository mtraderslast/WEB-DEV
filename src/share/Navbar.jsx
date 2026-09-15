"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Globe, Phone, Mail, Menu, X, ArrowUpRight, LayoutDashboard, User, LogOut } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { authClient } from "@/lib/auth-client";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const pathname = usePathname();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const showDashboard = !!user;
    const dashboardHref = `/dashboard/${user?.role || "user"}`;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Services", href: "/services" },
        { name: "Pricing", href: "/pricing" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const whatsappUrl = "https://wa.me/13163617579";
    const emailAddress = "hello@mtraderslastllc.com";

    const isActive = (path) => pathname === path;

    return (
        <>
            <div className="hidden lg:block h-9 fixed top-0 left-0 right-0 z-50 bg-[#0A0C10] border-b border-white/6 transition-colors duration-500">
                <div className="hidden lg:flex items-center justify-between h-8 px-6 sm:px-8 lg:px-16 bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 text-white/80 border-b border-white/10 backdrop-blur-xl text-[11px] tracking-widest uppercase font-medium">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Phone size={12} className="text-white/50" />
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-50 transition-colors duration-300">
                                +1 (316) 361-7579
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={12} className="text-white/50" />
                            <a href={`mailto:${emailAddress}`} className="text-gray-400 hover:text-gray-50 transition-colors duration-300">
                                {emailAddress}
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <button className="flex items-center gap-1.5 hover:text-white transition-colors duration-300">
                            <Globe size={12} />
                            <span>Global</span>
                        </button>
                    </div>
                </div>
            </div>

            <nav
                className={`w-full fixed left-0 z-50 top-0 lg:top-9 h-19 transition-all duration-500 ease-in-out ${scrolled
                        ? "bg-[#EDE8F5]/85 dark:bg-[#0B0D11]/85 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(61,82,160,0.08)] dark:shadow-none border-b border-[#3D52A0]/15 dark:border-white/[0.06]"
                        : "bg-[#EDE8F5]/40 dark:bg-transparent backdrop-blur-sm border-b border-[#3D52A0]/10 dark:border-white/[0.04]"
                    }`}
            >
                <div className="w-full h-full flex items-center justify-between px-5 sm:px-8 lg:px-10 xl:px-14">
                    <div className="flex items-center shrink-0">
                        <Link href="/" className="group">
                            <div className="flex items-center gap-2.5">
                                <div className="relative w-10 h-10 rounded-xl bg-[#3D52A0] dark:bg-white flex items-center justify-center shadow-md transition-colors duration-300">
                                    <img
                                        src="/logo.png"
                                        alt="Logo"
                                        className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
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

                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[#3D52A0]/10 dark:bg-white/[0.04] border border-[#3D52A0]/15 dark:border-white/[0.06] mr-1 transition-colors duration-300">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`relative px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 ${active
                                                ? "bg-[#3D52A0] text-white dark:bg-[#7688c9] dark:text-slate-950 shadow-md scale-100"
                                                : "text-[#3D52A0] dark:text-slate-400 hover:text-[#3D52A0] dark:hover:text-white hover:bg-[#3D52A0]/15 dark:hover:bg-white/10"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>

                        <span className="hidden lg:block h-6 w-px bg-[#3D52A0]/20 dark:bg-white/10 mx-1 transition-colors duration-300" />

                        <div className="hidden sm:flex">
                            {searchOpen ? (
                                <div className="relative flex items-center">
                                    <Search size={14} className="absolute left-3.5 text-[#3D52A0]/60 dark:text-slate-400 pointer-events-none transition-colors duration-300" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        autoFocus
                                        onBlur={() => setSearchOpen(false)}
                                        className="pl-9 pr-3 py-2 rounded-full text-[13px] bg-white/70 dark:bg-white/[0.05] text-[#3D52A0] dark:text-white placeholder-[#3D52A0]/50 dark:placeholder-slate-500 border border-[#3D52A0]/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[#3D52A0]/30 dark:focus:ring-white/20 w-48 transition-all duration-300"
                                    />
                                </div>
                            ) : (
                                <button
                                    onClick={() => setSearchOpen(true)}
                                    className="p-2.5 rounded-full text-[#3D52A0] dark:text-slate-400 hover:text-[#3D52A0] dark:hover:text-white hover:bg-[#3D52A0]/10 dark:hover:bg-white/[0.06] transition-all duration-300 focus:outline-none"
                                    aria-label="Open search"
                                >
                                    <Search size={17} strokeWidth={2} />
                                </button>
                            )}
                        </div>

                        <ThemeToggle />

                        {isPending ? (
                            <div className="w-10 h-10 rounded-full bg-[#3D52A0]/20 dark:bg-slate-800 animate-pulse" />
                        ) : user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setAvatarMenuOpen((prev) => !prev)}
                                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#3D52A0] dark:border-[#7688c9] hover:opacity-90 transition-opacity focus:outline-none"
                                >
                                    <img
                                        src={user?.image || "/user.png"}
                                        alt={user?.name || "User Avatar"}
                                        className="object-cover w-full h-full"
                                    />
                                </button>

                                {avatarMenuOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setAvatarMenuOpen(false)}
                                        />
                                        <div className="absolute right-0 top-13 w-60 bg-white/95 dark:bg-[#0B0D11] backdrop-blur-xl rounded-2xl border border-[#3D52A0]/15 dark:border-white/[0.08] shadow-[0_10px_30px_rgba(61,82,160,0.15)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-50 overflow-hidden">
                                            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#3D52A0]/10 dark:border-white/[0.08] bg-[#EDE8F5]/30 dark:bg-white/[0.02]">
                                                <img
                                                    src={user?.image || "/user.png"}
                                                    alt={user?.name || "User Avatar"}
                                                    className="w-9 h-9 rounded-full object-cover border border-[#3D52A0]/30 dark:border-white/20"
                                                />
                                                <div className="overflow-hidden">
                                                    <p className="text-sm font-bold text-[#3D52A0] dark:text-white truncate">
                                                        {user?.name}
                                                    </p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                        {user?.email}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="p-2 space-y-1">
                                                {showDashboard && (
                                                    <Link
                                                        href={dashboardHref}
                                                        onClick={() => setAvatarMenuOpen(false)}
                                                        className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-[#3D52A0] dark:text-slate-200 rounded-xl hover:bg-[#3D52A0]/10 dark:hover:bg-white/[0.06] transition-colors font-medium"
                                                    >
                                                        <LayoutDashboard size={16} /> Dashboard
                                                    </Link>
                                                )}

                                                <Link
                                                    href="/my-profile"
                                                    onClick={() => setAvatarMenuOpen(false)}
                                                    className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-[#3D52A0] dark:text-slate-200 rounded-xl hover:bg-[#3D52A0]/10 dark:hover:bg-white/[0.06] transition-colors font-medium"
                                                >
                                                    <User size={16} /> My Profile
                                                </Link>

                                                <button
                                                    onClick={() => {
                                                        setAvatarMenuOpen(false);
                                                        authClient.signOut({
                                                            fetchOptions: {
                                                                onSuccess: () => { window.location.href = "/"; }
                                                            }
                                                        });
                                                    }}
                                                    className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors font-medium"
                                                >
                                                    <LogOut size={16} /> Logout
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="relative hidden xl:inline-flex items-center justify-center overflow-hidden rounded-full p-[2px] font-semibold text-[13px] active:scale-95 transition-all duration-300 group shadow-md hover:shadow-[0_4px_20px_rgba(61,82,160,0.35)]"
                            >
                                <span className="absolute inset-0 bg-linear-to-r from-[#3D52A0] via-[#7088D6] to-[#3D52A0] bg-[length:200%_100%] bg-left transition-all duration-500 ease-out group-hover:bg-right" />
                                <span className="relative flex items-center gap-1.5 px-5 py-2 rounded-full text-white transition-all duration-300">
                                    <span>Get Started</span>
                                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </span>
                            </Link>
                        )}

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-[#3D52A0] dark:text-slate-400 hover:bg-[#3D52A0]/10 dark:hover:bg-white/[0.06] transition-colors duration-300 focus:outline-none"
                            aria-expanded={isOpen}
                        >
                            {!isOpen ? <Menu size={20} /> : <X size={20} />}
                        </button>
                    </div>
                </div>
            </nav>

            <div
                className={`lg:hidden fixed inset-0 top-[76px] z-40 bg-[#EDE8F5]/95 dark:bg-[#0B0D11]/95 backdrop-blur-xl transition-all duration-500 ease-out ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
            >
                <div className="h-full overflow-y-auto px-6 py-8 flex flex-col justify-between">
                    <div className="space-y-1.5">
                        {navLinks.map((link, idx) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    style={{ transitionDelay: isOpen ? `${idx * 40}ms` : "0ms" }}
                                    className={`flex items-center justify-between px-5 py-4 rounded-2xl text-[17px] font-semibold transition-all duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"
                                        } ${active
                                            ? "bg-[#3D52A0] text-white dark:bg-white/10 dark:text-[#7688c9] border-l-4 border-[#3D52A0] dark:border-[#7688c9]"
                                            : "text-[#3D52A0] dark:text-slate-300 hover:bg-[#3D52A0]/10 dark:hover:bg-white/[0.05] hover:text-[#3D52A0] dark:hover:text-white"
                                        }`}
                                >
                                    {link.name}
                                    {active && <span className="w-2 h-2 rounded-full bg-white dark:bg-[#7688c9]" />}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#3D52A0]/15 dark:border-white/[0.06] transition-colors duration-300">
                        {isPending ? (
                            <div className="w-full h-12 rounded-2xl bg-[#3D52A0]/20 dark:bg-slate-800 animate-pulse" />
                        ) : user ? (
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-white/[0.04] rounded-2xl border border-[#3D52A0]/10 dark:border-white/[0.06]">
                                    <img
                                        src={user?.image || "/user.png"}
                                        alt={user?.name || "User Avatar"}
                                        className="w-10 h-10 rounded-full object-cover border border-[#3D52A0]/30 dark:border-white/20"
                                    />
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-bold text-[#3D52A0] dark:text-white truncate">{user?.name}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                                    </div>
                                </div>

                                {showDashboard && (
                                    <Link
                                        href={dashboardHref}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-base font-medium text-[#3D52A0] dark:text-slate-300 hover:bg-[#3D52A0]/10 dark:hover:bg-white/[0.05]"
                                    >
                                        <LayoutDashboard size={18} /> Dashboard
                                    </Link>
                                )}

                                <Link
                                    href="/my-profile"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-base font-medium text-[#3D52A0] dark:text-slate-300 hover:bg-[#3D52A0]/10 dark:hover:bg-white/[0.05]"
                                >
                                    <User size={18} /> My Profile
                                </Link>

                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        authClient.signOut({
                                            fetchOptions: {
                                                onSuccess: () => { window.location.href = "/"; }
                                            }
                                        });
                                    }}
                                    className="flex items-center gap-2.5 w-full px-4 py-3 rounded-xl text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="relative flex md:hidden items-center justify-center w-full px-5 py-4 text-[15px] font-semibold text-white overflow-hidden rounded-2xl shadow-md transition-all duration-300 group"
                            >
                                <span className="absolute inset-0 bg-linear-to-r from-[#3D52A0] via-[#7088D6] to-[#3D52A0] bg-[length:200%_100%] bg-left transition-all duration-500 ease-out group-hover:bg-right" />
                                <span className="relative flex items-center gap-2">
                                    Get Started
                                    <ArrowUpRight size={16} />
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;