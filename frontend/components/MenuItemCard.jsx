// src/components/MenuItemForm.jsx
import { useState, useEffect } from 'react';

function MenuItemForm({ initialData = null, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    available: true
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', description: '', price: '', imageUrl: '', available: true });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 bg-white p-4 rounded shadow">
      <input name="name" placeholder="Item Name" value={form.name} onChange={handleChange} className="w-full p-2" required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full p-2" />
      <input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} className="w-full p-2" required />
      <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} className="w-full p-2" />
      <label className="block">
        <input type="checkbox" name="available" checked={form.available} onChange={handleChange} /> Available
      </label>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Item</button>
    </form>
  );
}

export default MenuItemForm;
