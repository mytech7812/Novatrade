import { handleUpload } from '@vercel/blob/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const jsonResponse = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: ['application/zip'],
          addRandomSuffix: false,
          tokenPayload: JSON.stringify({ pathname }),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('Upload completed:', blob.url);
      },
    });

    res.status(200).json(jsonResponse);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(400).json({ error: error.message });
  }
}