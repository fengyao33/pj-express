import { Schema, model, connect, Document, Date } from "mongoose";
import Theater, { IRoom, ISeat, roomSchema, seatSchema } from "./theaters.model";
import TicketType from "./ticketTypes.model";
import MoviesShelf from "./moviesshelf.model";

export interface ISession extends Document {
  datetime: Date,
  theaterId: Schema.Types.ObjectId,
  roomInfo: IRoom,
  movieId: Schema.Types.ObjectId,
  ticketTypeIds: Schema.Types.ObjectId[],
  seats:ISeat[]
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

const sessionSchema = new Schema<ISession>(
  {
    datetime: {
      type: Date,
      required: [true, "請輸入電影開演時間欄位:datetime"],
    },
    theaterId: {
      type: Schema.Types.ObjectId,
      required: [true, "請輸入影城id欄位:theaterId"],
      ref: Theater.collection.name
    },
    roomInfo: {
      type: Schema.Types.ObjectId,
      required: [true, "請輸入影廳id欄位:roomInfo"],
      ref: Theater.collection.name
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
        ref: TicketType.collection.name,
      },
    ],
    seats:[
      {
        type:seatSchemaForSession,
        required: [true, "座位結構欄位未輸入"],
      }
    ]
  },
  {
    versionKey: false,
    collection: "sessions",
    timestamps: true,
  }
);

const Session = model<ISession>("sessions", sessionSchema);

export default Session;
