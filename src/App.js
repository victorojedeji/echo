import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./lib/routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
