import React, { useState, useEffect } from "react";
import axios from "axios";
const Products = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
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
      const response = await axios.get("https://fakestoreapi.com/products");
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

  const handlePrev = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage !== totalPage) setCurrentPage(currentPage + 1);
  };

  const goToPage = (n) => {
    setCurrentPage(n);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Products
        </h2>
        {loading ? (
          "Loading..."
        ) : (
          <>
            <div className="grid lg:grid-cols-8 gap-2 mb-5">
              <button
                className="border border-fuchsia-600 text-fuchsia-600 py-1 rounded hover:bg-fuchsia-600 hover:text-white transition"
                onClick={() => setFilteredData(data)}
              >
                All
              </button>
              <button
                className="border border-fuchsia-600 text-fuchsia-600 py-1 rounded hover:bg-fuchsia-600 hover:text-white transition"
                onClick={() =>
                  setFilteredData(
                    data.filter((c) => c.category === "men's clothing")
                  )
                }
              >
                Men's Clothing
              </button>
              <button
                className="border border-fuchsia-600 text-fuchsia-600 py-1 rounded hover:bg-fuchsia-600 hover:text-white transition"
                onClick={() =>
                  setFilteredData(
                    data.filter((c) => c.category === "women's clothing")
                  )
                }
              >
                Women's Clothing
              </button>
              <button
                className="border border-fuchsia-600 text-fuchsia-600 py-1 rounded hover:bg-fuchsia-600 hover:text-white transition"
                onClick={() =>
                  setFilteredData(data.filter((c) => c.category === "jewelery"))
                }
              >
                Jewelery
              </button>
              <button
                className="border border-fuchsia-600 text-fuchsia-600 py-1 rounded hover:bg-fuchsia-600 hover:text-white transition"
                onClick={() =>
                  setFilteredData(
                    data.filter((c) => c.category === "electronics")
                  )
                }
              >
                Electronic
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {currentData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-36 object-contain mx-auto mb-4"
                  />
                  <h3 className="text-base text-gray-700 mb-1">
                    {item.title.substring(0, 11)}
                  </h3>
                  {/* <p className="text-sm text-gray-500 line-clamp-3">
                  {item.description}
                </p> */}
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
        {/* Pagination */}
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
