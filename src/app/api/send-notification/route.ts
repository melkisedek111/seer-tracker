import { sendNotificationAction } from '@/app/actions/notification.actions';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
    const data = await request.json();
    const response = await sendNotificationAction(data);
    return NextResponse.json(response);

}