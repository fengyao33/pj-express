import Movies from '@models/movies.model'
import on from "await-handler";
import getTableParams from "@utils/getTableParams";
import Session, { ISession } from "@models/sessions.model"
import _ from 'lodash'


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

    let [theaterErr, theater] = await on(Session.find({movieId: id})
      .select('_id datetime theaterId')
      .populate({
        path:'theaterId',
        select: 'name address timeInfo',
        populate: {
          path: 'timeInfo',
          select: 'name type _id times',
          model: 'rooms',
          options: { lean: true }
        }
      }))

    if(theaterErr) {
      return theaterErr;
    }

    return {
      movie,
      theater 
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
