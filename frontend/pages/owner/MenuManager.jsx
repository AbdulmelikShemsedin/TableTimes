// src/pages/owner/MenuManager.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import MenuItemForm from '../../components/MenuItemForm';
import MenuItemCard from '../../components/MenuItemCard';

function MenuManager() {
  const [restaurantId, setRestaurantId] = useState('');
  const [menu, setMenu] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/restaurants/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setRestaurantId(res.data._id);
      loadMenu(res.data._id);
    });
  }, [token]);

  const loadMenu = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/menu/${id}`);
    setMenu(res.data);
  };

  const handleAdd = async (data) => {
    await axios.post('http://localhost:5000/api/menu', {
      ...data,
      restaurantId
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    loadMenu(restaurantId);
  };

  const handleUpdate = async (data) => {
    await axios.put(`http://localhost:5000/api/menu/${editingItem._id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEditingItem(null);
    loadMenu(restaurantId);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/menu/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    loadMenu(restaurantId);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Menu</h1>

      <MenuItemForm
        initialData={editingItem}
        onSubmit={editingItem ? handleUpdate : handleAdd}
      />

      <div className="mt-6 grid gap-4">
        {menu.map(item => (
          <MenuItemCard
            key={item._id}
            item={item}
            onEdit={() => setEditingItem(item)}
            onDelete={() => handleDelete(item._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default MenuManager;
