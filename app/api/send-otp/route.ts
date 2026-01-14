import { NextRequest, NextResponse } from 'next/server';
import { sendOTP } from '@/server/services/login';
import { rateLimit } from '@/lib/rateLimit';

async function handler(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    await sendOTP(email.toLowerCase());

    return NextResponse.json(
      { message: 'OTP sent correctly' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { error: 'Error sending verification code' },
      { status: 500 }
    );
  }
}

export const POST = rateLimit(handler, {
  windowMs: 10 * 60 * 1000, // 10 minutes
  maxRequests: 5, // 5 requests per IP
  identifier: async (req: NextRequest) => {
    return req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  }
});
