import { Schema, model, connect, Document } from "mongoose";
import Movies from "./movies.model";
import { Room } from "./rooms.model";



export interface ITimeSessions extends Document {
  movie: Schema.Types.ObjectId,
  showTime: Date,
  rooms: Schema.Types.ObjectId[],
  session: Schema.Types.ObjectId
}
export const timeSessionsSchema = new Schema<ITimeSessions>({
  movie: {
    type:  Schema.Types.ObjectId,
    ref: 'movies'
  },
  showTime: {
    type:  Date,
  },
  rooms: {
    type:  [Schema.Types.ObjectId],
    ref: 'Room'
  },
  session: {
    type:  Schema.Types.ObjectId,
    ref: 'sessionhs'
  },
});

const TimeSessions = model<ITimeSessions>("timeSessions", timeSessionsSchema);

export default TimeSessions;
