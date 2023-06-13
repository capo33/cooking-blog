import { Request, Response, NextFunction } from "express";

interface AsyncHandler {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

const asyncHandler =
  (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncHandler;
