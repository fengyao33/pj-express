import Theater from "@models/theaters.model"
import TicketType from "@models/ticketTypes.model"

export class TheatersService {
  async findAll(): Promise<Object[]> {
    const theaters = await Theater.find().populate({ path: "rooms.ticketTypeIds" })

    return theaters.map(t => {
      const ticketInfos = {};
      t.rooms.forEach(r => {
        if (r.type in ticketInfos) {
          ticketInfos[r.type] = [...ticketInfos[r.type], ...r.ticketTypeIds]
        }
        else {
          ticketInfos[r.type] = r.ticketTypeIds
        }
      })

      return {
        name: t.name,
        address: t.address,
        phone: t.phone,
        rooms: t.rooms.length,
        description: t.description,
        traffic: t.traffic,
        ticketPriceInfo: Object.keys(ticketInfos).map((key) => {
          const ticketTypes = ticketInfos[key]
          return {
            type:key,
            ...ticketTypes.reduce((obj, t) => {
              obj[t.name] = t.price;
              return obj;
            }, {})
          }
        })
      }
    })
  }
}