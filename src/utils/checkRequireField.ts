import _ from "lodash";

type CheckMemberRequireFieldArg = {
  obj: object;
  checkArr: string[];
};

function checkRequireField(arg: CheckMemberRequireFieldArg) {
  const { obj, checkArr } = arg;
  checkArr.forEach((item) => {
    if (_.isEmpty(obj[item])) throw new Error(`此${item}欄位為必填`);
  });
}

export default checkRequireField;
