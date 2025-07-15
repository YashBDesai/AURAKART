import React from "react";
import {
  Flex,
  Text,
  Spacer,
  IconButton,
  useColorMode,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { FaSun, FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      p={5}
      px={10}
      borderRadius="lg"
      boxShadow="lg"
      bg={useColorModeValue("whiteAlpha.900", "gray.800")}
      backdropFilter="blur(10px)"
      position="sticky"
      top={0}
      zIndex={999}
    >
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="extrabold"
        bgGradient="linear(to-r, teal.400, blue.500)"
        bgClip="text"
        cursor="pointer"
        _hover={{
          bgGradient: "linear(to-r, pink.500, purple.500)",
        }}
      >
        PRODUCT STORE 🛒
      </Text>

      <Spacer />
      <Flex gap={3}>
        <IconButton
          icon={<AddIcon />}
          onClick={() => navigate("/create")}
          aria-label="Add Product"
          bg="teal.400"
          color="white"
          _hover={{ bg: "teal.600" }}
        />
        <IconButton
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          aria-label="Toggle Theme"
          variant="ghost"
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;
