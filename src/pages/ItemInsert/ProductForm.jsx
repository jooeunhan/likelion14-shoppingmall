import styled from "styled-components";
import { useState, useRef } from "react";
import uploadIcon from "../../assets/icons/upload_icon.svg";

const UploadWrapper = styled.div`
  width: 459px;
  height: 602px;
  background-color: #F0F0F0;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
`;

const UploadIcon = styled.img`
  width: 50px;
  height: 56px;
  position: absolute;
  z-index: 10;
  pointer-events: none;
`;

const ProductPreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export function ImageUploader({ defaultImage }) {
  const [imagePreview, setImagePreview] = useState(defaultImage || null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <UploadWrapper onClick={() => fileInputRef.current.click()}>
        <UploadIcon src={uploadIcon} alt="upload" />
        {imagePreview && (
          <ProductPreviewImg src={imagePreview} alt="product preview" />
        )}
      </UploadWrapper>
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleImageChange} 
        style={{ display: 'none' }} 
      />
    </>
  );
}

const FormContainer = styled.div`
  width: 285px;
  margin-left: 169px;
  padding: 27px 33px;
  border-radius: 20px;
  border: 1px solid #DFDFDF;
  background: #FFF;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 9px;
  text-align: column;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Label = styled.label`
  font-family: Pretendard;
  font-size: 14px;
  color: #6C6C6C;
  font-weight: 400;
`;

const Input = styled.input`
  width: 211px;
  height: 35px;
  border: 1px solid #6C6C6C;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  font-family: Pretendard;
  font-size: 12px;
  
  &:focus {
    outline: 1px solid #6c6c6c;
  }
`;

const SelectGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.$gap || "5px"};
`;

const SelectButton = styled.button`
  min-width: 67px; 
  max-width: 100%;
  padding: 0 8px;
  height: 30px;
  
  border-radius: 5px;
  border: 1px solid;
  border-color: ${props => props.$active ? "#DFDFDF" : "#F2F2F2"};
  
  background-color: ${props => props.$active ? "#DFDFDF" : "#F2F2F2"};
  color: #333;

  font-family: Pretendard;
  font-size: 11px;
  cursor: pointer;
  
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  ${props => props.children === 'holographic' && `
    padding: 0 4px;
    flex-grow: 0;
  `}

  &:hover {
    background-color: ${props => props.$active ? "#c4c4c4" : "#eaeaea"};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 30px;
  background-color: #F2F2F2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;

  &:hover {
    background-color: #e5e5e5;
  }
`;

export default function ProductForm({ type, initialData }) {
  const isUpdate = type === "update";

  return (
    <FormContainer>
      <Title>상품 정보 {isUpdate ? "수정" : "등록"}</Title>
      
      <InputGroup>
        <Label>상품명</Label>
        <Input defaultValue={initialData?.name} placeholder="상품명을 입력하세요" />
      </InputGroup>

      <InputGroup>
        <Label>평점</Label>
        <Input defaultValue={initialData?.rating} placeholder="평점을 입력하세요" />
      </InputGroup>

      <InputGroup>
        <Label>리뷰수</Label>
        <Input defaultValue={initialData?.review} placeholder="리뷰수를 입력하세요" />
      </InputGroup>

      <InputGroup>
        <Label>가격</Label>
        <Input defaultValue={initialData?.price} placeholder="가격을 입력하세요" />
      </InputGroup>

      <InputGroup>
        <Label>사이즈</Label>
        <Input defaultValue={initialData?.size} placeholder="사이즈를 입력하세요" />
      </InputGroup>

      <InputGroup>
        <Label>종류</Label>
        <SelectGroup $gap="7px">
          <SelectButton style={{width: '102px'}}>의류</SelectButton>
          <SelectButton style={{width: '102px'}}>신발</SelectButton>
        </SelectGroup>
      </InputGroup>

      <InputGroup>
        <Label>성별</Label>
        <SelectGroup $gap="5px">
          <SelectButton>남성</SelectButton>
          <SelectButton>여성</SelectButton>
          <SelectButton>남녀공용</SelectButton>
        </SelectGroup>
      </InputGroup>

      <InputGroup>
        <Label>색상</Label>
        <SelectGroup $gap="5px">
          {['red', 'pink', 'blue', 'gray', 'black', 'denim', 'multi', 'rainbow', 'holographic'].map((color) => (
            <SelectButton 
              key={color} 
              style={color === 'holographic' ? { flexGrow: 1, minWidth: 'auto' } : {}}
            >
              {color}
            </SelectButton>
          ))}
        </SelectGroup>
      </InputGroup>

      <SubmitButton>
        {isUpdate ? "상품 수정 완료" : "상품 등록 완료"}
      </SubmitButton>
    </FormContainer>
  );
}