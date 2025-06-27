import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { StarIcon, XIcon } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/CartSlice";

const Products = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = filteredData.slice(firstIndex, lastIndex);

  const totalPage = Math.ceil(filteredData.length / itemsPerPage);
  const numbers = [...Array(totalPage + 1).keys()].slice(1);

  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://e-commerce-1jgv.vercel.app/products");
      setData(response.data);
      setFilteredData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  //for product details
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  // pagination
  const handlePrev = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage !== totalPage) setCurrentPage(currentPage + 1);
  };

  const goToPage = (n) => {
    setCurrentPage(n);
  };

  // category filter
  const categories = [
    "all",
    "Electronics",
    "Furniture",
    "Fitness",
    "Home Appliances",
    "Accessories"
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (product = null) => {
    setOpen(!open);
    setSelectedProduct(product);
    console.log(product);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      {/* display individual product */}

      <Dialog
        open={open}
        handler={() => handleOpen(null)}
        className="max-w-7xl mx-auto my-20 shadow-2xl"
      >
        <div className="flex justify-between items-center px-6 pt-4 pb-2 border-b border-gray-200">
          <DialogHeader className="text-xl font-semibold text-gray-800">
            Product Details
          </DialogHeader>
          <button
            onClick={() => handleOpen(null)}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Close"
          >
            <XIcon size={24} weight="bold" />
          </button>
        </div>

        <DialogBody className="p-6">
          {selectedProduct ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex justify-center items-center">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="h-72 w-72 sm:h-96 sm:w-96 object-contain"
                />
              </div>

              <div>
                <p className="text-sm uppercase text-gray-500 mb-1 tracking-wide">
                  {selectedProduct.category}
                </p>

                <h1 className="text-2xl sm:text-3xl font-semibold mb-3 text-gray-800">
                  {selectedProduct.title}
                </h1>

                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                  Rating: {selectedProduct.rating?.rate}
                  <StarIcon weight="fill" className="text-yellow-500 w-5 h-5" />
                </div>

                <p className="text-2xl font-bold text-gray-900 mb-4">
                  ${selectedProduct.price}
                </p>

                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => dispatch(addToCart(selectedProduct))}
                    disabled={cart.some(
                      (item) => item._id === selectedProduct._id
                    )}
                    className={`rounded px-5 py-2 text-sm font-medium transition ${
                      cart.some((item) => item._id === selectedProduct._id)
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    {cart.some((item) => item._id === selectedProduct._id)
                      ? "Already in Cart"
                      : "Add to Cart"}
                  </button>

                  <button
                    onClick={() => {
                      handleOpen(null);
                      navigate("/cart");
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-5 py-2 rounded transition"
                  >
                    Go to Cart
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">No product selected</div>
          )}
        </DialogBody>
      </Dialog>

      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Products
        </h2>

        {/* display all product */}
        {loading ? (
          "Loading..."
        ) : (
          <>
            <div className="grid lg:grid-cols-7 gap-2 mb-5">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`border rounded transition py-1 ${
                    activeFilter === category
                      ? "bg-fuchsia-600 text-white border-fuchsia-600"
                      : "text-fuchsia-600 border-fuchsia-600 hover:bg-fuchsia-600 hover:text-white"
                  }`}
                  onClick={() => {
                    setFilteredData(
                      category === "all"
                        ? data
                        : data.filter((c) => c.category === category)
                    );
                    setActiveFilter(category);
                    setCurrentPage(1);
                  }}
                >
                  {category === "all"
                    ? "All"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {currentData.map((item) => (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpen(item);
                  }}
                  key={item._id}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-36 object-contain mx-auto mb-4"
                  />
                  <h3 className="text-base text-gray-700 mb-1">
                    {item.title.substring(0, 11)}
                  </h3>
                  <p className="text-lg font-bold text-gray-800 mb-4">
                    ${item.price}
                  </p>
                  <button className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-2 rounded-lg transition">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex justify-center mt-8 items-center gap-2 flex-wrap">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
          >
            Previous
          </button>

          {numbers.map((n) => (
            <button
              key={n}
              onClick={() => goToPage(n)}
              className={`px-3 py-1 rounded ${
                currentPage === n
                  ? "bg-fuchsia-600 text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPage}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
