import { Schema, Document, model } from 'mongoose';
import { ISeat, seatSchema } from './seats.model';
import TicketType from './ticketTypes.model';

export interface IRoom extends Document {
  name: string,
  enable: boolean,
  seats: ISeat[],
  ticketTypeIds: Schema.Types.ObjectId[],
  type: string,
  times: string[]
}

export const roomSchema = new Schema<IRoom>({
  name: {
    type: String,
    required: [true, '影廳名稱不可為空'],
  },
  seats: { type: [seatSchema], required: [true, '請選擇座位表格式'] },
  ticketTypeIds: {
    type: [Schema.Types.ObjectId],
    required: [true, '票價資訊欄位不可為空'],
    ref: TicketType.modelName,
  },
  enable: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    required: [true, '類型名稱不可為空']
  },
  times: Array
});

export const Room = model<IRoom>("rooms", roomSchema);