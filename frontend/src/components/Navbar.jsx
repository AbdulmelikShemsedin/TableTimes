import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-green-700">TableTimes</Link>
      <div className="space-x-4">
        <Link to="/restaurants" className="text-gray-700 hover:text-green-700">Browse</Link>

        {user && user.role === 'customer' && (
          <>
            <Link to="/cart" className="text-gray-700 hover:text-green-700">Cart</Link>
            <Link to="/orders" className="text-gray-700 hover:text-green-700">My Orders</Link>
          </>
        )}

        {user && user.role === 'owner' && (
          <>
            <Link to="/owner/dashboard" className="text-gray-700 hover:text-green-700">Dashboard</Link>
            <Link to="/owner/orders" className="text-gray-700 hover:text-green-700">Orders</Link>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" className="text-gray-700 hover:text-green-700">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-green-700">Register</Link>
          </>
        )}

        {user && (
          <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
