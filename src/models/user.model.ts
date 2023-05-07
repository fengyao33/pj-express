import { Schema, model } from "mongoose";

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  birth: Date;
  mobile: string;
  sex: string;
  hobby: string[];
  bonus: string[];
  createdAt: Date;
  updatedAt: Date;
  enable: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: [true, "Email不可為空"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "密碼不可為空"],
      minlength: 8,
      select: false,
    },
    bonus: {
      type: [String],
      required: false,
    },
    sex: {
      type: String,
    },
    mobile: {
      type: String,
    },
    birth: {
      type: Date,
    },
    hobby: {
      type: [String],
      required: false,
    },
    enable: {
      type: Boolean,
    },
  },
  {
    versionKey: false,
    collection: "users",
    timestamps: true,
  }
);

const User = model<IUser>("users", userSchema);

export default User;
