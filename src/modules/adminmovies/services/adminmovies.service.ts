type TableParmasArg = {
  model:any,
  pageNo:number
  pageSize:number
}

export class AdminmoviesService {

  async getTableParams(arg:TableParmasArg):Promise<Object>{
    const {model,pageNo,pageSize} = arg
    const totalCounts = await model.countDocuments();
    const totalPages = Math.ceil(totalCounts/pageSize);
    return {
      pageNo,
      pageSize,
      totalPages,
      totalCounts,
    };
  }

  async findOne(id: any): Promise<Object> {
    return {}
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
