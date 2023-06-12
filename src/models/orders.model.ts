import { Schema, model, connect } from "mongoose";
import Session from "./sessions.model";

export interface IOrder {
  ticketTypeName: string[],
  seats: string[],
  price: number,
  orderId: string,
  payMethod: string,
  orderDatetime: Date,
  status: string,
  sessionId: Schema.Types.ObjectId
}
const orderSchema = new Schema<IOrder>({
  ticketTypeName: [{
    type: String,
    required: [true, "請輸入票種名稱欄位:ticketTypeName"],
  }],
  seats: [{
    type: String,
    required: [true, "請輸入座位欄位:seats"],
    validate: {
      validator: (seat: string) => /\d+排\d+/.test(seat),
      message: '每個座位格式必須為 "數字+排+數字"',
    }
  }],
  price: { type: Number, required: [true, "請輸入價格欄位:price"] },
  orderId: { type: String, required: [true, "請輸入訂單編號欄位:orderId"] },
  payMethod: {
    type: String,
    required: [true, "請輸入付款方式欄位:payMethod"],
  },
  orderDatetime: {
    type: Date,
    required: [true, "請輸入訂單時間欄位:orderDatetime"],
  },
  status: {
    type: String,
    required: [true, "請輸入訂單狀態欄位:status"],
    enum: ["未取票", "已取票", "已退票", "未付款"],
  },
  sessionId: {
    type: Schema.Types.ObjectId,
    required: [true, "請輸入場次id欄位:sessionId"],
    ref: Session.modelName
  }
},
{
  versionKey: false,
  toJSON: { virtuals: true},
  toObject: {virtuals: true},
});

orderSchema.virtual('users',{
  ref: 'users',
  foreignField: 'orderId',
  localField: '_id',
  justOne: false,
})

const Order = model<IOrder>("orders", orderSchema);

export default Order;