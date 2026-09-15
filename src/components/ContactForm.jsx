"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';
import { sendContactEmail } from '@/lib/action/contact';

export const ContactForm = () => {
    // react-hook-form initialization
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            service: '',
            message: ''
        }
    });

    const selectedService = watch('service');

    const servicesList = [
        "Web Development",
        "Mobile APP",
        "Ecommerce",
        "UI/UX Design",
        "SEO",
        "Cloud Solutions",
        "Business Automation",
        "AI-Driven Services & Automation"
    ];

    const onSubmit = async (data) => {
        Swal.fire({
            title: "Sending Email...",
            text: "Please wait a moment while we send your email.",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const payload = {
                name: data.name.trim(),
                email: data.email.trim(),
                service: data.service,
                message: data.message.trim(),
            };

            const res = await sendContactEmail(payload);

            // Axios or Direct Handler Check
            const isSuccess = res?.success || res?.data?.success || res?.status === 200;

            if (isSuccess) {
                Swal.fire({
                    icon: "success",
                    title: "Message Sent!",
                    text: "Thank you for contacting us. We will get back to you soon!",
                    confirmButtonColor: "#3D52A0",
                });
                reset();
            } else {
                throw new Error(res?.message || res?.data?.message || "Failed to send email");
            }
        } catch (error) {
            console.error("Error submitting form:", error);

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text:
                    error?.response?.data?.message ||
                    error?.message ||
                    "Something went wrong! Please try again later.",
                confirmButtonColor: "#ef4444",
            });
        }
    };

    return (
        <div className="w-full bg-white/60 dark:bg-[#09090b]/80 backdrop-blur-2xl rounded-2xl border border-gray-200 dark:border-white/10 p-4 lg:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-[fadeIn_0.5s_ease-out]">

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            {...register("name", { required: "Name is required" })}
                            className="w-full bg-transparent border-b-2 border-gray-300 dark:border-white/10 focus:border-[#3D52A0] dark:focus:border-indigo-400 px-0 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-colors rounded-none"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="john@company.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            className="w-full bg-transparent border-b-2 border-gray-300 dark:border-white/10 focus:border-[#3D52A0] dark:focus:border-indigo-400 px-0 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-colors rounded-none"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                </div>

                {/* Services Interactive Chips */}
                <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        What can we help you with?
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {servicesList.map((srv) => (
                            <button
                                key={srv}
                                type="button"
                                onClick={() => setValue("service", srv, { shouldValidate: true })}
                                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${selectedService === srv
                                    ? 'bg-[#3D52A0] text-white border-[#3D52A0] shadow-md shadow-[#3D52A0]/20'
                                    : 'bg-white dark:bg-black/20 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30'
                                    }`}
                            >
                                {srv}
                            </button>
                        ))}
                    </div>
                    {/* Hidden input to register the service selection */}
                    <input type="hidden" {...register("service", { required: "Please select a service" })} />
                    {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Project Details
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Tell us about your project goals, timeline, and budget..."
                        {...register("message", { required: "Please provide some project details" })}
                        className="w-full bg-transparent border-b-2 border-gray-300 dark:border-white/10 focus:border-[#3D52A0] dark:focus:border-indigo-400 px-0 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-colors resize-none rounded-none"
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#3D52A0] text-white font-bold text-lg transition-all duration-300 hover:bg-[#2a3a75] disabled:opacity-70 overflow-hidden cursor-pointer disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <span>Send Request</span>
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                        </>
                    )}
                    {/* Subtle Button Shine */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                </button>

            </form>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </div>
    );
};