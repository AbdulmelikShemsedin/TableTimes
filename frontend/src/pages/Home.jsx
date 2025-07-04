import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to TableTimes Food</h1>
      <p className="text-lg text-gray-700 mb-6">Discover delicious dishes from your favorite restaurants</p>
      <Link to="/restaurants" className="bg-green-600 text-white px-6 py-2 rounded text-lg">
        Browse Restaurants
      </Link>
    </div>
  );
}

export default Home;
