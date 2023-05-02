import MoviesShelf from '@models/moviesshelf.model'
import on from "await-handler";


export class MoviesshelfService {
  async findOne(id: string, sdate: string, edate: string): Promise<Object> {
    let [errors, result] = await on(MoviesShelf.find({
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

  async findAll(): Promise<Object[]> {
    let [errors, result] = await on(MoviesShelf.find())
    if(errors) {
      throw errors;
    }
    return result
  }

  async update(id: any, body: any): Promise<Object> {
    let [errors, result] = await on(MoviesShelf.findById(id))
    return {}
  }

  async store(body: object): Promise<Object> {
    let [errors]= await on(MoviesShelf.create(body))
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
