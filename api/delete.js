import { del } from '@vercel/blob';

export default async function handler(req, res) {
  // Only allow POST or DELETE requests
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the file URL from the request body
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ 
        success: false, 
        error: 'No URL provided' 
      });
    }
    
    // Delete from Vercel Blob
    await del(url);
    
    return res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Delete failed'
    });
  }
}