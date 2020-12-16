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
      <Route exact path="/detail/:id" component={Detail} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/category" component={Category} />
      <Route exact path="/create_product" component={AddProduct} />
      <Route path="/edit_product/:id" exact component={AddProduct} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="*" component={NotFound} />
    </Switch>
  );
};

export default Pages;
