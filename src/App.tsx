import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FirebaseAppProvider } from "reactfire";
import { Firebase } from "./components/Firebase";
import { Index } from "./routes/index";
import { Console } from "./routes/console/$userId";
import { Overlay } from "./routes/overlay/$userId";
import { Test } from "./test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "overlay/:userId",
    element: <Overlay />,
  },
  {
    path: "console/:userId",
    element: <Console />,
  },
  {
    path: "test",
    element: <Test />,
  },
]);

const firebaseConfig = {
  apiKey: "AIzaSyAvj2YRPK5ZYBB2bv8lLy_ZC9xko3ojglM",
  authDomain: "splathon-streamkit.firebaseapp.com",
  projectId: "splathon-streamkit",
  storageBucket: "splathon-streamkit.appspot.com",
  messagingSenderId: "1099025681432",
  appId: "1:1099025681432:web:76825cc25e3ecf6b1b476d",
};

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Firebase>
        <RouterProvider router={router} />
      </Firebase>
    </FirebaseAppProvider>
  );
}

export default App;
