import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import ProductDetail from "./pages/Product";
import ErrorPage from "./pages/ErrorPage";
import UserAuth from "./Auth/UserAuth";
import Footer from "./components/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const location = useLocation();
  const hideNavbar =
    location.pathname === "/Login" ||
    location.pathname === "/404" ||
    location.pathname === "*" ||
    !isLoggedIn;

  return (
    <>
      {!hideNavbar && (
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      )}
      <Routes>
        <Route
          path="/Login"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <UserAuth onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Home />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <ProductDetail />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/Contact"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Contact />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Cart />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/Login" />;
};

export default App;
