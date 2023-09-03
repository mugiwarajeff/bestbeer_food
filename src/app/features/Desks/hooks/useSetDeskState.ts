import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import { desksState } from "../states/desksState";
import { IDesk } from "../interfaces/IDesk";

export default function useSetDesksState(): SetterOrUpdater<IDesk[]>{
    const setDeskState  =  useSetRecoilState(desksState); 

    return setDeskState;
}