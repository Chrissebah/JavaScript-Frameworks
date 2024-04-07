import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ItemDetailsPage from './pages/ItemDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutSuccess from './pages/CheckoutSuccess';
import ContactUs from './pages/ContactUs';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://v2.api.noroff.dev/online-shop`);
        console.log('Response from API:', response.data);
        setItems(response.data.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };
  return (
    <Router>
      <div className="App">
        <header className="header">
          <div className="header-buttons">
              <Link to="/" className="button-link">
          <button className="button">Home</button>
        </Link>
        <Link to="/contact-us" className="button-link">
          <button className="button">Contact Us</button>
        </Link>
        <Link to="/cart" className="button-link">
          <button className="button">Cart</button>
        </Link>
          </div>
        </header>
        <Routes>
          {/* Route for the item details page */}
          <Route path="/details/:detailId" element={<ItemDetailsPage addToCart={addToCart} />} />
          {/* Route for the main content */}
          <Route
            path="/"
            element={
              <main className="main-content">
                <h1>My Online Shop</h1>
                {error && <p>{error}</p>}
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <ul className="item-list">
                    {items.map((item) => (
                      <li key={item.id} className="item">
                        <Link to={`/details/${item.id}`}>
                          <div className="Title">{item.title}</div>
                          <img src={item.image.url} alt={item.title} />
                          <div className='Price'>Full Price: {item.price}</div>
                          <div className='discountedPrice'>Discounted Price: {item.discountedPrice}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </main>
            }
          />
          {/* Other routes */}
          <Route
            path="/cart"
            element={<CartPage cartItems={cartItems} setCartItems={setCartItems} clearCart={handleClearCart} />} 
          />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route
            path="/checkout/:totalPrice"
            element={<CheckoutSuccess clearCart={handleClearCart} />}
          />
        </Routes>
        <footer className="footer">
          <p>&copy; 2024 My Online Shop</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;