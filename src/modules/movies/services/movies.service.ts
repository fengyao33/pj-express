import Movies from '@models/movies.model'
import on from "await-handler";
import getTableParams from "@utils/getTableParams";
// import Session, { ISession } from "@models/sessions.model"
import TimeSesstions from "@models/timeSesstions.model"
import _ from 'lodash'
import Session from '@models/sessions.model';
import { ObjectId } from 'mongoose';
import Theater from '@models/theaters.model';


export class MoviesService {
  async findOne(id: string, sdate: string, edate: string): Promise<Object> {
    let [errors, movie] = await on(Movies.findOne({
      premiere: {
        $gte: sdate,
        $lte: edate
      },
      _id: id
    }))

    if(errors) {
      return errors;
    }

    const today = new Date()
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7)

    // 
    // 改由影城開始
    let [getTheaterIdErr, getTheaterId] = await on(Theater.find()
    .select('_id')
    )
    
    if (getTheaterIdErr) {
      console.log('getTheaterId Error')
    }

    let arrayArr = _.map(getTheaterId, p => p._id)
    
    let sessionArr = [Object]

    // 拿影城撈出資料
    _.map(arrayArr, async tid => {
      let [theaterErr, tSession] = await on(Session.find({
          // movieId: id,
          // theaterId: tid,
          // date: {
          //   $gte: today,
          //   $lte: nextWeek
          // }
        })
        // .populate({
        //   path:'theaterId',
        // })
        // .lean()
      )

      if (theaterErr) {
        console.log('theaterErr')
      }
      let ttt = {
        ...tSession
      }
      sessionArr.push(ttt)
    })

// //
//   let updatedData = _.cloneDeep(tSession)

//   let newRooms = []  
//   let nName
//   let nAddress

//   updatedData.map(obj => {    
//     newRooms = obj.theaterId.rooms.map((room) => {
//       return {
//         ...room,
//         datetime: obj.datetime
//       }
//     })
//   })

//   let test = {
//     nName: updatedData[0].theaterId.name,
//     nAddress: updatedData[0].theaterId.address,
//     rooms: newRooms
//   }

//   console.log(nName)
// //


      // remove same
      // _.map(theaters, item => {
      //   // temp.push(item.theaterInfo)
      //   delete item.theaterInfo
      // })



      // const groupedData = _.groupBy(theaters, item => item.date); //依照時間整理time:  [{}{}]

      // const filteredData = _.map(groupedData, group => { //依照時間整理 跑圈
      //   const { movie, date, theater } = group[0]  //整合影城 1. theater[]> 拿電影時間 datetime   2. theaterId.rooms[] add time


      //   let tArr = [Object] //陣列影城

      //   let test = _.map(theater, item => {            
      //     let movieTime = item.datetime
      //     let theaterName = item.theaterId.name
      //     let theaterAddress = item.theaterId.address

      //     let rooms = item.theaterId.rooms.map( room => {
      //       room.seatTotal = room.seats.length || 0
      //       delete room.seats
      //       let eachTheater = {
      //         ...room,
      //         movieTime,
      //         theaterName,
      //         theaterAddress
      //       }
      //       tArr.push(eachTheater)
      //     })
      //     return {
      //       ROOM:{
      //         tArr
      //       }
      //     }
          
      //   })


      //   return {
      //     test
      //     // movie,
      //     // date,
      //     // theaterInfo: theater
      //   }
      // })

      


      // const filteredData = _.map(groupedData, group => {
      //   // const { theaterInfo, ...rest } = group[0];
      //   // const rooms = _.flatMap(group, item => item.rooms);
      //   // const showTimes = _.flatMap(group, item => item.showTimes);
      //   let theaterInfo = _.groupBy(group, item => item.theaterInfo._id)  //場地 高雄 台南
      //   // console.log(444, theaterInfo)

      //   let roomT = _.map(theaterInfo, item => {  //場地迴圈
      //     const rooms = _.flatMap(item, room => {   //家廳為+時間
      //       return item
      //     })
      //     return {
      //       rooms
      //     }
      //   })

      //   group.map(item => {
      //     // console.log(item.theaterInfo)
      //   })
      //   return {
          
      //     theaterInfo: {
      //       // ...rest,
      //       // // ...theaterInfo,
      //       // rooms,
      //       // showTimes
      //       roomT
      //     }
      //   };
      // });

    // _.map(theaters, item => {
    //   console.log(item)
    // })

    // const processedData = theaters.map(item => {
    //   const { theaterInfo, ...rest } = item;
    //   return {
    //     ...rest,
    //     AAA: [theaterInfo]
    //   };
    // });

    // if(theaterErr) {
    //   return theaterErr;
    // }

    // if (!theaterErr) {
    //   let timeInfo: Array<{ room: string,type: string, seat: number, times: Date[] , time?: Date, SessionOd?: ObjectId}> = []

    //   theaters = theaters.map(theater=> {

    //     let plainTheater = theater.toObject()

    //     theater.rooms.map( room => {
    //       let tempRoom = {
    //         room: room.name,
    //         type: room.type,
    //         seat: room.seats.length,
    //         times: plainTheater.showTimes,
    //         SessionId: plainTheater.sessionId
    //       }       
    //       timeInfo.push(tempRoom)
    //     })

    //     timeInfo.map( item => {
    //       item.times.map(t => {
    //         item.time = t
    //       })
    //     })


    //     plainTheater.theaterInfo.timeInfo = timeInfo


    //     delete plainTheater.times
    //     delete plainTheater.showTimes
    //     delete plainTheater.rooms
    //     return plainTheater;
    //   });
    // }


    // 使用 Lodash 修改数据结构
    // theaters = _.map(theaters, theater => {
    //   const theaterInfo = _.isArray(theater.theaterInfo)
    //     ? theater.theaterInfo
    //     : [theater.theaterInfo];
    //   return {
    //     ...theater,
    //     theaterInfo,
    //   };
    // });
    

    return {
      // movie,
      sessionArr ,
    }

  }

  async findAll(skip=1 as number, pageSize: string | number, isCurrent: string | boolean, pageNo): Promise<Object[]> {

    if( pageSize || isCurrent || pageNo) {

      let tableParams: Object
      let [errors, result] = await on(
        Movies.find({
          ...(isCurrent === true
            ? {
                time: {
                  $gte: new Date(new Date().setDate(new Date().getDate() - 10)),
                  $lte: new Date(new Date().setDate(new Date().getDate() + 10))
                }
              }
            : {})
        })
          .skip(skip)
          .limit(parseInt(pageSize as string))
      );
  
  
      if (!!pageSize && !!pageNo) { 
        tableParams = await getTableParams({
          model: Movies,
          pageNo: parseInt(pageNo as string),
          pageSize: parseInt(pageSize as string),
        });
      } else {
        tableParams = {}
      } 
  
      if(errors) {
        throw errors;
      }
      return  [ result, tableParams ]

    } else {
      let [errors, result] = await on(Movies.find())
      
      if(errors) {
        throw errors;
      }
      return result

    }

  }

  async update(id: any, body: any): Promise<Object> {
    let [errors, result] = await on(Movies.findById(id))
    return {}
  }

  async store(body: object): Promise<Object> {
    let [errors]= await on(Movies.create(body))
    if(errors) {
      return errors
    }
    return { message: '新增成功'}
  }

  async destroy(id: any): Promise<Object> {
    return {}
  }

  async delete(id: any): Promise<Object> {
    return {}
  }
}
