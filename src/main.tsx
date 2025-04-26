import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import MainRoute from "./routes/MainRoute.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={MainRoute} />
    </Provider>
  </StrictMode>
);
