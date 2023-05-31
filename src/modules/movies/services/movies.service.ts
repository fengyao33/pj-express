import Movies from '@models/movies.model'
import on from "await-handler";
import getTableParams from "@utils/getTableParams";
// import Session, { ISession } from "@models/sessions.model"
import TimeSesstions from "@models/timeSesstions.model"
import _ from 'lodash'
import Session from '@models/sessions.model';
import { ObjectId } from 'mongoose';


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

    console.log(nextWeek)

    // console.log(33333, today, nextWeek)

    let [theaterErr, theaters] = await on(TimeSesstions.find({
      movie: id,
      date: {
        $gte: today,
        $lte: nextWeek
      }})
      .select('id date movie theaterInfo')
      .populate({
        path:'theaterInfo',
        // populate: {
        //   select: '_id name address rooms',
        //   path: 'theaterId'
        // },
      })
      .populate({
        path:'theater',
        populate: {
          select: '_id name address rooms',
          path: 'theaterId'
        },
      })
      .lean()
      )

      let temp = [Object]

      _.map(theaters, item => {
        // temp.push(item.theaterInfo)
        delete item.theaterInfo
      })

      console.log(temp)


      const groupedData = _.groupBy(theaters, item => item.date); //時間

      const filteredData = _.map(groupedData, group => {
        console.log(group)
        const { movie, date, theater } = group[0]

        // _.map(theater, item => {
        // const { name, address, rooms } = item[0]
        // return {
        //   name,
        //   address,
        //   rooms
        // }
          
        // })

        return {
          movie,
          date,
          theaterInfo: theater
        }
      })

      


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
      filteredData ,
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
