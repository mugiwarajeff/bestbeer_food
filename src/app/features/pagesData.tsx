import routerType from "app/types/routerTypes";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Desks from "./Desks/Desks";
import Orders from "./Orders/Orders";
import Products from "./Products/Products";
import Stocks from "./Stocks/Stocks";
import Employers from "./Employers/Employers";


const pagesData: routerType[] = [
    {
        title: "Login",
        path: "/login",
        element: <Login />
    }, 
    {
        title: "Home",
        path: "/home",
        element:  <Home />,
        childrens: [
            {
            title: "Desks", 
            element: <Desks/>, 
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