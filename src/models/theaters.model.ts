import { Schema, model, Document } from 'mongoose';
import { IRoom, roomSchema } from './rooms.model';

export interface ITheater extends Document {
  name: string;
  address: string;
  phone: String;
  img: string;
  mapUrl: string;
  rooms: IRoom[];
  description: string;
  traffic: string;
  enable: boolean;
  timeInfo:Schema.Types.ObjectId[]
}

const theaterSchema = new Schema<ITheater>({
  name: { type: String, required: [true, '影城名稱不可為空'], unique: true },
  address: { type: String, required: [true, '地址欄位不可為空'] },
  phone: { type: String, required: [true, '電話欄位不可為空'] },
  img: { type: String, required: [true, '圖片Url欄位不可為空'] },
  mapUrl: { type: String, required: [true, '地圖Url欄位不可為空'] },
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
  // 用於關聯電影場次
  timeInfo: {
    type: [Schema.Types.ObjectId],
    ref: 'Room'
  }
});

const Theater = model<ITheater>('theaters', theaterSchema);

export default Theater;
