import { Schema, model } from 'mongoose';

interface IUser {
  email: string;
  password: string;
  passwordCheck: string
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, '請輸入您的Email'],
    unique: true,
    lowercase: true,

  },
  password: { type: String, required: [true, '請輸入您的密碼'], minlength: 8, select: false },
  passwordCheck: { type: String, required: false }
}, {
  versionKey: false,
  collection: 'users',
  timestamps: true,
});

const User = model<IUser>('users', userSchema);

export default User;