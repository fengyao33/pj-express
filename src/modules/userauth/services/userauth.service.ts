import User from '@models/userauth.model';
import bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
export class UserauthService {
  async signup(email: string, password: string): Promise<Object> {
    const hashPassword: string = await bcrypt.hash(password, 12);
    const result = await User.create({ id: uuid4(), email, password: hashPassword });
    return result
  }

  async login(email: string, password: string) {
    const result = await User.findOne({ email }).select('+password');
    const comparePassword = await bcrypt.compare(password, result?.password)
    if (!comparePassword) throw new Error('密碼錯誤');
    return result
  }
  async updatePassword(email: string, password: string) {
    const hashPassword: string = await bcrypt.hash(password, 12);
    const result = await User.findOneAndUpdate(
      { email }, { password: hashPassword })
    return result
  }

  async getProfile(email: string) {
    const result = await User.findOne({ email }).select('-password')
    return result
  }
  async updateProfile(email: string) {
    try {
      console.log('update profile')
    } catch (error) {
      return { error }
    }
  }
}
