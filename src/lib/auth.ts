import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
// If your Prisma file is located elsewhere, you can change the path
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS
  },
});

export const auth = betterAuth({
  
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),trustedOrigins:[process.env.APP_URL!],
    user:{
additionalFields:{
  role:{
    type:"string",
    defaultValue:"USER"
  },
  address:{
    type:"string"
  }
}
    },
     emailAndPassword: { 
    enabled: true, 
    autoSignIn:false,
    // requireEmailVerification:true
   
    
  },
   socialProviders: {
        google: { 
            accessType: "offline", 
            prompt: "select_account consent", 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
   emailVerification: {
    autoSignInAfterVerification: true,
    enabled:true,
    sendOnSignUp:true,
    sendVerificationEmail: async ( { user, url, token }, request) => {
      
  try{
 const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

const info = await transporter.sendMail({
  from: '"MediStore" <prisma@ethereal.email>',
  to: user.email,
  subject: "Verify Your Email Address",
  html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
      
      <tr>
        <td style="background:#2563eb; padding:20px; text-align:center; color:white;">
          <h1 style="margin:0;">MediStore</h1>
        </td>
      </tr>

      <tr>
        <td style="padding:30px;">
          <h2 style="margin-top:0; color:#333;">Verify Your Email Address</h2>
          <p style="color:#555; font-size:16px;">
            Hi ${user.name || "User"},
          </p>
          <p style="color:#555; font-size:16px;">
            Thank you for registering with MediStore. Please confirm your email address by clicking the button below.
          </p>

          <div style="text-align:center; margin:30px 0;">
            <a href="${verificationUrl}" 
               style="background:#2563eb; color:#ffffff; padding:14px 28px; text-decoration:none; border-radius:6px; font-size:16px; display:inline-block;">
               Verify Email
            </a>
          </div>

          <p style="color:#777; font-size:14px;">
            If the button doesn't work, copy and paste this link into your browser:
          </p>
          <p style="word-break:break-all; font-size:14px; color:#2563eb;">
            ${verificationUrl}
          </p>

          <p style="color:#999; font-size:13px; margin-top:30px;">
            This link will expire soon. If you did not create this account, please ignore this email.
          </p>
        </td>
      </tr>

      <tr>
        <td style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#888;">
          © ${new Date().getFullYear()} MediStore. All rights reserved.
        </td>
      </tr>

    </table>
  </body>
  </html>
  `,
});
  }catch(err){
  error:err
  throw err;
  }

    },
  },
});