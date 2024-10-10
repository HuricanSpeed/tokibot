import express, { Application } from "express";
import process from "process";
import cors from "cors";
import session from "express-session";
import discordClient from "./services/discord.service";

import prisma from "./services/prisma.service";

const App: Application = express();

App.use(express.urlencoded({ extended: true }));
App.use(express.json());

App.use(session({
    name: process.env.SESSION_NAME as string,
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    // store: sessionStore, // Uncomment this line if you use session store
    cookie: {
      secure: false, // Set to true when using HTTPS
      httpOnly: true,
      path: "/",
      maxAge: 3600000
    }
}));

App.use(cors({
    origin: process.env.CLIENT_URL as string,
    credentials: true
}));


discordClient.login(process.env.DISCORD_TOKEN as string);

App.set("trust proxy", 1);

export default App;