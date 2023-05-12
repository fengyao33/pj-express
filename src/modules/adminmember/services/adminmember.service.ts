import _ from "lodash";

type CheckMemberRequireFieldArg = {
  body: object;
  checkArr: string[];
};

export class AdminmemberService {
  handleError(res: any, msg: string) {
    res.status(400).json({
      status: "fail",
      message: msg,
    });
  }
  checkMemberRequireField(arg: CheckMemberRequireFieldArg) {
    const { body, checkArr } = arg;
    checkArr.forEach((item) => {
      if (_.isEmpty(body[item])) throw new Error(`此${item}欄位為必填`);
    });
  }
}
