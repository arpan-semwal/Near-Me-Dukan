import  { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import './ShopkeeperPage.css'; // Import your CSS file for styling
import baseURL from '../../metro';

export default function ShopkeeperPage() {
  const [shopkeepers, setShopkeepers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // State for showing/hiding the form
  const [formData, setFormData] = useState({
    shopkeeperName: '',
    phoneNumber: '',
    address: '',
    city: '',
    shopState: '',
    pincode: '',
    selectedCategory: '',
    shopID: ''
  });

  useEffect(() => {
    async function fetchShopkeepers() {
      try {
        const response = await axios.get(`${baseURL}/shopkeepers`);
        console.log('Fetched Shopkeepers:', response.data); // Log the fetched data
        setShopkeepers(response.data);
      } catch (error) {
        console.error('Error fetching shopkeepers:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchShopkeepers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/shopkeepers`, formData);
      alert('Shopkeeper added successfully');
      setFormData({
        shopkeeperName: '',
        phoneNumber: '',
        address: '',
        city: '',
        shopState: '',
        pincode: '',
        selectedCategory: '',
        shopID: ''
      });
      setShowForm(false); // Hide the form after submission
      window.location.reload(); // Reload the page to update the shopkeepers list
    } catch (error) {
      console.error('Error adding shopkeeper:', error);
      alert('Failed to add shopkeeper');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <h1>Shopkeepers</h1>
      <div className="shopkeeper-cards">
        {shopkeepers.map((shopkeeper) => (
          <div className="shopkeeper-card" key={shopkeeper.id}>
            <h2>{shopkeeper.shopkeeperName}</h2>
            <p>Phone Number: {shopkeeper.phoneNumber}</p>
            <p>Address: {shopkeeper.address}, {shopkeeper.city}, {shopkeeper.shopState} - {shopkeeper.pincode}</p>
            <p>Category: {shopkeeper.selectedCategory}</p>
          </div>
        ))}
      </div>

      <h2>Add Shopkeeper</h2>
      <button onClick={() => setShowForm(true)}>Add Shopkeeper</button>

      {showForm && (
        <div className="popup-form">
          <form onSubmit={handleSubmit}>
            <label>
              Shopkeeper Name:
              <input type="text" name="shopkeeperName" value={formData.shopkeeperName} onChange={handleChange} />
            </label>
            <label>
              Phone Number:
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </label>
            <label>
              Address:
              <input type="text" name="address" value={formData.address} onChange={handleChange} />
            </label>
            <label>
              City:
              <input type="text" name="city" value={formData.city} onChange={handleChange} />
            </label>
            <label>
              State:
              <input type="text" name="shopState" value={formData.shopState} onChange={handleChange} />
            </label>
            <label>
              Pincode:
              <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
            </label>
            <label>
              Category:
              <select name="selectedCategory" value={formData.selectedCategory} onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="Category1">Salon Shop</option>
                <option value="Category2">Vegetable shop</option>
                <option value="Category3">Sweets Shop</option>
                {/* Add more options as needed */}
              </select>
            </label>
            <label>
              ShopID:
              <input type="text" name="shopID" value={formData.shopID} onChange={handleChange} />
            </label>
            <button type="submit">Add Shopkeeper</button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
