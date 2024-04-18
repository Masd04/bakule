// pages/api/sendEmail.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import emailjs from 'emailjs-com';

// Ensure that you have added your private key to your environment variables
// and that it is not exposed to the client side of your application.
if (typeof process.env.EMAILJS_PUBLIC_KEY === 'string') {
    emailjs.init(process.env.EMAILJS_PUBLIC_KEY);
  } else {
    console.error('The EMAILJS_PUBLIC_KEY environment variable is not defined.');
  } // Your EmailJS user ID.

  const SERVICE_ID = process.env.SERVICE_ID!;
  const TEMPLATE_ID = process.env.TEMPLATE_ID!;

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { user_id, user_name, server_name } = req.body;

  const emailParams = {
    user_id,
    user_name,
    server_name,
  };

  try {
    // This is assuming you have configured a service and template on EmailJS
    // that uses these parameters and you've stored your template ID and service ID
    // in your environment variables.
    const result = await emailjs.send(
      SERVICE_ID, 
      TEMPLATE_ID, 
      emailParams
    );
    
    res.status(200).json(result);
    } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'An unknown error occurred.' });
        }
      }
    }


/* // pages/api/sendEmail.js
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerAuthSession } from "../../server/auth";
import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.SERVICE_ID as string;
const TEMPLATE_ID = process.env.TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY as string;

interface RequestBody {
    userId: string;
    userName: string;
    service_id: string;
    template_id: string;
  }

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getServerAuthSession({ req, res });
    if (!session || !session.user) {
      return res.status(401).json({ message: 'You must be signed in to submit a rating.' });
    }
    const userId = session.user.id;
    const userName = session.user.name;
    const { userId, userName} = req.body as RequestBody

    // Initialize emailjs with your server-side API key
    emailjs.init(EMAILJS_PUBLIC_KEY);

    
    

    // Construct the email parameters
    const emailParams = {
      ...req.body,
      userId,
      userName,
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
    };

    // Send the email using emailjs
    return emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams)
      .then((emailResponse) => {
        res.status(200).json({ data: emailResponse });
      })
      .catch((error) => {
        res.status(500).json({ error: error.text });
      });
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
} */