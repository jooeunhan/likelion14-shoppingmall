import { useParams } from "react-router-dom";
import ProductLayout from "../../layout/ProductLayout.jsx";
import ProductForm from "./ProductForm.jsx";
import productDummy from "../Main/productDummy.js";
import styled from "styled-components";
import { ImageUploader } from "./ProductForm.jsx"; 

const EditImageWrapper = styled.div`
  width: 459px;
  height: 602px;
  position: relative;
`;

export default function ItemEdit() {
  const { id } = useParams();
  const product = productDummy?.find((item) => String(item.id) === String(id));

  if (!product) return null;

  return (
    <ProductLayout
      leftContent={
        <EditImageWrapper>
          <ImageUploader defaultImage={product.img} />
        </EditImageWrapper>
      }
      rightContent={<ProductForm type="update" initialData={product} />}
    />
  );
}