import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../store/CartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();

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
                key={item.id}
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
                    onClick={() =>
                      dispatch(updateQuantity({ id: item.id, delta: -1 }))
                    }
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
                        dispatch(updateQuantity({ id: item.id, delta: 1 }));
                      }
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
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
