import Movies from '@models/movies.model'
import on from "await-handler";


export class MoviesshelfService {
  async findOne(id: string, sdate: string, edate: string): Promise<Object> {
    let [errors, result] = await on(Movies.find({
      premiere: {
        $gte: sdate,
        $lte: edate
      },
      _id: id
    }))
    if(errors) {
      return errors;
    }
    return {result}
  }

  async findAll(skip=1 as number, pageSize: string | number, isCurrent: string | boolean ): Promise<Object[]> {
    
    let [errors, result] = await on(
      Movies.find()
      .skip(skip)
      .limit(parseInt(pageSize as string))
    )

    if(isCurrent == 'true') {
      const currentTime = new Date();
      result = result.where('time').gt(currentTime)
    }


    if(errors) {
      throw errors;
    }
    return result
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
