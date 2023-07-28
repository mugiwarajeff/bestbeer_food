import { IUser } from "app/features/Login/interfaces/users";
import { atom } from "recoil";

export const currentUserAtom = atom<IUser>({
    key: "currentUserAtom",
    default: {user: "", password: "", role: ""}
});