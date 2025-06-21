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
    <div className="min-h-screen flex items-center justify-center bg-tech-black py-12">
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-8">
        <div className="p-3">
          <div className="bg-tech-dark/70 border border-tech-blue/10 rounded-2xl p-4 shadow-lg h-full">
            <AdminMenu />
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="tech-card w-full max-w-4xl p-6 md:p-10 shadow-xl border border-tech-blue/10 backdrop-blur-xl mx-auto mr-0 md:mr-12">
            <div className="text-2xl font-display font-bold mb-6 text-center text-tech-blue">
              All Products ({products.length})
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-tech-white text-sm">
                <thead>
                  <tr className="border-b border-tech-blue/10">
                    <th className="py-3 px-2 text-left font-semibold">Image</th>
                    <th className="py-3 px-2 text-left font-semibold">Name</th>
                    <th className="py-3 px-2 text-left font-semibold">Description</th>
                    <th className="py-3 px-2 text-left font-semibold">Price</th>
                    <th className="py-3 px-2 text-left font-semibold">Category</th>
                    <th className="py-3 px-2 text-left font-semibold">Quantity</th>
                    <th className="py-3 px-2 text-left font-semibold">Brand</th>
                    <th className="py-3 px-2 text-left font-semibold">Created At</th>
                    <th className="py-3 px-2 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-tech-blue/5 hover:bg-tech-dark/30 transition-colors h-20 align-middle"
                    >
                      <td className="px-2 py-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg border border-tech-blue/10"
                        />
                      </td>
                      <td className="px-2 py-4 font-semibold text-tech-white">
                        {product.name}
                      </td>
                      <td className="px-2 py-4 text-tech-text-secondary">
                        {product.description?.substring(0, 80)}...
                      </td>
                      <td className="px-2 py-4 text-tech-blue font-bold">
                        ${product.price}
                      </td>
                      <td className="px-2 py-4">
                        {product.category?.name || "N/A"}
                      </td>
                      <td className="px-2 py-4">{product.quantity}</td>
                      <td className="px-2 py-4">{product.brand}</td>
                      <td className="px-2 py-4">
                        {moment(product.createdAt).format("MMM Do, YYYY")}
                      </td>
                      <td className="px-2 py-4">
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="tech-btn bg-tech-blue hover:bg-tech-blue/80 text-xs px-6 py-3 transition-colors duration-150 mt-2 mb-2"
                        >
                          Update
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
    </div>
  );
};

export default AllProducts;
