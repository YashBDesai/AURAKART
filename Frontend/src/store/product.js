
// store/product.js
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  fetchProducts: async () => {
    try {
      const response = await fetch("https://mern-crash-course-t7kg.onrender.com/api/products")

      const data = await response.json();
      set({ products: data.data || data }); // Handle different response structures
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ products: [] });
    }
  },

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill all fields" };
    }

    try {
      const res = await fetch(
        "https://mern-crash-course-t7kg.onrender.com/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Failed to create product." };
      }

      set((state) => ({
        products: [...state.products, data.data || data],
      }));

      return { success: true, message: "Product created successfully!", product: data };
    } catch (error) {
      console.error("Error creating product:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(
        `https://mern-crash-course-t7kg.onrender.com/api/products/${pid}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Failed to delete product" };
      }

      // Remove the product from the state immediately
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: data.message || "Product deleted successfully!" };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(
        `https://mern-crash-course-t7kg.onrender.com/api/products/${pid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Failed to update product" };
      }

      // Update the product in the state
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? { ...product, ...updatedProduct } : product
        ),
      }));

      return { success: true, message: "Product updated successfully!", product: data };
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  },
}));