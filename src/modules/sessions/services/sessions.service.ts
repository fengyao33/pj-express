import { ErrorHandler } from "@middlewares/error_handler"
import Session, { ISession } from "@models/sessions.model"
import Theaters from "@models/theaters.model"
import Movies from "@models/movies.model"
import { ObjectId } from 'mongodb'
import _ from 'lodash'
import { Console } from "console"

export class SessionsService {
  async findTicketTypesById(id): Promise<ErrorHandler | Object[]> {
    let result
    try {
      result = await Session.findById(id).populate({
        path: 'ticketTypeIds'
      })
    } catch {
      return new ErrorHandler(400, "找不到場次")
    }
    if (result == null) return new ErrorHandler(400, "找不到場次")
    return (result as ISession).ticketTypeIds
  }

  async getSessionInfoById(id): Promise<ErrorHandler | Object> {
    let result: any
    try {
      result = await Session.findById(id)
        .populate({ path: 'ticketTypeIds' })
        .populate({ path: 'theaterId' })
        .populate({ path: 'movieId' })
    } catch {
      return new ErrorHandler(400, "找不到場次")
    }
    if (result == null) return new ErrorHandler(400, "找不到場次")
    const selectedRoom = result.theaterId.rooms.find(r => r._id.equals(result.roomInfo));
    const strRating = (e) => {
      switch (e) {
        case 'G':
          return "普遍級"
        case 'PG':
          return "輔導級"
        case 'R':
          return "限制級"
        default:
          return "Unknow"
      }
    }

    return {
      movie: {
        movieCName: result.movieId.movieCName,
        movieEName: result.movieId.movieEName,
        rating: strRating(result.movieId.rating),
        imgUrl: result.movieId.imgUrl
      },
      theater: {
        name: result.theaterId.name
      },
      roomInfo: {
        name: selectedRoom.name
      },
      datetime: result.datetime
    }
  }

  async findAll(): Promise<Object[]> {
    return await Session.find({})
  }

  async findRoomInfoBySessionId(id): Promise<Object> {
    let result
    try {
      result = await Session.findById(id)
    } catch {
      return new ErrorHandler(400, "找不到場次")
    }
    if (result == null) return new ErrorHandler(400, "找不到場次")
    return (result as ISession).seats
  }

  async checkSeatsStatusBySessionId(id, seats: Array<{ row: number, col: number, situation: string, isSold: boolean }>): Promise<Object> {
    const seatsQ = [...seats]
    let result
    try {
      result = await Session.findById(id)
    } catch {
      return new ErrorHandler(400, "找不到場次")
    }
    if (result == null) return new ErrorHandler(400, "找不到場次")
    const seatsBySessionId = (result as ISession).seats
    let err;
    seatsQ.forEach((q, index) => {
      let isFind = false
      seatsBySessionId.forEach((seat, indexDB) => {
        if (q.row == seat.row && q.col == seat.col) {
          seatsQ[index] = seatsBySessionId[indexDB]
          isFind = true
          return
        }
      })
      if (!isFind) {
        err = new ErrorHandler(400, `請求的座位資料col=${q.col},row=${q.row} 沒有在此場次座位表中`)
        return;
      }
    })

    return err != undefined ? err: {
      available:seatsQ.filter(s=>s.situation=="可販售"&&!s.isSold),
      unAvailable:seatsQ.filter(s=>s.situation!="可販售"||s.isSold)
    }
  }

  async getSesstionsList({sd, ed, theaterId, roomInfo}: any): Promise<Object> {
      let $match = {
        theaterId: new ObjectId(theaterId),
        roomInfo: new ObjectId(roomInfo),
        datetime: {
          $gt: new Date(sd),
          $lt: new Date(ed)
        }
      };
      
      const getSessionQy = [
        { $match },
        {
          $lookup: {
            from: 'movies',
            localField: 'movieId',
            foreignField: '_id', 
            as: 'movie' 
          }
        },
        {
          $addFields: {
            movie: {
              $map: {
                input: '$movie',
                as: 'm',
                in: {
                  $mergeObjects: [
                    '$$m',
                    {
                      datetime: '$datetime',
                      sesstionId: '$_id',
                      startTime: '$startTime'
                    }
                  ]
                }
              }
            }
          }
        },
        {
          $project: {
            movie: 1,
            _id: 0
          }
        },
        {
          $project: {
            movie: {
              imgUrl: 1,
              movieTime: 1,
              movieCName: 1,
              movieEName: 1,
              datetime: 1,
              sesstionId: 1,
              startTime: 1
            },
            _id: 0
          }
        },
      ];

      let result = await Session.aggregate(getSessionQy)
      // const sessionData = _.flatMap(result, 'movie')
      let temp = _.flatMap(result, 'movie')

      let dataArr = _.groupBy(temp, (item) => {
        const date = new Date(item.datetime)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
      
        const dateString = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
      
        return dateString;
      })

      const numDays = 7
      let dateObj = {} 
      for (let i = 0; i < numDays; i++) {
        const currentDate = new Date(sd);
        currentDate.setDate(sd.getDate() + i);
        const dateString = currentDate.toISOString().split('T')[0];
        dateObj[dateString] = [];
      }

      for (const date in dateObj) {
        if (dataArr.hasOwnProperty(date)) {
          dateObj[date] = dataArr[date];
        }
      }

      const sessionData = dateObj
    

      let movieQy = {
        inTheatersTime: { 
          $gt: new Date(sd),
          $lt: new Date(ed)
        },
        outOfTheatersTime: {
          $gt: new Date(ed)
        }
      }

      let movies = await Movies.find(
        movieQy,
        {
          movieTime: 1,
          imgUrl: 1,
          id: 1,
          movieCName: 1,
        }
      ) 

        let movieboxs = await Movies.find(
          { style: 'box' },
          { 
            movieCName: 1,
            movieTime: 1,
          }
        ) 
      const movieList = [
        ...movies,
        ...movieboxs
      ]

      
      return { movieList, sessionData}
  }

  async postSesstionsList(update): Promise<any> {

    let { sessionData } = update

    let updateKeys = Object.keys(sessionData)

    const result = _.map(_.values(sessionData), obj => obj)


    await _.map(result, async (obj, i) => { 

      const targetDate = new Date(updateKeys[i]);
      await Session.deleteMany( { $expr: {
        $and: [
          { $eq: [{ $year: "$datetime" }, targetDate.getFullYear()] },
          { $eq: [{ $month: "$datetime" }, targetDate.getMonth() + 1] },
          { $eq: [{ $dayOfMonth: "$datetime" }, targetDate.getDate()] }
        ]
      }})

    if (obj && obj.length <= 0 ) return

    await _.map(obj, async date => {
 

      if (date.sessionId !== '') { 
  
        const exist = await Session.findOne({ _id: date.sessionId })
  
        if (exist) {
          const filter = { _id: date.sessionId };
          const update = {
            $set: {
              movieId: new ObjectId(date.movieId),
              startTime: date.startTime,
              datetime: date.datetime,
              theaterId: new ObjectId(date.theaterId),
              roomInfo: new ObjectId(date.roomInfo)
            }
          };
          const options = { upsert: true };
          const { modifiedCount } = await Session.updateOne(filter, update, options); 
        } 
      } else {
        const newMovie = new Session(date);
        const temp = await newMovie.save();
      }

    })



  });
  

    return 'succese'
  }
}