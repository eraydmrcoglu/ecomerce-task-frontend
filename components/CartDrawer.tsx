'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import { FiX, FiMinus, FiPlus } from 'react-icons/fi';
import Image from 'next/image';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-lg transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            🛒 My Cart
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600 transition">
            <FiX size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-16">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-gray-50 rounded-lg p-3">
                  <Image
                    src={item.product.images?.[0] || '/placeholder.jpg'}
                    alt={item.product.name}
                    width={500} height={500}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      ${item.product.price.toFixed(2)} × {item.quantity}
                    </p>

                    <div className="flex items-center mt-2 gap-2">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item.product._id,
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          )
                        }
                        className="w-7 h-7 flex items-center justify-center rounded border text-gray-600 hover:bg-gray-100"
                      >
                        <FiMinus />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            updateQuantity({
                              productId: item.product._id,
                              quantity: Math.max(1, parseInt(e.target.value)),
                            })
                          )
                        }
                        className="w-10 h-7 text-center border rounded text-sm appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item.product._id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="w-7 h-7 flex items-center justify-center rounded border text-gray-600 hover:bg-gray-100"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => dispatch(removeFromCart(item.product._id))}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t px-6 py-4 bg-white">
          <div className="flex justify-between text-sm text-gray-700 mb-3">
            <span>Total:</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className={`w-full py-3 text-white rounded-md text-sm transition ${
              cartItems.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Checkout
          </button>

          <button
            onClick={onClose}
            className="mt-2 block w-full text-center text-sm text-gray-500 hover:text-gray-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}
