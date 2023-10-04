import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { deskFormState } from "../states/formState";

export default function useSetDeskFormState(): SetterOrUpdater<boolean> {
    const setDeskForm = useSetRecoilState(deskFormState);

    return setDeskForm;
}