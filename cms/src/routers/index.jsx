import { createBrowserRouter, redirect } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import Products from "../views/Products";
import Category from "../views/Category";
import AddUser from "../views/AddUser";
import Login from "../views/Login";
import SimpleSidebar from "../components/SideBar";
import NewProduct from "../views/NewProduct";
import ProductEdit from "../views/ProductEdit";
import EditImage from "../views/editImage";

// const toast = useToast();
const url = "https://server.gc1-arifghiffari.online";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login url={url} />,
    loader: () => {
      if (localStorage.token) {
        // console.log("udh login bos");
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <SimpleSidebar />,
    loader: () => {
      if (!localStorage.token) {
        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/",
        element: <Products url={url} />,
      },
      {
        path: "/category",
        element: <Category url={url} />,
      },
      {
        path: "/add-user",
        element: <AddUser url={url} />,
      },
    ],
  },
  {
    path: "new-product",
    element: <NewProduct url={url} />,
  },
  {
    path: "/edit/:id",
    element: <ProductEdit url={url} />,
  },
  {
    path: "/edit-image/:id",
    element: <EditImage url={url} />,
  },
]);

export default router;
