// src\server\api\routers\emailRouter.ts

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import nodemailer from 'nodemailer';
import { ensureEnvVariable } from '../../../utils/envHelper';

  
export const emailRouter = createTRPCRouter({
  sendEmail: publicProcedure.input(z.object({
    serverName: z.string(),
    userId: z.string(),
  })).mutation(async ({ input, ctx }) => {

    const userProfile = await ctx.prisma.user.findUnique({
      where: { id: input.userId },
      select: { name: true, email: true }
    });

    if (!userProfile) {
      throw new Error("User profile not found.");
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: ensureEnvVariable('GMAIL_USER'),
          pass: ensureEnvVariable('GMAIL_PASS'),
        },
      });

      const mailOptions = {
        from: ensureEnvVariable('GMAIL_USER'),
        to: ensureEnvVariable('TARGET_EMAIL_ADDRESS'),
        subject: `${input.serverName} - addition request by ${userProfile.name}`,
        text: `User Name: ${userProfile.name}\nUser ID: ${input.userId}\nServer Name: ${input.serverName}`,
      };

      
      try {
        await transporter.sendMail(mailOptions);
        return { success: true };
      } catch (error) {
        console.error('Nodemailer send failed:', error);
        throw new Error("Failed to send email.");
      }
    }),
  });
