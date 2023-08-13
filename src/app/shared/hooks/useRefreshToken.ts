import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { refreshTokenAtom } from "../state/tokenAtom";

export function useRefreshToken() : string {
    const refreshToken = useRecoilValue(refreshTokenAtom);

    return refreshToken;
}

export function useSetRefreshToken(): SetterOrUpdater<string> {
    const setRefreshToken = useSetRecoilState(refreshTokenAtom);

    return setRefreshToken;
}