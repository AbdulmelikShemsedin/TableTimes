import { useEffect, useState } from 'react';
import axios from '../../utils/axios';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders/my').then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <p className="font-semibold">Order #{order._id}</p>
              <p className="text-gray-600">Status: {order.status}</p>
              <ul className="list-disc pl-5">
                {order.items.map((item, i) => (
                  <li key={i}>{item.name} - ${item.price}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerOrders;