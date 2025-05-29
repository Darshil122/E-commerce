import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../store/CartSlice";

const Cart = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-4">
              <div>
                <img src={item.image} alt={item.title} className="w-20 h-20 rounded" />
                <h3 className="font-semibold">{item.title}</h3>
                <p>${item.price.toFixed(2)} × {item.quantity}</p>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  className="px-2 border rounded"
                  onClick={() => dispatch(updateQuantity({ id: item.id, delta: -1 }))}
                >-</button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 border rounded"
                  onClick={() => dispatch(updateQuantity({ id: item.id, delta: 1 }))}
                >+</button>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right text-xl font-bold mt-6">
            Total: ${totalPrice.toFixed(2)}
          </div>

          <button
            onClick={() => dispatch(clearCart())}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
