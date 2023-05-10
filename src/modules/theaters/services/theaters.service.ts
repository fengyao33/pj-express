import Theater from "@models/theaters.model"

export class TheatersService {
  async findAll(): Promise<Object[]> {
    return await Theater.find({}).populate({path:"ticketTypeInfoIds"})
  }
}
