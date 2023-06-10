import { ErrorHandler } from "@middlewares/error_handler"
import Session, { ISession } from "@models/sessions.model"
import Theaters from "@models/theaters.model"
import Movies from "@models/movies.model"
import { ObjectId } from 'mongodb'
import _ from 'lodash'

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
                      sesstionId: '$_id'
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
              sesstionId: 1
            },
            _id: 0
          }
        },
      ];

      let result = await Session.aggregate(getSessionQy)
      const sessionData = _.flatMap(result, 'movie')

      let movieQy = {
        inTheatersTime: {
          $gt: new Date(sd)
        },
        outOfTheatersTime: {
          $lt: new Date(ed)
        }
      }
      let movieList = await Movies.find(movieQy) 
      
      return { movieList, sessionData}
  }

  async postSesstionsList(body): Promise<Object> {
    const { movieId, roomInfo, theaterId, datetime } = body

    let theater = await Theaters.findOne(theaterId)

    console.log(theater)

    return {}
  }
}