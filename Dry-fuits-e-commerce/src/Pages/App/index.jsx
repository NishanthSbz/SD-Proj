import { useRoutes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../Context/AuthContext"; // Import AuthProvider
import Home from "../Home";
import MyAccount from "../MyAccount";
import MyOrder from "../MyOrder";
import MyOrders from "../MyOrders";
import NotFound from "../NotFound";
import SignIn from "../SignIn";
import Navbar from "../../Components/Navbar";
import CheckoutSideMenu from "../../Components/CheckoutSideMenu/CheckoutSideMenu";
import PrivateRoute from "../../routes/PrivateRoute"; // Import PrivateRoute

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/clothes", element: <Home /> },
    { path: "/electronics", element: <Home /> },
    { path: "/furnitures", element: <Home /> },
    { path: "/toys", element: <Home /> },
    { path: "/others", element: <Home /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "*", element: <NotFound /> },

    // Protected Routes
    { path: "/my-account", element: <PrivateRoute><MyAccount /></PrivateRoute> },
    { path: "/my-order", element: <PrivateRoute><MyOrder /></PrivateRoute> },
    { path: "/my-orders", element: <PrivateRoute><MyOrders /></PrivateRoute> },
    { path: "/my-orders/last", element: <PrivateRoute><MyOrder /></PrivateRoute> },
    { path: "/my-orders/:id", element: <PrivateRoute><MyOrder /></PrivateRoute> },
  ]);
  return routes;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
