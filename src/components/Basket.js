import React from 'react';

export default function Basket(props) {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  return (
    <aside className="cart-item  cart-item--details">
      <h2>Cart Items</h2>
      <div>
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="cart-item__block">{item.name}</div>
            <div className="cart-btn">
              <button onClick={() => onRemove(item)} className="cart-btn__remove">
                -
              </button>{' '}
              <button onClick={() => onAdd(item)} className="cart-btn__add">
                +
              </button>
            </div>

            <div className=" price-text price-text--details">
              {item.qty} x ${item.price.toFixed(2)}
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="checkout-details">
              <div className="checkout-details__price-label">Items Price</div>
              <div className="checkout-details__price-value price-text">${itemsPrice.toFixed(2)}</div>
            </div>
            <div className="checkout-taxDetail">
              <div className="checkout-taxDetail__label">Tax Price</div>
              <div className="checkout-taxDetail__Value  price-text">${taxPrice.toFixed(2)}</div>
            </div>
            <div className="checkout-shippingDetail">
              <div className="checkout-shippingDetail__label">Shipping Price</div>
              <div className="checkout-shippingDetail__value  price-text">
                ${shippingPrice.toFixed(2)}
              </div>
            </div>

            <div className="checkout-total">
              <div className="checkout-total__label">
                <strong>Total Price</strong>
              </div>
              <div className="checkout-total__value price-text">
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <button
              className='cart-item__checkoutbtn' 
              // onClick={() => alert('Implement Checkout!')}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
