import { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css'; // Import CSS file for styling

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://nearkidukan.in/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="product-list-container">
      <h1 className="product-list-heading">Product List</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="products-container">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} className="product-image" />
            <div className="product-details">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-mrp">MRP: {product.mrp}</p>
              <p className="product-brand">Brand: {product.brand}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
