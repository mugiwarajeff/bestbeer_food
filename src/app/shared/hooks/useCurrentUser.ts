import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserAtom } from "../state/userAtom";
import { IUser } from "../interfaces/user";

export function useCurrentUser() : IUser | null {
    const currentUser = useRecoilValue(currentUserAtom);

    return currentUser;
}

export function useSetCurrentUser() : SetterOrUpdater<IUser | null> {
    const setCurrentUser = useSetRecoilState(currentUserAtom);

    return setCurrentUser;
}