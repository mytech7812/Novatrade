import { handleUpload } from '@vercel/blob/client';

export default async function handler(req, res) {
  // 🔥 CRITICAL DEBUG: Check if token exists
  console.log('🔍 BLOB_READ_WRITE_TOKEN exists?', !!process.env.BLOB_READ_WRITE_TOKEN);
  console.log('🔍 Token prefix:', process.env.BLOB_READ_WRITE_TOKEN?.substring(0, 15));

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(500).json({ 
      error: 'BLOB_READ_WRITE_TOKEN is missing. Please set it in Vercel environment variables.' 
    });
  }

  try {
    const jsonResponse = await handleUpload({
      request: req,
      body: req.body,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: ['application/zip'],
          addRandomSuffix: false,
          tokenPayload: JSON.stringify({ pathname }),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('Upload complete:', blob.url);
      },
    });

    return res.status(200).json(jsonResponse);
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: error.message });
  }
}