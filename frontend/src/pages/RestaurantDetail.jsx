import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useParams } from 'react-router-dom';

function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get(`/api/restaurants/${id}`).then(res => setRestaurant(res.data));
    axios.get(`/api/menu/${id}`).then(res => setMenu(res.data));
  }, [id]);

  if (!restaurant) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
      <p className="text-gray-600 mb-4">{restaurant.category} • {restaurant.location}</p>
      <p className="mb-6">{restaurant.description}</p>

      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <div className="grid gap-4">
        {menu.map(item => (
          <div key={item._id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
            <p className="font-bold">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantDetail;
