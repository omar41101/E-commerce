import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";  // Import SweetAlert
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        Swal.fire({
          title: "Error",
          text: "Product creation failed. Try again.",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Success",
          text: `${data.name} is created.`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/"); // Redirect after product creation
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Product creation failed. Try again.",
        icon: "error",
      });
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      Swal.fire({
        title: "Image Uploaded",
        text: res.message,
        icon: "success",
      });
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error?.data?.message || error.error,
        icon: "error",
      });
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0] mt-10">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3 bg-gray-900 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Create Product</h1>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px] mb-5"
              />
            </div>
          )}

          <div className="mb-5">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-4 bg-gray-800 hover:bg-gray-700">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  className="p-4 w-full border rounded-lg bg-gray-800 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2" htmlFor="price">Price</label>
                <input
                  type="number"
                  className="p-4 w-full border rounded-lg bg-gray-800 text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2" htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  className="p-4 w-full border rounded-lg bg-gray-800 text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2" htmlFor="brand">Brand</label>
                <input
                  type="text"
                  className="p-4 w-full border rounded-lg bg-gray-800 text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Description</label>
              <textarea
                className="p-4 w-full h-32 border rounded-lg bg-gray-800 text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2">Count In Stock</label>
                <input
                  type="number"
                  className="p-4 w-full border rounded-lg bg-gray-800 text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Category</label>
                <select
                  className="p-4 w-full border rounded-lg bg-gray-800 text-white"
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select a Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-lg text-lg font-bold bg-pink-600 text-white hover:bg-pink-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
