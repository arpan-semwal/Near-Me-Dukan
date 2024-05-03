import  { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';

export default function ShopkeeperPage() {
  const [shopkeepers, setShopkeepers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchShopkeepers() {
      try {
        const response = await axios.get('/shopkeepers');
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
      <ul>
        {Array.isArray(shopkeepers) && shopkeepers.length > 0 ? (
          shopkeepers.map((shopkeeper) => (
            <li key={shopkeeper.id}>
              <h2>{shopkeeper.shopkeeperName}</h2>
              <p>Phone Number: {shopkeeper.phoneNumber}</p>
              <p>Address: {shopkeeper.address}, {shopkeeper.city}, {shopkeeper.shopState} - {shopkeeper.pincode}</p>
              <p>Category: {shopkeeper.selectedCategory}</p>
              {/* Add other fields as needed */}
            </li>
          ))
        ) : (
          <li>No shopkeepers found</li>
        )}
      </ul>
    </div>
  );
}
