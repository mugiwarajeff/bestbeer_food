import { atom } from "recoil";


export const deskFormState = atom<boolean>(
    {
        default: false,
        key: "deskFormState"
    });