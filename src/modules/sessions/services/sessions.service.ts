import Session, { ISession } from "@models/sessions.model"

export class SessionsService {
  async findTicketTypesById(id): Promise<Object[]> {
    const result = await Session.findById(id).populate({
      path: 'ticketTypeIds'
    })
    return (result as ISession).ticketTypeIds
  }

  async findAll(): Promise<Object[]> {
    return await Session.find({})
  }

  async findRoomInfoBySessionId(id): Promise<Object> {
    const result = await Session.findById(id)
    return (result as ISession).roomInfo
  }

  async checkSeatsStatusBySessionId(id, seats: Array<{ row: number, col: number }>): Promise<Object> {
    const seatsQ = [...seats]
    const result = await Session.findById(id)
    const seatsBySessionId = (result as ISession).roomInfo.seats
    seatsQ.forEach((q, index) => {
      let isFind = false
      seatsBySessionId.forEach((seat,indexDB) => {
        if (q.row == seat.row && q.col == seat.col) {
          seatsQ[index] = seatsBySessionId[indexDB]
          isFind = true
          return
        }
      })
      if(!isFind){
        Object.assign(seatsQ[index],seatsQ[index],{status:-1})
      }
    })
    
    return seatsQ
  }

  async update(id: any, body: any): Promise<Object> {
    return {}
  }

  async store(body: any): Promise<Object> {
    return {}
  }

  async destroy(id: any): Promise<Object> {
    return {}
  }

  async delete(id: any): Promise<Object> {
    return {}
  }
}
