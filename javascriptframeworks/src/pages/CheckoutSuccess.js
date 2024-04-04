import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function CheckoutSuccess({ clearCart }) {
  const { totalPrice } = useParams();
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    // Function to generate a random 10-digit order number
    const generateOrderNumber = () => {
      const min = 1000000000; 
      const max = 9999999999; 
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomNumber.toString();
    };

    // Set the generated order number
    setOrderNumber(generateOrderNumber());
  }, []);

  const handleReturnToHome = () => {
    clearCart();
  };

  return (
    <div className='checkout-success-container'>
      <h2 className='checkout-success-heading'>Checkout Successful</h2>
      <p className='checkout-success-text'>Successful Checkout</p>
      <p className='checkout-success-text'>Order Number: {orderNumber}</p>
      <p className='checkout-success-text'>Total Price: ${totalPrice}</p>
      <Link to="/"><button className="checkout-success-button" onClick={handleReturnToHome}>Return to Home</button></Link>
    </div>
  );
}

export default CheckoutSuccess;