import Activities, { IActivity } from '@models/activities.model';
import Movies, { IMovies } from '@models/movies.model'

export class HomeService {
  async findAll(): Promise<Object> {

    const today = new Date();
    const dateLimit = new Date();
    dateLimit.setDate(today.getDate() - 10);
    
    let activity = await Activities.aggregate<IActivity>([
      { $limit: 20 }
    ])  

    const movieList = Movies.aggregate<IMovies<string>>([
      { $limit: 20 }
    ])
    
    const focusMovie = await Movies.aggregate<IMovies<string>>([
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

    const banner  = await Movies.aggregate<IMovies<string>>([
      {
        $match: {
          $expr: {
            $and: [
              { $gt: [today, "$inTheatersTime"] },
              { $gt: [today, "$outOfTheatersTime"] },

              // { $lte: ["$inTheatersTime", today, dateLimit] }

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

    let date = { activity, movieList, focusMovie, banner }


    return date
  }

}
