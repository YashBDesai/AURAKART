import React, { useState, useRef } from "react";
import {
  Box,
  Image,
  Text,
  Badge,
  Button,
  IconButton,
  VStack,
  HStack,
  useColorModeValue,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  ScaleFade,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
const ProductCard = ({ product, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isBuying, setIsBuying] = useState(false);

  const cancelRef = useRef();
  const toast = useToast();

  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const overlayBg = useColorModeValue("rgba(0,0,0,0.7)", "rgba(0,0,0,0.8)");

  // Handle missing product
  if (!product) {
    return (
      <Box
        w="360px"
        h="420px"
        bg={cardBg}
        borderRadius="20px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="0 10px 30px rgba(0,0,0,0.1)"
      >
        <Text color="red.500" fontSize="lg" fontWeight="bold">
          Product not found
        </Text>
      </Box>
    );
  }

  // Handle missing required fields
  const productName = product.name || "Unnamed Product";
  const productPrice = product.price || 0;
  const productImage = product.image || "/images/no-image.png";
  const productId = product._id || product.id;

  const handleDelete = async () => {
    if (!productId) {
      toast({
        title: "Error",
        description: "Product ID is missing",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsDeleting(true);

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/products/${productId}`
      );
      console.log("✅ Deleted:", response.data);

      toast({
        title: "Success",
        description: `${productName} has been deleted successfully`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();

      // Use callback if provided, otherwise reload page
      if (onDelete && typeof onDelete === "function") {
        onDelete(productId);
      } else {
        // Add a small delay before reload to show the success message
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("❌ Delete failed:", error.response?.data || error.message);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to delete product";

      toast({
        title: "Delete Failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (onEdit && typeof onEdit === "function") {
      onEdit(product);
    } else {
      toast({
        title: "Edit function not available",
        description: "Edit functionality is not configured",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);

    // Optional: Add haptic feedback or sound
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };
  const navigate = useNavigate();
  const handleBuyNow = () => {
    navigate(`/buy/${productId}`);
  };
  

  return (
    <>
      <Box
        position="relative"
        w="360px"
        h="420px"
        bg={cardBg}
        borderRadius="20px"
        overflow="hidden"
        cursor="pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        boxShadow={
          isHovered
            ? "0 25px 50px rgba(0,0,0,0.25)"
            : "0 10px 30px rgba(0,0,0,0.1)"
        }
        transform={isHovered ? "translateY(-8px)" : "translateY(0)"}
        transition="all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        _hover={{
          "& .product-image": { transform: "scale(1.1)" },
          "& .shine-effect": { transform: "translateX(100%)" },
        }}
      >
        {/* Product Image */}
        <Box position="relative" w="100%" h="100%" overflow="hidden">
          <Image
            className="product-image"
            src={productImage}
            alt={productName}
            w="100%"
            h="100%"
            objectFit="cover"
            transition="transform 0.6s ease"
            fallbackSrc="/images/no-image.png"
            loading="lazy"
          />

          {/* Shine Effect */}
          <Box
            className="shine-effect"
            position="absolute"
            top="0"
            left="-100%"
            w="100%"
            h="100%"
            background="linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
            transform="translateX(-100%)"
            transition="transform 0.6s ease"
            pointerEvents="none"
          />

          {/* Hover Overlay */}
          <Box
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            bg={overlayBg}
            opacity={isHovered ? 1 : 0}
            transition="opacity 0.3s ease"
            pointerEvents="none"
          />
        </Box>

        {/* Price Badge */}
        <Badge
          position="absolute"
          top="16px"
          right="16px"
          colorScheme="green"
          fontSize="md"
          fontWeight="bold"
          px="12px"
          py="6px"
          borderRadius="full"
          bg="rgba(72, 187, 120, 0.95)"
          color="white"
          backdropFilter="blur(10px)"
          transform={isHovered ? "scale(1.1)" : "scale(1)"}
          transition="transform 0.3s ease"
          zIndex={2}
        >
          ₹ {productPrice.toLocaleString()}
        </Badge>

        {/* Like Button */}
        <IconButton
          position="absolute"
          top="16px"
          left="16px"
          aria-label={isLiked ? "Unlike product" : "Like product"}
          icon={<Text fontSize="lg">{isLiked ? "❤️" : "🤍"}</Text>}
          onClick={handleLikeClick}
          bg={isLiked ? "red.500" : "whiteAlpha.900"}
          color={isLiked ? "white" : "red.500"}
          borderRadius="full"
          size="sm"
          _hover={{
            bg: isLiked ? "red.600" : "red.500",
            color: "white",
            transform: "scale(1.1)",
          }}
          transition="all 0.2s ease"
          zIndex={2}
        />

        {/* Product Name */}
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          p="20px"
          background="linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
          zIndex={1}
        >
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="white"
            textShadow="0 2px 4px rgba(0,0,0,0.8)"
            noOfLines={2}
            title={productName}
          >
            {productName}
          </Text>
        </Box>

        {/* Hover Action Buttons */}
        <ScaleFade in={isHovered} initialScale={0.8}>
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={3}
          >
            <VStack spacing="20px">
              <HStack spacing="16px">
                <IconButton
                  aria-label="Edit product"
                  icon={<EditIcon />}
                  onClick={handleEditClick}
                  colorScheme="blue"
                  size="lg"
                  borderRadius="full"
                  bg="rgba(66, 153, 225, 0.9)"
                  color="white"
                  _hover={{
                    bg: "rgba(66, 153, 225, 1)",
                    transform: "scale(1.15)",
                  }}
                  transition="all 0.2s ease"
                  isDisabled={isDeleting}
                />
                <IconButton
                  aria-label="Delete product"
                  icon={isDeleting ? <Spinner size="sm" /> : <DeleteIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                  }}
                  colorScheme="red"
                  size="lg"
                  borderRadius="full"
                  bg="rgba(245, 101, 101, 0.9)"
                  color="white"
                  _hover={{
                    bg: "rgba(245, 101, 101, 1)",
                    transform: !isDeleting ? "scale(1.15)" : "none",
                  }}
                  transition="all 0.2s ease"
                  isDisabled={isDeleting}
                />
              </HStack>

              {productId && (
                <VStack spacing="12px">
                  <Button
                    as={RouterLink}
                    to={`/product/${productId}`}
                    leftIcon={<ViewIcon />}
                    size="lg"
                    colorScheme="teal"
                    borderRadius="full"
                    px="32px"
                    py="12px"
                    fontSize="md"
                    fontWeight="600"
                    bg="rgba(56, 178, 172, 0.9)"
                    color="white"
                    _hover={{
                      bg: "rgba(56, 178, 172, 1)",
                      transform: "scale(1.05)",
                    }}
                    transition="all 0.2s ease"
                    isDisabled={isDeleting || isBuying}
                  >
                    View Details
                  </Button>

                  <Button
                    onClick={handleBuyNow}
                    size="lg"
                    borderRadius="full"
                    px="40px"
                    py="12px"
                    fontSize="md"
                    fontWeight="700"
                    bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    color="white"
                    _hover={{
                      bg: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                      transform: !isBuying ? "scale(1.05)" : "none",
                      boxShadow: "0 10px 25px rgba(102, 126, 234, 0.4)",
                    }}
                    _active={{
                      transform: "scale(0.98)",
                    }}
                    transition="all 0.2s ease"
                    isLoading={isBuying}
                    loadingText="Processing..."
                    isDisabled={isDeleting}
                    boxShadow="0 4px 15px rgba(102, 126, 234, 0.3)"
                  >
                    🛒 Buy Now
                  </Button>
                </VStack>
              )}
            </VStack>
          </Box>
        </ScaleFade>
      </Box>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={!isDeleting}
        closeOnEsc={!isDeleting}
      >
        <AlertDialogOverlay backdropFilter="blur(10px)">
          <AlertDialogContent borderRadius="20px" bg={cardBg} mx="4">
            <AlertDialogHeader
              fontSize="xl"
              fontWeight="bold"
              color={textColor}
            >
              🗑️ Delete Product
            </AlertDialogHeader>
            <AlertDialogBody py="20px" color={textColor}>
              Are you sure you want to delete{" "}
              <Text as="span" fontWeight="bold" color="red.500">
                "{productName}"
              </Text>
              ? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                borderRadius="full"
                px="24px"
                mr="12px"
                isDisabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                borderRadius="full"
                px="24px"
                _hover={{ transform: !isDeleting ? "scale(1.05)" : "none" }}
                transition="transform 0.2s ease"
                isLoading={isDeleting}
                loadingText="Deleting..."
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ProductCard;
