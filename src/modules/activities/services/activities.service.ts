import Activities from '@models/activities.model';
import on from "await-handler";

export class ActivitiesService {
  async findOne(id: any): Promise<Object> {
    return {}
  }

  async findAll(skip, pageSize): Promise<Object> {
    let [errors, result] = await on(
      Activities.find()
      .skip(skip)
      .limit(parseInt(pageSize as string))
    )
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
