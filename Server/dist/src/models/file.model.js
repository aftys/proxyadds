"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridFSFile = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define a schema for the GridFS files
const fileSchema = new mongoose_1.default.Schema({
    filename: String,
    contentType: String,
    length: Number,
    uploadDate: Date,
    aliases: [String],
    metadata: mongoose_1.default.Schema.Types.Mixed,
});
// Create a Mongoose model for GridFS files
exports.GridFSFile = mongoose_1.default.model('GridFSFile', fileSchema, 'fs.files');
