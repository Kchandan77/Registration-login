import React,{useEffect} from 'react';
import CartImg  from './assets/shopping-cart.png'

export default function Header(props) {
  useEffect(()=>{
    localStorage.setItem('Items', JSON.stringify(props.countCartItems));
  })
  return (

    <header className="cart-header mt-2">
      <div>
        <a href="#/">
          <h1> Shopping Cart</h1>
        </a>
      </div>
      <div>
        <a>
          <img src={CartImg} alt='cart Icon'/>
          {props.countCartItems ? (
            <button className="badge">{props.countCartItems}</button>
          ) : (
            ''
          )}
        </a>{' '}
      </div>
    </header>
  );
}
