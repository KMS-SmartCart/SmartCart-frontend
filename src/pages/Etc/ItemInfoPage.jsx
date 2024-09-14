import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNav from '../../Component/Navigation/BottomNav';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  min-height: 100vh;
  background-color: white;
  position: relative; 
  padding-bottom: 100px; /* 하단바 높이만큼 공간 확보 */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    width: 60%;
    padding: 15px;
  }

  @media (max-width: 768px) {
    width: 80%;
    padding: 10px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 10px 5px;
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  @media (max-width: 768px) {
    top: 5px;
    right: 5px;
  }
`;

const LogoImage = styled.img`
  width: 80px;
  height: auto;

  @media (max-width: 768px) {
    width: 60px;
  }
`;

const ImageContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 500px;
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
  text-align: left;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const InputLabel = styled.label`
  display: block;
  font-size: 16px;
  color: #888;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 3px;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #E6EBF1;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
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

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 16px;
    margin-top: 15px;
  }
`;

function ItemInfoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageUrl, productName: initialProductName, price: initialPrice, amount: initialAmount } = location.state || {};

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState('');

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

  const handleLogoClick = () => {
    navigate('/main');
  };

  return (
    <Container>
      <LogoContainer onClick={handleLogoClick}>
        <LogoImage src="./assets/images/smartcartlogo.png" alt="Logo" />
      </LogoContainer>

      <ImageContainer>
        <ProductImage src={imageUrl || '#'} alt="Product" />
      </ImageContainer>

      <FormContainer onSubmit={handleSubmit}>
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
      </FormContainer>

      <BottomNav />
    </Container>
  );
}

export default ItemInfoPage;