import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const response = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'form@honeyprovisions.com',
      to: process.env.TO_EMAIL || 'honeyprovisions@gmail.com',
      subject: 'New Product Profile Submission',
      text: Object.entries(body)
        .map(([key, val]) => `${key}: ${val}`)
        .join('\n'),
    });

    return NextResponse.json({ status: 'success', response });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ status: 'error', message: error }, { status: 500 });
  }
}
