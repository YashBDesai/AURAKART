import Product from "../models/product.model.js"; 
import mongoose from "mongoose"; 


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const createProduct = async (req, res) => {
  const product = await req.body;

  console.log("Received product data:", product);

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }

  const newProduct = new Product(product);
  console.log("New Product Object:", newProduct); // Log the new product object

  try {
    await newProduct.save();
    res.status(200).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Create Product Error:", error); // Log real error
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

 
  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Update Product Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server Error while updating product" });
  }
};


export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error); // Log the actual error
    res
      .status(500)
      .json({ success: false, message: "Server Error while deleting product" });
  }
};
