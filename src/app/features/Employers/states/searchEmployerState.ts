import { atom } from "recoil";

export const employersSearchState = atom<string>(
    {
        default: "",
        key: "employersSearchState"
    }
);