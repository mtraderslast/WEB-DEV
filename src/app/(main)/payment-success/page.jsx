'use client';

import React, { useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const hasCaptured = useRef(false);

    const orderId = searchParams.get('orderId');
    const token = searchParams.get('token'); // PayPal sends this

    useEffect(() => {
        // If it's a PayPal redirect (has token), capture it silently in the background
        if (token && orderId && !hasCaptured.current) {
            hasCaptured.current = true;

            fetch('/api/capture-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, token })
            }).catch(err => console.error("Silent capture failed:", err));
        }
    }, [orderId, token]);

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#EDE8F5] dark:bg-[#000000] px-4 transition-colors duration-500">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#3D52A00d_1px,transparent_1px),linear-gradient(to_bottom,#3D52A00d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:32px_32px]" />

            <div className="relative z-10 bg-white dark:bg-[#09090b] rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-800 shadow-xl max-w-lg w-full text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} />
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">Payment Successful!</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    Thank you for your order. Your payment has been processed successfully and we will begin working on your project shortly.
                </p>

                <button
                    onClick={() => router.push('/')}
                    className="w-full py-4 rounded-xl font-bold text-lg bg-[#3D52A0] hover:bg-[#2d3d7a] text-white transition-all shadow-xl shadow-[#3D52A0]/30"
                >
                    Return to Homepage
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