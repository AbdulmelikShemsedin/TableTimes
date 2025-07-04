import { useState, useEffect } from 'react';
import axios from '../utils/axios';

function Cart() {
  const [cart, setCart] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleRemove = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    try {
      await axios.post('/api/orders', { items: cart });
      localStorage.removeItem('cart');
      setCart([]);
      setSuccess(true);
    } catch (err) {
      alert('Order failed. Try again.');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {success && <p className="text-green-600 mb-4">Order placed successfully!</p>}

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="border p-4 rounded shadow flex justify-between">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>${item.price}</p>
              </div>
              <button
                onClick={() => handleRemove(index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-4 py-2 rounded mt-4"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
