import Activities from '@models/activities.model';
import on from "await-handler";
import getTableParams from "@utils/getTableParams";

export class ActivitiesService {
  async findOne(id: any): Promise<Object> {
    return {}
  }


  async findAll(skip, pageSize, pageNo): Promise<Object> {
    let tableParams: Object
    let [errors, data] = await on(

      Activities.find()
      .skip(skip)
      .limit(parseInt(pageSize as string))
      .select("id title content img")
    )

    if (!!pageSize && !!pageNo) { 
      tableParams = await getTableParams({
        model: Activities,
        pageNo: parseInt(pageNo as string),
        pageSize: parseInt(pageSize as string),
      });
    } else {
      tableParams = {}
    } 


    let result = {
      data,
      tableParams
    }

    if(errors) {
      throw errors;
    }
    return result
  }

  async update(id: any, body: any): Promise<Object> {
    let [errors, result] = await on(Activities.findById(id))
    if(errors) {
      throw errors;
    }
    return { message: '修改成功'}
  }

  async store(body: object): Promise<Object> {
    let [errors]= await on(Activities.create(body))
    if(errors) {
      return errors
    }
    return { message: '新增成功'}
  }

  async destroy(id: any): Promise<Object> {
    return {}
  }

  async delete(id: any): Promise<Object> {
    return {}
  }
}
