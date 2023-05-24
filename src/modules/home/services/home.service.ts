import Activities, { IActivity } from '@models/activities.model';
import MoviesShelf, { IMovies } from '@models/movies.model'

export class HomeService {
  async findAll(): Promise<Object> {

    const today = new Date();
    const dateLimit = new Date();
    dateLimit.setDate(today.getDate() - 10);
    
    const activity = await Activities.aggregate<IActivity>([
      { $limit: 10 }
    ])  

    const movieList = MoviesShelf.aggregate<IMovies<string>>([
      { $limit: 20 }
    ])

    const focusMovie = await MoviesShelf.aggregate<IMovies<string>>([
      {
        $match: {
          $expr: {
            $and: [
              { $lt: [today, "$inTheatersTime"] },
              { $gt: [today, "$outOfTheatersTime"] }
            ]
          }
        }
      },
      { $limit: 10 }
    ])  

    const banner  = await MoviesShelf.aggregate<IMovies<string>>([
      {
        $match: {
          $expr: {
            $and: [
              { $gt: [today, "$inTheatersTime"] },
              { $gt: [today, "$outOfTheatersTime"] },
              { $lte: ["$inTheatersTime", today, dateLimit] }
            ]
          }
        }
      },
      {
        $project: {
          id: 1,
          imgUrl: 1,
          describe: 1
        }
      },
      { $limit: 10 }
    ])  

    const date = { activity, movieList, focusMovie, banner }
    

    return date
  }

}
