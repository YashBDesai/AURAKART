import React, { useState } from "react";
import {
  Container,
  VStack,
  Box,
  Heading,
  Input,
  Button,
  useColorModeValue,
  Flex,
  useToast,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useProductStore } from "../../store/product";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Motion wrapper
const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const CreatePage = () => {
  const [newProduct, setNewproduct] = useState({
    name: "",
    price: 0,
    image: "",
  });

  const toast = useToast();
  const navigate = useNavigate();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    if (!success) {
      toast({
        title: "Error",
        description: message || "Failed to create product",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      toast({
        title: "Success",
        description: "Product created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setNewproduct({ name: "", price: 0, image: "" });
    }
  };

  return (
    <Flex
      minHeight="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-r, blue.50, teal.50)"
      px={4}
    >
      <Container maxW="lg">
        {/* Back Button */}
        <Flex
          align="center"
          mb={6}
          cursor="pointer"
          onClick={() => navigate(-1)}
        >
          <IconButton
            icon={<ArrowBackIcon />}
            variant="ghost"
            colorScheme="blue"
            aria-label="Back"
            mr={2}
          />
          <Text fontWeight="bold" color="blue.600">
            Back
          </Text>
        </Flex>

        <MotionBox
          bg={useColorModeValue("white", "gray.800")}
          p={10}
          rounded="2xl"
          shadow="2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading textAlign="center" mb={8} color="teal.500">
            🛍️ Create New Product
          </Heading>

          <MotionVStack
            spacing={5}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewproduct({ ...newProduct, name: e.target.value })
              }
              focusBorderColor="teal.400"
              _hover={{ borderColor: "teal.300" }}
            />

            <Input
              placeholder="Price"
              type="number"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewproduct({ ...newProduct, price: e.target.value })
              }
              focusBorderColor="teal.400"
              _hover={{ borderColor: "teal.300" }}
            />

            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewproduct({ ...newProduct, image: e.target.value })
              }
              focusBorderColor="teal.400"
              _hover={{ borderColor: "teal.300" }}
            />

            <Button
              colorScheme="teal"
              size="lg"
              w="full"
              onClick={handleAddProduct}
              _hover={{ transform: "scale(1.03)" }}
              transition="all 0.2s ease"
            >
              🚀 Add Product
            </Button>
          </MotionVStack>
        </MotionBox>
      </Container>
    </Flex>
  );
};

export default CreatePage;
