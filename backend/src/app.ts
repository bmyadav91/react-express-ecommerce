import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware";

// routes register 
import { registerRoutes } from "./routes";

const app = express();

// Allow EVERYTHING (Must be before routes)
app.use(cors());

// convert incoming all request body into json 
app.use(express.json());

// register the all routes 
registerRoutes(app)

// use error handler in middleware 
app.use(errorHandler);


export default app;