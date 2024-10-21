export interface UserRegisterDTO {
  name: string;
  DNI: number;
  email: string;
  birthdate: Date;
  username: string;
  password: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface UserDTO {
  id: number;
  name: string;
  email: string;
}
