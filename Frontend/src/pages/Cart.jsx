import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  addToCart,
} from "../store/CartSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user?._id;
  const token = user?.token;

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Fetch cart items from backend when component mounts
  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;

      try {
        const res = await axios.get(
          `https://e-commerce-1jgv.vercel.app/cart/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const items = res.data?.items || [];
        items.forEach((item) => {
          dispatch(addToCart({ ...item, quantity: item.quantity }));
        });
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    fetchCart();
  }, [dispatch, userId, token]);

  const handleQuantityChange = async (id, delta) => {
    dispatch(updateQuantity({ id, delta }));
    try {
      await axios.patch(
        `https://e-commerce-1jgv.vercel.app/cart/update/${userId}/${id}`,
        { delta },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const handleRemove = async (id) => {
    dispatch(removeFromCart(id));
    try {
      await axios.delete(
        `https://e-commerce-1jgv.vercel.app/cart/remove/${userId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const handleBuyNow = async () => {
    try {
      await axios.delete(`https://e-commerce-1jgv.vercel.app/cart/clear/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(clearCart());
      alert("Order placed successfully!");
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b pb-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} × {item.quantity} ={" "}
                      <span className="font-medium text-gray-700">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                  <button
                    aria-label="Decrease quantity"
                    className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => handleQuantityChange(item._id, -1)}
                  >
                    −
                  </button>
                  <span className="text-base font-medium">{item.quantity}</span>
                  <button
                    aria-label="Increase quantity"
                    className={`px-3 py-1 border border-gray-300 rounded text-gray-700 transition
                      ${
                        item.quantity >= 10
                          ? "bg-gray-200 cursor-not-allowed text-gray-400"
                          : "hover:bg-gray-100"
                      }
                    `}
                    onClick={() => {
                      if (item.quantity < 10) {
                        handleQuantityChange(item._id, 1);
                      }
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="ml-3 text-red-500 text-sm hover:underline"
                    aria-label={`Remove ${item.title}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <div className="text-2xl font-bold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBuyNow}
                className="bg-amber-300 hover:bg-amber-200 text-white px-6 py-2 rounded shadow-sm transition"
              >
                Buy Now
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded shadow-sm transition"
              >
                Add More Items
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
