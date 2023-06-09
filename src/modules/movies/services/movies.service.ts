import Movies from '@models/movies.model'
import on from "await-handler";
import getTableParams from "@utils/getTableParams";
// import Session, { ISession } from "@models/sessions.model"
import _ from 'lodash'
import Session from '@models/sessions.model';
import { ObjectId } from 'mongoose';
import Theater from '@models/theaters.model';


export class MoviesService {
  async findOne(id: string, sdate: string, edate: string, getday: Date): Promise<Object> {
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

    //get all theater id
    let [getTheaterIdErr, getTheaterId] = await on(Theater.find()
    .select('_id')
    )
    
    if (getTheaterIdErr) {
      console.log('getTheaterId Error')
      return {
        message: 'get TheaterId error has occurred'
      }
    }

    // use theaterid filter session
    let theaterIdArr = _.map(getTheaterId, p => p._id) 

    //group with theaters
    const groupTheater: any[] = []  

    getday.setHours(0, 0, 0, 0);
    let nextDay = new Date(getday.getTime() + 24 * 60 * 60 * 1000);

    await Promise.all(
      theaterIdArr.map( async (tid, i) => {
        let [theaterErr, theaters] = await on(Session.find({
          theaterId: tid,
          datetime: {
            $gte: getday,
            $lte: nextDay
          }
          // datetime: {
          //   $gte: new Date('2023-06-01'),
          //   // $lt: new Date(getday.getTime() + 24 * 60 * 60 * 1000)。
          // }
        })
          // .select('theaterId name address rooms datetime')      
          .populate({
            path:'theaterId',
            // populate: {
            //   select: '_id name address rooms',
            //   path: 'theaterId'
            // },
          })
          // .populate({
          //   path:'theater',
          //   populate: {
          //     select: '_id name address rooms',
          //     path: 'theaterId'
          //   },
          // })
          .lean()
        )

        if(theaterErr){
          console.log('get sessions with Theater Error')
          return {
            message: 'get sessions with Theater Error'
          }
        }
        groupTheater.push(theaters[0])
      })  
    )

    // Organize
    let theaterInfo: Object[]  = [] 
    let combinationTheater  = {}

    groupTheater.map((item, i)=> {          
      if(!item) return

        item.theaterId.rooms.map( room => {
        room.datetime = item.datetime
      })

      combinationTheater = {   
        id: item.theaterId._id,
        name: item.theaterId.name,
        address:  item.theaterId.address,
        datetime: getday,
        timeInfo: item.theaterId.rooms
      }

      theaterInfo.push(combinationTheater)
    })

    // theater:[
    //   {
    //     datetime
    //     // theaterInfo
    //   }
    // ]

    return {
      movie,
      theaterInfo ,
    }

  }

  async findAll(skip=1 as number, pageSize, isCurrent, pageNo): Promise<Object[]> {

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
