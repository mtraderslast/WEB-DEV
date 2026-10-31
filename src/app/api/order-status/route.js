import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const orderId = request.nextUrl.searchParams.get('orderId');
        const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

        if (!orderId) {
            return NextResponse.json(
                { success: false, message: 'orderId is required' },
                { status: 400 }
            );
        }

        const response = await fetch(`${BACKEND_URL}/api/orders/${orderId}/status`, {
            cache: 'no-store',
        });
        const data = await response.json();

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Order status proxy error:', error);
        return NextResponse.json(
            { success: false, message: 'Could not check payment status' },
            { status: 500 }
        );
    }
}
