import express from "express";
import session from "express-session";
import connectMongoDbSession from "connect-mongodb-session";
import { config } from "dotenv-safe";
import mongoose from "mongoose";

import routes from "./routes/routes";
import errorMiddleware from "./middleware/errorMiddleware";
import cors from "cors";

if (process.env.NODE_ENV !== 'production') {
    config({ path: ".env", example: ".env" });
}

const PORT = process.env.PORT;
const MONGODB_URI: string = process.env.MONGODB_URI as string;
const SESSION_SECRET: string = process.env.SESSION_SECRET as string;
const ORIGIN: string = process.env.ORIGIN as string;

const MongoDbStore = connectMongoDbSession(session);

const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const corsOptions = {
  origin: ORIGIN,
  method: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();

app.set('trust proxy', true);
app.use(cors(corsOptions));

app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    store: store,
    saveUninitialized: false,
    resave: false,
      cookie:{
        httpOnly:true,
          sameSite:"lax",
          maxAge:36000000,
      }
  }),
);

app.use("/api", routes);

app.use(errorMiddleware);

app.use("/", (req: express.Request, res: express.Response) => {
  res.status(404).send("API Route Not Found");
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
