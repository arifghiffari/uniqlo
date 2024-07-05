"use client";

import { Button, Flex, Heading, Image, Stack, Text, useBreakpointValue } from "@chakra-ui/react";

export default function SplitScreen() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "#C53030",
                zIndex: -1,
              }}
            >
              Uniqlo
            </Text>
            <br />{" "}
            <Text color={"#C53030"} as={"span"}>
              Temukan Gaya dan Kenyamanan
            </Text>{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            Tampil bergaya dan nyaman dengan koleksi terbaru dari Uniqlo. Temukan pakaian berkualitas tinggi yang sesuai dengan segala aktivitasmu hanya di Uniqlo Store. #Uniqlo #LifeWear #FashionEveryday.
          </Text>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src={"https://i.pinimg.com/474x/be/c5/69/bec56924b7d1bd79ea666b4cbfe21916.jpg"} />
      </Flex>
    </Stack>
  );
}
