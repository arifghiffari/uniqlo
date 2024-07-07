import { Table, Thead, Tbody, Tr, Th, Td, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";

export default function Category({ url }) {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchCategory() {
    try {
      setLoading(true);
      let serverUrl = `${url}/category`;

      const { data } = await axios.get(serverUrl, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      //   console.log(data.categories);
      setCategory(data.categories);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <Heading>Table of Category</Heading>
          <br />
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
              </Tr>
            </Thead>
            <Tbody>
              {category.map((categories) => {
                return (
                  <>
                    <Tr key={categories.id}>
                      <Td>{categories.id}</Td>
                      <Td>{categories.name}</Td>
                    </Tr>
                  </>
                );
              })}
            </Tbody>
          </Table>
        </>
      )}
    </>
  );
}
