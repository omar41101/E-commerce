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
    <div className="min-h-screen flex items-center justify-center bg-tech-black py-12">
      <div className="flex flex-col md:flex-row w-full max-w-3xl mx-auto gap-8">
        <div className="md:w-1/4 p-0 md:pr-4 flex items-start justify-center">
          <div className="bg-tech-dark/70 border border-tech-blue/10 rounded-2xl p-4 shadow-lg h-full">
            <AdminMenu />
          </div>
        </div>
        <div className="md:w-3/4 flex items-center justify-center">
          <div className="tech-card w-full max-w-md p-8 md:p-10 shadow-xl border border-tech-blue/10 backdrop-blur-xl mx-auto">
            <h1 className="text-2xl font-display font-bold mb-2 text-center text-tech-blue">Create Product</h1>
            <p className="text-tech-text-secondary text-center mb-6 font-tech text-base">Add a new product to your store. Fill in the details below and submit.</p>
            <div className="border-t border-tech-blue/10 mb-6"></div>
            {imageUrl && (
              <div className="flex flex-col items-center mb-6">
                <div className="w-36 h-36 rounded-xl overflow-hidden border border-tech-blue/20 bg-tech-black flex items-center justify-center mb-2">
                  <img
                    src={imageUrl}
                    alt="product"
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-xs text-tech-text-secondary">Image Preview</span>
              </div>
            )}
            <div className="mb-6">
              <label className="tech-btn w-full text-center cursor-pointer font-bold py-3">
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
                  <label className="block text-tech-blue font-display font-semibold mb-2 text-sm" htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-tech-dark/60 border border-tech-blue/20 rounded-lg text-tech-white placeholder-tech-text-secondary focus:outline-none focus:ring-2 focus:ring-tech-blue/20 focus:border-tech-blue transition-all duration-200"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-tech-blue font-display font-semibold mb-2 text-sm" htmlFor="price">Price</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-tech-dark/60 border border-tech-blue/20 rounded-lg text-tech-white placeholder-tech-text-secondary focus:outline-none focus:ring-2 focus:ring-tech-blue/20 focus:border-tech-blue transition-all duration-200"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-tech-blue font-display font-semibold mb-2 text-sm" htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-tech-dark/60 border border-tech-blue/20 rounded-lg text-tech-white placeholder-tech-text-secondary focus:outline-none focus:ring-2 focus:ring-tech-blue/20 focus:border-tech-blue transition-all duration-200"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-tech-blue font-display font-semibold mb-2 text-sm" htmlFor="brand">Brand</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-tech-dark/60 border border-tech-blue/20 rounded-lg text-tech-white placeholder-tech-text-secondary focus:outline-none focus:ring-2 focus:ring-tech-blue/20 focus:border-tech-blue transition-all duration-200"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-tech-blue font-display font-semibold mb-2 text-sm">Description</label>
                <textarea
                  className="w-full px-4 py-3 h-28 bg-tech-dark/60 border border-tech-blue/20 rounded-lg text-tech-white placeholder-tech-text-secondary focus:outline-none focus:ring-2 focus:ring-tech-blue/20 focus:border-tech-blue transition-all duration-200"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-tech-blue font-display font-semibold mb-2 text-sm">Count In Stock</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-tech-dark/60 border border-tech-blue/20 rounded-lg text-tech-white placeholder-tech-text-secondary focus:outline-none focus:ring-2 focus:ring-tech-blue/20 focus:border-tech-blue transition-all duration-200"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-tech-blue font-display font-semibold mb-2 text-sm">Category</label>
                  <select
                    className="w-full px-4 py-3 bg-tech-dark/60 border border-tech-blue/20 rounded-lg text-tech-white focus:outline-none focus:ring-2 focus:ring-tech-blue/20 focus:border-tech-blue transition-all duration-200"
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
                className="w-full tech-btn bg-tech-blue hover:bg-tech-dark text-lg py-3 font-bold flex items-center justify-center gap-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
