import { NextFunction, Request, Response } from "express";
import { MoviesshelfService } from "./services";

export async function index(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const finder = new MoviesshelfService();
  const { id, branch, hell, sdate, edate, pageNo, pageSize, isCurrent } = req.query;

  let result
  let skip
  
  if (id) {
    result = await finder.findOne(id as string, sdate as string, edate as string)
  } else {
    if(edate && pageNo && pageSize) {
      skip = (parseInt(pageNo as string) - 1) * parseInt(pageSize as string)
    }

    result = await finder.findAll(skip, pageSize, isCurrent)
  }

  res.json({
    message: "success",
    data: result,
  });
  // const result = await (id
  //   ? finder.findOne(id as string, sdate as string, edate as string)
  //   : finder.findAll());
  // res.json({
  //   message: "success",
  //   data: result,
  // });
}

export async function store(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const saver = new MoviesshelfService();
  const result = await saver.store(req.body);
  res.json(result);
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;
  const updater = new MoviesshelfService();
}


