import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Registered!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="customer">Customer</option>
        <option value="owner">Owner</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
