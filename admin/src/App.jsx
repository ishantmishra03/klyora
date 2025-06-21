import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ListOrders from './pages/ListOrders';
import AddProduct from './pages/AddProduct';

import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
        <Route path='/add-product' element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        }/>
        <Route path='/orders' element={
          <ProtectedRoute>
            <ListOrders />
          </ProtectedRoute>
        }/>
      </Routes>
    </div>
  )
}

export default App
