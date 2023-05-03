import AdminMemberModel from "@models/adminMember.model";

type FindAllArg = {
  timeSort: string;
  search: string;
};

export class AdminmemberService {
  handleError(res: any, msg:string) {
    res.status(400).json({
      status: "fail",
      message: msg,
    });
  }
}
