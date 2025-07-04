import { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', form);
      localStorage.setItem('token', res.data.token); //  store token
      localStorage.setItem('user', JSON.stringify(res.data.user)); //  store user info

      if (res.data.user.role === 'owner') {
        navigate('/owner/dashboard');
      } else {
        navigate('/restaurants');
      }
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2" />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full p-2" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Login</button>
    </form>
  );
}

export default Login;
