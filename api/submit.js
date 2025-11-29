import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const N8N_WEBHOOK_URL = process.env.N8N_SECRET_WEBHOOK_URL; // Not exposed to client

  if (!N8N_WEBHOOK_URL) {
    return res.status(500).json({ error: 'Server Configuration Error' });
  }

  try {
    // Forward the request to n8n
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Optional: Add a secret header that your n8n workflow checks
        'X-Secret-Auth': process.env.N8N_AUTH_TOKEN 
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to process request' });
  }
}

