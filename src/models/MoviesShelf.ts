import mongoose, { Document, Model, Schema } from 'mongoose'

interface IMoviesShelf<T> extends Document {
    // id: Number;
    time: String;
    // theater: Object;
    // room: Object;
    seatInfo: Array<T>;
    // movie: Object;
}

const moviesShelf = new Schema<IMoviesShelf<string|number>>({
    // id: { type: Number },
    time: { type: String, required: true },
    // theater: { type: Object },
    // room: { type: Object },
    seatInfo: { type: Array},
    // movie: { type: Object },
})


const MoviesShelf: Model<IMoviesShelf<string|number>> = mongoose.model<IMoviesShelf<string|number>>('MoviesShelf', moviesShelf);

export default MoviesShelf