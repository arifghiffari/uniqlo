import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

export default function Pagination({ totalPosts, setCurrentPage }) {
  const total = Math.ceil(totalPosts / 10);

  //   console.log(total);

  let pages = [];

  for (let i = 1; i <= total; i++) {
    pages.push(i);
  }

  return (
    <>
      {pages.map((page, index) => {
        return (
          <ButtonGroup>
            <Button key={index} onClick={() => setCurrentPage(page)} colorScheme="red">
              {page}
            </Button>
          </ButtonGroup>
        );
      })}
    </>
  );
}
