import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Generate a signed upload URL using put with a placeholder
    // This returns a URL the client can PUT to directly
    const { url } = await put('app.zip', 'placeholder', {
      access: 'public',
      contentType: 'application/zip',
      addRandomSuffix: false,
    });

    res.status(200).json({ 
      success: true, 
      uploadUrl: url 
    });
  } catch (error) {
    console.error('Signed URL error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}