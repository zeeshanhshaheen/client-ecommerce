import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
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
      await axios.post("/user/login", { ...user });
      localStorage.setItem("login", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="container card mt-5 pt-4 pb-3">
      <h3 className="text-center text-primary">Welcome to E-Commerce Store</h3>
      <p className="text-center pb-3">Please Login to your account</p>
      <form onSubmit={submit}>
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
          Login
        </button>
        <div className="mt-3">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-info btn">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
