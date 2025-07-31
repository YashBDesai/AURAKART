import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductMap from "./ProductMap";
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Spinner,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa";

function BuyNow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const specialOffers = [
    "🎁 10% off on your first purchase!",
    "🎉 20% off today!",
    "💰 Save 15% now!",
    "🚀 25% limited-time deal!",
    "🌟 Welcome: 12% off!",
  ];

  const getRandomOffer = () =>
    specialOffers[Math.floor(Math.random() * specialOffers.length)];

  const generateRating = (productId) => {
    const productIndex = parseInt(productId.slice(-3), 16);
    return productIndex % 3 === 0 ? Math.floor(Math.random() * 2) + 3 : 5;
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct({
          ...data,
          rating: generateRating(data._id || data.id),
          specialOffer: getRandomOffer(),
        });
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        as={i < rating ? FaStar : FaRegStar}
        color={i < rating ? "gold" : "gray.400"}
        boxSize={6}
      />
    ));

  const handleBuyNow = () => {
    toast({
      title: `Successfully purchased ${product.name}`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
        <Spinner size="xl" color="orange.400" />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box p={6} textAlign="center" color="red.500" fontWeight="bold">
        Product not found or failed to load.
      </Box>
    );
  }

  const { name, price, rating, specialOffer } = product;

  return (
    <Box
      minH="100vh"
      bgGradient="radial(125% 125% at 50% 10%, black 40%, #63e 100%)"
      overflow="hidden"
      m={0}
    >
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        h="100%"
      >
        {/* Left - Map */}
        <Box flex="1" h="100%" padding={10} overflow="hidden">
          <ProductMap />
        </Box>

        {/* Right - Product Info */}
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          p={10}
          color="white"
          fontFamily="monospace"
        >
          <Button
            onClick={() => navigate(-1)}
            bg="gray.700"
            color="white"
            _hover={{ bg: "gray.600" }}
            mb={6}
            px={6}
            py={3}
            borderRadius="md"
            fontSize="lg"
            w="fit-content"
          >
            ← BACK
          </Button>

          <VStack align="flex-start" spacing={6} fontSize="xl">
            <Text fontSize="3xl" fontWeight="bold">
              {name} — ₹ {price?.toLocaleString()}
            </Text>

            <HStack>
              <Text>Rating:</Text>
              {renderStars(rating)}
            </HStack>

            <Text fontSize="lg" color="orange.300" fontWeight="semibold">
              {specialOffer}
            </Text>

            <Text fontSize="md" color="gray.400">
              Product ID: {product._id || product.id}
            </Text>
          </VStack>

          {/* Buttons aligned horizontally */}
          <HStack spacing={6} pt={8} mt="auto">
            <Button
              bg="gray.700"
              color="white"
              _hover={{ bg: "gray.600" }}
              px={8}
              py={4}
              borderRadius="full"
              fontSize="lg"
            >
              Get My Location
            </Button>
            <Button
              bg="white"
              color="black"
              _hover={{ bg: "gray.300" }}
              px={8}
              py={4}
              borderRadius="full"
              fontWeight="bold"
              fontSize="lg"
              onClick={handleBuyNow}
            >
              BUY NOW
            </Button>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}

export default BuyNow;
