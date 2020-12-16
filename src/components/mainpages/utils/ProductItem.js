import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StateHandler } from "../../../StateHandler";
import axios from "axios";

function ProductItem({ product, isAdmin, deleteProduct }) {
  const state = useContext(StateHandler);
  const addCart = state.userApi.addCart;

  return (
    <div
      className="card m-3 shadow p-3 mb-5 bg-white rounded"
      style={{ width: "25rem", height: "40rem" }}
    >
      {isAdmin}
      <img className="card-img-top" src={product.images.url} alt="" />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">Description: {product.description}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item text-primary">
          Price: ${product.price}
        </li>
      </ul>
      <div className="card-body">
        {isAdmin ? (
          <div className="d-flex justify-content-between">
            <div>
              <Link
                className="btn btn-dark btn-lg"
                to={`/edit_product/${product._id}`}
              >
                Edit
              </Link>
            </div>
            <div>
              <Link
                className="btn btn-danger btn-lg"
                to="/"
                onClick={() =>
                  deleteProduct(product._id, product.images.public_id)
                }
              >
                Delete
              </Link>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-between">
            <div>
              <Link
                className="btn btn-dark btn-lg"
                to="/"
                onClick={() => addCart(product)}
              >
                Buy
              </Link>
            </div>
            <div>
              <Link
                className="btn btn-info btn-lg"
                to={`detail/${product._id}`}
              >
                View
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductItem;
