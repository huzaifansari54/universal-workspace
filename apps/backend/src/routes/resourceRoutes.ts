import express from 'express';
import multer from 'multer';
import path from 'path';
import prisma from '../lib/prisma';
import { ResourceType } from '@universal-workspace/shared-types';

const router = express.Router();

/**
 * Multer is a middleware for handling multipart/form-data (file uploads).
 * Files are temporarily stored in the 'uploads/' directory.
 */
const upload = multer({ dest: 'uploads/' });

/**
 * Endpoint to upload a new resource (file).
 * The UI sends a file with the key 'file'.
 */
router.post('/upload', upload.single('file'), async (req, res) => {
  // If no file was provided in the request, return a 400 error.
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    // We save the file's information into our database.
    // This creates a "Resource" that can then be used as input for Actions.
    const resource = await prisma.resource.create({
      data: {
        name: req.file.originalname, // Original name (e.g. "my-video.mp4")
        type: determineType(req.file.originalname), // Determine if it's a VIDEO, IMAGE, etc.
        storage_path: req.file.path, // Where it is stored on the server's disk
        metadata: {
          size: req.file.size,
          mimetype: req.file.mimetype,
        },
      },
    });

    res.json(resource);
  } catch (error: any) {
    console.error('[Resources] Upload failed:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Helper function to map file extensions to our internal ResourceType enum.
 */
function determineType(filename: string): ResourceType {
  const ext = path.extname(filename).toLowerCase();
  
  if (['.mp4', '.mov', '.avi'].includes(ext)) return ResourceType.VIDEO;
  if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) return ResourceType.IMAGE;
  if (['.pdf', '.doc', '.docx', '.txt', '.csv'].includes(ext)) return ResourceType.DOCUMENT;
  
  // Default to TEXT for unknown extensions
  return ResourceType.TEXT;
}

export default router;
