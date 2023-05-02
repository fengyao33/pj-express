import mongoose, { Document, Model, Schema, Types } from 'mongoose'
type Rating = 'G' | 'PG' | 'R';
interface IMoviesShelf<T> extends Document {
    canme: String,
    ename: String,
    rating: Rating,
    // theater: Types.ObjectId,
    director: String,
    actor: Array<T>,
    Length: String,
    comeout: String,
    premiere: String,
    trailer: String,
    story: String,
}

const moviesShelf = new Schema<IMoviesShelf<string|number>>({
    canme: { type: String, required: true },
    ename: { type: String, required: true },
    rating: { type: String, enum: ['G', 'PG', 'R']},
    // theater: { type:  mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
    director: { type: String, required: true },
    actor: { type:  Array<String>, required: true },
    Length: { type: String, required: true },
    comeout: { type: String, required: true },
    premiere: { type: String, required: true },
    trailer: { type: String, required: true },
    story: { type: String, required: true },
})


const MoviesShelf: Model<IMoviesShelf<string|number>> = mongoose.model<IMoviesShelf<string|number>>('MoviesShelf', moviesShelf);

export default MoviesShelf