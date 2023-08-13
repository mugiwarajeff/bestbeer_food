import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { acessTokenAtom } from "../state/tokenAtom";

export function useAcessToken() : string {
    const acessToken = useRecoilValue(acessTokenAtom);

    return acessToken;
}

export function useSetAcessToken(): SetterOrUpdater<string> {
    const setAcessToken = useSetRecoilState(acessTokenAtom);

    return setAcessToken;
}