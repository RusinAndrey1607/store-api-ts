import { syncDB } from './db/sync';
import { errorHandlerMiddleware } from './middlewares/errorHandleMiddleware';
import { approuter } from "./routes/index";
import { User } from "./models/user.model";
import { dbConnect } from "./db/db";
import path from "path";
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload"
config();

const port = process.env.PORT || 8000;
const app = express();
app.use(express.json({}));
app.use(cors({}));
app.use(fileUpload())
app.use("/static", express.static(path.join(__dirname, "static")));

app.use("/api", approuter);
//last middleware
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await dbConnect();
    await syncDB()
    app.listen(port, () => {
      console.log("Server working on a port", port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
