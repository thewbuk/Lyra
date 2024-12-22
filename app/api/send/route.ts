import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';
import { WelcomeEmail } from '@/components/emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'Cyclon <onboarding@cyclon.tv>',
      to: [email],
      subject: 'Welcome to Cyclon! 🎮',
      react: WelcomeEmail({ email }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}
