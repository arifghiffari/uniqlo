import { Flex, Grid, Stack, Button, Spinner } from "@chakra-ui/react";
import SplitScreen from "../components/SplitScreen";
import Cards from "../components/Card";
import Search from "../components/Search";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useSearchParams, Link as ReactRouterLink } from "react-router-dom";

export default function Home({ url }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  async function fetchProducts() {
    try {
      setLoading(true);
      let serverUrl = `${url}/pub/products?page[size]=10`;
      if (searchParams.get("filter") === "men") {
        serverUrl += "&filter=2";
      } else if (searchParams.get("filter") === "women") {
        serverUrl += "&filter=1";
      } else if (searchParams.get("filter") === "kids") {
        serverUrl += "&filter=3";
      } else if (searchParams.get("filter") === "baby") {
        serverUrl += "&filter=4";
      } else if (searchParams.get("sort") === "ASC") {
        serverUrl += "&sort=ASC";
      } else if (searchParams.get("page[number]") === "2") {
        serverUrl += "&page[number]=2";
      }
      const { data } = await axios.get(serverUrl);
      console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
    // console.log("render ulang");
    // console.log(searchParams.get("sort"));
  }, [searchParams]);

  return (
    <>
      <Navbar />

      {!searchParams.get("filter") && !loading && !searchParams.get("sort") && (
        <Flex>
          <SplitScreen />
        </Flex>
      )}

      <br />
      <br />
      <br />
      <br />

      {!searchParams.get("filter") && !loading && !searchParams.get("sort") && <Search />}
      {loading && (
        <Flex justifyContent={"center"}>
          <Spinner thickness="5px" speed="0.35s" emptyColor="white" color="red" size="xl" />
        </Flex>
      )}
      {!loading && (
        <Flex m={100}>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {products.map((products) => {
              return <Cards key={products.id} products={products} url={url} fetchProducts={fetchProducts} />;
            })}
          </Grid>
        </Flex>
      )}
    </>
  );
}
