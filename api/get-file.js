import { list } from '@vercel/blob';

export default async function handler(req, res) {
  try {
    const { blobs } = await list();
    
    // Get the most recently uploaded file
    const latestFile = blobs.sort((a, b) => 
      new Date(b.uploadedAt) - new Date(a.uploadedAt)
    )[0];

    if (latestFile) {
      res.status(200).json({ 
        success: true, 
        url: latestFile.url,
        filename: latestFile.pathname,
        size: latestFile.size,
        uploadedAt: latestFile.uploadedAt
      });
    } else {
      res.status(200).json({ 
        success: true, 
        exists: false 
      });
    }
  } catch (error) {
    console.error('Get file error:', error);
    res.status(500).json({ error: error.message });
  }
}