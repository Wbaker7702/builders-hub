import { generate6DigitCode } from '@/lib/auth/authOptions';
import { prisma } from '@/prisma/prisma';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendOTP(email: string) {
  const code = generate6DigitCode();
  
  // Invalidate previous tokens for this email to prevent accumulation and ensure only the latest is valid
  try {
    await prisma.verificationToken.deleteMany({
        where: { identifier: email }
    });
  } catch (e) {
      console.warn("Failed to delete old tokens", e);
  }

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: code,
      expires: new Date(Date.now() + 3 * 60 * 1000),
    }
  });

  // Audit Log (Best effort)
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
        await prisma.consoleLog.create({
            data: {
                user_id: user.id,
                status: 'info',
                action_path: 'auth/send-otp',
                data: { email }
            }
        });
    }
  } catch (e) {
      // Ignore logging errors to not block flow
      console.error("Audit log failed", e);
  }

  const from = {
    email: process.env.EMAIL_FROM as string,
    name: "Avalanche Builder's Hub"
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('\n' + '='.repeat(50));
    console.log('📧 \x1b[36m%s\x1b[0m', 'OTP EMAIL (DEVELOPMENT MODE)');
    console.log('='.repeat(50));
    console.log('📬 To: \x1b[33m%s\x1b[0m', email);
    console.log('🔑 Code: \x1b[1m\x1b[32m%s\x1b[0m', code);
    console.log('⏰ Expires: \x1b[31m%s\x1b[0m', '3 minutes');
    console.log('='.repeat(50) + '\n');
    return;
  }

  const msg = {
    to: email,
    from: from,
    subject: 'Verify Your Account',
    text: `Your verification code is: ${code}. It expires in 3 minutes.`,
    html: `
    <div style="background-color: #18181B; color: white; font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border-radius: 8px; border: 1px solid #EF4444; text-align: center;">
      <h2 style="color: white; font-size: 20px; margin-bottom: 16px;"> Verify Your Account</h2>
      
      <div style="background-color: #27272A; border: 1px solid #EF4444; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <p style="font-size: 16px; color: #F87171; margin-bottom: 10px;">Use this code to verify your account:</p>
        <p style="font-size: 24px; font-weight: bold; color: #EF4444; margin-bottom: 20px;">${code}</p>
        <p style="font-size: 14px; color: #D1D5DB;">This code expires in <strong>3 minutes</strong>.</p>
      </div>

      <p style="font-size: 12px; color: #A1A1AA;">If you did not request this, you can ignore this email.</p>

      <div style="margin-top: 20px;">
        <img src="https://build.avax.network/logo-white.png" alt="Company Logo" style="max-width: 120px; margin-bottom: 10px;">
        <p style="font-size: 12px; color: #A1A1AA;">Avalanche Builder's Hub © 2025</p>
      </div>
    </div>
  `,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    throw new Error(`Error sending email: \n${error}`);
  }
}
