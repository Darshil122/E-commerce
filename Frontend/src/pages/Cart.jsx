import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} from "../store/CartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  // remove item
  const handleRemove = async (productId) => {
  await dispatch(removeFromCart(productId));
  await dispatch(fetchCart());
  toast.error("Item removed from cart!");
};

  //Update Quantity
 const handleQuantityChange = async (productId, newQty) => {
  if (newQty >= 1) {
    await dispatch(updateCartQuantity({ productId, quantity: newQty }));
    await dispatch(fetchCart());
    toast.success("Quantity updated");
  }
  if (newQty === 10) {
    toast.info("Maximum quantity reached!");
  }
};

  //ClearCart
  const handleClearCart = async () => {
    await dispatch(clearCart());
    toast.error("Cart cleared");
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

          <div className="mt-8 p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
  <div className="text-2xl font-bold text-gray-800">
    Total: <span>${totalPrice.toFixed(2)}</span>
  </div>
  
  <div className="flex flex-col sm:flex-row gap-3">
    <button
      onClick={handleClearCart}
      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded"
    >
      Clear Cart
    </button>
    
    <button
      onClick={() => navigate("/")}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
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
