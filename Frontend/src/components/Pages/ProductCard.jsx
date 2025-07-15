import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

const ProductCard = ({ product, onEdit, onView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const overlayBg = useColorModeValue("rgba(0,0,0,0.7)", "rgba(0,0,0,0.8)");

  if (!product) {
    return <Text color="red.500">Product not found.</Text>;
  }

  const handleDelete = () => {
    console.log("Deleting product:", product.name);
    onClose();
  };

  return (
    <>
      <Box
        position="relative"
        w="360px" // ⬅️ Increased width
        h="420px" // ⬅️ Increased height
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
          "& .product-image": {
            transform: "scale(1.1)",
          },
          "& .shine-effect": {
            transform: "translateX(100%)",
          },
        }}
      >
        {/* Product Image */}
        <Box position="relative" w="100%" h="100%" overflow="hidden">
          <Image
            className="product-image"
            src={product.image || "/images/no-image.png"}
            alt={product.name}
            w="100%"
            h="100%"
            objectFit="cover"
            transition="transform 0.6s ease"
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
          ₹ {product.price}
        </Badge>

        {/* Like Button */}
        <IconButton
          position="absolute"
          top="16px"
          left="16px"
          icon={isLiked ? "❤️" : "🤍"}
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
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
          >
            {product.name}
          </Text>
        </Box>

        {/* Hover Actions */}
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
                  icon={<EditIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit && onEdit(product);
                  }}
                  colorScheme="blue"
                  size="lg"
                  borderRadius="full"
                  bg="rgba(66, 153, 225, 0.9)"
                  color="white"
                  backdropFilter="blur(10px)"
                  _hover={{
                    bg: "rgba(66, 153, 225, 1)",
                    transform: "scale(1.15)",
                  }}
                  transition="all 0.2s ease"
                  boxShadow="0 4px 15px rgba(66, 153, 225, 0.4)"
                />
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                  }}
                  colorScheme="red"
                  size="lg"
                  borderRadius="full"
                  bg="rgba(245, 101, 101, 0.9)"
                  color="white"
                  backdropFilter="blur(10px)"
                  _hover={{
                    bg: "rgba(245, 101, 101, 1)",
                    transform: "scale(1.15)",
                  }}
                  transition="all 0.2s ease"
                  boxShadow="0 4px 15px rgba(245, 101, 101, 0.4)"
                />
              </HStack>

              <Button
                as={RouterLink}
                to={`/product/${product._id}`}
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
                backdropFilter="blur(10px)"
                _hover={{
                  bg: "rgba(56, 178, 172, 1)",
                  transform: "scale(1.05)",
                }}
                transition="all 0.2s ease"
                boxShadow="0 6px 20px rgba(56, 178, 172, 0.4)"
              >
                View Details
              </Button>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Adding to cart:", product.name);
                }}
                size="lg"
                colorScheme="orange"
                borderRadius="full"
                px="32px"
                py="12px"
                fontSize="md"
                fontWeight="600"
                bg="rgba(251, 146, 60, 0.9)"
                color="white"
                backdropFilter="blur(10px)"
                _hover={{
                  bg: "rgba(251, 146, 60, 1)",
                  transform: "scale(1.05)",
                }}
                transition="all 0.2s ease"
                boxShadow="0 6px 20px rgba(251, 146, 60, 0.4)"
              >
                🛒 Add to Cart
              </Button>
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
      >
        <AlertDialogOverlay backdropFilter="blur(10px)">
          <AlertDialogContent
            borderRadius="20px"
            bg={cardBg}
            boxShadow="0 25px 50px rgba(0,0,0,0.3)"
            mx="4"
          >
            <AlertDialogHeader
              fontSize="xl"
              fontWeight="bold"
              color={textColor}
              borderBottom="1px solid"
              borderColor={useColorModeValue("gray.200", "gray.600")}
            >
              🗑️ Delete Product
            </AlertDialogHeader>
            <AlertDialogBody py="20px" color={textColor}>
              Are you sure you want to delete{" "}
              <Text as="span" fontWeight="bold" color="red.500">
                {product.name}
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
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                borderRadius="full"
                px="24px"
                _hover={{
                  transform: "scale(1.05)",
                }}
                transition="transform 0.2s ease"
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
