import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import Skeleton from "./components/pages/Skeleton";
import NotFound from "./components/pages/NotFound";
import Profile from "./components/pages/Profile";
import Home from "./components/pages/Home";
import NewPage from "./components/pages/NewPage";
import Cart from "./components/pages/Cart";
import OrderDetails from "./components/pages/OrderDetails";
import Login from "./components/pages/Login";
import UserAllItems from "./components/pages/UserAllItems.jsx";

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
    <Route path="/" element={<App />}>
      <Route element={<Skeleton />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="profile/:userId" element={<Profile />} />
        <Route path="newpage/:userId" element={<NewPage />} />
        <Route path="cart/:userId" element={<Cart />} />
        <Route path="orderdetails/:orderId" element={<OrderDetails />} />
        <Route path="userallitems/:userId" element={<UserAllItems />} />
      </Route>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
