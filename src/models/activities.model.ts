import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IActivities extends Document {
  createdAt: Date;
  updatedAt: Date;
  startDatetime: Date;
  endDatetime: Date;
  title: string;
  content: string;
  img: string
}

export const activities = new Schema<IActivities>({
  createdAt: {
    type: Date,
    required: [true, '時間必填'],
  },
  updatedAt: {
    type: Date,
  } ,
  startDatetime: {
    type: Date,
    required: [true, '開始時間未填'],
  },
  endDatetime: {
    type: Date,
    required: [true, '開始時間未填'],
  },
  title:{
    type: String,
    required: [true, '標題未填'],
  },
  content:{
    type: String,
    required: [true, '內容未填'],
  },
  img:{
    type: String,
  }
});

const Activities: Model<IActivities> = mongoose.model<
IActivities>("Activities", activities);

export default Activities;
