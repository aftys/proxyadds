import mongoose from 'mongoose';

// Define a schema for the GridFS files
const fileSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  length: Number,
  uploadDate: Date,
  aliases: [String],
  metadata: mongoose.Schema.Types.Mixed,
});

// Create a Mongoose model for GridFS files
export const GridFSFile = mongoose.model('GridFSFile', fileSchema, 'fs.files');
