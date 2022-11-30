import { createBrowserRouter } from "react-router-dom";
import Blog from "../../Blog/Blog";
import AddProduct from "../AddProduct/AddProduct";
import AllBuyer from "../AllBuyer/AllBuyer";
import AllSeller from "../AllSeller/AllSeller";
import Home from "../Home/Home";
import Main from "../Layout/Main";
import Login from "../Login/Login";
import MyBuyers from "../MyBuyers/MyBuyers";
import MyOrders from "../MyOrders/MyOrders";
import MyProduct from "../MyProduct/MyProduct";
import Phones from "../Phones/Phones";
import Register from "../Register/Register";
import PrivetRouter from "./PrivetRouter";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/phones/:id",
        element: (
          <PrivetRouter>
            <Phones />
          </PrivetRouter>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/phones/${params.id}`),
      },
      { path: "/register", element: <Register /> },
      {
        path: "/addproduct",
        element: (
          <PrivetRouter>
            <AddProduct />
          </PrivetRouter>
        ),
      },
      {path:"/blog",element:<Blog/>},
      {
        path: "/myproduct",
        element: (
          <PrivetRouter>
            <MyProduct />
          </PrivetRouter>
        ),
      },
      {
        path: "/mybuyers",
        element: (
          <PrivetRouter>
            <MyBuyers />
          </PrivetRouter>
        ),
      },
      {
        path: "/myorders",
        element: (
          <PrivetRouter>
            <MyOrders />
          </PrivetRouter>
        ),
      },
      { path: "/login", element: <Login /> },
      {
        path: "/allseller",
        element: (
          <PrivetRouter>
            <AllSeller />
          </PrivetRouter>
        ),
      },
      {
        path: "/allbuyer",
        element: (
          <PrivetRouter>
            <AllBuyer />
          </PrivetRouter>
        ),
      },
    ],
  },
]);