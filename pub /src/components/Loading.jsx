import { Flex, Spinner } from "@chakra-ui/react";
export default function Loading() {
  return (
    <>
      <Flex justifyContent={"center"}>
        <Spinner thickness="5px" speed="0.35s" emptyColor="white" color="red" size="xl" />
      </Flex>
    </>
  );
}
