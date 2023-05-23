import { ErrorHandler } from "@middlewares/error_handler";
import { IRoom } from "@models/rooms.model";
import Theater from "@models/theaters.model"
import TicketType from "@models/ticketTypes.model"

function getTicketInfos(rs: IRoom[]) {
  const ticketInfos = {};
  rs.forEach(r => {
    if (r.type in ticketInfos) {
      ticketInfos[r.type] = [...ticketInfos[r.type], ...r.ticketTypeIds]
    }
    else {
      ticketInfos[r.type] = r.ticketTypeIds
    }
  })
  return ticketInfos;
}

export class TheatersService {
  async findAll(): Promise<Object[]> {
    const theaters = await Theater.find().populate({ path: "rooms.ticketTypeIds" })

    return theaters.map(t => {
      const ticketInfos = getTicketInfos(t.rooms);

      return {
        name: t.name,
        address: t.address,
        phone: t.phone,
        imgUrl: t.img,
        rooms: t.rooms.length,
        description: t.description,
        traffic: t.traffic,
        ticketPriceInfo: Object.keys(ticketInfos).map((key) => {
          const ticketTypes = ticketInfos[key]
          return {
            type: key,
            ...ticketTypes.reduce((obj, t) => {
              obj[t.name] = t.price;
              return obj;
            }, {})
          }
        })
      }
    })
  }

  async findOne(name: string): Promise<Object> {

    const t: any = await Theater.findOne({ name }).populate({ path: "rooms.ticketTypeIds" })
    if(t==undefined)return new ErrorHandler(400,`找不到影城名稱:${name}`)
    const ticketInfos = getTicketInfos(t.rooms);

    return {
      name: t.name,
      address: t.address,
      phone: t.phone,
      imgUrl: t.img,
      rooms: t.rooms.length,
      description: t.description,
      traffic: t.traffic,
      ticketPriceInfo: Object.keys(ticketInfos).map((key) => {
        const ticketTypes = ticketInfos[key]
        return {
          type: key,
          ...ticketTypes.reduce((obj, t) => {
            obj[t.name] = t.price;
            return obj;
          }, {})
        }
      })
    }
  }
}