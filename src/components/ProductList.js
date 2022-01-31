
import Header from './Header';
import Main from './Main';
import Basket from './Basket';
import data from '../../src/data';
import { useState,useEffect } from 'react';
const getCartDetailsLS = () => {
  const cartData = localStorage.getItem('cartItems');
  if (cartData) {
      return JSON.parse(cartData);
  } else
      return [];
}
function ProductList() {
 
  const { products } = data;
  const [cartItems, setCartItems] = useState(getCartDetailsLS());
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}, [cartItems])
  return (
    <div className="App">
      <Header countCartItems={cartItems.length}></Header>
      <div className="row">
        <Main products={products} onAdd={onAdd}></Main>
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
        ></Basket>
      </div>
    </div>
  );
}

export default ProductList;