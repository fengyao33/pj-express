import Orders from "@models/orders.model"

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

  async getOrderInfo(): Promise<any> {
    // let result = await Orders.find()
    // .populate({
    //   path: 'users',
    //   select: 'email'
    // })
    // .populate('sessionId')

      let result = await Orders.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'users',
            foreignField: 'id', 
            as: 'users',
          },
        },
        {
          $addFields: {
            user: { $arrayElemAt: ['$users.email', 0] },
          },
        },
        {
          $project: {
            ticketTypeName: 1,
            seats: 1,
            price: 1,
            orderId: 1,
            payMethod: 1,
            orderDatetime: 1,
            status: 1,
            sessionId: 1,
            id: 1,
            user: 1,
          },
        },
    ]
    )
    
    
    return result
  }
}
