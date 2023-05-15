import Activity from '@models/activities.model';
import _ from "lodash";

interface NewActivity {
  title: String,
  content: String,
  img: String,
  startDatetime: Date,
  endDatetime: Date
}

export class ActivitiesService {
  async getActivities() {
    const result = await Activity.find({});
    return result
  }

  async createActivity(activityInfo: NewActivity) {
    const result = await Activity.create(activityInfo)
    return result
  }

  async updateActivity(id: string, newActivity: NewActivity) {
    if (_.isEmpty(newActivity)) throw new Error("沒有需要更新的資料");
    const result = await Activity.findOneAndUpdate({ _id: id }, newActivity);
    return result
  }

  async deleteActivity(id: string) {
    const result = await Activity.deleteOne({ _id: id });
    return result
  }
}
