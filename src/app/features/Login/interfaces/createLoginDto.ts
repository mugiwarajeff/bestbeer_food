import { IUser } from "app/shared/interfaces/user";

export interface CreateLoginDto {
    user: IUser,
    accessToken: string,
    refreshToken: string
}