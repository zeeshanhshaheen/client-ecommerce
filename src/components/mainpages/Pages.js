import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import Products from "./products/Products";
import NotFound from "./utils/NotFound";
import Detail from "../mainpages/detail/Detail";
import Category from "../category/Category";
import AddProduct from "./Add product/AddProduct";

const Pages = () => {
  return (
    <Switch>
      <Route exact path="/" component={Products} />
      <Route exact path="https://big-mern.herokuapp.com/detail/:id" component={Detail} />
      <Route exact path="https://big-mern.herokuapp.com/login" component={Login} />
      <Route exact path="https://big-mern.herokuapp.com/register" component={Register} />
      <Route exact path="https://big-mern.herokuapp.com/category" component={Category} />
      <Route exact path="https://big-mern.herokuapp.com/create_product" component={AddProduct} />
      <Route path="https://big-mern.herokuapp.com/edit_product/:id" exact component={AddProduct} />
      <Route exact path="https://big-mern.herokuapp.com/cart" component={Cart} />
      <Route exact path="*" component={NotFound} />
    </Switch>
  );
};

export default Pages;
