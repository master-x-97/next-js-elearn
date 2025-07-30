import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import Email from '../../../emails/my-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { to, subject } = await request.json();
    
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [to],
      subject: subject,
      react: Email(),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}