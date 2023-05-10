import User from "@models/user.model";
import bcrypt from "bcryptjs";
import _ from "lodash";
import { v4 as uuid4 } from "uuid";
import jwt from "jsonwebtoken";
import { IOrder } from "@models/orders.model";
import MoviesShelf from "@models/moviesshelf.model";

interface NewProfile {
  name: string;
  sex: string;
  mobile: string;
  birth: Date;
  hobby: [string];
}
export class UserauthService {
  async signup(email: string, password: string): Promise<Object> {
    const hashPassword: string = await bcrypt.hash(password, 12);
    const result = await User.create({
      id: uuid4(),
      email,
      password: hashPassword,
    });
    return result;
  }

  async login(email: string, password: string) {
    const result = await User.findOne({ email }).select("+password");
    if (!result) throw new Error("此帳號不存在");
    const comparePassword = await bcrypt.compare(password, result?.password);
    if (!comparePassword) throw new Error("密碼錯誤");
    return result;
  }
  async updatePassword(email: string, password: string) {
    const hashPassword: string = await bcrypt.hash(password, 12);
    const result = await User.findOneAndUpdate(
      { email },
      { password: hashPassword }
    );
    if (!result) throw new Error("此帳號不存在");
    return result;
  }

  async getProfile(email: string) {
    const result = await User.findOne({ email }).select("-password");
    return result;
  }

  async updateProfile(email: string, newProfile: NewProfile) {
    if (_.isEmpty(newProfile)) throw new Error("沒有需要更新的資料");
    const result = await User.findOneAndUpdate({ email }, newProfile);
    return result;
  }

  async getPurchaseRecord(authToken, page, limit) {
    //get user email from JWT
    const decode = await jwt.verify(authToken, process.env.JWT_SECRET, { complete: false });
    const result: any = await User.findOne({ email: decode.email.toLowerCase() }).populate({
      path: "orderId", options: {
        sort: { orderDatetime: -1 },
        skip: page, limit: limit,
        populate: { path: "sessionId", options: { populate: [{ path: "theaterId" }, { path: "movieId" }, { path: "ticketTypeIds" }] } }
      }
    })

    return result.orderId
  }

  async getBonusRecord(authToken, page, limit) {
    //get user email from JWT
    const decode = await jwt.verify(authToken, process.env.JWT_SECRET, { complete: false });
    const result = await User.find({ email: decode.email.toLowerCase() }).populate({ path: "orderId" })//.sort({ createdAt: -1 }).skip(parseInt(page)).limit(parseInt(limit))
    return { orders: [], bonus: 100, expire: { bonus: 10, date: getExpireDate() } }
  }
}


function getExpireDate() {
  const now = new Date(); // 取得現在時間
  const year = now.getFullYear() + 1; // 取得現在年份並加上1
  const endOfYear = new Date(year, 11, 31); // 設定為12月31日

  return endOfYear.getFullYear() + "/" + (endOfYear.getMonth() + 1) + "/" + endOfYear.getDate();
}