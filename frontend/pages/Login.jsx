import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      alert('Login success');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <input placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
