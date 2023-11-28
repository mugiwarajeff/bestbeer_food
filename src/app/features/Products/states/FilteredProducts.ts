import { selector } from "recoil";
import { productSearch } from "./ProductSearchState";
import { productsState } from "./ProductState";

export const useFilteredProducts = selector({
    key: "FilteredProductsList",
    get: ({ get }) => {
        const filter = get(productSearch);
        const list = get(productsState);

        if (filter === "") {
            return list;
        }

        return list.filter((item) => item.name === filter);
    },
});