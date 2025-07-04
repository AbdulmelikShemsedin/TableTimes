import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/api/restaurants').then(res => setRestaurants(res.data));
  }, []);

  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Restaurants</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or category..."
        className="w-full p-2 border rounded mb-6"
      />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {filtered.map(r => (
          <Link to={`/restaurants/${r._id}`} key={r._id} className="border p-4 rounded shadow hover:bg-gray-50">
            <h3 className="text-xl font-semibold">{r.name}</h3>
            <p className="text-gray-600">{r.category} • {r.location}</p>
            <p>{r.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;
