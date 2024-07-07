import ProductForm from "../components/ProductForm";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

export default function ProductEdit({ url }) {
  const [product, setProducts] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      let serverUrl = `${url}/products/${id}`;

      const { data } = await axios.get(serverUrl, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      //   console.log(data);
      setProducts(data.product);
    } catch (error) {
      console.error(error);
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleSubmit(e, object) {
    e.preventDefault();
    try {
      const dataAdded = {
        name: object.name,
        description: object.description,
        price: +object.price,
        stock: object.stock,
        categoryId: +object.categoryId,
      };
      //   console.log(dataAdded);
      const { data } = await axios.put(`${url}/products/${id}`, dataAdded, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      toast({
        title: data.message,
        status: "succes",
        duration: 9000,
        isClosable: true,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <ProductForm url={url} handleSubmit={handleSubmit} product={product} isEdit={true} />
    </>
  );
}
