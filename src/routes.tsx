import { BrowserRouter, Routes, Route } from "react-router-dom";
import pagesData from "app/features/pagesData";
import routerType from "app/types/routerTypes";


export default function RouteContainer() {

    const pageRoutes = pagesData.map(
        (pageData: routerType) => <Route
            key={pageData.title}
            path={pageData.path}
            element={pageData.element} />
    );

    return (
        <BrowserRouter>
            <Routes>
                {pageRoutes}
            </Routes>
        </BrowserRouter>
    );


}