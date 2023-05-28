// import Theater from '@models/theaters.model';
import TimeSesstions from '@models/timeSesstions.model';
import Movies from '@models/movies.model';
import { Room } from '@models/rooms.model';
import Sessions from '@models/sessions.model';



export class TimesessionsService {
  async findOne(id: string): Promise<any> {
    const theaters = await TimeSesstions.findOne({_id:id})
    .select('movie showTime rooms session')
    .populate({
      select: 'id movieCName',
      path: 'movie',
      model: Movies
    })
    .populate({
      select: 'id name type',
      path: 'rooms',
      model: Room
    })
    .populate({
      path: 'session', // 座位資訊
      model: Sessions,
      populate: {
        select: 'datetime rooms',
        path: 'theaterId'
      }
    })

    return theaters
  }
}
