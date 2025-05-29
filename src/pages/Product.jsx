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

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-[400px] w-[300px] object-contain"
        />
        <div>
          <p className="uppercase text-2xl font-serif text-gray-700 mb-3">
            {product.category}
          </p>
          <h1 className="text-4xl font-sans mb-1">{product.title}</h1>
          <p className="font-extrabold flex items-center gap-1 mb-4">
            Rating {product.rating.rate}
            <StarIcon weight="fill" className="text-yellow-500 w-5 h-5" />
          </p>
          <p className="text-3xl font-bold text-gray-700 mb-3">
            ${product.price}
          </p>
          <p className="text-gray-600 mb-3">{product.description}</p>
          <button
            onClick={() => dispatch(addToCart(product))}
            disabled={inCart}
            className={`border rounded px-4 py-2 transition
              ${
                inCart
                  ? "border-gray-400 bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              }`}
          >
            {inCart ? "Already in Cart" : "Add to Cart"}
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="bg-emerald-400 text-white border rounded mx-3 px-4 py-2"
          >
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
