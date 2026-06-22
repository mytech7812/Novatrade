import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Stream the request body directly to Vercel Blob
    const blob = await put('app.zip', req, {
      access: 'public',
      contentType: 'application/zip',
      addRandomSuffix: false,
    });

    res.status(200).json({ success: true, url: blob.url });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
}

export const config = {
  api: {
    bodyParser: false, // Required to stream raw request
  },
};