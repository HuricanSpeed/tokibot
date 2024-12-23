import express, { Application } from "express";
import process from "process";
import cors from "cors";
import session from "express-session";
import discordClient from "./services/discord.service";

import prisma from "./services/prisma.service";
import authRouter from "./routes/auth.route";
import loginRouter from "./routes/login.route";
import router from "./routes/guild.route";

const App: Application = express();

App.use(express.json());

App.use(session({
  name: process.env.SESSION_NAME as string,
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  // store: sessionStore,
  cookie: {
    secure: false, // Set to true when having HTTPS
    httpOnly: true,
    path: "/",
    maxAge: 3600000
  }
}))

App.set("trust proxy", 1);

App.use("/api", loginRouter);
App.use("/api", authRouter);
App.use("/api/discord", router);

discordClient.login(process.env.DISCORD_TOKEN as string);


export default App;