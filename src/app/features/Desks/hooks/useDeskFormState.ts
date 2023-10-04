import { SetterOrUpdater, useRecoilState } from "recoil";
import { deskFormState } from "../states/formState";

export default function useDeskFormState(): [boolean, SetterOrUpdater<boolean>] {
    const useDeskForm = useRecoilState(deskFormState);
    return useDeskForm;
}