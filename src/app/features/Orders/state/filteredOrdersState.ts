import { selector } from "recoil";
import { ordersSearchState } from "./ordersSearch.State";
import { ordersState } from "./ordersState";

export const filteredOrderList = selector({
    key: "FilteredTodoList",
    get: ({ get }) => {
        const filter = get(ordersSearchState);
        const list = get(ordersState);

        if (filter === "") {
            return list;
        }

        return list.filter((item) => item.id.toString() === filter);
    },
});