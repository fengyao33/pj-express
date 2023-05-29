import { Schema, model, connect, Document } from "mongoose";
import Movies from "./movies.model";
import { Room } from "./rooms.model";



export interface ITimeSessions extends Document {
  movie: Schema.Types.ObjectId,
  date: Date,
  rooms: Schema.Types.ObjectId[],
  sessionId: Schema.Types.ObjectId,
  theaterInfo: Schema.Types.ObjectId,
  showTimes: Date[]
}
export const timeSessionsSchema = new Schema<ITimeSessions>({
  movie: {
    type:  Schema.Types.ObjectId,
    ref: 'movies'
  },
  date: {
    type:  Date,
  },
  rooms: {
    type:  [Schema.Types.ObjectId],
    ref: 'Room'
  },
  sessionId: {
    type:  Schema.Types.ObjectId,
    ref: 'sessions'
  },
  theaterInfo: {
    type:  Schema.Types.ObjectId,
    ref: 'theaters'
  },
  showTimes: {
    type: [Date]
  }
});

const TimeSessions = model<ITimeSessions>("timeSessions", timeSessionsSchema);

export default TimeSessions;
