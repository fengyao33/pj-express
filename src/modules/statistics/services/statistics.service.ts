import Orders from "@models/orders.model"
import { test } from "node:test"

export class StatisticsService {
  async getAllBranchReport({sd, ed}: {sd: Date, ed: Date}): Promise<any> {

    const $match = {
      orderDatetime: {
        $gt: new Date(sd),
        $lt: new Date(ed)
      }
    }

    const $lookup = {
      from: 'sessions',
      localField: 'sessionId',
      foreignField: '_id', 
      as: 'sessionId' 
    }

    const $unwind = {
      path: '$sessionId',
      preserveNullAndEmptyArrays: true
    };

    const $lookupBranch = {
      from: 'theaters',
      localField: 'sessionId.theaterId',
      foreignField: '_id',
      as: 'branch'
    };

    const $group = {
      _id: {
        name: '$branch',
        year: { $year: '$orderDatetime' },
        month: { $month: '$orderDatetime' }
      },
      totalPrice: { $sum: '$price' }
    };

    const query = [ 
      { $match },
      { $lookup },
      { $unwind },
      { $lookup: $lookupBranch },
      { 
        $project: {
          id: 1,
          price: 1,
          orderDatetime: 1,
          branch: { $arrayElemAt: ['$branch.name', 0] }
        } 
      },
      { $group },
      { 
        $project: {
          name: '$_id.name',
          year: '$_id.year',
          month: '$_id.month',
          totalPrice: 1,
          _id: 0
        }
     }

    ]
    const branchRevenue = await Orders.aggregate(query)


    return branchRevenue
  }

  async findAll(): Promise<Object[]> {
    return []
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
