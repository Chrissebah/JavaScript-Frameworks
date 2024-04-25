import React from 'react';
import { Link } from 'react-router-dom';

function CartPage({ cartItems, setCartItems, clearCart }) {
  const totalPrice = cartItems.reduce((total, item) => total + item.data.discountedPrice, 0).toFixed(2);

  const handleClearCart = () => {
    setCartItems([]);
  };

 
  const isEmptyCart = cartItems.length === 0;

  return (
    <div>
      <h1>Cart</h1>
      {isEmptyCart ? (
        <p>Your cart is empty. Keep browsing!</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <h3>{item.data.title}</h3>
                <p>Price: {item.data.price}</p>
                <p>Discounted Price: {item.data.discountedPrice}</p>
              </li>
            ))}
          </ul>
          <div>
            <h3>Total Price: ${totalPrice}</h3>
            <button className="buttonClear" onClick={handleClearCart}>Clear Cart</button>
            {isEmptyCart ? (
              <button className="button" disabled>Checkout</button>
            ) : (
              <Link to={`/checkout/${totalPrice}`}>
                <button className="button">Checkout</button>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;