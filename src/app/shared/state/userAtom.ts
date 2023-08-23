
import { atom } from "recoil";
import { IUser } from "../interfaces/user";

export const currentUserAtom = atom<IUser | null>({
    key: "currentUserAtom",
    default: null
});