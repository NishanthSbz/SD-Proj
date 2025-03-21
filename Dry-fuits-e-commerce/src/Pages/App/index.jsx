import PropTypes from "prop-types";
import { useRoutes, BrowserRouter, Navigate } from "react-router-dom";
import { AppProvider } from "@/Context";

import { AuthProvider } from "@/Context/auth"; // AuthContext is the context that will be used to store the user's data
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import CheckoutSideMenu from "@/Components/CheckoutSideMenu";
import "./App.css";

import Home from "../Home/Home";
import MyOrder from "../MyOrder/MyOrder";
import MyOrders from "../MyOrders/MyOrders";
import NotFound from "../NotFound";
import MyAccount from "../MyAccount/MyAccount";
import SignIn from "../SignIn";
// import Logout from "../Logout";

// Implementing the Private and Public Routes:
import { useAuth } from "@/Context/auth"; // make sure you have a useAuth hook in your auth context

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/sign-in" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : children;
};
PublicRoute.propTypes = {
  children: PropTypes.node,
};

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/smartphones", element: <Home /> },
    { path: "/laptops", element: <Home /> },
    { path: "/fragrances", element: <Home /> },
    { path: "/skincare", element: <Home /> },
    { path: "/groceries", element: <Home /> },
    { path: "/home-decoration", element: <Home /> },
    // Private Routes
    {
      path: "/my-order",
      element: (
        <PrivateRoute>
          <MyOrder />
        </PrivateRoute>
      ),
    },
    {
      path: "/my-orders",
      element: (
        <PrivateRoute>
          <MyOrders />
        </PrivateRoute>
      ),
    },
    {
      path: "/my-orders/last",
      element: (
        <PrivateRoute>
          <MyOrder />
        </PrivateRoute>
      ),
    },
    {
      path: "/my-orders/:id",
      element: (
        <PrivateRoute>
          <MyOrder />
        </PrivateRoute>
      ),
    },
    {
      path: "/my-account",
      element: (
        <PrivateRoute>
          <MyAccount />
        </PrivateRoute>
      ),
    },
    // {
    //   path: "/logout",
    //   element: (
    //     <PrivateRoute>
    //       <Logout />
    //     </PrivateRoute>
    //   ),
    // },
    // Public Routes
    {
      path: "/sign-in",
      element: (
        <PublicRoute>
          <SignIn />
        </PublicRoute>
      ),
    },
    // Not Found
    { path: "*", element: <NotFound /> },
  ]);
  return routes;
};

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ma className="flex min-h-screen flex-col">
          <AuthProvider>
            <AppRoutes />
            <Navbar />
            <CheckoutSideMenu />
            {/* Content above Footer should grow to push Footer to the bottom */}
            <div className="flex-grow"></div>
          </AuthProvider>
          <Footer />
        </ma>
      </BrowserRouter>
    </AppProvider>
  );
};
export default App;
