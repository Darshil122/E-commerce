import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { StarIcon } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/CartSlice";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const inCart = cart.some((item) => item.id === Number(id));
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product)
    return <div className="text-center py-10 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="h-72 w-72 sm:h-96 sm:w-96 object-contain"
            />
          </div>

          <div>
            <p className="uppercase text-lg font-medium text-gray-500 mb-2 tracking-wide">
              {product.category}
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-800">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
              Rating {product.rating.rate}
              <StarIcon weight="fill" className="text-yellow-500 w-5 h-5" />
            </div>

            <p className="text-2xl font-bold text-black-600 mb-4">
              ${product.price}
            </p>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => dispatch(addToCart(product))}
                disabled={inCart}
                className={`rounded px-5 py-2 transition text-sm font-medium
                  ${
                    inCart
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                  }`}
              >
                {inCart ? "Already in Cart" : "Add to Cart"}
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-5 py-2 rounded"
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
