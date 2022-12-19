import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import Product from "./features/product/Product";
import Table from "./components/Table";

const RouteNavigation = () => {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Head
        er></Header> */}
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RouteNavigation;
