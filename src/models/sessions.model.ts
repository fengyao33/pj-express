import { Schema, model, connect, Document, Date } from "mongoose";
import { IRoom, ISeat, roomSchema, seatSchema } from "./theaters.model";
import TicketType, { ITicketType } from "./ticketTypes.model";

export interface ISession extends Document {
  datetime: Date;
  theaterId: Schema.Types.ObjectId;
  roomInfo: IRoom;
  movieId: Schema.Types.ObjectId;
  ticketTypeIds: Schema.Types.ObjectId[];
}

const seatSchemaForSession = new Schema<ISeat>(
  {
    ...seatSchema.obj,
    status: {
      type: Number,
      required: [true, "請輸入座位狀態"],
      enum: [0, 1, 2, 3],
    },
  },
  { _id: false }
);

const roomSchemaForSession = new Schema<IRoom>(
  {
    ...roomSchema.obj,
    seats: { type: [seatSchemaForSession], required: [true, "請輸入座位資訊"] },
  },
  { _id: false }
);

const sessionSchema = new Schema<ISession>(
  {
    datetime: {
      type: Date,
      required: [true, "請輸入電影開演時間欄位:datetime"],
    },
    theaterId: {
      type: Schema.Types.ObjectId,
      required: [true, "請輸入影城id欄位:theaterId"],
    },
    roomInfo: {
      type: roomSchemaForSession,
      required: [true, "請輸入影廳資訊欄位:roomInfo.name"],
    },
    movieId: {
      type: Schema.Types.ObjectId,
      required: [true, "請輸入電影id欄位:movieId"],
    },
    ticketTypeIds: [
      {
        type: Schema.Types.ObjectId,
        required: [true, "票種資訊id欄位:ticketTypeId 未輸入"],
        ref: TicketType.collection.name,
      },
    ],
  },
  {
    versionKey: false,
    collection: "sessions",
    timestamps: true,
  }
);

const Session = model<ISession>("sessions", sessionSchema);

export default Session;
