import mongoose, { Document, Model, Schema, Types } from "mongoose";
type Rating = "G" | "PG" | "R";
export interface IMovies<T> extends Document {
  isAvaliableL: Boolean,
  imgUrl: String,
  videoUrl: String,
  movieCName: String;
  movieEName: String;
  director: String;
  cast: Array<T>;
  inTheatersTime: Date;
  outOfTheatersTime: Date;
  movieTime: String;
  rating: Rating;
  synopsis: String;
}

const movies = new Schema<IMovies<string | number>>({
  isAvaliableL: {type: Boolean, required: true },
  imgUrl: { type: String, required: true },
  videoUrl: { type: String, required: true },
  movieCName: { type: String, required: true },
  movieEName: { type: String, required: true },
  director: { type: String, required: true },
  cast: { type: Array<String>, required: true },
  inTheatersTime: { type: Date, required: true },
  outOfTheatersTime: { type: Date, required: true },
  movieTime: { type: String, required: true },
  rating: { type: String, enum: ["G", "PG", "R"] },
  synopsis: { type: String, required: true },
});

const Movies: Model<IMovies<string | number>> = mongoose.model<
IMovies<string | number>
>("Movies", movies);

export default Movies
