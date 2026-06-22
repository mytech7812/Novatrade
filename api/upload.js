import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Generate a signed URL using put with a placeholder
    // The client will replace this placeholder with the actual file
    const { url } = await put('app.zip', 'placeholder', {
      access: 'public',
      contentType: 'application/zip',
      addRandomSuffix: false,
    });

    // Return the URL – the client library expects a "url" property
    res.status(200).json({ url });
  } catch (error) {
    console.error('Signed URL error:', error);
    res.status(500).json({ error: error.message });
  }
}