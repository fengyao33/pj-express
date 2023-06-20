import Activities, { IActivity } from '@models/activities.model';
import Movies, { IMovies } from '@models/movies.model'

export class HomeService {
  async findAll(): Promise<Object> {

    const today = new Date();
    const dateLimit = new Date();
    dateLimit.setDate(today.getDate() - 10);
    
    const activity = await Activities.aggregate<IActivity>([
      {
        $project: {
          _id: 1,
          title: 1,
          content: 1,
          img: 1
        }
      },
      { $limit: 20 }
    ])  

    const futureMovieList = await Movies.aggregate<IMovies<string>>([
      {
        $project: {
          _id: 1,
          imgUrl: 1,
          movieCName: 1,
          movieEName: 1,
          inTheatersTime: 1,
          movieTime: 1,
          rating: 1,
          style: 1
        }
      },
      {
        $match: {
          $expr: {
            $and: [
              { $gt: [today, "$inTheatersTime"] }, 
              { $ne: ["$style", "box"] }
            ]
          }
        }
      },
      { $limit: 20 }
    ])

    const currentMovieList = await Movies.aggregate<IMovies<string>>([
      {
        $project: {
          _id: 1,
          imgUrl: 1,
          movieCName: 1,
          movieEName: 1,
          inTheatersTime: 1,
          movieTime: 1,
          rating: 1,
          style: 1
        }
      },
      {
        $match: {
          $expr: {
            $and: [
              { $lt: [today, "$inTheatersTime"] }, 
              { $ne: ["$style", "box"] }
            ]
          }
        }
      },
      { $limit: 10 }
    ])  

    const focusMovie = await Movies.aggregate<IMovies<string>>([
      {
        $project: {
        id: 1,
        videoUrl: 1,
        movieCName: 1,
        synopsis: 1,
        style: 1  
        }
      },
      {
        $match: {
          $expr: {
            $and: [
              { $gt: [today, "$inTheatersTime"] }, 
              { $gt: [today, "$outOfTheatersTime"] },
              { $ne: ["$style", "box"] }
            ]
          }
        }
      },
      { $limit: 1 }
    ])  

    const banner  = await Movies.aggregate<IMovies<string>>([
      {
        $match: {
          $expr: {
            $and: [
              { $gt: [today, "$inTheatersTime"] },
              { $gt: [today, "$outOfTheatersTime"] },
              { $ne: ["$style", "box"] }
            ]
          }
        }
      },
      {
        $project: {
          id: 1,
          imgUrl: 1,
          movieCName: 1,
          inTheatersTime: 1,
          outOfTheatersTime: 1,
          style: 1
        }
      },
      { $limit: 10 }
    ])  

    let data = { activity, currentMovieList, futureMovieList, banner, focusMovie:focusMovie[0] }



    return data
  }

}
