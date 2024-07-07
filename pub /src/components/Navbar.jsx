import { Box, Flex, Link, Spacer } from "@chakra-ui/react";
import { Outlet, useSearchParams, Link as ReactRouterLink } from "react-router-dom";
import React, { useEffect } from "react";
export default function Navbar() {
  return (
    <>
      <Box style={{ position: "fixed", zIndex: 1 }} bg="#FFFFFF" w="100%" p={4} color="#1b1b1b">
        <Flex gap={5}>
          <Link to="/" as={ReactRouterLink}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 40" width="90" height="40" role="img" aria-label="ユニクロ｜UNIQLO">
              <title>ユニクロ｜UNIQL0</title>
              <path fill="red" d="M50 0h40v40H50zM0 0h40v40H0z"></path>
              <g fill="#fff">
                <path d="M79.48 5.47h2.53v12.64h-2.53zM63.47 13.9a4.21 4.21 0 0 1-8.42 0V5.47h2.53v8.43a1.68 1.68 0 1 0 3.36 0V5.47h2.53zM75.26 34.53h-8.42V21.89h2.53V32h5.89v2.53zM75.26 18.11h-2.53l-3.36-7.22v7.22h-2.53V5.47h2.53l3.36 7.22V5.47h2.53v12.64zM59.26 21.89a4.21 4.21 0 0 0-4.21 4.22v4.21a4.21 4.21 0 0 0 4.21 4.21 4.34 4.34 0 0 0 .82-.07l.86 2.6h2.53l-1.25-3.75a4.2 4.2 0 0 0 1.25-3v-4.2a4.21 4.21 0 0 0-4.21-4.22m1.68 8.43a1.68 1.68 0 1 1-3.36 0v-4.21a1.68 1.68 0 1 1 3.36 0zM80.74 21.89a4.22 4.22 0 0 0-4.22 4.22v4.21a4.21 4.21 0 0 0 8.42 0v-4.21a4.21 4.21 0 0 0-4.21-4.22m1.68 8.43a1.68 1.68 0 0 1-3.37 0v-4.21a1.68 1.68 0 0 1 3.37 0z"></path>
                <g>
                  <path d="M22.74 15.16H34.1v2.52H22.74zM24 5.47h8.84V8H24zM14.74 5.47H7.15V8h5.06v7.16H5.9v2.52h11.36v-2.52h-2.52V5.47zM22.74 22.31v12.22H34.1V22.31zM31.57 32h-6.31v-7.16h6.31zM7.15 22.31l-1.28 6.12h2.52l.76-3.59h5.07L12.73 32H5.14l-.51 2.53h10.11l2.52-12.22H7.15z"></path>
                </g>
              </g>
            </svg>
          </Link>
          <Link as={ReactRouterLink} to="?filter=women" fontSize={20}>
            Women
          </Link>
          <Link as={ReactRouterLink} to="?filter=men" fontSize={20}>
            Men
          </Link>
          <Link as={ReactRouterLink} to="?filter=kids" fontSize={20}>
            Kids
          </Link>
          <Link as={ReactRouterLink} to="?filter=baby" fontSize={20}>
            Baby
          </Link>
          <Spacer />
          <Link as={ReactRouterLink} to="?sort=ASC" fontSize={20}>
            Asc
          </Link>
          <Link as={ReactRouterLink} to="?sort=Desc" fontSize={20}>
            desc
          </Link>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
}
