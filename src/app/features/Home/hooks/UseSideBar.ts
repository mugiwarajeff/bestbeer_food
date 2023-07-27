import { useSetRecoilState, useRecoilValue } from "recoil";
import { sideBarState } from "../states/SideBarState";

export const setSideBarState = () => {
    return useSetRecoilState(sideBarState);
};

export const getSidebarState = (): boolean => {
    const state = useRecoilValue(sideBarState);
    return state;
};