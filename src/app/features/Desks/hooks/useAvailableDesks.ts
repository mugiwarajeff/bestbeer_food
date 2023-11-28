import { useRecoilValue } from "recoil";
import { IDesk } from "../interfaces/IDesk";
import { desksState } from "../states/desksState";

export function useAvailableDesks(): IDesk[] {
    const desks: IDesk[] = useRecoilValue(desksState);

    return desks.filter((desk: IDesk) => desk.available === true);
}