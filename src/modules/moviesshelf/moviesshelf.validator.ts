import { check } from "express-validator";

export const storeValidators = [
  check("name").notEmpty().withMessage("中文片名不得為空"),
  check("name_en").notEmpty().withMessage("英文片名不得為空"),
  check("rating").isIn(["G", "PG", "R"]).withMessage("評級錯誤"),
  check("theaters").isMongoId().withMessage("影城ID錯誤"),
  check("director").notEmpty().withMessage("導演不得為空"),
  check("cast").isArray().withMessage("演員欄位錯誤"),
  check("duration").notEmpty().withMessage("片長欄位錯誤"),
  check("release_date").notEmpty().withMessage("上映日期欄位錯誤"),
  check("poster").notEmpty().withMessage("海報連結不得為空"),
  check("trailer").notEmpty().withMessage("預告連結不得為空"),
  check("synopsis").notEmpty().withMessage("簡介欄位不得為空"),
  check("genre").notEmpty().withMessage("類別不得為空"),
];

export const updateValidators = [
  check("name").notEmpty().withMessage("中文片名不得為空"),
  check("name_en").notEmpty().withMessage("英文片名不得為空"),
  check("rating").isIn(["G", "PG", "R"]).withMessage("評級錯誤"),
  check("theaters").isMongoId().withMessage("影城ID錯誤"),
  check("director").notEmpty().withMessage("導演不得為空"),
  check("cast").isArray().withMessage("演員欄位錯誤"),
  check("duration").notEmpty().withMessage("片長欄位錯誤"),
  check("release_date").notEmpty().withMessage("上映日期欄位錯誤"),
  check("poster").notEmpty().withMessage("海報連結不得為空"),
  check("trailer").notEmpty().withMessage("預告連結不得為空"),
  check("synopsis").notEmpty().withMessage("簡介欄位不得為空"),
  check("genre").notEmpty().withMessage("類別不得為空"),
];
