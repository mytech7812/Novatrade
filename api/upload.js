import { put } from '@vercel/blob';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, contentType } = req.body;

    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' });
    }

    // Generate a signed URL for direct client upload
    const blob = await put(filename, {
      access: 'public',
      contentType: contentType || 'application/zip',
      addRandomSuffix: false,
    });

    // Return the upload URL and the blob URL
    return res.status(200).json({
      success: true,
      uploadUrl: blob.url,
      blobUrl: blob.url, // For public blob, the URL is the same
      message: 'Upload URL generated successfully'
    });
  } catch (error) {
    console.error('Upload URL generation error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate upload URL'
    });
  }
}