import express from "express";
import session from "express-session";
import connectMongoDbSession from "connect-mongodb-session";
import { config } from "dotenv-safe";

import postsRoutes from "./routes/posts";
import authRoutes from "./routes/auth";

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

app.use(postsRoutes);
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})
