'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';

export default function PaymentCancelledPage() {
    const router = useRouter();

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#EDE8F5] dark:bg-[#000000] px-4 transition-colors duration-500">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#3D52A00d_1px,transparent_1px),linear-gradient(to_bottom,#3D52A00d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:32px_32px]" />

            <div className="relative z-10 bg-white dark:bg-[#09090b] rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-800 shadow-xl max-w-lg w-full text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mb-6">
                    <XCircle size={40} />
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">Payment cancelled</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    The payment was cancelled or did not complete. No charge was made. You can return to pricing and try again.
                </p>

                <div className="w-full flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        onClick={() => router.push('/pricing')}
                        className="flex-1 py-4 rounded-xl font-bold text-lg bg-[#3D52A0] hover:bg-[#2d3d7a] text-white transition-all cursor-pointer"
                    >
                        Try again
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/')}
                        className="flex-1 py-4 rounded-xl font-bold text-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-all cursor-pointer"
                    >
                        Homepage
                    </button>
                </div>
            </div>
        </div>
    );
}
