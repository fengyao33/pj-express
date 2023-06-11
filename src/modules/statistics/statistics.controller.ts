import { NextFunction, Request, Response } from 'express'
import { StatisticsService } from './services'
import moment from 'moment'

/**
 * Return all entities
 * @param req
 * @param res
 * @param next
 */
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

/**
 * Return one instance of entity
 * @param req
 * @param res
 * @param next
 */
export async function show(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params
  const finder = new StatisticsService()
}

/**
 * Save an entity
 * @param req
 * @param res
 * @param next
 */
export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
  const saver = new StatisticsService()
}

/**
 * Update an entity
 * @param req
 * @param res
 * @param next
 */
export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params
  const updater = new StatisticsService()
}

/**
 * Destroy one instance of an entity
 * @param req
 * @param res
 * @param next
 */
export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params
  const destroyer = new StatisticsService()
}
