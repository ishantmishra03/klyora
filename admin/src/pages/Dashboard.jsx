import { useAppContext } from "../context/AppContext";
import { LogOut, PlusCircle, ShoppingBag, BaggageClaim } from "lucide-react";
import { Link } from 'react-router-dom';

const sampleOrders = [
  {
    id: "ORD123",
    customer: "Raj Shrestha",
    product: "Leather Backpack",
    date: "2025-06-20",
    image:
      "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=640",
    price: 79.99,
    status: "Delivered",
  },
  {
    id: "ORD124",
    customer: "Anjali Rana",
    product: "Minimal Watch",
    date: "2025-06-19",
    image:
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=640",
    price: 49.99,
    status: "Pending",
  },
  {
    id: "ORD125",
    customer: "Bikash Lama",
    product: "Vintage Sunglasses",
    date: "2025-06-18",
    image:
      "https://images.pexels.com/photos/1837591/pexels-photo-1837591.jpeg?auto=compress&cs=tinysrgb&w=640",
    price: 39.99,
    status: "Shipped",
  },
];

export default function Dashboard() {
  const { logout } = useAppContext();

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

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-lavender-tint/40 border-r border-cool-gray p-4 space-y-4">
          <button className="flex items-center gap-2 w-full px-4 py-2 rounded-xl bg-lavender-tint">
            <PlusCircle size={18} />
            Dashboard
          </button>
          <Link
            to="/products"
            className="flex items-center gap-2 w-full px-4 py-2 rounded-xl"
          >
            <BaggageClaim size={18} />
            Products
          </Link>
          <Link to="/add-product" className="flex items-center gap-2 w-full px-4 py-2 rounded-xl hover:bg-lavender-tint transition">
            <PlusCircle size={18} />
            Add Product
          </Link>
          <Link to="/orders" className="flex items-center gap-2 w-full px-4 py-2 rounded-xl hover:bg-lavender-tint transition">
            <ShoppingBag size={18} />
            Orders
          </Link>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-serif font-bold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {sampleOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl border border-cool-gray shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={order.image}
                    alt={order.product}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{order.product}</h3>
                    <p className="text-sm text-silver-mist">{order.customer}</p>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0 text-center sm:text-right">
                  <p className="font-medium">${order.price.toFixed(2)}</p>
                  <p
                    className={`text-sm font-medium ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Shipped"
                        ? "text-indigo-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </p>
                  <p className="text-xs text-cool-gray">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
