import routerType from "app/types/routerTypes";
import Login from "./Login/Login";
import Home from "./Home/home";

const pagesData: routerType[] = [
    {
        title: "Login",
        path: "/",
        element: <Login />
    }, {
        title: "Home",
        path: "/home",
        element: <Home />
    }
];

export default pagesData;