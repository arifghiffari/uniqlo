// import Card from "./components/Card";

import Footer from "./components/Footer";

import { RouterProvider } from "react-router-dom";
import router from "./routers";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <br />
      <br />

      <Footer />
    </>
  );
}

export default App;
