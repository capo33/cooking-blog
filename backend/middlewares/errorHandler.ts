import { Request, Response, NextFunction } from "express";

export interface ErrnoException extends Error {
  stack?: string;
  statusCode?: number;
  kind?: string;
}

const errorHandler = (
  err: ErrnoException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Check for Mongoose bad ObjectId
  if (err.message === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🍮" : err.stack,
  });
};

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`) as ErrnoException;
  error.statusCode = 404;
  res.status(404).json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "🍮" : error.stack, // only show stack in development mode
  });
  next(error);
};

export { errorHandler, notFound };