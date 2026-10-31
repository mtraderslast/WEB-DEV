'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
    Check, X, Clock, RotateCcw, ShieldCheck, ArrowLeft,
    Lock, Mail, Phone, MapPin, UserRound
} from 'lucide-react';
import Swal from 'sweetalert2';
import { fetchServiceBySlug } from '@/lib/action/services';
import { COUNTRIES } from '@/data/countries';

const inputClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#1a1a1f] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${hasError
        ? 'border-red-400 focus:ring-red-400/40'
        : 'border-gray-200 dark:border-gray-800 focus:ring-[#3D52A0]/50'
    }`;

const FieldError = ({ message }) => (
    message ? <p className="mt-1.5 text-xs font-medium text-red-500">{message}</p> : null
);

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const slug = searchParams.get('slug');
    const tier = searchParams.get('tier');

    const [isProcessing, setIsProcessing] = useState(false);
    const [packageData, setPackageData] = useState(null);
    const [serviceName, setServiceName] = useState('');
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            country: '',
            state: '',
        },
    });

    useEffect(() => {
        const getServiceDetails = async () => {
            if (!slug || !tier) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const res = await fetchServiceBySlug(slug);
                const service = res?.data;
                const pkg = service?.packages?.find((item) => item.tier === tier);

                if (pkg) {
                    setPackageData(pkg);
                    setServiceName(service.name || slug);
                }
            } catch (error) {
                console.error('Failed to fetch package details:', error);
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
                orderType: 'PACKAGE_ORDER',
                billing: {
                    firstName: data.firstName.trim(),
                    lastName: data.lastName.trim(),
                    email: data.email.trim(),
                    contactNumber: data.contactNumber.trim(),
                    address: data.address.trim(),
                    country: data.country,
                    state: data.state.trim() || 'N/A',
                    city: data.city.trim(),
                    zipCode: data.zipCode.trim(),
                },
                packageDetails: {
                    slug,
                    tier: packageData.tier,
                    title: packageData.title,
                },
            };

            const response = await fetch('/api/create-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload),
            });

            const result = await response.json();

            if (result.success && result.checkoutUrl) {
                window.location.assign(result.checkoutUrl);
                return;
            }

            await Swal.fire({
                icon: 'error',
                title: 'Payment could not start',
                text: result.message || 'Please try again in a moment.',
                confirmButtonColor: '#3D52A0',
            });
            setIsProcessing(false);
        } catch (error) {
            console.error('Payment initiation failed:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Connection failed',
                text: 'Could not reach the payment server. Please try again.',
                confirmButtonColor: '#3D52A0',
            });
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
                <button onClick={() => router.push('/pricing')} className="text-[#3D52A0] underline cursor-pointer">
                    Browse packages
                </button>
            </div>
        );
    }

    const includedCount = packageData.features?.filter((feat) => feat.isIncluded).length || 0;
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(packageData.price);

    return (
        <div className="w-full min-h-screen pt-32 pb-16 bg-[#EDE8F5] dark:bg-[#000000] text-gray-900 dark:text-gray-100 px-4 md:px-8 lg:px-12 transition-colors duration-500">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#3D52A00d_1px,transparent_1px),linear-gradient(to_bottom,#3D52A00d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:32px_32px]" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-[#3D52A0] mb-2">Secure checkout</p>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Complete your order</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Enter billing details, then continue to the payment page.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="self-start shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#09090b] hover:bg-gray-50 dark:hover:bg-[#1a1a1f] transition-all font-semibold text-sm shadow-sm cursor-pointer"
                    >
                        <ArrowLeft size={16} /> Go Back
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="w-full lg:w-7/12 space-y-6">
                        <div className="bg-white dark:bg-[#09090b] rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-[#3D52A0]/10 text-[#3D52A0] flex items-center justify-center">
                                    <UserRound size={18} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold">Contact information</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Used for invoices and payment confirmation.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First name</label>
                                    <input
                                        {...register('firstName', { required: 'First name is required' })}
                                        autoComplete="given-name"
                                        placeholder="John"
                                        className={inputClass(errors.firstName)}
                                    />
                                    <FieldError message={errors.firstName?.message} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last name</label>
                                    <input
                                        {...register('lastName', { required: 'Last name is required' })}
                                        autoComplete="family-name"
                                        placeholder="Doe"
                                        className={inputClass(errors.lastName)}
                                    />
                                    <FieldError message={errors.lastName?.message} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                        <span className="inline-flex items-center gap-1.5"><Mail size={14} /> Email</span>
                                    </label>
                                    <input
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Enter a valid email',
                                            },
                                        })}
                                        type="email"
                                        autoComplete="email"
                                        placeholder="john@example.com"
                                        className={inputClass(errors.email)}
                                    />
                                    <FieldError message={errors.email?.message} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                        <span className="inline-flex items-center gap-1.5"><Phone size={14} /> Phone</span>
                                    </label>
                                    <input
                                        {...register('contactNumber', {
                                            required: 'Phone number is required',
                                            minLength: { value: 8, message: 'Enter a valid phone number' },
                                        })}
                                        type="tel"
                                        autoComplete="tel"
                                        placeholder="+1 202 555 0148"
                                        className={inputClass(errors.contactNumber)}
                                    />
                                    <FieldError message={errors.contactNumber?.message} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#09090b] rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-[#3D52A0]/10 text-[#3D52A0] flex items-center justify-center">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold">Billing address</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Required by the payment provider to process the charge.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Street address</label>
                                    <input
                                        {...register('address', { required: 'Address is required' })}
                                        autoComplete="street-address"
                                        placeholder="221B Baker Street"
                                        className={inputClass(errors.address)}
                                    />
                                    <FieldError message={errors.address?.message} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Country</label>
                                        <select
                                            {...register('country', { required: 'Country is required' })}
                                            autoComplete="country-name"
                                            className={inputClass(errors.country)}
                                        >
                                            <option value="" disabled>Select country</option>
                                            {COUNTRIES.map((country) => (
                                                <option key={country} value={country}>{country}</option>
                                            ))}
                                        </select>
                                        <FieldError message={errors.country?.message} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">State / Region</label>
                                        <input
                                            {...register('state')}
                                            autoComplete="address-level1"
                                            placeholder="N/A if not applicable"
                                            className={inputClass(false)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">City</label>
                                        <input
                                            {...register('city', { required: 'City is required' })}
                                            autoComplete="address-level2"
                                            placeholder="London"
                                            className={inputClass(errors.city)}
                                        />
                                        <FieldError message={errors.city?.message} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">ZIP / Postal code</label>
                                        <input
                                            {...register('zipCode', { required: 'Postal code is required' })}
                                            autoComplete="postal-code"
                                            placeholder="NW1 6XE"
                                            className={inputClass(errors.zipCode)}
                                        />
                                        <FieldError message={errors.zipCode?.message} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside className="w-full lg:w-5/12 lg:sticky lg:top-32">
                        <div className="bg-white dark:bg-[#09090b] rounded-3xl p-6 md:p-8 border border-[#3D52A0]/30 shadow-2xl shadow-[#3D52A0]/10">
                            <p className="text-xs font-bold uppercase tracking-wider text-[#3D52A0] mb-3">{serviceName}</p>
                            <h2 className="text-2xl font-bold capitalize mb-2">{packageData.title}</h2>
                            {packageData.subtitle && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">{packageData.subtitle}</p>
                            )}

                            <div className="flex flex-wrap items-center gap-3 py-3 px-4 rounded-2xl bg-[#EDE8F5]/70 dark:bg-[#1a1a2e] mb-6 text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-800">
                                <span className="flex items-center gap-1.5">
                                    <Clock size={16} className="text-[#3D52A0]" /> {packageData.deliveryDays} days
                                </span>
                                <span className="w-px h-4 bg-gray-300 dark:bg-gray-700 hidden sm:block" />
                                <span className="flex items-center gap-1.5">
                                    <RotateCcw size={16} className="text-[#3D52A0]" /> {packageData.revisions}
                                </span>
                            </div>

                            <div className="space-y-2.5 mb-6 max-h-48 overflow-y-auto pr-1">
                                {packageData.features?.slice(0, 6).map((feat, idx) => (
                                    <div key={idx} className="flex items-start gap-2.5">
                                        {feat.isIncluded ? (
                                            <Check size={15} className="shrink-0 mt-0.5 text-green-600" />
                                        ) : (
                                            <X size={15} className="shrink-0 mt-0.5 text-gray-400" />
                                        )}
                                        <span className={`text-sm ${feat.isIncluded ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400 line-through'}`}>
                                            {feat.name}
                                        </span>
                                    </div>
                                ))}
                                {packageData.features?.length > 6 && (
                                    <p className="text-xs text-gray-500 pt-1">+{packageData.features.length - 6} more items included</p>
                                )}
                            </div>

                            <div className="rounded-2xl p-5 bg-gray-50 dark:bg-[#1a1a2e] border border-gray-100 dark:border-gray-800 mb-6">
                                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                                    <span>Package</span>
                                    <span>{includedCount} features</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-lg font-bold">Total due</span>
                                    <span className="text-3xl font-extrabold text-[#3D52A0] dark:text-white">{formattedPrice}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl ${isProcessing
                                    ? 'bg-[#3D52A0]/70 cursor-not-allowed text-white/90 shadow-none'
                                    : 'bg-[#3D52A0] hover:bg-[#2d3d7a] text-white shadow-[#3D52A0]/30 cursor-pointer'
                                }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Redirecting...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck size={20} /> Continue to payment
                                    </>
                                )}
                            </button>

                            <p className="flex items-center justify-center gap-1.5 text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                                <Lock size={12} /> You will be redirected to a secure payment page.
                            </p>
                        </div>
                    </aside>
                </form>
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
