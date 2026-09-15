'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Check, X, Clock, RotateCcw, ShieldCheck, ArrowLeft } from 'lucide-react';
import { fetchServices } from '@/lib/action/services';

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const slug = searchParams.get('slug');
    const tier = searchParams.get('tier');

    const [isProcessing, setIsProcessing] = useState(false);
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [customPrice, setCustomPrice] = useState(0);

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        const getServiceDetails = async () => {
            if (!slug || !tier) return;
            try {
                setLoading(true);
                const res = await fetchServices();
                const allServices = res?.data || [];

                const service = allServices.find(s => s.slug === slug);
                if (service) {
                    const pkg = service.packages.find(p => p.tier === tier);
                    if (pkg) {
                        setPackageData(pkg);
                        setCustomPrice(pkg.price);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch package details:", error);
            } finally {
                setLoading(false);
            }
        };

        getServiceDetails();
    }, [slug, tier]);

    const onSubmit = async (data) => {
        try {
            setIsProcessing(true);

            const orderPayload = {
                name: data.name || "Guest",
                email: data.email || "Not Provided",
                orderType: "PACKAGE_ORDER",
                amount: customPrice,
                packageDetails: {
                    slug: slug,
                    tier: packageData.tier,
                    title: packageData.title
                }
            };

            const response = await fetch('/api/create-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload)
            });

            const result = await response.json();

            if (result.success && result.checkoutUrl) {
                window.location.assign(result.checkoutUrl);
            } else {
                alert(result.message || "Something went wrong. Please try again.");
                setIsProcessing(false);
            }
        } catch (error) {
            console.error("Payment initiation failed:", error);
            alert("Failed to connect to payment server.");
            setIsProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-[#EDE8F5] dark:bg-[#000000]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3D52A0]"></div>
            </div>
        );
    }

    if (!packageData) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#EDE8F5] dark:bg-[#000000] text-gray-900 dark:text-white gap-4">
                <h2 className="text-2xl font-bold">Package not found</h2>
                <button onClick={() => router.back()} className="text-[#3D52A0] underline cursor-pointer">Go back</button>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen pt-32 pb-16 bg-[#EDE8F5] dark:bg-[#000000] text-gray-900 dark:text-gray-100 px-4 md:px-8 lg:px-12 transition-colors duration-500">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#3D52A00d_1px,transparent_1px),linear-gradient(to_bottom,#3D52A00d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:32px_32px]" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Complete Your Order</h1>
                        <p className="text-gray-600 dark:text-gray-400">Review your package details and proceed to secure checkout.</p>
                    </div>

                    <button
                        onClick={() => router.back()}
                        className="shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#09090b] hover:bg-gray-50 dark:hover:bg-[#1a1a1f] transition-all font-semibold text-sm shadow-sm cursor-pointer"
                    >
                        <ArrowLeft size={16} /> Go Back
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="w-full lg:w-7/12 bg-white dark:bg-[#09090b] rounded-3xl p-6 md:p-10 border border-gray-200 dark:border-gray-800 shadow-xl">
                        <div className="mb-8">
                            <span className="text-sm font-bold uppercase tracking-wider text-[#3D52A0] mb-2 block">{slug.replace('-', ' ')}</span>
                            <h2 className="text-2xl md:text-3xl font-bold capitalize mb-3">{packageData.title}</h2>
                            <p className="text-gray-600 dark:text-gray-400">{packageData.subtitle}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 py-4 px-5 rounded-2xl bg-[#EDE8F5]/50 dark:bg-[#1a1a2e] mb-8 text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-2 shrink-0">
                                <Clock size={18} className="text-[#3D52A0]" />
                                <span>{packageData.deliveryDays} Days Delivery</span>
                            </div>
                            <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 hidden md:block"></div>
                            <div className="flex items-center gap-2 shrink-0">
                                <RotateCcw size={18} className="text-[#3D52A0]" />
                                <span>{packageData.revisions}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">What's included</h3>
                            {packageData.features.map((feat, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    {feat.isIncluded ? (
                                        <div className="shrink-0 mt-0.5 p-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400">
                                            <Check size={14} />
                                        </div>
                                    ) : (
                                        <div className="shrink-0 mt-0.5 p-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400">
                                            <X size={14} />
                                        </div>
                                    )}
                                    <span className={`text-base ${feat.isIncluded ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400 line-through'}`}>
                                        {feat.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full lg:w-5/12 bg-white dark:bg-[#09090b] rounded-3xl p-6 md:p-10 border border-[#3D52A0]/30 shadow-2xl shadow-[#3D52A0]/10 sticky top-32">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Personal Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                                        <input
                                            {...register('name')}
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1a1a1f] focus:outline-none focus:ring-2 focus:ring-[#3D52A0]/50 transition-all text-gray-900 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                                        <input
                                            {...register('email')}
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1a1a1f] focus:outline-none focus:ring-2 focus:ring-[#3D52A0]/50 transition-all text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100 dark:border-gray-800" />

                            <div className="bg-gray-50 dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold">Total</span>
                                    <div className="flex items-center">
                                        <span className="text-3xl font-extrabold text-[#3D52A0] dark:text-white mr-1">$</span>
                                        <input
                                            type="number"
                                            value={customPrice}
                                            onChange={(e) => setCustomPrice(e.target.value)}
                                            className="w-24 text-right text-3xl font-extrabold text-[#3D52A0] dark:text-white bg-transparent border border-transparent hover:border-gray-300 dark:hover:border-gray-700 focus:border-[#3D52A0] focus:bg-white dark:focus:bg-[#000] focus:ring-0 outline-none rounded-lg transition-all cursor-text [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl ${isProcessing
                                    ? 'bg-[#3D52A0]/70 cursor-not-allowed text-white/90 shadow-none'
                                    : 'bg-[#3D52A0] hover:bg-[#2d3d7a] text-white shadow-[#3D52A0]/30'
                                    }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck size={20} /> Proceed to Order
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                                Payments are securely processed. You will be redirected to the payment gateway.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading Checkout...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}