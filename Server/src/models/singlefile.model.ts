import mongoose, { Document, Schema } from "mongoose";

export interface ISingleFile extends Document {
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: number;

}
const singleFileSchema: Schema = new Schema({
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  fileSize: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model<ISingleFile>('SingleFile', singleFileSchema, 'singleFiles');
// export default mongoose.model<ISchedule>("Schedule", ScheduleSchema, "schedules");
