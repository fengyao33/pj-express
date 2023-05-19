import { Schema, model, Document } from 'mongoose';
import { IRoom, roomSchema } from './rooms.model';

export interface ITheater extends Document {
  name: string;
  address: string;
  phone: number;
  img: string;
  rooms: IRoom[];
  description: string;
  traffic: string;
  enable: boolean;
}

const theaterSchema = new Schema<ITheater>(
  {
    name: { type: String, required: [true, '影城名稱不可為空'], unique: true },
    address: { type: String, required: [true, '地址欄位不可為空'] },
    phone: { type: Number, required: [true, '電話欄位不可為空'] },
    rooms: { type: [roomSchema], required: false },
    description: {
      type: String,
      required: [true, '描述欄位不可為空'],
    },
    traffic: {
      type: String,
      required: [true, '交通欄位不可為空'],
    },
    enable: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    collection: 'theaters',
    timestamps: true,
  }
);

const Theater = model<ITheater>('theaters', theaterSchema);

export default Theater;
