import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  LogOut,
  PlusCircle,
  ShoppingBag,
  Trash2,
  HomeIcon,
  BaggageClaim,
} from "lucide-react";

const sampleOrders = [
  {
    id: "ORD001",
    customer: "Aayush Sharma",
    product: "Travel Backpack",
    image:
      "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=640",
    price: 69.99,
    status: "Pending",
    date: "2025-06-20",
  },
  {
    id: "ORD002",
    customer: "Nikita Joshi",
    product: "Classic Sunglasses",
    image:
      "https://images.pexels.com/photos/1837591/pexels-photo-1837591.jpeg?auto=compress&cs=tinysrgb&w=640",
    price: 39.99,
    status: "Shipped",
    date: "2025-06-18",
  },
];

export default function AdminOrders() {
  const { navigate, logout } = useAppContext();
  const [orders, setOrders] = useState(sampleOrders);

  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const deleteOrder = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirm) {
      setOrders((prev) => prev.filter((order) => order.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-soft-white text-midnight-blue">
      {/* Navbar */}
      <nav className="bg-midnight-blue text-soft-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-2xl font-bold tracking-wide font-serif">
          Klyora
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-soft-white text-midnight-blue px-4 py-2 rounded-full hover:bg-lavender-tint transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </nav>

      {/* Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-lavender-tint/40 border-r border-cool-gray p-4 space-y-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-xl"
          >
            <HomeIcon size={18} />
            Dashboard
          </button>
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-xl"
          >
            <BaggageClaim size={18} />
            Products
          </button>
          <button
            onClick={() => navigate("/add-product")}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-xl hover:bg-lavender-tint transition"
          >
            <PlusCircle size={18} />
            Add Product
          </button>
          <button
            onClick={() => navigate("orders")}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-xl bg-lavender-tint"
          >
            <ShoppingBag size={18} />
            Orders
          </button>
        </aside>

        {/* Orders List */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-serif font-bold mb-4">Manage Orders</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl border border-cool-gray shadow-sm"
              >
                {/* Order Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={order.image}
                    alt={order.product}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{order.product}</h3>
                    <p className="text-sm text-silver-mist">{order.customer}</p>
                    <p className="text-xs text-cool-gray">{order.date}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="px-3 py-2 rounded-md border border-cool-gray text-sm bg-soft-white focus:outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>

                  <div className="text-lg font-medium">
                    ${order.price.toFixed(2)}
                  </div>

                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="p-2 rounded-full text-red-600 hover:bg-red-100 transition"
                    title="Delete Order"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
