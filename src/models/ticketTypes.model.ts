import { Schema, model, connect, Document } from 'mongoose';

export interface ITicketType extends Document{
  type: string,
  name: string,
  price: number,
  content: string,
  ticketCount: number
}
export const ticketTypeSchema = new Schema<ITicketType>({
  type: {
    type: String,
    required: [true, '票種欄位:type 未輸入'],
    enum: ["套票", "電影票", "團體劃位"]
  },
  name: {
    type: String, required: [true, '票名欄位:name 未輸入']
  },
  price: {
    type: Number, required: [true, '價格欄位:price 未輸入']
  },
  content: {
    type: String, required: [true, '內容欄位:content 未輸入']
  },
  ticketCount: {
    type: Number, required: [true, '票的數量欄位:ticketCount 未輸入']
  }
}, {
  versionKey: false,
  collection: 'ticketTypes',
  timestamps: true
});

const TicketType = model<ITicketType>('ticketTypes', ticketTypeSchema);

export default TicketType;