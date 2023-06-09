import { ErrorHandler } from '@middlewares/error_handler';
import { IRoom } from '@models/rooms.model';
import Theater from '@models/theaters.model';
import Movies from '@models/movies.model';
import Sessions from '@models/sessions.model';

function getTicketInfos(rs: IRoom[]) {
  const ticketInfos = {};
  rs.forEach((r) => {
    if (r.type in ticketInfos) {
      ticketInfos[r.type] = [...ticketInfos[r.type], ...r.ticketTypeIds];
    } else {
      ticketInfos[r.type] = r.ticketTypeIds;
    }
  });
  //篩type 是電影票
  Object.keys(ticketInfos).forEach((key) => {
    ticketInfos[key] = ticketInfos[key].filter((t) => {
      return t.type == '電影票';
    });
  });

  return ticketInfos;
}

export class TheatersService {
  async findAll(): Promise<Object[]> {
    const theaters = await Theater.find().populate({ path: 'rooms.ticketTypeIds' });
    
    return theaters.sort((tA,tB)=>{
      const areaNumA = tA.phone.split('-')[0]
      const areaNumB = tB.phone.split('-')[0]
      if (areaNumA < areaNumB) {
        return -1;
      }
      if (areaNumA > areaNumB) {
        return 1;
      }
      return 0;
    })
    .map((t) => {
      const ticketInfos = getTicketInfos(t.rooms);

      return {
        _id:t.id,
        name: t.name,
        address: t.address,
        phone: t.phone,
        imgUrl: t.img,
        mapUrl: t.mapUrl,
        rooms: t.rooms,
        description: t.description,
        traffic: t.traffic,
        ticketPriceInfo: Object.keys(ticketInfos).map((key) => {
          const ticketTypes = ticketInfos[key];
          return {
            type: key,
            ...ticketTypes.reduce((obj, t) => {
              obj[t.name] = t.price;
              return obj;
            }, {}),
          };
        }),
      };
    });
  }

  async findOne(name: string): Promise<Object> {
    const t: any = await Theater.findOne({ name }).populate({ path: 'rooms.ticketTypeIds' });
    if (t == undefined) return new ErrorHandler(400, `找不到影城名稱:${name}`);
    const ticketInfos = getTicketInfos(t.rooms);
    return {
      name: t.name,
      address: t.address,
      phone: t.phone,
      imgUrl: t.img,
      mapUrl: t.mapUrl,
      rooms: t.rooms.length,
      description: t.description,
      traffic: t.traffic,
      ticketPriceInfo: Object.keys(ticketInfos).map((key) => {
        const ticketTypes = ticketInfos[key];
        return {
          type: key,
          ...ticketTypes.reduce((obj, t) => {
            obj[t.name] = t.price;
            return obj;
          }, {}),
        };
      }),
    };
  }

  async getOneTheater(id: string) {
    return await Theater.findOne({_id:id})
  }
}




