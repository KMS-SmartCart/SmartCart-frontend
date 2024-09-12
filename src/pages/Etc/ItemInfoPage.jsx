import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import BottomNav from '../../Component/Navigation/BottomNav';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
`;

const ImageContainer = styled.div`
  margin-bottom: 20px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const InputContainer = styled.div`
  margin-bottom: 10px;
  text-align: left;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 16px;
  color: #888;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #E6EBF1;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #5271FF;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #C7CCDF;
    color: black;
  }
`;

function ItemInfoPage() {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate 훅 호출
  const { imageUrl } = location.state || {}; // 카메라에서 전달받은 이미지 URL

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [amount, setamount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // LowestItemPage로 상품 정보 전달
    navigate('/Lowest', {
      state: { productName, price, amount }
    });
  };

  return (
    <Container>
      {/* 상단 이미지 */}
      <ImageContainer>
        <ProductImage 
          src={imageUrl || '#'} 
          alt="Product" 
        />
      </ImageContainer>
      
      {/* 입력 폼 */}
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <InputLabel>상품명:</InputLabel>
          <InputField 
            type="text" 
            value={productName} 
            onChange={(e) => setProductName(e.target.value)} 
          />
        </InputContainer>

        <InputContainer>
          <InputLabel>가격:</InputLabel>
          <InputField 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </InputContainer>

        <InputContainer>
          <InputLabel>용량:</InputLabel>
          <InputField 
            type="text" 
            value={amount} 
            onChange={(e) => setamount(e.target.value)} 
          />
        </InputContainer>

        <SubmitButton type="submit">확인</SubmitButton>
      </form>

      <BottomNav />
    </Container>
  );
}

export default ItemInfoPage;
