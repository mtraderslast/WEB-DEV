"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Code2, Sparkles, MoveLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

function LoginContent() {
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const getRedirectUrl = () => {
        const redirect =
            searchParams.get("redirect") || searchParams.get("callbackUrl");
        return redirect || "/";
    };

    const onLoginSubmit = async (userData) => {
        const { data, error } = await authClient.signIn.email({
            email: userData.email,
            password: userData.password,
        });

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Authentication Failed",
                text: "Invalid credentials. Please check your details and try again.",
                confirmButtonColor: "#3D52A0",
            });
            reset();
        } else {
            router.push(getRedirectUrl());
        }
    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: `${window.location.origin}${getRedirectUrl()}`,
        });
    };

    return (
        <section className="min-h-screen bg-[#EDE8F5] dark:bg-[#000000] text-[#3D52A0] dark:text-white flex items-center justify-center transition-colors duration-300 relative font-sans">
            {/* Background Subtle Gradient & Grid Accent */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3D52A00a_1px,transparent_1px),linear-gradient(to_bottom,#3D52A00a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#3D52A0]/5 to-transparent pointer-events-none" />

            {/* Back to Home Navigation */}
            <Link
                href="/"
                className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#09090b] border border-[#3D52A0]/20 dark:border-white/10 rounded-full hover:bg-[#3D52A0] hover:text-white transition-all text-sm font-medium shadow-sm z-20"
            >
                <MoveLeft size={16} />
                <span>Back to Wev Dev</span>
            </Link>

            {/* Main Login Card */}
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#09090b] border border-[#3D52A0]/10 dark:border-white/10 p-8 sm:p-10 rounded-2xl shadow-2xl relative z-10">

                {/* Header Section */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#3D52A0]/10 dark:border-white/10 pb-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#3D52A0]/10 p-2 rounded-lg">
                                <Code2 className="w-6 h-6 text-[#3D52A0] dark:text-[#8b9de3]" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-[#3D52A0] dark:text-white">
                                Wev Dev
                            </span>
                        </div>
                        <Sparkles className="w-5 h-5 text-[#3D52A0]/50 dark:text-zinc-500 animate-pulse" />
                    </div>

                    <div className="pt-2">
                        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Client Portal
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1 leading-relaxed">
                            Sign in to manage your digital projects, track development progress, and collaborate with our team.
                        </p>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-5">
                    {/* Email Input */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 block">
                            Work Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                                <Mail size={18} />
                            </span>
                            <input
                                type="email"
                                placeholder="client@company.com"
                                {...register("email", {
                                    required: "Email address is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address format",
                                    },
                                })}
                                className={`w-full pl-11 pr-4 py-3 bg-[#EDE8F5]/50 dark:bg-black/50 border rounded-xl text-sm focus:outline-none transition-all text-gray-900 dark:text-white placeholder:text-zinc-400
                                ${errors.email
                                        ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                                        : "border-gray-200 dark:border-white/10 focus:border-[#3D52A0] focus:ring-2 focus:ring-[#3D52A0]/20 dark:focus:border-[#3D52A0]"
                                    }`}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 block">
                            Password
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                                <Lock size={18} />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••••••"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                                className={`w-full pl-11 pr-12 py-3 bg-[#EDE8F5]/50 dark:bg-black/50 border rounded-xl text-sm focus:outline-none transition-all text-gray-900 dark:text-white placeholder:text-zinc-400
                                ${errors.password
                                        ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                                        : "border-gray-200 dark:border-white/10 focus:border-[#3D52A0] focus:ring-2 focus:ring-[#3D52A0]/20 dark:focus:border-[#3D52A0]"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-[#3D52A0] dark:hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-[#3D52A0] hover:bg-[#2e3e78] dark:bg-[#3D52A0] dark:hover:bg-[#4a63b8] text-white font-medium text-sm py-3.5 rounded-xl transition-all duration-200 group shadow-md hover:shadow-lg"
                    >
                        <span>Access Portal</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                {/* Divider */}
                <div className="relative flex items-center py-1">
                    <div className="grow border-t border-gray-200 dark:border-zinc-800" />
                    <span className="shrink mx-4 text-xs text-gray-400 dark:text-zinc-500">
                        Or continue with
                    </span>
                    <div className="grow border-t border-gray-200 dark:border-zinc-800" />
                </div>

                {/* Social Auth */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#09090b] border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-[#15151a] text-gray-700 dark:text-gray-200 font-medium text-sm py-3 rounded-xl transition-all duration-200 shadow-sm"
                >
                    <FcGoogle size={20} />
                    <span>Google</span>
                </button>

                {/* Footer Link: Registration */}
                <div className="text-center pt-4">
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            className="font-semibold text-[#3D52A0] dark:text-[#8b9de3] hover:underline transition-all"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default function Login() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#EDE8F5] dark:bg-[#000000] flex items-center justify-center text-sm font-medium text-[#3D52A0] dark:text-white">
                <div className="flex flex-col items-center gap-3">
                    <Code2 className="w-8 h-8 animate-pulse" />
                    <span>Loading Wev Dev Portal...</span>
                </div>
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}