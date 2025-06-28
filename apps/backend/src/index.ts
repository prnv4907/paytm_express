import express from "express";
import route from "./routes/userRouter";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

console.log("hello ");
app.use("/api/v1/user", route);
app.listen(3000);
