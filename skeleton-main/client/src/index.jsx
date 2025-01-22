import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import Skeleton from "./components/pages/Skeleton";
import NotFound from "./components/pages/NotFound";
import Profile from "./components/pages/Profile";
import Home from "./components/pages/Home";
import NewPage from "./components/pages/NewPage";
import Cart from "./components/pages/Cart";
import ItemCard from "./components/pages/ItemCard.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = "190074658805-371tjs3v0qjskhk7taih29hb9230t857.apps.googleusercontent.com";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<Skeleton />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/NewPage/:userId" element={<NewPage />} />
      <Route path="/Cart/:userId" element={<Cart />} />
    </Route>
  )
);

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
