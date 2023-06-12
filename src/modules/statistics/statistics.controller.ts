import { NextFunction, Request, Response } from 'express'
import { StatisticsService } from './services'
import moment from 'moment'

export async function showReport(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new StatisticsService()

  let {sdate, edate} = req.query

  const pattern = /^\d{4}-\d{2}-\d{2}$/

  if (!pattern.test(sdate as string) || !pattern.test(edate as string)) {
    res.json({
      status: "false",
      messege: '時間格式錯誤'
    })
  } 

  let sd = moment.utc(sdate as moment.MomentInput, 'YYYY-MM-DD').utcOffset(480).toDate()
  let ed = moment.utc(edate as moment.MomentInput, 'YYYY-MM-DD').utcOffset(480).toDate()

  const q = {
    sd,
    ed,
  }

  let result = await finder.getAllBranchReport(q)

  res.json(result)

}

export async function showOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
  const finder = new StatisticsService()
  let result = await finder.getOrderInfo()

  res.json({
    messege: 'success',
    data: result
  })
}
