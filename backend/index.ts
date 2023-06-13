import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";

// Load env vars
dotenv.config();

import { connectDB } from "./config/db";
import userRoutes from "./routes/Auth.routes";
import recipeRoutes from "./routes/Recipe.routes";
import { errorHandler, notFound } from "./middlewares/errorHandler";

// Initialize express
const app: Application = express();

// Set port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.json({
    message: "Welcome to the MongoDB API",
    author: "Mohamed Capo",
    version: "1.0.0",
  });
});

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/recipes", recipeRoutes);

// Error handler middleware
app.use(notFound);
app.use(errorHandler);

// Start server
try {
  app.listen(PORT, (): void => {
    console.log(`Server is running on port ${PORT} 🚀`);
  });
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error occured: (${error.name}: ${error.message})`);
  }
}
