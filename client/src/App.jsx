import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/authSlice";
import axios from "./config/axios";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Logout from "./pages/Logout/Logout";
import Auth from "./pages/Auth/Auth";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart/Cart";
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
      </Routes>
    </div>
  );
};

export default App;
