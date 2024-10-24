import { Request, Response } from "express";
import {
  registerUserService,
  getUserService,
  getUserByIdService,
  loginUserService,
} from "../services/userService";
import {
  UserRegisterDTO,
  UserLoginDTO,
  UserDTO,
  UserCredentialDTO,
} from "../dtos/UserDTO";
import { User } from "../entities/User.entity";

import { catchingErrors } from "../utils/catchingErrors";

const getUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const serviceResponse: UserDTO[] = await getUserService();
  res
    .status(200)
    .json({ message: "Users loaded successfully", data: serviceResponse });
};

const getUserByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const serviceResponse: UserDTO = await getUserByIdService(id);
  res
    .status(200)
    .json({ message: "User loaded successfully", data: serviceResponse });
};

const registrerUserController = async (
  req: Request<unknown, unknown, UserRegisterDTO>,
  res: Response
): Promise<void> => {
  const serviceResponse: User = await registerUserService(req.body);
  res
    .status(201)
    .json({ message: "User created successfully", data: serviceResponse });
};

const loginUserController = async (
  req: Request<unknown, unknown, UserCredentialDTO>,
  res: Response
): Promise<void> => {
  const serviceResponse: UserLoginDTO = await loginUserService(req.body);
  res.status(200).json({ data: serviceResponse });
};

const userControllers = {
  getUsersController: catchingErrors(getUsersController),
  getUserByIdController: catchingErrors(getUserByIdController),
  registrerUserController: catchingErrors(registrerUserController),
  loginUserController: catchingErrors(loginUserController),
};

export default userControllers;
