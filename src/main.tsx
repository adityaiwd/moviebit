import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { store } from "@/app/store";
import { router } from "@/router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <div className="w-100 py-4 flex justify-center items-center gap-4 bg-white/5 shadow-md">
        <img src="/moviebit-logo.webp" alt="MovieBit" className="w-32" />
        <p className="font-black text-2xl">
          Movie <br />
          Bit.
        </p>
      </div>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </Provider>
  </StrictMode>
);
