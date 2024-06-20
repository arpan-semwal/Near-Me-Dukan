import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import baseURL from '../../metro';

export default function ViewCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`${baseURL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <h1>Categories</h1>
      <ul>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.id}>
              <h2>{category.name}</h2>
              {/* Add other fields as needed */}
            </li>
          ))
        ) : (
          <li>No categories found</li>
        )}
      </ul>
    </div>
  );
}
