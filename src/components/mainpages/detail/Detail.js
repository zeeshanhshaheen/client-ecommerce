import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StateHandler } from "../../../StateHandler";

function Detail() {
  const params = useParams();
  const state = useContext(StateHandler);
  const [products] = state.productAPi.products;
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    if (params) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setDetail(product);
        }
      });
    }
  }, [params, products]);

  if (detail.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 ml-3">
      <Link className="btn btn-secondary" to="/">
        <i className="fas fa-arrow-circle-left"></i> Back to Products
      </Link>
      <div className="mt-5 ">
        <div
          className="card container shadow p-3 mb-5 bg-white rounded"
          style={{ width: "25rem" }}
        >
          <img className="card-img-top pt-3" src={detail.images.url} alt="" />
          <div className="card-body">
            <h3 className="card-title text-uppercase text-info">{detail.title}</h3>
            <h6 className="card-text">Description: {detail.description}</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">#Id: {detail.product_id}</li>
              <li className="list-group-item">Content: {detail.content}</li>
              <li className="list-group-item">
                Price: ${detail.price}
              </li>
              <li className="list-group-item">
                Sold: <span className="text-danger">{detail.sold}</span>
              </li>
            </ul>
            <p className="card-text"></p>
            <Link className="btn btn-primary" to="/cart">
              <i className="fas fa-cart-plus"></i> Add to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
