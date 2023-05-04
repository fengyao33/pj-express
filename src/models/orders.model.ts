import { Schema, model, connect } from 'mongoose';

interface IOrder {
  movieName: string,
  movieNameEng: string,
  theaterName: string,
  movieDatetime: string,
  ticketTypeName: string,
  seats: string[],
  price: number,
  orderId: string,
  payMethod: string,
  orderDatetime: string,
  status: string
}
const orderSchema = new Schema<IOrder>({
  movieName: { type: String, required: [true, '請輸入電影名稱欄位:movieName'] },
  movieNameEng: { type: String, required: [true, '請輸入電影英文名稱欄位:movieNameEng'] },
  theaterName: { type: String, required: [true, '請輸入戲院名稱欄位:theaterName'] },
  movieDatetime: { type: String, required: [true, '請輸入電影時刻欄位:movieDatetime'] },
  ticketTypeName: { type: String, required: [true, '請輸入票種名稱欄位:ticketTypeName'] },
  seats: {
    type: [String], required: [true, '請輸入座位欄位:seats'],
    validate: {
      validator: (seats: string[]) => seats.every(seat => /\d+排\d+/.test(seat)),
      message: '每個座位格式必須為 "數字+排+數字"',
    }
  },
  price: { type: Number, required: [true, '請輸入價格欄位:price'] },
  orderId: { type: String, required: [true, '請輸入訂單ID欄位:orderId'] },
  payMethod: { type: String, required: [true, '請輸入付款方式欄位:payMethod'] },
  orderDatetime: { type: String, required: [true, '請輸入訂單時間欄位:orderDatetime'] },
  status: { type: String, required: [true, '請輸入訂單狀態欄位:status'], enum: ["未取票", "已取票", "已退票", "未付款"] }
}, {
  versionKey: false,
  collection: 'orders',
  timestamps: true
})

const Order = model<IOrder>('orders', orderSchema);

export default Order;