import { IUser } from "app/shared/interfaces/user";
import { ILogin } from "./login";
import { CreateLoginDto } from "./createLoginDto";

export interface ILoginService {

    createLogin: (login: ILogin) => Promise<CreateLoginDto>
}