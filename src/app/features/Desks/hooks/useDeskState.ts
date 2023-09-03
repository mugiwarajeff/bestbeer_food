import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";
import { desksState } from "../states/desksState";
import { IDesk } from "../interfaces/IDesk";

export default function useDeksState(): [IDesk[], SetterOrUpdater<IDesk[]>]{
    const deskState = useRecoilState(desksState); 
    return deskState;
}