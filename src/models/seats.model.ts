import { Schema, model, Document } from 'mongoose';

export interface ISeat extends Document {
  x: number;
  y: number;
  col: number;
  row: number;
  situation: string;
  isSold: boolean;
}

export const seatSchema = new Schema<ISeat>({
  x: { type: Number, required: [true, 'x 座標不可為空'] },
  y: { type: Number, required: [true, 'y 座標不可為空'] },
  col: { type: Number, required: [true, '座位行不可為空'] },
  row: { type: Number, required: [true, '座位列不可為空'] },
  situation: {
    type: String,
    default: '可販售',
    enum: ['可販售', '不可販售', '保留位'],
  },
  isSold: {
    type: Boolean,
    default: false,
  },
});

export interface ISeatExample {
  name: string;
  seatTable: ISeat[];
}

export const seatExampleSchema = new Schema<ISeatExample>({
  name: { type: String, required: true },
  seatTable: {
    type: [seatSchema],
    required: true,
  },
});

export const SeatExamples = model<ISeatExample>('seatExamples', seatExampleSchema);
