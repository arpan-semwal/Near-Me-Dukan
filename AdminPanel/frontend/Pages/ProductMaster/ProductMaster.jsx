// src/components/ProductList.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css'; // Import CSS file for styling
import baseURL from '../../metro';
 // Adjust the path as necessary

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    main_category: '',
    product_name: '',
    brand_name: '',
    precise_brand_name: '',
    price: '',
    weight: '',
    weight_type: 'g', // Default weight type
    type: '',
    picture: null // To hold the selected file
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products from backend
  const fetchProducts = () => {
    axios.get(`${baseURL}/products`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  // Function to handle form submission and add a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('main_category', newProduct.main_category);
      formData.append('product_name', newProduct.product_name);
      formData.append('brand_name', newProduct.brand_name);
      formData.append('precise_brand_name', newProduct.precise_brand_name);
      formData.append('price', newProduct.price);
      formData.append('weight', newProduct.weight);
      formData.append('weight_type', newProduct.weight_type); // Append weight_type
      formData.append('type', newProduct.type);
      formData.append('picture', newProduct.picture);

      const response = await axios.post(`${baseURL}/products/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Response:", response.data); // Log response data

      fetchProducts(); // Refresh product list after adding
      setNewProduct({
        main_category: '',
        product_name: '',
        brand_name: '',
        precise_brand_name: '',
        price: '',
        weight: '',
        weight_type: 'g', // Reset weight_type
        type: '',
        picture: null
      });
      setShowForm(false); // Hide the form after successful submission
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Function to handle file input change
  const handleFileChange = (e) => {
    setNewProduct({
      ...newProduct,
      picture: e.target.files[0] // Update the picture state with the selected file
    });
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => {
    return product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="product-list-container">
      <h1 className="product-list-heading">Product List</h1>
      <button onClick={() => setShowForm(true)} className="add-product-button">Add New Product</button>
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
            {product.picture_path && <img src={`${baseURL}${product.picture_path}`} alt="Product" className="product-image" />}
            <h2 className="product-name">{product.product_name}</h2>
            <p className="product-description">Brand: {product.brand_name}</p>
            <p className="product-price">Price: ₹{product.price}</p>
            <p className="product-weight">Weight: {product.weight} {product.weight_type}</p> {/* Display weight and weight type */}
            <p className="product-type">Type: {product.type}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="product-form">
          <h2>Add New Product</h2>
          <form onSubmit={handleAddProduct}>
            <div className="form-group">
              <label>Main Category:</label>
              <input type="text" value={newProduct.main_category} onChange={(e) => setNewProduct({ ...newProduct, main_category: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Product Name:</label>
              <input type="text" value={newProduct.product_name} onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Brand Name:</label>
              <input type="text" value={newProduct.brand_name} onChange={(e) => setNewProduct({ ...newProduct, brand_name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Precise Brand Name:</label>
              <input type="text" value={newProduct.precise_brand_name} onChange={(e) => setNewProduct({ ...newProduct, precise_brand_name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input type="text" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Weight:</label>
              <input type="text" value={newProduct.weight} onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })} />
              <select value={newProduct.weight_type} onChange={(e) => setNewProduct({ ...newProduct, weight_type: e.target.value })}>
                <option value="g">g</option>
                <option value="kg">kg</option>
              </select>
            </div>
            <div className="form-group">
              <label>Type:</label>
              <input type="text" value={newProduct.type} onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Picture:</label>
              <input type="file" onChange={handleFileChange} />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-button">Add Product</button>
              <button type="button" className="close-button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProductList;
