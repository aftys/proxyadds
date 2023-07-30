import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IFile extends Document {
  fileName: string;
  fileType: string;
  fileSize: number;
  filePath: string;
  uploadDate: Date;
}

const fileSchema: Schema<IFile> = new Schema(
  {
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    filePath: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
  },
  { collection: 'files' }
);

const FileModel: Model<IFile> = mongoose.model<IFile>('File', fileSchema);

export default FileModel;