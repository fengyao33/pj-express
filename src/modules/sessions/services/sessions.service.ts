import { ErrorHandler } from "@middlewares/error_handler"
import Session, { ISession } from "@models/sessions.model"

export class SessionsService {
  async findTicketTypesById(id): Promise<ErrorHandler | Object[]> {
    let result
    try {
      result = await Session.findById(id).populate({
        path: 'ticketTypeIds'
      })
    } catch {
      return new ErrorHandler(400, "找不到場次")
    }
    return (result as ISession).ticketTypeIds
  }

  async findAll(): Promise<Object[]> {
    return await Session.find({})
  }

  async findRoomInfoBySessionId(id): Promise<Object> {
    let result
    try {
      result = await Session.findById(id)
    } catch {
      return new ErrorHandler(400, "找不到場次")
    }
    return (result as ISession).seats
  }

  async checkSeatsStatusBySessionId(id, seats: Array<{ row: number, col: number, situation: string, isSold: boolean }>): Promise<Object> {
    const seatsQ = [...seats]
    let result
    try {
      result = await Session.findById(id)
    } catch {
      return new ErrorHandler(400, "找不到場次")
    }
    const seatsBySessionId = (result as ISession).seats
    let err;
    seatsQ.forEach((q, index) => {
      let isFind = false
      seatsBySessionId.forEach((seat, indexDB) => {
        if (q.row == seat.row && q.col == seat.col) {
          seatsQ[index] = seatsBySessionId[indexDB]
          isFind = true
          return
        }
      })
      if (!isFind) {
        err = new ErrorHandler(400,`請求的座位資料col=${q.col},row=${q.row} 沒有在此場次座位表中`)
        return;
      }
    })


    return err == undefined?seatsQ:err
  }
}
