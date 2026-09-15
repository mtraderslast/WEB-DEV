'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, Link as LinkIcon, Loader2 } from 'lucide-react';
import Link from "next/link";
import Swal from 'sweetalert2';
import { sendQuotationEmail } from '@/lib/action/quotation';

const servicesList = [
    "Web Development", "Mobile App", "UI/UX Design",
    "SEO Optimization", "Digital Marketing", "Cloud Solutions",
    "Business Automation", "IT Consulting", "AI Automation"
];

export default function QuotePage() {
    const [step, setStep] = useState(1);
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: { services: [] }
    });

    const selectedServices = watch('services');

    // Framer Motion Variants
    const formVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
        exit: { opacity: 0, y: -30, transition: { duration: 0.3 } }
    };

    const handleNext = async () => {
        let isValid = false;
        if (step === 1) isValid = await trigger(['name', 'email', 'phone', 'company']);
        if (step === 2) {
            if (selectedServices.length > 0) isValid = true;
            else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Service Required',
                    text: 'Please select at least one service before proceeding.',
                    confirmButtonColor: '#3D52A0',
                });
            }
        }
        if (isValid) setStep((prev) => prev + 1);
    };

    const handlePrev = () => setStep((prev) => prev - 1);

    const onSubmit = async (data) => {
        Swal.fire({
            title: "Submitting Proposal...",
            text: "Please wait a moment while we process your request.",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const payload = {
                name: data.name?.trim(),
                email: data.email?.trim(),
                phone: data.phone?.trim() || "",
                company: data.company?.trim() || "",
                services: data.services,
                description: data.description?.trim(),
                budget: data.budget || "",
                driveLink: data.driveLink?.trim() || "",
            };

            const res = await sendQuotationEmail(payload);

            console.log(res)

            const isSuccess = res?.success || res?.data?.success || res?.status === 200;

            if (isSuccess) {
                Swal.close();
                setStep(4); // Success Step UI এ নিয়ে যাওয়া
            } else {
                throw new Error(res?.message || res?.data?.message || "Failed to submit quotation request.");
            }
        } catch (error) {
            console.error("Error submitting quotation:", error);

            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text:
                    error?.response?.data?.message ||
                    error?.message ||
                    "Something went wrong! Please try again later.",
                confirmButtonColor: "#ef4444",
            });
        }
    };

    const toggleService = (service) => {
        if (selectedServices.includes(service)) {
            setValue('services', selectedServices.filter(s => s !== service));
        } else {
            setValue('services', [...selectedServices, service]);
        }
    };

    return (
        // Main Wrapper: Centered Content
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 py-12 lg:p-10 bg-[#f2eff7] dark:bg-[#000000] text-gray-900 dark:text-gray-100 transition-colors duration-500">

            <div className="fixed inset-0 bg-[linear-gradient(to_right,#3D52A00d_1px,transparent_1px),linear-gradient(to_bottom,#3D52A00d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* Top Heading & Paragraph */}
            <div className="w-[95%] md:w-[80%] lg:w-[60%] xl:w-[50%] text-center mb-10 z-10">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-extrabold mb-4"
                >
                    Request a <span className="text-[#3D52A0]">Custom Quote</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-base md:text-lg text-gray-600 dark:text-gray-400 break-words"
                >
                    Tell us about your project requirements and our enterprise team will prepare a tailored proposal with timelines and budget.
                </motion.p>
            </div>

            {/* Centered Form Card */}
            <div className="w-[95%] md:w-[80%] lg:w-[60%] xl:w-[50%] bg-white dark:bg-[#09090b] shadow-2xl dark:shadow-[#3D52A0]/10 rounded-3xl p-6 md:p-10 lg:p-12 border border-gray-100 dark:border-gray-800 relative overflow-hidden z-10">

                {/* Progress Bar */}
                {step < 4 && (
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full mb-8 overflow-hidden">
                        <motion.div
                            className="h-full bg-[#3D52A0]"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                )}

                <AnimatePresence mode="wait">

                    {/* STEP 1: Basic Details */}
                    {step === 1 && (
                        <motion.div key="step1" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="w-full">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 wrap-break-words">Let's get to know you</h2>

                            <div className="flex flex-col gap-5 w-full">
                                <div className="flex flex-col md:flex-row gap-5 w-full">
                                    <div className="w-full">
                                        <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-300">Full Name *</label>
                                        <input
                                            {...register('name', { required: "Name is required" })}
                                            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3D52A0] transition-all"
                                            placeholder="John Doe"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                    </div>
                                    <div className="w-full">
                                        <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-300">Email Address *</label>
                                        <input
                                            type="email"
                                            {...register('email', {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3D52A0] transition-all"
                                            placeholder="john@company.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-5 w-full">
                                    <div className="w-full">
                                        <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-300">Phone Number</label>
                                        <input
                                            {...register('phone')}
                                            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3D52A0] transition-all"
                                            placeholder="+880 1XXX XXXXXX"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-300">Company Name</label>
                                        <input
                                            {...register('company')}
                                            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3D52A0] transition-all text-ellipsis"
                                            placeholder="Your Tech Ltd."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button type="button" onClick={handleNext} className="bg-[#3D52A0] hover:bg-[#2d3d7a] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all w-full md:w-auto cursor-pointer">
                                    Next Step <ArrowRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: Services */}
                    {step === 2 && (
                        <motion.div key="step2" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="w-full">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 break-words">What services do you need?</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                {servicesList.map((service) => (
                                    <div
                                        key={service}
                                        onClick={() => toggleService(service)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer flex items-start gap-3 transition-all ${selectedServices.includes(service)
                                            ? 'border-[#3D52A0] bg-[#3D52A0]/10 text-[#3D52A0] dark:text-white'
                                            : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0f172a] text-gray-600 dark:text-gray-400 hover:border-[#3D52A0]/50'
                                            }`}
                                    >
                                        <div className={`shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 ${selectedServices.includes(service) ? 'border-[#3D52A0] bg-[#3D52A0]' : 'border-gray-300'}`}>
                                            {selectedServices.includes(service) && <CheckCircle size={14} className="text-white" />}
                                        </div>
                                        <span className="font-semibold break-words w-full text-left">{service}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex flex-col-reverse md:flex-row justify-between gap-4 w-full">
                                <button type="button" onClick={handlePrev} className="text-gray-500 hover:text-gray-900 dark:hover:text-white px-8 py-4 font-bold flex items-center justify-center gap-2 transition-all w-full md:w-auto bg-gray-100 dark:bg-gray-800 rounded-xl md:bg-transparent md:dark:bg-transparent cursor-pointer">
                                    <ArrowLeft size={20} /> Back
                                </button>
                                <button type="button" onClick={handleNext} className="bg-[#3D52A0] hover:bg-[#2d3d7a] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all w-full md:w-auto cursor-pointer">
                                    Project Details <ArrowRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: Project Details */}
                    {step === 3 && (
                        <motion.div key="step3" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="w-full">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 break-words">Final Details</h2>

                            <div className="space-y-6 w-full">
                                <div className="w-full">
                                    <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-300">Project Description *</label>
                                    <textarea
                                        {...register('description', { required: "Project description is required" })}
                                        rows={5}
                                        className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3D52A0] transition-all resize-y"
                                        placeholder="Briefly describe what you want to build..."
                                    />
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                                </div>

                                <div className="flex flex-col md:flex-row gap-5 w-full">
                                    <div className="w-full">
                                        <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-300">Estimated Budget</label>
                                        <select
                                            {...register('budget')}
                                            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3D52A0] transition-all appearance-none"
                                        >
                                            <option value="">Select Budget</option>
                                            <option value="5k-10k">$5,000 - $10,000</option>
                                            <option value="10k-25k">$10,000 - $25,000</option>
                                            <option value="25k-50k">$25,000 - $50,000</option>
                                            <option value="50k+">$50,000+</option>
                                        </select>
                                    </div>

                                    <div className="w-full">
                                        <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">Drive Link (Brief/Reqs)</label>
                                        <div className="relative w-full">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                <LinkIcon size={18} />
                                            </div>
                                            <input
                                                {...register('driveLink')}
                                                className="w-full p-4 pl-12 rounded-xl bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3D52A0] transition-all"
                                                placeholder="https://drive.google.com/..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col-reverse md:flex-row justify-between gap-4 w-full">
                                <button type="button" onClick={handlePrev} disabled={isSubmitting} className="text-gray-500 hover:text-gray-900 dark:hover:text-white px-8 py-4 font-bold flex items-center justify-center gap-2 transition-all w-full md:w-auto bg-gray-100 dark:bg-gray-800 rounded-xl md:bg-transparent md:dark:bg-transparent cursor-pointer disabled:opacity-50">
                                    <ArrowLeft size={20} /> Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={isSubmitting}
                                    className="bg-[#3D52A0] hover:bg-[#2d3d7a] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all w-full md:w-auto shadow-lg shadow-[#3D52A0]/30 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" /> Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Submit Request <CheckCircle size={20} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: Success Message */}
                    {step === 4 && (
                        <motion.div key="step4" variants={formVariants} initial="hidden" animate="visible" className="w-full text-center py-12">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle size={48} />
                            </motion.div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 break-words">Request Sent Successfully!</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg break-words max-w-md mx-auto">
                                Thank you for reaching out. Our enterprise team will review your project and get back to you within 24 hours.
                            </p>
                            <Link
                                href="/"
                                className="mt-8 inline-block text-[#3D52A0] font-bold hover:underline"
                            >
                                Return to Home
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}