import { Center, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export default function Search({ hanldeSearch }) {
  return (
    <>
      <Center>
        <InputGroup width={400}>
          <InputRightElement pointerEvents="none">
            <Search2Icon />
          </InputRightElement>
          <Input type="tel" placeholder="Search" color="#1b1b1b" onChange={hanldeSearch} />
        </InputGroup>
      </Center>
    </>
  );
}
