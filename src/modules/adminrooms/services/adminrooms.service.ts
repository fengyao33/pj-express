import { IRoom } from '@models/rooms.model';
import { ISeatExample, SeatExamples } from '@models/seats.model';
import Theater from '@models/theaters.model';
import TicketType from '@models/ticketTypes.model';

export class AdminroomsService {
  async findOne(id: string, theaterId: string): Promise<IRoom | unknown> {
    const theater = await Theater.findOne(
      {
        _id: theaterId,
        'rooms._id': id,
      },
      { 'rooms.$': 1 }
    );
    if (!theater) throw new Error('查無此影廳');

    return theater.rooms.shift();
  }

  async findAll(theaterId: string): Promise<Object | unknown> {
    const theater = await Theater.findById(theaterId).select('rooms.name rooms.enable rooms._id');
    if (!theater) throw new Error('查無此影城');

    return theater;
  }

  async update(body: any): Promise<Object> {
    const { roomId, theaterId, seats } = body;

    const existingRoomCount = await Theater.countDocuments({ _id: theaterId, 'rooms._id': roomId });

    if (existingRoomCount === 0) throw new Error('無此影廳');

    for (const seat of seats) {
      await Theater.findOneAndUpdate(
        {
          _id: theaterId,
          'rooms._id': roomId,
          'rooms.seats._id': seat.id,
        },
        {
          $set: { 'rooms.$[outer].seats.$[inner].situation': seat.situation },
        },
        {
          arrayFilters: [{ 'outer._id': roomId }, { 'inner._id': seat.id }],
          new: true,
        }
      );
    }

    return {};
  }

  async store(body: any): Promise<Object | unknown> {
    const { theaterId, name, type, seatExampleId, ticketTypeIds } = body;
    const seatExample = await SeatExamples.findById(seatExampleId);

    if (!seatExample) throw new Error('無此座位範本');

    const { seatTable } = seatExample as ISeatExample;
    const room = {
      name: name,
      type: type,
      enable: true,
      seats: seatTable,
      ticketTypeIds,
    };

    const existingRoomCount = await Theater.countDocuments({ _id: theaterId, 'rooms.name': name });

    if (existingRoomCount > 0) throw new Error('影廳名稱已存在');

    const existingTicketTypeCount = await TicketType.countDocuments({ _id: { $in: ticketTypeIds } });

    if (existingTicketTypeCount !== ticketTypeIds.length) throw new Error('部分票種 Id 不存在');

    const theater = await Theater.findOneAndUpdate(
      { _id: theaterId },
      {
        $push: {
          rooms: room,
        },
      },
      { new: true }
    ).select('rooms');
    return theater?.rooms.pop();
  }

  async destroy(id: string, theaterId: string): Promise<Object | unknown> {
    const theater = await Theater.findOneAndUpdate(
      {
        _id: theaterId,
        'rooms._id': id,
      },
      {
        $set: {
          'rooms.$.enable': false,
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
