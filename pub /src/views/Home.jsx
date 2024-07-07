import { Flex, Grid, Center } from "@chakra-ui/react";
import SplitScreen from "../components/SplitScreen";
import Cards from "../components/Card";
import Search from "../components/Search";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useSearchParams, Link as ReactRouterLink } from "react-router-dom";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

export default function Home({ url }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  // Format rupiah
  function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  }

  async function fetchProducts() {
    try {
      setLoading(true);

      let serverUrl = `${url}/pub/products?search=${search}`;

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
      } else if (searchParams.get("sort") === "DESC") {
        serverUrl += "&sort=DESC";
      }
      const { data } = await axios.get(`${serverUrl}`);
      // console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = products.slice(firstPostIndex, lastPostIndex);
  // console.log(currentPosts);

  useEffect(() => {
    fetchProducts();
    // console.log("render ulang");
    // console.log(searchParams.get("page[number]"));
  }, [searchParams]);

  function hanldeSearch(e) {
    // console.log(e);
    let newSearch = e.target.value;
    setSearch(newSearch);
  }
  useEffect(() => {
    fetchProducts();
  }, [search]);
  return (
    <>
      <Navbar />
      {/* {!searchParams.get("filter") && !loading && !searchParams.get("sort") && (
        <Flex>
          <SplitScreen />
        </Flex>
      )} */}
      <br />
      <br />
      <br />
      <br />
      {!searchParams.get("filter") && !searchParams.get("sort") && <Search hanldeSearch={hanldeSearch} />}
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <Flex m={100}>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              {currentPosts.map((products) => {
                return <Cards key={products.id} products={products} url={url} fetchProducts={fetchProducts} rupiah={formatRupiah} />;
              })}
            </Grid>
          </Flex>
          <Flex align="center" justify="center" JustifyContent="true">
            <Center gap="2">
              <Pagination totalPosts={products.length} setCurrentPage={setCurrentPage} />
            </Center>
          </Flex>
        </>
      )}
    </>
  );
}
