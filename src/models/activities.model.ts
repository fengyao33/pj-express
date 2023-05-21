import { Schema, model } from "mongoose";
interface IActivity {
  title: string;
  content: string;
  img: string;
  startDatetime: Date;
  endDatetime: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    title: {
      type: String,
      required: [true, "title不可為空"],
    },
    content: {
      type: String,
      required: [true, "content不可為空"],
    },
    img: {
      type: String,
    },
    startDatetime: {
      type: Date,
      required: [true, "startDatetime不可為空"]
    },
    endDatetime: {
      type: Date,
      required: [true, "startDatetime不可為空"]
    }
  },
  {
    versionKey: false,
    collection: "activities",
    timestamps: true,
  }
);
const Activity = model<IActivity>("activities", activitySchema);

export default Activity;
