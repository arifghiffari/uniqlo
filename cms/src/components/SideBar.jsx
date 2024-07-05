"use client";

import React from "react";
import { IconButton, Box, CloseButton, Flex, Icon, useColorModeValue, Text, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import { FiShoppingBag, FiList, FiUserPlus, FiSettings, FiMenu } from "react-icons/fi";
import { Link as ReactRouterLink, Outlet, useNavigate } from "react-router-dom";

const LinkItems = [
  { name: "Products", icon: FiShoppingBag, path: "/" },
  { name: "Categories", icon: FiList, path: "category" },
  { name: "Add User", icon: FiUserPlus, path: "add-user" },
];

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent onClose={onClose} display={{ base: "none", md: "block" }} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />

      {/* Content ada disini */}
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}

        <Outlet />
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate();

  async function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <Box bg={useColorModeValue("white", "gray.900")} borderRight="1px" borderRightColor={useColorModeValue("gray.200", "gray.700")} w={{ base: "full", md: 60 }} pos="fixed" h="full" {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          CMS Panel
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}

      {/* Button Log out */}
      <NavItem onClick={handleLogout}>
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={FiSettings}
        />{" "}
        Log Out
      </NavItem>
    </Box>
  );
};

const NavItem = ({ path, icon, children, ...rest }) => {
  return (
    <Box style={{ textDecoration: "none" }} _focus={{ BoxShadow: "none" }}>
      {" "}
      <ReactRouterLink to={path}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "red",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </ReactRouterLink>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Admin Panel
      </Text>
    </Flex>
  );
};
