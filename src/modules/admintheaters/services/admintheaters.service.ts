import Theater, { ITheater } from '@models/theaters.model';

export class AdmintheatersService {
  async findOne(id: any): Promise<ITheater | unknown> {
    return await Theater.findById(id).select('name address phone description traffic enable');
  }

  async findAll(): Promise<Object[]> {
    const theaters = await Theater.aggregate([
      {
        $project: {
          name: 1,
          enable: 1,
          roomCount: { $size: '$rooms' },
          seatCount: { $sum: { $map: { input: '$rooms', as: 'room', in: { $size: '$$room.seats' } } } },
        },
      },
    ]);
    return theaters;
  }

  async update(id: string, body: ITheater): Promise<ITheater | unknown> {
    const { name, address, phone, img, description, traffic } = body;
    const theater = await Theater.findOneAndUpdate(
      {
        _id: id,
      },
      {
        name,
        address,
        phone,
        img,
        description,
        traffic,
      },
      { new: true }
    );
    return theater;
  }

  async store(body: ITheater): Promise<ITheater> {
    return await Theater.create({ ...body });
  }

  async destroy(id: string): Promise<Object | unknown> {
    const theater = await Theater.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          enable: false,
        },
      },
      { new: true }
    );
    return theater;
  }

  async delete(id: any): Promise<Object> {
    return {};
  }
}
