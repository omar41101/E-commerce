import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";

import Swal from "sweetalert2";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      Swal.fire({
        title: "Error",
        text: "Category name is required",
        icon: "error",
      });
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      Swal.fire({
        title: "Success",
        text: `${result.name} has been created.`,
        icon: "success",
      });
      setName("");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Creating category failed, please try again.",
        icon: "error",
      });
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName.trim()) {
      Swal.fire({
        title: "Error",
        text: "Category name is required",
        icon: "error",
      });
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      Swal.fire({
        title: "Success",
        text: `${result.name} has been updated.`,
        icon: "success",
      });
      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Updating category failed, please try again.",
        icon: "error",
      });
    }
  };

  const handleDeleteCategory = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete the category "${selectedCategory.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await deleteCategory(selectedCategory._id).unwrap();

          Swal.fire({
            title: "Deleted!",
            text: `${result.name} has been deleted.`,
            icon: "success",
          });

          setSelectedCategory(null);
          setModalVisible(false);
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error",
            text: "Deleting category failed, please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="h-12 text-xl font-semibold">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr className="my-4" />

        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdatingName(category.name);
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
