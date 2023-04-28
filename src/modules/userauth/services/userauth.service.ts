import User from '@models/userauth.model';
import bcrypt from 'bcryptjs';
export class UserauthService {
  async signup(email: string, password: string): Promise<Object> {
    const hashPassword: string = await bcrypt.hash(password, 12);
    const result = await User.create({ email, password: hashPassword });
    return { email: result?.email}
  }

  async login(email: string, password: string) {
    const result = await User.findOne({ email }).select('+password');
    const comparePassword = await bcrypt.compare(password, result?.password)
    if (!comparePassword) throw new Error('密碼錯誤');
    return {email: result?.email}
  }
}
