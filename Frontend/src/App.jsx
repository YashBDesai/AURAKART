import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import HomePage from "./components/Pages/Homepage";
import CreatePage from "./components/Pages/Createpage";
import ProductDetailsModal from "./components/Pages/ProductDetailsModal";
import PageWrapper from "./store/pagewrapper";
import EditProductModal from "./components/Pages/EditProductModal";
import BuyNow from "./components/Pages/BuyNow";
function App() {
  return (
    <Box
      minH="100vh"
      bgGradient="radial(125% 125% at 50% 10%, black 40%, #63e 100%)"
      overflow="hidden"
    >
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PageWrapper>
              <HomePage />
            </PageWrapper>
          }
        />
        <Route
          path="/create"
          element={
            <PageWrapper>
              <CreatePage />
            </PageWrapper>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PageWrapper>
              <ProductDetailsModal />
            </PageWrapper>
          }
        />
        <Route
          path="/product/edit/:id"
          element={
            <PageWrapper>
              <EditProductModal />
            </PageWrapper>
          }
        />
        <Route
          path="/buy/:id"
          element={
            <PageWrapper>
              <BuyNow />
            </PageWrapper>
          }
        />
      </Routes>
    </Box>
  );
}

export default App;
