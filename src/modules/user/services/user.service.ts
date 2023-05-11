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
    const user: any = await User.findOne({ email: decode.email.toLowerCase() }).populate({
      path: "orderId", options: {
        sort: { orderDatetime: -1 },
        skip: page, limit: limit,
        populate: { path: "sessionId", options: { populate: [{ path: "theaterId" }, { path: "movieId" }, { path: "ticketTypeIds" }] } }
      }
    })

    return user.orderId.map(order => {
      return {
        movieName: order.sessionId.movieId.movieCName,//電影名稱
        movieNameEng: order.sessionId.movieId.movieEName,//電影英文名稱
        theaterName: order.sessionId.theaterId.name,//影城名稱
        movieDatetime: order.sessionId.datetime,//開演時間
        ticketType: order.ticketTypeName,//票別
        seats: order.seats,//座位s
        price: order.price,//金額
        orderId: order.orderId,//訂單編號,barcode產生
        payMethod: order.payMethod,//付款方式
        orderDatetime: order.orderDatetime,//訂單時間
        status: order.status//未取票,已取票,已退票,未付款
      }
    })
  }

  async getBonusRecord(authToken, page, limit) {
    //get user email from JWT
    const decode = await jwt.verify(authToken, process.env.JWT_SECRET, { complete: false });
    const user: any = await User.findOne({ email: decode.email.toLowerCase() }).populate({
      path: "orderId", options: {
        sort: { orderDatetime: -1 },
        populate: { path: "sessionId", options: { populate: { path: "theaterId" } } }
      }
    })
    const returnOrders = user.orderId.map(order => {
      return {
        theaterName: order.sessionId.theaterId.name, //影城名稱
        orderNumber: order.orderId, //訂單編號
        orderDate: order.orderDatetime, //訂單時間
        bonus: Math.round(order.price / 10) //點數機制:消費/10
      }
    }).filter(order=>order.status == "未取票" || order.status == "已取票")

    const endDateOfThisYear = new Date(new Date().getFullYear(), 11, 31)
    const endDateOfNextYear = new Date(new Date().getFullYear() + 1, 11, 31)

    return {
      orders: returnOrders.filter((order, index) => index >= page && index < page + limit),
      bonus: getBonus(returnOrders, endDateOfNextYear),
      expire: {
        bonus: getBonus(returnOrders, endDateOfThisYear),
        date: toDate(endDateOfThisYear)
      }
    };
  }
}


function toDate(datetime) {
  return datetime.getFullYear() + "/" + (datetime.getMonth() + 1) + "/" + datetime.getDate();
}

function getBonus(orders, targetDate) {
  return orders.filter(order => new Date(order.orderDate) < targetDate).reduce((acc, order) => acc + order.bonus, 0);
}