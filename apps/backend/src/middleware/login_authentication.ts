import { Usermodel } from "../db/db";
import { Request, Response, NextFunction } from "express";
import { UserSchema } from "../zod/zod";
import bcrypt from "bcrypt";
const salt = 10;

export const login_authentication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await Usermodel.findOne({
    username: username,
  });

  console.log(user);
  if (user != null) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      next();
    } else
      [
        res.status(401).send({
          message: "wrong credentials",
        }),
      ];
  } else {
    res.status(404).send({
      message: "hey wrong credentials mann",
    });
  }
};
