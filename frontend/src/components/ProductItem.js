import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <div className="product-item">
      <h3>{product.name}</h3>
      <p className="price">Prix: {product.price}FCFA</p>
      <p className="description">{product.description}</p>
      <p className="date">Créé le: {new Date(product.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default ProductItem;