import { createSignedUrl } from '@vercel/blob/server';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename } = req.body;

    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' });
    }

    // Generate a signed URL for client upload
    const signedUrl = await createSignedUrl(filename, {
      access: 'public',
      contentType: 'application/zip',
    });

    res.status(200).json({
      success: true,
      uploadUrl: signedUrl,
    });
  } catch (error) {
    console.error('Signed URL error:', error);
    res.status(500).json({ error: error.message });
  }
}