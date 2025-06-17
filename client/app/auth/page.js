'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../config/axios';
import { setUser, setLoading } from '../../redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function Auth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const loading = useSelector((state) => state.auth.loading);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  //Handle Auth Functionality
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      if (isLogin) {
        const { data } = await axios.post('/api/auth/login', { email: form.email, password: form.password });
        if (data.success) {
          dispatch(setUser(data.user));
          router.push('/');
          toast.success(data.message);
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post('/api/auth/register', { name: form.name, email: form.email, password: form.password });
        if (data.success) {
          dispatch(setUser(data.user));
          router.push('/');
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4 bg-[#FDFDFD] inter">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-md border border-[#DCE0E6]">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-[#0A1F44]">
          {isLogin ? 'Welcome Back' : 'Create Your Account'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-[#3C4A9A] mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 text-sm border border-[#DCE0E6] rounded-lg focus:ring-2 focus:ring-[#3C4A9A] outline-none transition"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-[#3C4A9A] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 text-sm border border-[#DCE0E6] rounded-lg focus:ring-2 focus:ring-[#3C4A9A] outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#3C4A9A] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 text-sm border border-[#DCE0E6] rounded-lg focus:ring-2 focus:ring-[#3C4A9A] outline-none transition"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className={`w-full py-3 mt-2 text-white font-semibold rounded-lg hover:opacity-90 transition bg-[#0A1F44]`}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-[#C1C7D0] mt-6">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className={`text-[#3C4A9A] font-medium hover:underline transition cursor-pointer`}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </main>
  );
}
