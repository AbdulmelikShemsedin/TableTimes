// src/pages/owner/Dashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantForm from '../../../components/RestaurantForm';

function Dashboard() {
  const [restaurant, setRestaurant] = useState(null);
  const [editing, setEditing] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/restaurants/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setRestaurant(res.data);
    }).catch(() => {
      setRestaurant(null); // no restaurant yet
    });
  }, [token]);

  const handleCreate = async (formData) => {
    const res = await axios.post('http://localhost:5000/api/restaurants', formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRestaurant(res.data);
    setEditing(false);
  };

  const handleUpdate = async (formData) => {
    const res = await axios.put(`http://localhost:5000/api/restaurants/${restaurant._id}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRestaurant(res.data);
    setEditing(false);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Restaurant</h1>

      {restaurant && !editing && (
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl font-semibold">{restaurant.name}</h2>
          <p>{restaurant.description}</p>
          <p className="text-gray-600">{restaurant.location} • {restaurant.category}</p>
          <button onClick={() => setEditing(true)} className="mt-4 text-blue-600">Edit</button>
        </div>
      )}

      {!restaurant || editing ? (
        <RestaurantForm
          initialData={restaurant}
          onSubmit={restaurant ? handleUpdate : handleCreate}
        />
      ) : null}
    </div>
  );
}

export default Dashboard;
