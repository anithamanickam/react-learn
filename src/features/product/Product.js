import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import useLocalStorage from "../../hooks/useLocalStorage";
import { addToCart, fetchProducts, removeFromCart } from "./productSlice";

const Product = () => {
  const { products, isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const canFetchProducts = useRef(true);
  const [cartItemIds, setCartItemIds] = useLocalStorage("cartItemIds", []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20%" }}
      >
        <Loader />
      </div>
    );
  }

  const renderProducts = () => {
    return products.map((product) => {
      const isItemInCart = cartItemIds
        .map((cartItem) => parseInt(cartItem, 10))
        .includes(parseInt(product.id, 10));
      return (
        <div
          key={product.id}
          style={{
            marginLeft: 20,
            padding: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={product.thumbnail}
            height={150}
            width={170}
            style={{ padding: "30px 20px", backgroundColor: "#F0F0F0" }}
            alt="image"
          ></img>
          <div style={{ fontWeight: 600 }}>{product.title}</div>
          <div>$ {product.price}</div>
          <button
            onClick={() =>
              isItemInCart
                ? setCartItemIds(
                    cartItemIds.filter((cartItem) => {
                      if (parseInt(cartItem, 10) !== parseInt(product.id, 10))
                        return cartItem;
                    })
                  )
                : setCartItemIds([...cartItemIds, product.id])
            }
            style={{
              marginTop: 5,
              cursor: "pointer",
              border: "none",
              width: "max-content",
              padding: "10px 30px",
              backgroundColor: isItemInCart ? "lavenderblush" : "#ECFFDC",
            }}
          >
            {isItemInCart ? "REMOVE" : "ADD"}
          </button>
        </div>
      );
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {products.length ? renderProducts() : null}
    </div>
  );
};

export default Product;
