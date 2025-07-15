import React, { useEffect } from "react";
import {
  Container,
  SimpleGrid,
  Heading,
  Text,
  Spinner,
  Center,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../../store/product";
import ProductCard from "./ProductCard";

const HomePage = () => {
  const { products, fetchProducts, isLoading, error } = useProductStore();

  useEffect(() => {
    fetchProducts(); // Fetch product data on mount
  }, [fetchProducts]);

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={6} align="start">
      <Heading
  size="lg"
  bgGradient="radial(125% 125% at 50% 0%, #fff 20%, #63e 100%)"
  bgClip="text"
>

          🛍️ Our Latest Collection
        </Heading>

        {isLoading ? (
          <Center w="full" py={20}>
            <Spinner size="xxl" color="teal.300" />
          </Center>
        ) : error ? (
          <Text color="red.500">Failed to load products. {error}</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} w="full">
            {products
              .filter((product) => product && product._id && product.name)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
