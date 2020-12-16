import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StateHandler } from "../../../StateHandler";
import axios from "axios";

const Cart = () => {
  const state = useContext(StateHandler);
  const [cart, setCart] = state.userApi.cart;
  const [total, setTotal] = useState(0);
  const [token] = state.token;

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container text-center mt-3 text-info">
        <h2>Cart is empty</h2>
      </div>
    );
  }
  return (
    <div>
      <div className="mt-4 ml-3">
        <Link className="btn btn-secondary" to="/">
          <i className="fas fa-arrow-circle-left"></i> Back to Products
        </Link>
      </div>

      <div>
        <div className="ml-3 mb-3 text-right mr-5">
          <h4>
            Total: <span className="text-success">${total}</span>{" "}
          </h4>
        </div>
        {cart.map((product) => (
          <div className=" ml-3">
            <div className="mt-1">
              <div
                className="card container shadow p-3 mb-5 bg-white rounded"
                style={{ width: "35rem" }}
              >
                <div className="d-flex flex-wrap">
                  <div>
                    <img
                      className="card-img-top pt-3"
                      style={{ width: "15rem" }}
                      src={product.images.url}
                      alt=""
                    />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title text-uppercase text-info">
                      {product.title}
                    </h3>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        #Id: {product.product_id}
                      </li>
                      <li className="list-group-item">
                        Content: {product.content}
                      </li>
                      <li className="list-group-item">
                        Price: ${product.price * product.quantity}
                      </li>
                      <div className="d-flex pl-3 list-group-item">
                        <button
                          className="btn btn-primary"
                          onClick={() => decrement(product._id)}
                        >
                          -
                        </button>
                        <span className="pl-2 pr-2 pt-2">
                          {product.quantity}
                        </span>
                        <button
                          className="btn btn-primary"
                          onClick={() => increment(product._id)}
                        >
                          +
                        </button>
                      </div>
                      <li className="list-group-item">
                        <div
                          className="btn btn-danger"
                          onClick={() => removeProduct(product._id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
