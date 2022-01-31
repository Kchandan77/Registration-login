import React from 'react';

export default function Product(props) {
  const { product, onAdd } = props;
  return (
    <div className='product-list'>
      <img className="product-lis__img" src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <div>${product.price}</div>
      <div >
        <button className='product-list__addtocart' onClick={() => onAdd(product)}>Add To Cart</button>
      </div>
    </div>
  );
}
