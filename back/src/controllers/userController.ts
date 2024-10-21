import { Request, Response } from "express";
import {
  registerUserService,
  getUserService,
  getUserByIdService,
  loginUserService,
} from "../services/userService";
import { UserRegisterDTO, UserLoginDTO, UserDTO } from "../dtos/UserDTO";
import { User } from "../interFaces/UserInterface";

export const getUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const serviceResponse: UserDTO[] = await getUserService();
    res
      .status(200)
      .json({ message: "Users loaded successfully", data: serviceResponse });
  } catch (error) {
    res.status(500).json({ message: "Users not loaded", error: error });
  }
};

export const getUserByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const serviceResponse: UserDTO = await getUserByIdService(id);
    res
      .status(200)
      .json({ message: "User loaded successfully", data: serviceResponse });
  } catch (error) {
    res.status(500).json({ message: "User not created", error: error });
  }
};

export const registrerUserController = async (
  req: Request<unknown, unknown, UserRegisterDTO>,
  res: Response
): Promise<void> => {
  try {
    const serviceResponse: User = await registerUserService(req.body);
    res
      .status(200)
      .json({ message: "User created successfully", data: serviceResponse });
  } catch (error) {
    res.status(500).json({ message: "User not created", error: error });
  }
};

export const loginUserController = async (
  req: Request<unknown, unknown, UserLoginDTO>,
  res: Response
): Promise<void> => {
  try {
    const serviceResponse: UserLoginDTO = await loginUserService(req.body);
    res
      .status(200)
      .json({ message: "User logged in successfully", data: serviceResponse });
  } catch (error) {
    res.status(500).json({ message: "User not logged in", error: error });
  }
};
