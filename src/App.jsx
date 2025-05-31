import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
// import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import ProductDetail from "./pages/Product";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar /> <Home />
            </>
          }
        />
        <Route
          path="/product/:id"
          element={
            <>
              <Navbar /> <ProductDetail />
            </>
          }
        />
        {/* <Route
          path="/About"
          element={
            <>
              <Navbar /> <About />
            </>
          }
        /> */}
        <Route
          path="/Contact"
          element={
            <>
              <Navbar /> <Contact />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar /> <Cart />
            </>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
