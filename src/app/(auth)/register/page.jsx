"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, User, Image as ImageIcon, ArrowRight, Code2, Sparkles, MoveLeft, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";

function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const getRedirectUrl = () => {
        const redirect =
            searchParams.get("redirect") || searchParams.get("callbackUrl");

        return redirect || "/";
    };

    const handleRegister = async (userData) => {
        setLoading(true);
        try {
            const { data, error } = await authClient.signUp.email({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                image: userData.imageUrl,
            });

            if (error) {
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: error.message || "Something went wrong during account setup. Please try again.",
                    confirmButtonColor: "#3D52A0",
                });
                setValue("password", ""); // Clear password on error
            } else {
                router.push(getRedirectUrl());
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An unexpected error occurred. Please try again.",
                confirmButtonColor: "#3D52A0",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: `${window.location.origin}${getRedirectUrl()}`,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Could not authenticate with Google.",
                confirmButtonColor: "#3D52A0",
            });
        }
    };

    return (
        <div className="max-w-md w-full space-y-6 bg-white dark:bg-[#09090b] border border-[#3D52A0]/10 dark:border-white/10 p-8 sm:p-10 rounded-2xl shadow-2xl relative z-10 my-8">

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

                <div className="pt-1">
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Create an Account
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1 leading-relaxed">
                        Join our digital ecosystem to kickstart your next big project and collaborate with top developers.
                    </p>
                </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">

                {/* Full Name */}
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 block">
                        Full Name
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                            <User size={18} />
                        </span>
                        <input
                            type="text"
                            placeholder="John Doe"
                            {...register("name", {
                                required: "Full name is required",
                            })}
                            className={`w-full pl-11 pr-4 py-3 bg-[#EDE8F5]/50 dark:bg-black/50 border rounded-xl text-sm focus:outline-none transition-all text-gray-900 dark:text-white placeholder:text-zinc-400
                            ${errors.name
                                    ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                                    : "border-gray-200 dark:border-white/10 focus:border-[#3D52A0] focus:ring-2 focus:ring-[#3D52A0]/20 dark:focus:border-[#3D52A0]"
                                }`}
                        />
                    </div>
                    {errors.name && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 block">
                        Email Address
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                            <Mail size={18} />
                        </span>
                        <input
                            type="email"
                            placeholder="hello@company.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email format",
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

                {/* Password */}
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
                                    message: "Minimum 6 characters required",
                                },
                                validate: {
                                    hasUpper: (value) =>
                                        /[A-Z]/.test(value) ||
                                        "Must contain at least one uppercase letter",
                                    hasLower: (value) =>
                                        /[a-z]/.test(value) ||
                                        "Must contain at least one lowercase letter",
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

                {/* Avatar URL (Optional) */}
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 block">
                        Profile Image URL{" "}
                        <span className="text-[11px] font-normal text-gray-400">
                            (optional)
                        </span>
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                            <ImageIcon size={18} />
                        </span>
                        <input
                            type="url"
                            placeholder="https://example.com/avatar.png"
                            {...register("imageUrl")}
                            className="w-full pl-11 pr-4 py-3 bg-[#EDE8F5]/50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#3D52A0] focus:ring-2 focus:ring-[#3D52A0]/20 dark:focus:border-[#3D52A0] transition-all text-gray-900 dark:text-white placeholder:text-zinc-400"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 flex items-center justify-center gap-2 bg-[#3D52A0] hover:bg-[#2e3e78] dark:bg-[#3D52A0] dark:hover:bg-[#4a63b8] text-white font-medium text-sm py-3.5 rounded-xl transition-all duration-200 group shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : (
                        <>
                            <span>Create Account</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center py-1">
                <div className="grow border-t border-gray-200 dark:border-zinc-800" />
                <span className="shrink mx-4 text-xs text-gray-400 dark:text-zinc-500">
                    Or register with
                </span>
                <div className="grow border-t border-gray-200 dark:border-zinc-800" />
            </div>

            {/* Google SSO */}
            <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#09090b] border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-[#15151a] text-gray-700 dark:text-gray-200 font-medium text-sm py-3 rounded-xl transition-all duration-200 shadow-sm"
            >
                <FcGoogle size={20} />
                <span>Continue with Google</span>
            </button>

            {/* Login Redirect */}
            <div className="text-center pt-4">
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                    Already registered?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-[#3D52A0] dark:text-[#8b9de3] hover:underline transition-all"
                    >
                        Sign in here
                    </Link>
                </p>
            </div>

        </div>
    );
}

export default function Register() {
    return (
        <section className="min-h-screen bg-[#EDE8F5] dark:bg-[#000000] text-[#3D52A0] dark:text-white flex items-center justify-center p-4 transition-colors duration-300 relative font-sans py-12">

            {/* Background Subtle Gradient & Grid Accent (Matching Login Page) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3D52A00a_1px,transparent_1px),linear-gradient(to_bottom,#3D52A00a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#3D52A0]/5 to-transparent pointer-events-none" />

            {/* Navigation Button */}
            <Link
                href="/"
                className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#09090b] border border-[#3D52A0]/20 dark:border-white/10 rounded-full hover:bg-[#3D52A0] hover:text-white transition-all text-sm font-medium shadow-sm z-20"
            >
                <MoveLeft size={16} />
                <span>Back to Wev Dev</span>
            </Link>

            {/* Suspense Wrapper */}
            <Suspense fallback={
                <div className="flex flex-col items-center gap-3 text-sm font-medium text-[#3D52A0] dark:text-white z-10">
                    <Code2 className="w-8 h-8 animate-pulse" />
                    <span>Loading Registration...</span>
                </div>
            }>
                <RegisterForm />
            </Suspense>
        </section>
    );
}