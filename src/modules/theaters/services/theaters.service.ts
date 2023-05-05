import Theater from "@models/theaters.model"

export class TheatersService {
  async findOne(id: any): Promise<Object> {
    return {}
  }

  async findAll(): Promise<Object[]> {
    return await Theater.find({}).populate({path:"ticketTypeInfoIds"})
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
