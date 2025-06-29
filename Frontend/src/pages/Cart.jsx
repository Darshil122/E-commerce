import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} from "../store/CartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // remove item
  const handleRemove = async (productId) => {
    await dispatch(removeFromCart(productId));
    alert("Item removed from cart successfully!");
    await dispatch(fetchCart());
  };

  //Update Quantity
  const handleQuantityChange = async (productId, newQty) => {
    if (newQty >= 1) {
      await dispatch(updateCartQuantity({ productId, quantity: newQty }));
      await dispatch(fetchCart());
    }
  };
  //ClearCart
  const handleClearCart = () => {
    dispatch(clearCart());
    alert("Cart cleared!");
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24"
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p>
                      ${item.price} × {item.quantity} ={" "}
                      <strong>
                        ${(item.price * item.quantity).toFixed(2)}
                      </strong>
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className={`px-2 py-1 rounded transition ${
                      item.quantity <= 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                    }`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity + 1)
                    }
                    disabled={item.quantity >= 10}
                    className={`px-2 py-1 rounded transition ${
                      item.quantity >= 10
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                    }`}
                  >
                    +
                  </button>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </div>
            <button
              onClick={handleClearCart}
              className="bg-amber-500 hover:bg-amber-400 px-4 py-2 text-white rounded"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
