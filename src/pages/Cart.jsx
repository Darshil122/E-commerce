import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../store/CartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

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
                key={item.id}
                className="flex flex-col sm:flex-row justify-between gap-4 items-center border-b pb-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    className="px-2 py-1 border rounded text-sm"
                    onClick={() =>
                      dispatch(updateQuantity({ id: item.id, delta: -1 }))
                    }
                  >
                    −
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    className="px-2 py-1 border rounded text-sm"
                    onClick={() =>
                      dispatch(updateQuantity({ id: item.id, delta: 1 }))
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-600 text-sm hover:underline ml-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </div>
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded text-sm"
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
