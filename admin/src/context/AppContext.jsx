import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "../config/axios";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getUserData = async () => {
    try {
      const { data } = await axios.get("/api/admin/isAuth");
      if (data.success) {
        setIsLoggedIn(true);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/admin/logout");
      setIsLoggedIn(false);
      toast.success("Logged out");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const value = {
    navigate,
    isLoggedIn,
    setIsLoggedIn,
    logout,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
