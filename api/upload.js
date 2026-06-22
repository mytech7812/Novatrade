import { handleUpload } from '@vercel/blob/client';

export default async function handler(req, res) {
  try {
    // handleUpload automatically uses the signed upload flow
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
    console.error('Upload handler error:', error);
    return res.status(500).json({ error: error.message });
  }
}