import { SeatExamples, ISeat } from '@models/seats.model';
import Theater from '@models/theaters.model';
import TicketTypes from '@models/ticketTypes.model';

export class AdminseatsService {
  async findOne(theaterId: string, roomId: string): Promise<ISeat[] | unknown> {
    const theater = await Theater.findOne(
      {
        _id: theaterId,
        'rooms._id': roomId,
      },
      { 'rooms.$': 1 }
    );

    if (!theater) throw new Error('查無此影廳');

    const result = theater.rooms.map((room) => ({
      theaterId: theater._id,
      roomId: room._id,
      seatCount: room.seats.length,
      seats: room.seats,
    }));

    return result;
  }

  async findExample(): Promise<Object> {
    const seats = await SeatExamples.aggregate([
      {
        $project: {
          name: 1,
          seatCount: { $size: '$seatTable' },
        },
      },
    ]);

    const ticketTypes = await TicketTypes.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          content: 1,
          ticketCount: 1
        },
      },
    ]);


    let result = {
      seats,
      ticketTypes
    }

    return result;
  }

  async update(body: any): Promise<Object> {
    return {};
  }

  async store(body: any): Promise<Object> {
    return {};
  }

  async destroy(id: any): Promise<Object> {
    return {};
  }

  async delete(id: any): Promise<Object> {
    return {};
  }
}
