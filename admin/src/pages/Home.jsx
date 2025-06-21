import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext'; 
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { toast } from 'react-hot-toast';

export default function AdminLogin() {
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard'); 
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/login', form);
      if (res.data.success) {
        toast.success('Logged in');
        setIsLoggedIn(true);
        navigate('/dashboard');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-soft-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-cool-gray rounded-2xl shadow-lg p-6 max-w-sm w-full"
      >
        <h2 className="text-2xl font-serif text-midnight-blue mb-4">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border border-cool-gray rounded-xl"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border border-cool-gray rounded-xl"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-midnight-blue text-white py-2 rounded-xl hover:bg-royal-indigo transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
