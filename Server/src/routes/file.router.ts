import express from 'express';
import { uploadFile, getAllFiles, downloadFile } from '../controllers/file.controller';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: '/tmp/' });

// Route for handling file upload
router.post('/', upload.single('file'), uploadFile);

// Route for fetching all uploaded files
router.get('/', getAllFiles);

// Route for downloading a specific file by ID
router.get('/:id', downloadFile);

export default router;
