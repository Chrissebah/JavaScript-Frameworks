import React from 'react';

function CartPage({ cartItems, setCartItems }) {
  // Calculate total price with maximum of 2 decimal places
  const totalPrice = cartItems.reduce((total, item) => total + item.data.discountedPrice, 0).toFixed(2);

  // Function to handle clearing the cart
  const handleClearCart = () => {
    setCartItems([]);
    // Refresh the page
    window.location.reload();
  };

  return (
    <div>
      <h1>Cart</h1>
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
        <button className="button">Checkout</button>
      </div>
    </div>
  );
}

export default CartPage;