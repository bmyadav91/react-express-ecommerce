import express from "express";

// routes register 
import { registerRoutes } from "./routes";

const app = express();

// convert incoming all request body into json 
app.use(express.json());

// register the all routes 
registerRoutes(app)


export default app;