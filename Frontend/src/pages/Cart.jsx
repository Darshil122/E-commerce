import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCart, clearCart } from "../store/CartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="w-24 h-24" />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p>${item.price} × {item.quantity} = <strong>${(item.price * item.quantity).toFixed(2)}</strong></p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</div>
            <button
              onClick={() => {
                dispatch(clearCart());
                alert("Order placed!");
              }}
              className="bg-amber-500 hover:bg-amber-400 px-4 py-2 text-white rounded"
            >
              Buy Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;