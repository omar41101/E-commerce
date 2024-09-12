import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <div className="container mx-[9rem] mt-8">
        <div className="flex flex-col ">
          {/* Sidebar for Admin Menu */}
          <div className="md:w-1/4 p-3">
            <AdminMenu />
          </div>

          {/* Main content */}
          <div className="md:w-3/4 p-3">
            <div className="ml-[2rem] text-2xl font-bold h-12 mb-6 text-pink-500">
              All Products ({products.length})
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-900 text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Brand
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Created At
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b bg-black border-gray-700 hover:bg-gray-800"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-[5rem] h-[5rem] object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {product.description?.substring(0, 80)}...
                      </td>
                      <td className="px-6 py-4 text-pink-500">
                        $ {product.price}
                      </td>
                      <td className="px-6 py-4">
                        {product.category?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4">{product.quantity}</td>
                      <td className="px-6 py-4">{product.brand}</td>
                      <td className="px-6 py-4">
                        {moment(product.createdAt).format("MMM Do, YYYY")}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                        >
                          Update
                          <svg
                            className="w-4 h-4 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
