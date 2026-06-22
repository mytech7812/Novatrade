import { list } from '@vercel/blob';

export default async function handler(req, res) {
  try {
    // List all files in the blob storage
    const { blobs } = await list();
    
    // Find the app.zip file
    const appFile = blobs.find(blob => blob.pathname === 'app.zip');
    
    if (appFile) {
      return res.status(200).json({
        success: true,
        url: appFile.url,
        exists: true,
        size: appFile.size,
        uploadedAt: appFile.uploadedAt,
        filename: 'app.zip'
      });
    } else {
      return res.status(200).json({
        success: true,
        exists: false,
        message: 'No file uploaded yet'
      });
    }
  } catch (error) {
    console.error('Get file error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to get file info'
    });
  }
}