import ProductsForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export default function NewProduct({ url }) {
  const navigate = useNavigate();
  const toast = useToast();
  async function handleSubmit(e, object) {
    e.preventDefault();
    try {
      const dataAdded = {
        name: object.name,
        description: object.description,
        price: +object.price,
        imgUrl: object.imgUrl,
        stock: object.stock,
        categoryId: +object.categoryId,
      };

      const { data } = await axios.post(`${url}/products`, dataAdded, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      console.log(data);
      toast({
        title: data.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
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
      <ProductsForm url={url} handleSubmit={handleSubmit} isEdit={false} />
    </>
  );
}
