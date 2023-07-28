import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserAtom } from "../state/userAtom";
import { IUser } from "app/features/Login/interfaces/users";

export function useCurrentUser() : IUser {
    const currentUser = useRecoilValue(currentUserAtom);

    return currentUser;
}

export function useSetCurrentUser() : SetterOrUpdater<IUser> {
    const setCurrentUser = useSetRecoilState(currentUserAtom);

    return setCurrentUser;
}