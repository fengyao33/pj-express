import mongoose, { Document, Model, Schema, Types } from "mongoose";
type Rating = "G" | "PG" | "R";
interface IMoviesShelf<T> extends Document {
  name: String;
  name_en: String;
  rating: Rating;
  // theater: Types.ObjectId,
  director: String;
  cast: Array<T>;
  duration: String;
  release_date: String;
  poster: String;
  trailer: String;
  synopsis: String;
  genre: String;
}

const moviesShelf = new Schema<IMoviesShelf<string | number>>({
  name: { type: String, required: true },
  name_en: { type: String, required: true },
  rating: { type: String, enum: ["G", "PG", "R"] },
  // theater: { type:  mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
  director: { type: String, required: true },
  cast: { type: Array<String>, required: true },
  duration: { type: String, required: true },
  release_date: { type: String, required: true },
  poster: { type: String, required: true },
  trailer: { type: String, required: true },
  story: { type: String, required: true },
  genre: { type: String, required: true },
});

const MoviesShelf: Model<IMoviesShelf<string | number>> = mongoose.model<
  IMoviesShelf<string | number>
>("MoviesShelf", moviesShelf);

export default MoviesShelf;
