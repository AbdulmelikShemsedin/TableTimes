import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import MenuItemForm from '../../components/MenuItemForm';
import MenuItemCard from '../../components/MenuItemCard';

function MenuManager() {
  const [restaurantId, setRestaurantId] = useState('');
  const [menu, setMenu] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    axios.get('/api/restaurants/me').then(res => {
      setRestaurantId(res.data._id);
      loadMenu(res.data._id);
    });
  }, []);

  const loadMenu = async (id) => {
    const res = await axios.get(`/api/menu/${id}`);
    setMenu(res.data);
  };

  const handleAdd = async (data) => {
    await axios.post('/api/menu', { ...data, restaurantId });
    loadMenu(restaurantId);
  };

  const handleUpdate = async (data) => {
    await axios.put(`/api/menu/${editingItem._id}`, data);
    setEditingItem(null);
    loadMenu(restaurantId);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/menu/${id}`);
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
