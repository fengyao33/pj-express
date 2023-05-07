import { Schema, model, connect, Document } from "mongoose";
import TicketType from "./ticketTypes.model";

export interface ISeat {
  x: number;
  y: number;
  col: number;
  row: number;
  status: number;
}

export interface IRoom {
  name: string;
  xCount: number;
  yCount: number;
  seats: ISeat[];
}

interface ITheater extends Document {
  name: string;
  address: string;
  phone: string;
  rooms: IRoom[];
  introduction: string;
  trafficAdvice: string[];
  ticketTypeInfoIds: Schema.Types.ObjectId[];
}

export const seatSchema = new Schema<ISeat>(
  {
    x: { type: Number, required: [true, "請輸入 x 座標"] },
    y: { type: Number, required: [true, "請輸入 y 座標"] },
    col: { type: Number, required: [true, "請輸入第幾列(y)"] },
    row: { type: Number, required: [true, "請輸入第幾行(x)"] },
    status: {
      type: Number,
      required: [true, "請輸入座位狀態"],
      enum: [0, 2, 3],
    },
  },
  { _id: false }
);

export const roomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: [true, "請輸入影廳名稱欄位:name"],
      unique: true,
      validate: {
        validator: (name: string) => /^\d+廳$/.test(name),
        message: '影廳名稱必須為 "數字+廳" 的格式',
      },
    },
    xCount: { type: Number, required: [true, "請輸入 x 軸座位總數"] },
    yCount: { type: Number, required: [true, "請輸入 y 軸座位總數"] },
    seats: { type: [seatSchema], required: [true, "請輸入座位資訊"] },
  },
  { _id: false }
);

const theaterSchema = new Schema<ITheater>(
  {
    name: { type: String, required: [true, "電影院名稱欄位:name 未輸入"] },
    address: { type: String, required: [true, "地址欄位:address 未輸入"] },
    phone: { type: String, required: [true, "電話欄位:phone 未輸入"] },
    rooms: { type: [roomSchema], required: [true, "放映廳欄位:rooms 未輸入"] },
    introduction: {
      type: String,
      required: [true, "簡介欄位:introduction 未輸入"],
    },
    trafficAdvice: {
      type: [String],
      required: [true, "交通指南欄位:trafficAdvice 未輸入"],
    },
    ticketTypeInfoIds: [
      {
        type: Schema.Types.ObjectId,
        required: [true, "票價資訊欄位:ticketTypeInfoIds 未輸入"],
        ref: TicketType.collection.name,
      },
    ],
  },
  {
    versionKey: false,
    collection: "theaters",
    timestamps: true,
  }
);
const Theater = model<ITheater>("theaters", theaterSchema);

export default Theater;
