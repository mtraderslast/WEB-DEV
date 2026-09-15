import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

        const response = await fetch(`${BACKEND_URL}/api/orders/create-payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            return NextResponse.json(
                { success: false, message: data.message || "Failed to create payment session" },
                { status: response.status || 400 }
            );
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error("Next.js Create Payment Proxy Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error in Frontend API" },
            { status: 500 }
        );
    }
}