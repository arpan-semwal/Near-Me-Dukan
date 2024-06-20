import { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import baseURL from '../../metro';

export default function AddMainCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('service');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${baseURL}/categories`, { name: categoryName, type: categoryType });
      alert('Category added successfully');
      setCategoryName('');
      setCategoryType('service');
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
        <select value={categoryType} onChange={(e) => setCategoryType(e.target.value)}>
          <option value="service">service</option>
          <option value="product">product</option>
        </select>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}