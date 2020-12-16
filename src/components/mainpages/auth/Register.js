import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onchange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });
      localStorage.setItem("login", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="container card mt-5 pt-4 pb-3">
      <h3 className="text-center text-primary">Welcome to E-Commerce Store</h3>
      <p className="text-center pb-3">Please create to your account</p>
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="exampleInputName">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            aria-describedby="emailHelp"
            placeholder="Enter your name"
            name="name"
            value={user.name}
            onChange={onchange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={user.email}
            onChange={onchange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={user.passwsord}
            onChange={onchange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <div className="mt-3">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-info btn">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
