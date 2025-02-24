import React, { useContext } from "react";
import { useWishlist } from "../../Context/wishListContext";
import ClipLoader from "react-spinners/ClipLoader";
import { cartContext } from "../../Context/cartContext";

export default function Wishlist() {
  const { wishlistItems, loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useContext(cartContext);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <ClipLoader size={50} color="#08AC0A" />
        </div>
      ) : (
        <div className="px-5 py-8">
          {wishlistItems.length === 0 ? (
            <h1 className="my-10 text-4xl font-semibold text-center">
              YOUR WISHLIST IS EMPTY. START SHOPPING NOW!
            </h1>
          ) : (
            <ul className="space-y-4">
              {wishlistItems.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.imageCover}
                      alt={item.title}
                      className="w-20 h-20 rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p>{item.price} EGP</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-3 py-1 text-red-600 transition-colors border border-red-600 rounded hover:bg-red-600 hover:text-white"
                      onClick={() => removeFromWishlist(item._id)}
                    >
                      Remove
                    </button>
                    <button
                      className="px-3 py-1 text-green-600 transition-colors border border-green-600 rounded hover:bg-green-600 hover:text-white"
                      onClick={() => handleAddToCart(item._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
