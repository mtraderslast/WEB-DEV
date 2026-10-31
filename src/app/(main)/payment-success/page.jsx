'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Clock3, Receipt, XCircle } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get('orderId') || searchParams.get('reference_id');
    const [paymentStatus, setPaymentStatus] = useState('PENDING');

    useEffect(() => {
        if (!orderId) return undefined;

        let attempts = 0;
        let timer;

        const checkStatus = async () => {
            try {
                const response = await fetch(`/api/order-status?orderId=${orderId}`, { cache: 'no-store' });
                const result = await response.json();
                const status = result?.data?.paymentStatus;
                if (status) {
                    setPaymentStatus(status);
                    if (status !== 'PENDING') return;
                }
            } catch (error) {
                console.error('Payment status check failed:', error);
            }

            attempts += 1;
            if (attempts < 6) {
                timer = setTimeout(checkStatus, 2500);
            }
        };

        checkStatus();
        return () => clearTimeout(timer);
    }, [orderId]);

    const isPaid = paymentStatus === 'PAID';
    const isFailed = paymentStatus === 'FAILED' || paymentStatus === 'CANCELLED';

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#EDE8F5] dark:bg-[#000000] px-4 transition-colors duration-500">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#3D52A00d_1px,transparent_1px),linear-gradient(to_bottom,#3D52A00d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:32px_32px]" />

            <div className="relative z-10 bg-white dark:bg-[#09090b] rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-800 shadow-xl max-w-lg w-full text-center flex flex-col items-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
                    isFailed
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-500'
                        : isPaid
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-500'
                            : 'bg-amber-100 dark:bg-amber-900/30 text-amber-500'
                }`}>
                    {isFailed ? <XCircle size={40} /> : isPaid ? <CheckCircle size={40} /> : <Clock3 size={40} />}
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">
                    {isFailed ? 'Payment not completed' : isPaid ? 'Payment successful' : 'Confirming payment'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {isFailed
                        ? 'The payment did not go through. You can return to pricing and try again.'
                        : isPaid
                            ? 'Thank you. Your payment was received and we will start work on your project shortly.'
                            : 'We are confirming your payment with the gateway. This can take a few seconds.'}
                </p>

                {orderId && (
                    <div className="w-full mb-8 rounded-2xl bg-gray-50 dark:bg-[#1a1a1f] border border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Receipt size={16} className="text-[#3D52A0]" />
                        <span>Order reference:</span>
                        <span className="font-mono font-semibold text-gray-900 dark:text-white break-all">{orderId}</span>
                    </div>
                )}

                <button
                    type="button"
                    onClick={() => router.push(isFailed ? '/pricing' : '/')}
                    className="w-full py-4 rounded-xl font-bold text-lg bg-[#3D52A0] hover:bg-[#2d3d7a] text-white transition-all shadow-xl shadow-[#3D52A0]/30 cursor-pointer"
                >
                    {isFailed ? 'Try again' : 'Return to homepage'}
                </button>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#EDE8F5] dark:bg-[#000000] flex items-center justify-center">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
