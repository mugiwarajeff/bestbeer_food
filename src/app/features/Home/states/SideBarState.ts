import { atom } from "recoil";

export const sideBarState = atom<boolean>(
    {
        key: "sideBarState",
        default: true
    }
);