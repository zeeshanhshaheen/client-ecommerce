import React, { useContext, useState } from "react";
import { StateHandler } from "../../StateHandler";
import axios from "axios";

const Category = () => {
  const state = useContext(StateHandler);
  const [categories] = state.categoriesAPi.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.categoriesAPi.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const addCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `https://big-mern.herokuapp.com/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "https://big-mern.herokuapp.com/api/category",
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      }
      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`https://big-mern.herokuapp.com/api/category/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="container">
      <div className="card p-4 m-5 shadow p-3 mb-5 bg-white rounded">
        <form onSubmit={addCategory}>
          <h3 className="text-info text-center">Please Add Category</h3>
          <label htmlFor="formGroupExampleInput2"></label>
          <input
            type="text"
            class="form-control"
            id="formGroupExampleInput2"
            placeholder="Add Category"
            name={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-dark mt-3">
            {onEdit ? (
              <i class="fas fa-pen"></i>
            ) : (
              <i className="fas fa-save"></i>
            )}
          </button>
        </form>
        <div className="card mt-3 pb-3 shadow-sm p-3 mb-5 bg-white rounded">
          {categories.map((category) => (
            <div key={category._id}>
              <p className="mt-3 ml-3">{category.name}</p>
              <div className="ml-3">
                <button
                  className="btn btn-dark mr-3"
                  onClick={() => editCategory(category._id, category.name)}
                >
                  <i className="far fa-edit"></i>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCategory(category._id)}
                >
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
