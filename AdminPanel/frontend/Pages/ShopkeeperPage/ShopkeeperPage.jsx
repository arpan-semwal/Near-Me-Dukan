import   { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import './ShopkeeperPage.css'; // Import your CSS file for styling

export default function ShopkeeperPage() {
  const [shopkeepers, setShopkeepers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchShopkeepers() {
      try {
        const response = await axios.get('http://localhost:3001/shopkeepers');
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
            {/* Add other fields as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}
