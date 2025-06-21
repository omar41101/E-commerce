import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  console.log(productData);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);

  // hook
  const navigate = useNavigate();

  // Fetch categories using RTK Query
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();

  // Define the update product mutation
  const [updateProduct] = useUpdateProductMutation();

  // Define the delete product mutation
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setImage(res.image);
    } catch (err) {
      toast.success("Item added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      // Update product using the RTK Query mutation
      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.success(`Product successfully updated`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0] min-h-screen bg-tech-black ">
      <div className="flex flex-col md:flex-row w-full gap-8">
        <div className=" p-3">
          <AdminMenu />
        </div>
        <div className="md:w-3/4 p-3">
          <div className="text-2xl font-display font-bold mb-6 text-tech-blue mr-0 md:mr-12">Update / Delete Product</div>
          {image && (
            <div className="text-center mb-6 mr-0 md:mr-12">
              <img
                src={image}
                alt="product"
                className="block mx-auto w-full max-w-md h-56 object-cover rounded-xl border border-tech-blue/10 shadow"
              />
            </div>
          )}
          <div className="mb-6 mr-0 md:mr-12">
            <label className="block w-full text-center rounded-lg cursor-pointer font-bold py-3 bg-tech-dark/60 text-tech-white border border-tech-blue/10 hover:bg-tech-dark/80 transition">
              {image ? image.name : "Upload image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>
          <div className="p-3 bg-tech-dark/60 rounded-xl border border-tech-blue/10 mr-0 md:mr-12">
            <div className="flex flex-wrap gap-6 mb-4">
              <div className="flex-1 min-w-[220px]">
                <label className="block text-tech-blue font-display font-semibold mb-2 text-sm" htmlFor="name">Name</label>
                <input
                  type="text"
                  className="p-4 w-full border rounded-lg bg-tech-black text-tech-white border-tech-blue/10 focus:outline-none focus:ring-2 focus:ring-tech-blue/20 focus:border-tech-blue transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex-1 min-w-[220px]">
                <label className="block text-tech-blue font-display font-semibold mb-2 text-sm" htmlFor="price">Price</label>
                <input
                  type="number"
                  className="p-4 w-full border rounded-lg bg-tech-black text-tech-white border-tech-blue/10 focus:outline-none focus:ring-2 focus:ring-tech-blue/20 focus:border-tech-blue transition"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-6 mb-4">
              <div className="flex-1 min-w-[220px]">
                <label className="block text-tech-blue font-display font-semibold mb-2 text-sm" htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  min="1"
                  className="p-4 w-full border rounded-lg bg-tech-black text-tech-white border-tech-blue/10 focus:outline-none focus:ring-2 focus:ring-tech-blue/20 focus:border-tech-blue transition"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="flex-1 min-w-[220px]">
                <label className="block text-tech-blue font-display font-semibold mb-2 text-sm" htmlFor="brand">Brand</label>
                <input
                  type="text"
                  className="p-4 w-full border rounded-lg bg-tech-black text-tech-white border-tech-blue/10 focus:outline-none focus:ring-2 focus:ring-tech-blue/20 focus:border-tech-blue transition"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-tech-blue font-display font-semibold mb-2 text-sm">Description</label>
              <textarea
                className="p-4 w-full border rounded-lg bg-tech-black text-tech-white border-tech-blue/10 focus:outline-none focus:ring-2 focus:ring-tech-blue/20 focus:border-tech-blue transition"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex flex-wrap gap-6 mb-4">
              <div className="flex-1 min-w-[220px]">
                <label className="block text-tech-blue font-display font-semibold mb-2 text-sm">Count In Stock</label>
                <input
                  type="number"
                  className="p-4 w-full border rounded-lg bg-tech-black text-tech-white border-tech-blue/10 focus:outline-none focus:ring-2 focus:ring-tech-blue/20 focus:border-tech-blue transition"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="flex-1 min-w-[220px]">
                <label className="block text-tech-blue font-display font-semibold mb-2 text-sm">Category</label>
                <select
                  className="p-4 w-full border rounded-lg bg-tech-black text-tech-white border-tech-blue/10 focus:outline-none focus:ring-2 focus:ring-tech-blue/20 focus:border-tech-blue transition"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="py-4 px-10 rounded-lg text-lg font-bold bg-tech-blue hover:bg-tech-blue/80 text-white transition"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="py-4 px-10 rounded-lg text-lg font-bold bg-tech-dark hover:bg-tech-blue/20 text-white border border-tech-blue/20 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;