import classes from "./App.module.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Index } from "./routes/Index";
import { Overlay } from "./routes/Overlay";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "overlay",
    element: <Overlay />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
