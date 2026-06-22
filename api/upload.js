import { put } from '@vercel/blob';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the file from the request (multipart form data)
    const file = req.body.file;
    const filename = 'app.zip';
    
    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: false, // Keeps the filename as "app.zip"
    });

    // Return the public URL
    return res.status(200).json({
      success: true,
      url: blob.url,
      message: 'File uploaded successfully! Users can now download it.',
      downloadUrl: blob.url
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Upload failed'
    });
  }
}

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};