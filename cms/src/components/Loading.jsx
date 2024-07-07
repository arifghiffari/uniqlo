import { Flex, Spinner, Center } from "@chakra-ui/react";
export default function Loading() {
  return (
    <>
      <Center>
        <Flex m={500}>
          <Spinner thickness="5px" speed="0.35s" emptyColor="white" color="red" size="xl" />
        </Flex>
      </Center>
    </>
  );
}
