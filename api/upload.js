import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename } = req.body;
    const fileToSave = filename || 'Ai_trading_App.zip';

    // Generate a signed URL for client-side upload
    const { url } = await put(fileToSave, 'placeholder', {
      access: 'public',
      contentType: 'application/zip',
      addRandomSuffix: false,
    });

    res.status(200).json({ 
      success: true, 
      uploadUrl: url,
      filename: fileToSave
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
}