import { atom } from "recoil";

export const acessTokenAtom = atom<string>(
    {
        key: "tokenAtom",
        default: ""
    });

export const refreshTokenAtom = atom<string>(
    {
        key: "refreshTokenAtom",
        default: ""
    }
    );