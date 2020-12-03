import React from "react";

import { AuthContext, CartContext } from "../../appContext";
import { useEffect, useState, useContext } from "react";
import { fetchProducts } from "../../api/product";
import { ProductCard } from "../../components/Card";
import Header from "../../components/Header";
function Shop() {
  const [products, setProducts] = useState([]);
  const { cartState, cartDispatch } = useContext(CartContext);

  useEffect(() => {
    const handleFetchProducts = async () => {
      const { items, offset } = await fetchProducts();
      if (Array.isArray(items)) {
        setProducts(items);
      }
    };
    handleFetchProducts();
  }, []);

  return (
    <div className="container space-2 space-lg-3">
      <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
        <h2>農夫市集</h2>
      </div>
      <div className="row mx-n2 mx-sm-n3 mb-3">
        {products.map(({ id, name, description, price, photo_url }) => (
          <div key={id} className="col-sm-6 col-lg-3 px-2 px-sm-3 mb-3 mb-sm-5">
            <ProductCard
              key={id}
              title={name}
              description={description}
              price={price}
              img={photo_url}
              onAddToCart={() =>
                cartDispatch((prev) => [
                  ...prev,
                  { id, name, price, img: photo_url },
                ])
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
