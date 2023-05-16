import User from '@models/user.model';
import bcrypt from "bcryptjs";

export class AdminauthService {
  async login(email: string, password: string) {
    const result = await User.findOne({ email }).select("+password");
    if (!result) throw new Error("此帳號不存在");
    const comparePassword = await bcrypt.compare(password, result?.password);
    if (!comparePassword) throw new Error("密碼錯誤");
    return result;
  }
}
