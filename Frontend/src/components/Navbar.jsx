import React from "react";
import {
  Flex,
  Spacer,
  IconButton,
  useColorMode,
  useColorModeValue,
  Image,
  Text,
  HStack,
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
      p={4}
      px={{ base: 4, md: 16 }}
      borderRadius="lg"
      boxShadow="lg"
      bg={useColorModeValue("whiteAlpha.900", "gray.800")}
      backdropFilter="blur(10px)"
      position="sticky"
      top={0}
      zIndex={999}
    >
      {/* Logo + Text with hover scale animation */}
      <HStack
        spacing={3}
        cursor="pointer"
        onClick={() => navigate("/")}
        align="center"
        height="60px"
        overflow="hidden"
        transition="all 0.4s ease-in-out"
        _hover={{
          transform: "translateY(-4px) scale(1.10)",
          filter: "drop-shadow(0 0 8px rgba(157, 0, 255, 0.5))",
        }}
      >
        <Image
          src="/Website_Logo-removebg-preview.png"
          alt="Aurakart Logo"
          height="200px"
          width = "200px"
          objectFit="contain"
          dropShadow={"0 0 8px rgba(157, 0, 255, 0.5)"}
        />
      </HStack>

      <Spacer />

      {/* Action buttons */}
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
