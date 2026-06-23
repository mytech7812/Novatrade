import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get filename from the request (multipart form data)
    const contentType = req.headers['content-type'] || '';
    const isMultipart = contentType.includes('multipart/form-data');

    let filename = 'Ai_trading_App.zip'; // default
    let fileBuffer = null;

    if (isMultipart) {
      // Parse multipart form data manually or use a library
      // For simplicity, we'll use the filename from the URL query or headers
      const url = new URL(req.url, `http://${req.headers.host}`);
      filename = url.searchParams.get('filename') || 'Ai_trading_App.zip';
      
      // Read raw body
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      fileBuffer = Buffer.concat(chunks);
    } else {
      // Simple JSON request with filename
      const body = JSON.parse(req.body);
      filename = body.filename || 'Ai_trading_App.zip';
      
      // Read raw body
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      fileBuffer = Buffer.concat(chunks);
    }

    // Upload to Vercel Blob with the provided filename
    const blob = await put(filename, fileBuffer, {
      access: 'public',
      contentType: 'application/zip',
      addRandomSuffix: false,
    });

    res.status(200).json({ 
      success: true, 
      url: blob.url,
      filename: filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};