// src/components/RestaurantForm.jsx
import { useState } from 'react';

function RestaurantForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    location: initialData.location || '',
    category: initialData.category || '',
    imageUrl: initialData.imageUrl || '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded shadow">
      <input name="name" placeholder="Restaurant Name" value={form.name} onChange={handleChange} className="w-full p-2" required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full p-2" />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full p-2" />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="w-full p-2" />
      <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} className="w-full p-2" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}

export default RestaurantForm;
