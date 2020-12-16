import React, { Fragment, useContext, useState } from "react";
import { StateHandler } from "../../../StateHandler";
import ProductItem from "../utils/ProductItem";
import axios from "axios";

function Products() {
  const state = useContext(StateHandler);
  const [products] = state.productAPi.products;
  const [isAdmin] = state.userApi.isAdmin;
  const [loading, setLoading] = useState(false);
  const [token] = state.token;

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteProduct;
      setLoading(false);
      loading(false);
      alert("Product Deleted..");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <Fragment>
      <div>
        <h3 className="mt-4 ml-3">
          {products.length === 0 ? "NO Product Found" : "All Products"}
        </h3>
        {products.map((product) => {
          return (
            <div className="float-left mt-3">
              <ProductItem
                key={product._id}
                product={product}
                isAdmin={isAdmin}
                deleteProduct={deleteProduct}
              />
            </div>
          );
        })}
      </div>
      {products.length === 0 && (
        <div>
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Products;
