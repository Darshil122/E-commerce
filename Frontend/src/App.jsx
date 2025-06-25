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
    !!localStorage.getItem("token")
  );

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
      {!hideNavbar && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/Login"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <UserAuth onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <ProductDetail />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/Contact"
          element={
            <PrivateRoute>
              <Contact />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
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

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/Login" />;
};

export default App;
