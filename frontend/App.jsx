import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/owner/Dashboard';
import MenuManager from './pages/owner/MenuManager';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/owner/dashboard" element={<Dashboard />} />
        <Route path="/owner/menu" element={<MenuManager />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
