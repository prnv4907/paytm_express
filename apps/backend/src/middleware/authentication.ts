import { Usermodel } from "../db/db";
import { Request, Response, NextFunction } from "express";
import { UserSchema } from "../zod/zod";

const username_check = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const zodValidation = UserSchema.safeParse(req.body);
  if (!zodValidation.success) {
    res.send({
      message: "not proper format" + req.body,
    });
    console.log(zodValidation.data);
  }
  const username = req.body.username;
  const check_username = await Usermodel.findOne({ username: username });
  if (check_username === null) {
    console.log("good to go");
    next();
  } else {
    res.send({
      message: "username pranav already exists",
    });
  }
};

export { username_check };
