import { NextFunction, Request, Response } from "express";

export const catchingErrors = <Params, ResBody, ReqBody>(
  controller: (
    req: Request<Params, ResBody, ReqBody>,
    res: Response<ResBody>,
    next: NextFunction
  ) => Promise<void>
) => {
  return async (
    req: Request<Params, ResBody, ReqBody>,
    res: Response<ResBody>,
    next: NextFunction
  ) => {
    controller(req, res, next).catch((error) => next(error));
  };
};
