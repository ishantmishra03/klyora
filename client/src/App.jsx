import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/authSlice";
import { fetchCart } from './redux/slices/cartSlice';
import axios from "./config/axios";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Logout from "./pages/Logout/Logout";
import Auth from "./pages/Auth/Auth";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Orders from './pages/Orders';
import Cart from "./pages/Cart/Cart";
import Checkout from './pages/Checkout';
import Success from './pages/Stripe/Success';
import Cancel from './pages/Stripe/Cancel';
import ProtectedRoute from "./config/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/auth/isAuth");
      if (data.success) {
        dispatch(setUser(data.user));
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUser();
    dispatch(fetchCart());
  }, [fetchUser]);

  useEffect(() => {
  if (location.pathname === "/auth") {
    // If user is already logged in, redirect away
    axios.get("/api/auth/isAuth").then(({ data }) => {
      if (data.success) {
        navigate("/");
      }
    });
  }
}, [location, navigate]);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cancel"
          element={
            <ProtectedRoute>
              <Cancel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
