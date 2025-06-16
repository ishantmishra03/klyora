'use client'

import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  return <div>Hello, {user || 'Guest'}</div>;
};

export default Home;
