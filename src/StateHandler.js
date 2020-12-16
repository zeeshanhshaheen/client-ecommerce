import React, { createContext, useEffect, useState } from "react";
import ProductAPi from "./api/Product";
import UserApi from "./api/User";
import axios from "axios";
import CategoriesAPi from "./api/Category";

export const StateHandler = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login) {
      const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token");
        setToken(res.data.accesstoken);
      }; 
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    productAPi: ProductAPi(),
    userApi: UserApi(token),
    categoriesAPi: CategoriesAPi(),
  };
  return (
    <StateHandler.Provider value={state}>{children}</StateHandler.Provider>
  );
};
