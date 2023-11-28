import { selector } from "recoil";
import { employersSearchState } from "./searchEmployerState";
import { employersState } from "./EmployersState";

export const filteredEmploersState = selector({
    key: "FilteredEmployers",
    get: ({ get }) => {
        const filter = get(employersSearchState);
        const list = get(employersState);

        if (filter === "") {
            return list;
        }


        return list.filter((item) => item.user === filter);

    }
},
);