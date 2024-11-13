import express from "express";
import session from "express-session";
import connectMongoDbSession from "connect-mongodb-session";
import { config } from "dotenv-safe";

import routes from "./routes/routes";
import errorMiddleware from "./middleware/errorMiddleware";
import mongoose from "mongoose";

config({ path: ".env", example: ".env" });
const PORT = process.env.PORT;
const MONGODB_URI: string = process.env.MONGODB_URI as string;
const SESSION_SECRET: string = process.env.SESSION_SECRET as string;

const MongoDbStore = connectMongoDbSession(session);

const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const app = express();

app.use(express.json());
app.use(session({
  secret: SESSION_SECRET,
  store: store,
  saveUninitialized: false,
  resave: false
}))

app.use("/api", routes);

app.use(errorMiddleware);

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  })
})
  .catch(err => {
    console.log(err);
  })

