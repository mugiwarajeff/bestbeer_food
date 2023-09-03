import Login from "./Login/Login";
import Desks from "./Desks/Desks";
import Orders from "./Orders/Orders";
import Products from "./Products/Products";
import Stocks from "./Stocks/Stocks";
import Employers from "./Employers/Employers";
import Home from "./Home/home";
import routerType from "app/shared/interfaces/routerTypes";
import ProtectedRoute from "app/shared/utils/protectedRoute";


const pagesData: routerType[] = [
    {
        title: "Login",
        path: "/login",
        element: <Login />
    }, 
    {
        title: "Home",
        path: "/home",
        element: <ProtectedRoute> <Home/> </ProtectedRoute> ,
        childrens: [
            {
            title: "Desks", 
            element:  <Desks/>, 
            path: "desks"
            },
            {
                title: "Orders", 
                element: <Orders/>, 
                path: "orders"
            },
            {
                title: "Products", 
                element: <Products/>, 
                path: "products"
            },
            {
                title: "Stocks", 
                element: <Stocks/>, 
                path: "stocks"
            },
            {
                title: "Employers", 
                element: <Employers/>, 
                path: "employers"
            },
            
        ]
    },

];

export default pagesData;