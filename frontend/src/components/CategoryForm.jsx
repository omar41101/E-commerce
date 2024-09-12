const CategoryForm = ({ value, setValue, handleSubmit, handleDelete, buttonText }) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="mb-4 w-full">
        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-300 mb-2">
          Category Name
        </label>
        <input
          type="text"
          id="categoryName"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded-md bg-gray-700 text-white"
          placeholder="Enter category name"
        />
      </div>

      {/* Buttons for both update and delete */}
      <div className="flex justify-between w-full mt-4">
        {/* Update button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {buttonText || "Submit"}
        </button>

        {/* Delete button */}
        {handleDelete && (
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete Category
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
