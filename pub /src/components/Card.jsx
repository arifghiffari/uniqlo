import { Card, CardBody, CardFooter, Stack, Heading, Text, Divider, ButtonGroup, Button, Image, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Cards({ products, rupiah }) {
  const navigate = useNavigate();
  function handleDetail(id) {
    navigate(`/detail/${id}`);
  }
  return (
    <>
      <Card maxW="sm">
        <CardBody>
          <Center>
            <Image src={products.imgUrl} alt="Green double couch with wooden legs" borderRadius="lg" boxSize="200px" />
          </Center>
          <Stack mt="6" spacing="3">
            <Heading size="md">{products.name}</Heading>

            <Text color="#C53030" fontSize="2xl">
              {rupiah(products.price)}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <a onClick={() => handleDetail(products.id)}>
            <Button variant="solid" colorScheme="red">
              Detail
            </Button>
          </a>
        </CardFooter>
      </Card>
    </>
  );
}
