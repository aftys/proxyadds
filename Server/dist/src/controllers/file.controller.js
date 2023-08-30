"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = exports.getAllFiles = exports.uploadFile = void 0;
const file_model_1 = require("../models/file.model");
const mongoose_1 = __importDefault(require("mongoose"));
const campaign_model_1 = __importDefault(require("../models/campaign.model"));
const conn = mongoose_1.default.connection;
let gridfs;
conn.once('open', () => {
    gridfs = new mongoose_1.default.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
});
const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
};
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //     const file = new SingleFile({
        //       fileName: req.file.originalname,
        //       filePath: req.file.path,
        //       fileType: req.file.mimetype,
        //       fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
        //   })
        //     const savedFile = await file.save();
        // res.status(201).send('File Uploaded Successfully');
        // const { name, budget_max, begin_date, end_date, display_hours, status, url, advertiser_id } = req.body;
        // const newCampaign: ICampaign = new Campaign({
        //   name,
        //   budget_max,
        //   begin_date,
        //   end_date,
        //   file: req.file.path,
        //   display_hours,
        //   status,
        //   url,
        //   advertiser_id,
        //   deleted: false,
        // });
        // const savedCampaign = await newCampaign.save();
        // res.status(201).json(savedCampaign);
        console.log(req.file.originalname);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating campaign' });
        console.log(error);
    }
});
exports.uploadFile = uploadFile;
const getAllFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const campaigns = yield campaign_model_1.default.find({ deleted: false });
        res.json(campaigns);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching campaigns' });
    }
});
exports.getAllFiles = getAllFiles;
const downloadFile = (req, res) => {
    const fileId = req.params.id;
    file_model_1.GridFSFile.findById(fileId)
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
exports.downloadFile = downloadFile;
