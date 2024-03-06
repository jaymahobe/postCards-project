import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import PostList from "./Post/PostList";
import Signup from "./Auth/Signup";
import Protected from "./Auth/Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <PostList />
      </Protected>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
