import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  IconButton,
  Image,
  Heading,
  Text,
  Badge,
  Button,
  VStack,
  useColorModeValue,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useProductStore } from "../../store/product";
import { Link as RouterLink } from "react-router-dom";


const ProductCard = ({ product, onEdit, onView }) => {
  const toast = useToast();
  const { deleteProduct } = useProductStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const cardBg = useColorModeValue("white", "gray.700");
  if (!product) {
    return <Text color="red.500">Product not found.</Text>;
  }
  

  const handleDelete = async () => {
    const { success, message } = await deleteProduct(product._id);
    toast({
      title: success ? "Deleted" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <>
      <Box
        bg={cardBg}
        borderRadius="xl"
        boxShadow="lg"
        overflow="hidden"
        _hover={{ transform: "scale(1.03)" }}
        transition="0.3s"
        position="relative"
      >
        <Image
          src={product.image || "/images/no-image.png"}
          alt={product.name}
          h="250px"
          w="100%"
          objectFit="cover"
        />
        <Box p={4}>
          <VStack align="start" spacing={2}>
            <Heading size="md">{product.name}</Heading>
            <Badge colorScheme="green" fontSize="md">
              ₹ {product.price}
            </Badge>
            <HStack spacing={3} mt={3}>
              <IconButton
                icon={<EditIcon />}
                onClick={() => onEdit(product)}
                colorScheme="blue"
                size="sm"
                aria-label="Edit"
              />
              <IconButton
                icon={<DeleteIcon />}
                onClick={onOpen}
                colorScheme="red"
                size="sm"
                aria-label="Delete"
              />
              <Button
                as={RouterLink}
                to={`/product/${product._id}`}
                size="sm"
                colorScheme="teal"
              >
                View More
              </Button>
              
            </HStack>
          </VStack>
        </Box>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Product</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete <b>{product.name}</b>?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
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
