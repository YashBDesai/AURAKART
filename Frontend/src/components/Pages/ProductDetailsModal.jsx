import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  Heading,
  Container,
  Spinner,
  Button,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "../../store/product";
import { motion } from "framer-motion";
import ReactStars from "react-rating-stars-component";

const MotionFlex = motion(Flex);
const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, fetchProducts } = useProductStore();
  const [product, setProduct] = useState(null);

const cardBg = useColorModeValue("white", "gray.800");

  const borderColor = useColorModeValue("gray.300", "gray.400");

  useEffect(() => {
    const load = async () => {
      if (products.length === 0) await fetchProducts();
      const found = products.find((p) => p._id === id);
      setProduct(found);
    };
    load();
  }, [id, fetchProducts, products]);

  if (!product) {
    return (
      <Container maxW="container.md" py={20}>
        <Flex justify="center">
          <Spinner size="xl" />
        </Flex>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={10}>
      <MotionFlex
        direction={{ base: "column", md: "row" }}
        gap={10}
        bg={cardBg}
        p={8}
        borderRadius="2xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.37)"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Image Section */}
        <MotionBox
          flex="1"
          position="relative"
          borderRadius="lg"
          overflow="hidden"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            position="absolute"
            top="10px"
            left="10px"
            size="sm"
            bg={useColorModeValue("whiteAlpha.900", "whiteAlpha.200")}
            color={useColorModeValue("black", "black")}
            onClick={() => navigate(-1)}
            _hover={{ bg: useColorModeValue("gray.500", "gray.400") }}
            zIndex={1}
          >
            ← Back
          </Button>

          <Image
            src={product.image}
            alt={product.name}
            fallbackSrc="/images/no-image.png"
            objectFit="cover"
            w="100%"
            maxH="450px"
            borderRadius="lg"
            boxShadow="lg"
          />
        </MotionBox>

        {/* Product Info */}
        <MotionBox
          flex="1"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <VStack align="start" spacing={5}>
            <MotionHeading
              size="lg"
              color={useColorModeValue("gray.800", "whiteAlpha.900")}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {product.name}
            </MotionHeading>

            <Text
              fontSize="3xl"
              fontWeight="bold"
              bgGradient="linear(to-r, teal.300, green.400)"
              bgClip="text"
              textShadow="0 0 10px rgba(0,255,0,0.3)"
            >
              ₹ {product.price}
            </Text>

            {/* ⭐ Interactive Rating */}
            <Box mt={2}>
              <Text mb={1} fontWeight="medium">
                Rate this product:
              </Text>
              <ReactStars
                count={5}
                size={30}
                isHalf={true}
                onChange={(rating) =>
                  console.log(`Rated ${product.name}:`, rating)
                }
                activeColor="#facc15"
              />
            </Box>

            <Text fontSize="sm" color="gray.400">
              Product ID: {product._id}
            </Text>

            <Text fontWeight="medium" color="orange.300">
              🎁 <strong>Special Offer:</strong> Get 10% off on your first
              purchase!
            </Text>

            <Flex gap={4} pt={4} w="full">
              <Button
                colorScheme="yellow"
                flex="1"
                _hover={{ transform: "scale(1.06)", boxShadow: "lg" }}
                transition="all 0.4s ease"
              >
                Add to Cart
              </Button>
              <Button
                colorScheme="orange"
                flex="1"
                _hover={{ transform: "scale(1.06)" }}
                transition="all 0.5s ease"
              >
                Buy Now
              </Button>
            </Flex>
          </VStack>
        </MotionBox>
      </MotionFlex>
    </Container>
  );
};

export default ProductDetailsPage;
