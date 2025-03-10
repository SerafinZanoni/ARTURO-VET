import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credentials.entity";

export const CredentialRepository: Repository<Credential> =
  AppDataSource.getRepository(Credential);
