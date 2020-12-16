import React, { useContext, useEffect, useState } from "react";
import { StateHandler } from "../../../StateHandler";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const initState = {
  product_id: "",
  title: "",
  price: 0,
  description: "Product",
  content: "Content",
  category: "",
  _id: "",
};

function AddProduct() {
  const state = useContext(StateHandler);
  const [product, setProduct] = useState(initState);
  const [categories] = state.categoriesAPi.categories;
  const [images, setImages] = useState(false);
  const [isAdmin] = state.userApi.isAdmin;
  const [token] = state.token;
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const history = useHistory();

  const param = useParams();
  const [products] = state.productAPi.products;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initState);
      setImages(false);
    }
  }, [param.id, products]);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) {
        return alert("Image Upload failed. Please contact your admin.");
      }
      const file = e.target.files[0];
      if (!file) {
        return alert("No file selected.");
      }
      if (file.size > 1024 * 1024) {
        return alert("Size too large!");
      }

      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("https://big-mern.herokuapp.com/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) {
        return alert("Image Upload failed. Please contact your admin.");
      }

      if (onEdit) {
        await axios.put(
          `https://big-mern.herokuapp.com/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
        history.push("/");
      } else {
        await axios.post(
          "https://big-mern.herokuapp.com/api/products",
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
        history.push("/");
      }
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="container mt-4 card p-3">
      <h3 className="text-center text-info">Create a product</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="product_id">Id</label>
          <input
            type="text"
            className="form-control"
            id="id"
            name="product_id"
            placeholder="Please enter id"
            value={product.product_id}
            onChange={handleChangeInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Please enter title"
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            placeholder="Please enter price"
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            name="description"
            placeholder="Please enter description"
            value={product.description}
           
            onChange={handleChangeInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            className="form-control"
            id="content"
            rows="3"
            name="content"
            placeholder="Please enter content"
            value={product.content}
            
            onChange={handleChangeInput}
          />
        </div>

        <div className="form-group">
          <label className="" htmlFor="inputGroupSelect01">
            Categories
          </label>

          <select
            className="custom-select"
            value={product.category}
            onChange={handleChangeInput}
            name="category"
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group mb-3">
          <div className="custom-file">
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileUpload}
            />
            {loading ? (
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              <div>
                <img src={images ? images.url : ""} alt="" />
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
