import { GridFSFile } from '../models/file.model';
import { Request, Response } from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import multer from 'multer';


const conn = mongoose.connection;
let gridfs;
conn.once('open', () => {
  gridfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'fs'
  });
});

export const uploadFile = async (file : any) => {
//   const file = req.file;
  const filename = "file.originalname";

  console.log('post');
  // Upload the file to GridFS
  const uploadStream = gridfs.openUploadStream(filename, { contentType: file.mimetype });
  const readStream = fs.createReadStream(file.path);
  readStream.pipe(uploadStream);

  uploadStream.on('error', (error) => {
    console.error(error);
    // res.status(500).json({ message: 'File upload failed' });
    throw error;
  });

  uploadStream.on('finish', () => {
    const fileId = (uploadStream as any).id;
    // const response = {
    //   message: 'File uploaded successfully',
    //   filename: filename,
    //   fileId: fileId
    // };
    // res.status(200).json(response);
    return fileId;
  });
};

export const getAllFiles = async (req: Request, res: Response) => {
  try {
    const files = await gridfs.find().toArray();
    if (files.length === 0) {
      return res.status(404).json({ message: 'No files found' });
    }
    return res.status(200).json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving files' });
  }
};

export const downloadFile = (req: Request, res: Response) => {
  const fileId = req.params.id;

  GridFSFile.findById(fileId)
    .exec()
    .then((file) => {
      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }

      // Set the appropriate response headers for download
      res.set({
        'Content-Type': file.contentType,
        'Content-Disposition': `attachment; filename="${file.filename}"`,
      });

      // Stream the file to the response
      const downloadStream = gridfs.openDownloadStream(file._id);
      downloadStream.pipe(res);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Error finding the file' });
    });
};
