// // import React from "react";
// // import { Route, Routes } from "react-router-dom";
// // import { Box } from "@chakra-ui/react";
// // import CreatePage from "./components/Pages/Createpage";
// // import ProductDetailsModal from "./components/Pages/ProductDetailsModal";
// // import Navbar from "./components/Navbar";
// // import HomePage from "./components/Pages/Homepage";
// // import PageWrapper from "./store/pagewrapper";
// // function App() {
// //   return (
// //     <Box
// //       minH="100vh"
// //       bgGradient="radial(125% 125% at 50% 10%, black 40%, #63e 100%)"
// //       boxShadow="md"
// //       borderRadius="md"
   
// //     >
// //       <PageWrapper>
// //       <Navbar />
// //       <Routes>
// //         <Route path="/" element={<HomePage />} />
// //         <Route path="/create" element={<CreatePage />} />
// //         <Route path="/product/:id" element={<ProductDetailsModal />} />
// //       </Routes>
// //       </PageWrapper>
// //     </Box>
// //   );
// // }
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Navbar from "./components/Navbar";
import HomePage from "./components/Pages/Homepage";
import CreatePage from "./components/Pages/Createpage";
import ProductDetailsModal from "./components/Pages/ProductDetailsModal";
import PageWrapper from "./store/pagewrapper";

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
      </Routes>
    </Box>
  );
}

export default App;
