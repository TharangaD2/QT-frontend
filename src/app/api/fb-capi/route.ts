import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const PIXEL_ID = process.env.FB_PIXEL_ID;
    const ACCESS_TOKEN = process.env.FB_CAPI_TOKEN;

    if (!PIXEL_ID || !ACCESS_TOKEN) {
        console.error('FB_PIXEL_ID or FB_CAPI_TOKEN is missing in environment variables');
        return NextResponse.json({ error: 'Missing configuration' }, { status: 500 });
    }

    try {
        const payload = await request.json();
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
        const userAgent = request.headers.get('user-agent') || '';

        // Augment data with client info if it's not already there
        const augmentedData = payload.data.map((event: any) => ({
            ...event,
            user_data: {
                ...event.user_data,
                client_ip_address: event.user_data.client_ip_address || ip,
                client_user_agent: event.user_data.client_user_agent || userAgent,
            }
        }));

        console.log('Sending to Meta CAPI:', JSON.stringify({
            data: augmentedData,
            test_event_code: payload.test_event_code,
        }, null, 2));

        const response = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: augmentedData,
                access_token: ACCESS_TOKEN,
                test_event_code: payload.test_event_code || undefined,
            }),
        });

        const result = await response.json();
        console.log('Meta CAPI Response Status:', response.status);
        console.log('Meta CAPI Response Body:', JSON.stringify(result, null, 2));

        if (!response.ok) {
            return NextResponse.json(result, { status: response.status });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Internal Server Error in FB-CAPI:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
