import mongoose, { Document, Model, Schema, Types } from "mongoose";
type Rating = "G" | "PG" | "R";
export interface IMoviesShelf<T> extends Document {
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

const moviesShelf = new Schema<IMoviesShelf<string | number>>({
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

const MoviesShelf: Model<IMoviesShelf<string | number>> = mongoose.model<
  IMoviesShelf<string | number>
>("MoviesShelf", moviesShelf);

export default MoviesShelf;
