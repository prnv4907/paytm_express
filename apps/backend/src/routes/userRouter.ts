import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";
import express from "express";
const route = express.Router();
import { UserSchema } from "../zod/zod";
import { Usermodel } from "../db/db";
import bcrypt from "bcrypt";
import { username_check } from "../middleware/authentication";
import { login_authentication } from "../middleware/login_authentication";
const salt = 10;
const json_secretKey = "minal_choudhary@4907";

route.use(express.json());
route.use(cookieParser());

route.get("/sighnup", username_check, async (req, res) => {
  const { username, first_name, last_name, email, password, amount } = req.body;
  console.log(password);
  const hashed_password = await bcrypt.hash(password, salt);
  console.log("--------------------" + hashed_password);
  try {
    const user = new Usermodel({
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashed_password,
      amount: amount,
    });
    await user.save();

    console.log("user created and saved in db");
    res.status(200).send({
      message: "user created",
    });
    console.log(user);
  } catch (err) {
    res.status(500).send({
      message: "unable to save user credentials " + err,
    });
    console.log(err);
  }
});

route.get("/login", login_authentication, async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password_hash = bcrypt.hash(password, salt);
  const user = Usermodel.find({
    username: username,
    password: password_hash,
  });
  try {
    const token = jsonwebtoken.sign(
      {
        username: username,
        email: email,
      },
      json_secretKey,
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: true,
      maxAge: 0,
    });
    res.status(200).send({
      message: "cookie generated!!",
    });
  } catch (err) {
    console.log("error while creating token" + err);
    res.status(500).send({
      message: "error while creating token" + err,
    });
  }
});
export default route;
