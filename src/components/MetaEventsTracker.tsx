'use client';

import { useCallback } from 'react';

interface MetaEventData {
    event_name: string;
    event_time: number;
    action_source: string;
    user_data: {
        em?: string[];
        ph?: (string | null)[];
        // Add other user data fields as needed (fn, ln, etc.)
    };
    attribution_data?: {
        attribution_share: string;
    };
    custom_data?: {
        currency: string;
        value: string;
        [key: string]: any;
    };
    original_event_data?: {
        event_name: string;
        event_time: number;
    };
}

export const useMetaEvents = () => {
    const trackPurchase = useCallback(async (data: MetaEventData, testEventCode?: string) => {
        // 1. Browser-side tracking (Meta Pixel)
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', data.event_name, data.custom_data);
        }

        // 2. Server-side tracking (Meta Conversion API)
        try {
            const response = await fetch('/api/fb-capi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: [data],
                    test_event_code: testEventCode,
                }),
            });

            if (!response.ok) {
                let errorData;
                try {
                    const text = await response.text();
                    try {
                        errorData = JSON.parse(text);
                    } catch {
                        errorData = { message: text };
                    }
                } catch (e) {
                    errorData = { message: 'Could not read error response' };
                }
                console.error('CAPI Tracking Failed:', errorData);
            } else {
                console.log('CAPI Tracking Success');
            }
        } catch (error) {
            console.error('Error calling CAPI endpoint:', error);
        }
    }, []);

    return { trackPurchase };
};

// Component wrapper if needed for global context, but hook is usually sufficient.
export default function MetaEventsTracker() {
    return null; // This component doesn't render anything UI-wise
}
