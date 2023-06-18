import { Schema, model, connect, Document, Date } from "mongoose";
import { ISeat, seatSchema } from "./seats.model";
import TicketType from "./ticketTypes.model";
import MoviesShelf from "./movies.model";
import Theater from "./theaters.model";
import { Room } from "./rooms.model";

export interface ISession extends Document {
  datetime: Date,
  theaterId: Schema.Types.ObjectId,
  roomInfo: Schema.Types.ObjectId,
  movieId: Schema.Types.ObjectId,
  ticketTypeIds: Schema.Types.ObjectId[],
  seats: ISeat[],
  startTime: Number
}

const sessionSchema = new Schema<ISession>({
  datetime: {
    type: Date,
    required: [true, "請輸入電影開演時間欄位:datetime"],
  },
  theaterId: {
    type: Schema.Types.ObjectId,
    required: [true, "請輸入影城id欄位:theaterId"],
    ref: Theater.modelName
  },
  roomInfo: {
    type: Schema.Types.ObjectId,
    required: [true, "請輸入影廳資訊Id欄位:roomInfo"],
    ref: Room.modelName
  },
  movieId: {
    type: Schema.Types.ObjectId,
    required: [true, "請輸入電影id欄位:movieId"],
    ref: MoviesShelf.modelName
  },
  ticketTypeIds: [
    {
      type: Schema.Types.ObjectId,
      required: [true, "票種資訊id欄位:ticketTypeId 未輸入"],
      ref: TicketType.modelName,
    },
  ],
  seats: [
    {
      type: seatSchema,
      required: [true, "seat欄位:seats 未輸入"]
    }
  ],
  startTime: {
    type: Number
  }
});

const Session = model<ISession>("sessions", sessionSchema);

export default Session;
