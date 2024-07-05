import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";

import Detail from "../views/Detail";
const url = "https://server.gc1-arifghiffari.online";
const router = createBrowserRouter([
  {
    path: "",
    element: <Home url={url} />,
  },
  {
    path: "detail/:id",
    element: <Detail url={url} />,
  },
]);

export default router;
