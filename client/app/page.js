'use client'

import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUser, logoutUser } from '../redux/slices/authSlice';
import axios from '../config/axios';

const Home = () => {
  const dispatch = useDispatch();

  //Check if user is already loggedIn
  const fetchUser = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/auth/isAuth');
      if (data.success) {
        dispatch(setUser(data.user));
      } else {
        dispatch(logoutUser());
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser])

  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return <div className="mt-40">Hello, {user?.name || 'Guest'}</div>;
};

export default Home;