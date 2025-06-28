import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";

export default function Success() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-3xl font-bold text-midnight-blue">Payment Successful! 🎉</h1>
  </div>;
}
