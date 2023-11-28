import { useRecoilValue } from "recoil";
import { desksState } from "../states/desksState";
import { IDesk } from "../interfaces/IDesk";

export default function useDesksStateValue(): IDesk[]{
    const setDeskState  =  useRecoilValue(desksState); 

    return setDeskState;
}