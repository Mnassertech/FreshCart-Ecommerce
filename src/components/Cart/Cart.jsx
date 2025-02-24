import React, { useContext, useEffect } from 'react';
import { cartContext } from '../../Context/cartContext';
import cart1 from "../../assets/images/output-onlinegiftools.gif";
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartDetails, removeProduct, updateCount } = useContext(cartContext);

  useEffect(() => {

  }, [cartDetails]);

  async function deleteProduct(id) {
    let data = await removeProduct(id);
    console.log(data);
  }

  async function updateItems(id, count) {
    let data = await updateCount(id, count);
    console.log(data);
  }

  return (
    <>
      {cartDetails ? (
        cartDetails?.data?.products?.length === 0 ? (
          <h1 className='my-10 text-3xl font-bold text-center'>
            YOUR CART IS EMPTY. GET TO SHOPPING NOW!
          </h1>
        ) : (
          <div className="px-5 py-8 rounded-lg shadow-xl bg-gray-50">
            <div className="flex justify-between mb-5">
              <h2 className="text-2xl font-semibold text-gray-800">
                Total Products: <span className="text-[#08AC0A] font-bold">{cartDetails.numOfCartItems}</span>
              </h2>
              <h2 className="text-2xl font-semibold text-gray-800">
                Total Price: <span className="text-[#08AC0A] font-bold">{cartDetails.data.totalCartPrice} EGP</span>
              </h2>
            </div>

            <div className="relative overflow-x-auto rounded-lg shadow-lg">
              <table className="w-full text-sm text-left text-gray-600 bg-white">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th scope="col" className="px-8 py-4">Image</th>
                    <th scope="col" className="px-6 py-4">Product</th>
                    <th scope="col" className="px-6 py-4">Qty</th>
                    <th scope="col" className="px-6 py-4">Price</th>
                    <th scope="col" className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartDetails.data.products.map(product => (
                    <tr key={product.product._id} className="border-b border-gray-300 hover:bg-gray-100">
                      <td className="p-4">
                        <img
                          src={product.product.imageCover}
                          className="object-cover w-16 h-16 rounded-md"
                          alt={product.product.title}
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {product.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateItems(product.product._id, product.count - 1)}
                            className="flex items-center justify-center w-6 h-6 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
                            type="button"
                          >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                            </svg>
                          </button>
                          <span>{product.count}</span>
                          <button
                            onClick={() => updateItems(product.product._id, product.count + 1)}
                            className="flex items-center justify-center w-6 h-6 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
                            type="button"
                          >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {product.price} EGP
                      </td>
                      <td className="px-6 py-4">
                        <span
                          onClick={() => deleteProduct(product.product._id)}
                          className="font-medium text-red-600 cursor-pointer hover:underline"
                        >
                          Remove
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {cartDetails.data.products.length > 0 && (
              <div className="flex justify-end mt-5">
                <Link
                  to={'/checkout'}
                  className="bg-[#08AC0A] hover:bg-[#266327] text-white px-6 py-3 rounded-md shadow-lg transition-all"
                >
                  Checkout
                </Link>
              </div>
            )}
          </div>
        )
      ) : (
        <div className="flex items-center justify-center">
          <img src={cart1} className="w-[400px]" alt="Empty Cart" />
        </div>
      )}
    </>
  );
}
