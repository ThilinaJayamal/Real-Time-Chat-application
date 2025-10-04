import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import messageRouter from "./routes/message.route.js"
import groupRouter from "./routes/group.route.js"
import { connectDB } from "./lib/db.js"
import {app,server,io} from "./lib/socket.js"

dotenv.config();

app.use(express.json({ limit: "5mb" }));
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(cookieParser());
connectDB();

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/groups",groupRouter);

const port = process.env.PORT;

server.listen(port, () => {
    console.log("Server has been stared now on port no:", port);
})