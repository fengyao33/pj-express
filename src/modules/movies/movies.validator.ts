import { check } from "express-validator";

export const storeValidators = [
  check("isAvaliableL").notEmpty().withMessage("上架確認未填"),
  check("imgUrl").notEmpty().withMessage("海報連結不得為空"),
  check("videoUrl").notEmpty().withMessage("預告連結不得為空"),
  check("movieCName").notEmpty().withMessage("中文片名不得為空"),
  check("movieEName").notEmpty().withMessage("英文片名不得為空"),
  check("director").notEmpty().withMessage("導演不得為空"),
  check("cast").isArray().withMessage("演員欄位錯誤"),
  check("inTheatersTime").isMongoId().withMessage("上映時間未填"),
  check("outOfTheatersTime").notEmpty().withMessage("下檔時間未填"),
  check("movieTime").notEmpty().withMessage("片長欄位錯誤"),
  check("rating").isIn(["G", "PG", "R"]).withMessage("分級未填"),
  check("synopsis").notEmpty().withMessage("簡介欄位不得為空"),
];

export const updateValidators = [
  check("isAvaliableL").notEmpty().withMessage("上架確認未填"),
  check("imgUrl").notEmpty().withMessage("海報連結不得為空"),
  check("videoUrl").notEmpty().withMessage("預告連結不得為空"),
  check("movieCName").notEmpty().withMessage("中文片名不得為空"),
  check("movieEName").notEmpty().withMessage("英文片名不得為空"),
  check("director").notEmpty().withMessage("導演不得為空"),
  check("cast").isArray().withMessage("演員欄位錯誤"),
  check("inTheatersTime").isMongoId().withMessage("上映時間未填"),
  check("outOfTheatersTime").notEmpty().withMessage("下檔時間未填"),
  check("movieTime").notEmpty().withMessage("片長欄位錯誤"),
  check("rating").isIn(["G", "PG", "R"]).withMessage("分級未填"),
  check("synopsis").notEmpty().withMessage("簡介欄位不得為空"),
];
