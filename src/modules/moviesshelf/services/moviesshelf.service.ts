import MoviesShelf from '@models/MoviesShelf'
import on from "await-handler";
import { v4 as uuidv4 } from 'uuid';

export class MoviesshelfService {
  async findOne(id: any): Promise<Object> {
    let [err, result] = await on(MoviesShelf.findById(id))
    if(err) {
      throw err;
    }
    return {result}
  }

  async findAll(): Promise<Object[]> {
    let [err, result] = await on(MoviesShelf.find())
    if(err) {
      throw err;
    }
    return result
  }

  async update(id: any, body: any): Promise<Object> {
    return {}
  }

  async store(body: any): Promise<Object> {
    const { time, seatInfo } = body
    const updateDate = {
      id: uuidv4(),
      theater: 123,
      room: 123,
      movie: 123,
      time,
      seatInfo,
    }
    let [err, result] = await on(MoviesShelf.create(updateDate))
    if(err) {
      throw err;
    }
    return {result}
  }

  async destroy(id: any): Promise<Object> {
    return {}
  }

  async delete(id: any): Promise<Object> {
    return {}
  }
}
