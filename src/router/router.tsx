import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../components/home";
import Animals from "../components/animals";
import AnimalDetail from "../components/animalDetail";
import { animalsLoader, animalByIdLoader } from "../loader/animalsLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "animals", element: <Animals />, loader: animalsLoader },
      { path: "animals/:id", element: <AnimalDetail />, loader: animalByIdLoader },
    ],
  },
]);

export default router;