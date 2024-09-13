import React, { useState, useEffect } from 'react';
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
  const navigate = useNavigate();
  const { imageUrl, productName: initialProductName, price: initialPrice, amount: initialAmount } = location.state || {};

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState('');

  // 초기값 설정
  useEffect(() => {
    if (initialProductName) setProductName(initialProductName);
    if (initialPrice) setPrice(initialPrice);
    if (initialAmount) setAmount(initialAmount);
  }, [initialProductName, initialPrice, initialAmount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/Lowest', {
      state: { productName, price, amount }
    });
  };

  return (
    <Container>
      <ImageContainer>
        <ProductImage src={imageUrl || '#'} alt="Product" />
      </ImageContainer>

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
            onChange={(e) => setAmount(e.target.value)} 
          />
        </InputContainer>

        <SubmitButton type="submit">확인</SubmitButton>
      </form>

      <BottomNav />
    </Container>
  );
}

export default ItemInfoPage;