import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

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
      </Routes>
    </div>
  )
}

export default App
