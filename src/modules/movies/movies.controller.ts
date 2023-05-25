import { NextFunction, Request, Response } from "express";
import { MoviesService } from "./services";

export async function index(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {

  const finder = new MoviesService();
  const { id, branch, hell, sdate, edate, pageNo, pageSize, isCurrent } = req.query;

  let skip

  if (id) {
    let result = await finder.findOne(id as string, sdate as string, edate as string)

    res.json({
      status: "success",
      data: result,
  
    })
  } else {
    if(pageNo && pageSize) {
      skip = (parseInt(pageNo as string) - 1) * parseInt(pageSize as string)

    }
     let [ result, tableParams ] = await finder.findAll(skip, pageSize, isCurrent, pageNo)


    res.json({
      status: "success",
      data: result,
      tableParams
  
    });
  }

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
  const saver = new MoviesService();
  const result = await saver.store(req.body);
  res.json(result);
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;
  const updater = new MoviesService();
}


