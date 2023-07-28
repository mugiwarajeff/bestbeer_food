import { BrowserRouter, Routes, Route } from "react-router-dom";
import pagesData from "app/features/pagesData";
import { RecoilRoot } from "recoil";
import routerType from "app/shared/types/routerTypes";


export default function RouteContainer() {

    function mappingDataInRoutes(pagesData: routerType[] | undefined) {

        return pagesData?.map((pagedata: routerType) => <Route
            key={pagedata.title}
            path={pagedata.path}
            element={pagedata.element}
        >
            {mappingDataInRoutes(pagedata.childrens)}
        </Route>);
    }

    const pageRoutes = mappingDataInRoutes(pagesData);


    return (
        <RecoilRoot>
            <BrowserRouter>
                <Routes>
                    {pageRoutes}
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    );


}