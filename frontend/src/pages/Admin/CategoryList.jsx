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
import withAdminLayout from './withAdminLayout';

const CategoryList = () => {
  const { data: categories, refetch } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  

  // Handle creating category
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
      const result = await createCategory({ name })
      console.log(result)
      Swal.fire({
        title: "Success",
        text: `Category has been created.`,
        icon: "success",
      });
      setName("");
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Creating category failed, please try again.",
        icon: "error",
      });
    }
  };

  // Handle updating category
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
        text: ` Category has been updated.`,
        icon: "success",
      });
      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisible(false);
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Updating category failed, please try again.",
        icon: "error",
      });
    }
  };

  // Handle deleting category
  const handleDeleteCategory = async () => {
    if (!selectedCategory || !selectedCategory._id) {
      Swal.fire({
        title: "Error",
        text: "No category selected or missing category ID",
        icon: "error",
      });
      return;
    }
  
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
          const deletedCategory = await deleteCategory({ categoryId: selectedCategory._id });
          console.log(deleteCategory)
          Swal.fire({
            title: "Deleted!",
            text: `${deletedCategory.name} has been deleted.`,
            icon: "success",
          });
  
          setSelectedCategory(null);
          setModalVisible(false);
  
          // Refetch the categories to get the updated list
          refetch();
  
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
    <div className="min-h-screen flex items-center justify-center bg-tech-black">
      <div className="flex flex-col md:flex-row w-full max-w-3xl mx-auto gap-8">
        <div className="md:w-1/4 p-0 md:pr-4 flex items-start justify-center">
          <div className="bg-tech-dark/70 border border-tech-blue/10 rounded-2xl p-4 shadow-lg h-full">
            <AdminMenu />
          </div>
        </div>
        <div className="md:w-3/4 flex items-center justify-center">
          <div className="tech-card w-full max-w-md p-8 md:p-10 shadow-xl border border-tech-blue/10 backdrop-blur-xl mx-auto">
            <div className="text-2xl font-display font-bold mb-2 text-center text-tech-blue">Manage Categories</div>
            <div className="border-t border-tech-blue/10 mb-6"></div>
            <div className="bg-tech-dark/60 border border-tech-blue/10 p-4 rounded-lg mb-8">
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleCreateCategory}
                placeholder="Enter new category name"
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {categories?.map((category) => (
                <div key={category._id} className="bg-tech-dark/60 border border-tech-blue/10 p-4 rounded-lg flex justify-between items-center">
                  <span className="text-tech-white font-semibold">{category.name}</span>
                  <button
                    className="text-tech-blue hover:text-tech-white font-display font-semibold focus:outline-none"
                    onClick={() => {
                      setModalVisible(true);
                      setSelectedCategory(category);
                      setUpdatingName(category.name);
                    }}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
            {/* Modal with Update and Delete functionality */}
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
      </div>
    </div>
  );
};

export default withAdminLayout(CategoryList);
