import routerType from "app/types/routerTypes";
import Login from "./Login/Login";
import Home from "./Home/Home";


const pagesData: routerType[] = [
    {
        title: "Login",
        path: "/login",
        element: <Login />
    }, {
        title: "Home",
        path: "/home",
        element: <Home />
    }
];

export default pagesData;