import { Schema, model, connect } from "mongoose";

interface AdminMemberInterface {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  bonus: number;
  enabled: boolean;
}
//後臺使用的member schema
const adminMemberSchema = new Schema<AdminMemberInterface>(
  {
    name: {
      type: String,
      required: [true, "請輸入您的Name"],
    },
    email: {
      type: String,
      required: [true, "請輸入您的Email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "請輸入您的密碼"],
      minlength: 8,
      select: false,
    },
    bonus: {
      type: Number,
      default: 0,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "users",
  }
);

const adminMember = model<AdminMemberInterface>(
  "adminMembers",
  adminMemberSchema,
  "users"
);

export default adminMember;
