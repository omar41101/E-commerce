import Category from '../models/categoryModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.json({ error: "name is required" })
        }
        const existingCategory = await Category.findOne({ name })
        if (existingCategory) {
            return res.json({ error: "already exits" })
        }

        const category = await new Category({ name }).save()
        res.json(category)

    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
})


const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;
        const category = await Category.findOne({ _id: categoryId })

        if (!category) {
            return res.status(404).json({ error: "category not found" })
        }
        category.name = name
        const updatedCategory = await category.save()
        res.json(updatedCategory)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "internal server error" })
    }



})


const deleteCategory = asyncHandler(async (req, res) => {
    try {
      const { categoryId } = req.params; // Destructure categoryId from params
  
      const removed = await Category.findByIdAndDelete(categoryId); // Find and delete category by ID
  
      if (!removed) {
        return res.status(404).json({ error: "Category not found" }); // If no category found, return 404
      }
  
      res.status(200).json({ message: "Category deleted successfully", data: removed }); // Return success message
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" }); // If error, return 500
    }
  });
  


const listCategory = asyncHandler(async (req, res) => {
    try {
        const all = await Category.find({})
        res.json(all)

    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})

const readCategory = asyncHandler(async (req ,res) => {
    try {
        const category = await Category.findOne({_id: req.params.id})
        res.json(category)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
        
    }
})

export {readCategory, createCategory, updateCategory, deleteCategory, listCategory }