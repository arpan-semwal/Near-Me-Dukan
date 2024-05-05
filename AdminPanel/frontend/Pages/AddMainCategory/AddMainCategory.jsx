import { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';

export default function AddMainCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/categories', { name: categoryName });
      alert('Category added successfully');
      setCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
      setError('Failed to add category');
    }
  };

  return (
	
    <div>
		<Navbar />
      <h1>Add Main Category</h1>
      {error && <div>Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          required
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}
