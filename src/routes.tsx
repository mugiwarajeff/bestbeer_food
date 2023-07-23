import { BrowserRouter, Routes, Route } from "react-router-dom";
import pagesData from "app/features/pagesData";
import routerType from "app/types/routerTypes";
import Login from "app/features/Login/Login";
import Home from "app/features/Home/Home";
import Desks from "app/features/Desks/Desks";


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
        <BrowserRouter>
            <Routes>
                {pageRoutes}
            </Routes>
        </BrowserRouter>
    );


}