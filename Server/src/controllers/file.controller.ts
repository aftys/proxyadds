import { GridFSFile } from '../models/file.model';
import { Request, Response } from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import { ICampaign, default as Campaign } from '../models/campaign.model';
import SingleFile from '../models/singlefile.model';


const conn = mongoose.connection;
let gridfs;
conn.once('open', () => {
    gridfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
});
const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
  
  }
export const uploadFile = async (req: Request, res: Response) => {
    try {
    //     const file = new SingleFile({
    //       fileName: req.file.originalname,
    //       filePath: req.file.path,
    //       fileType: req.file.mimetype,
    //       fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
    //   })
    //     const savedFile = await file.save();
      // res.status(201).send('File Uploaded Successfully');
      
        const { name, budget_max, begin_date, end_date, display_hours, status, url, advertiser_id } = req.body;
        const newCampaign: ICampaign = new Campaign({
          name,
          budget_max,
          begin_date,
          end_date,
          file: req.file.path,
          display_hours,
          status,
          url,
          advertiser_id,
          deleted: false,
        });
        const savedCampaign = await newCampaign.save();
        res.status(201).json(savedCampaign);
      } catch (error) {
        res.status(500).json({ message: 'Error creating campaign' });
        console.log(error);
      }
};

export const getAllFiles = async (req: Request, res: Response) => {
    try {
        const campaigns: ICampaign[] = await Campaign.find({ deleted: false });
        res.json(campaigns);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching campaigns' });
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
