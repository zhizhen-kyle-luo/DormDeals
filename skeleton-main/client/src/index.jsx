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
import UserReviews from "./components/pages/UserReviews.jsx";
import UserPurchases from "./components/pages/UserPurchases.jsx";
import Instructions from "./components/pages/Instructions.jsx";
import Purchase from "./components/pages/purchase.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Use localhost Client ID
const GOOGLE_CLIENT_ID = "389341642898-aifd0k55aa53c4g1uvvh6krv1480956r.apps.googleusercontent.com";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/login" element={<Login />} />
      {/* <Route element={<Skeleton />}> */}

      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="Profile/:userId" element={<Profile />} />
      <Route path="NewPage/:userId" element={<NewPage />} />
      <Route path="OrderDetails/:orderId" element={<OrderDetails />} />
      <Route path="UserAllItems/:userId" element={<UserAllItems />} />
      <Route path="UserReviews/:userId" element={<UserReviews />} />
      <Route path="UserPurchases/:userId" element={<UserPurchases />} />
      <Route path="Instructions" element={<Instructions />} />
      <Route path="cart/" element={<Cart />} />
      <Route path="purchase" element={<Purchase />} />
      {/* </Route> */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
