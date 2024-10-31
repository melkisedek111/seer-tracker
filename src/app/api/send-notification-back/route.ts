import { sendNotificationBackAction } from '@/app/actions/notification.actions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const data = await request.json();
    const response = await sendNotificationBackAction(data);
    return NextResponse.json(response);
}