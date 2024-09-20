import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNav from '../../Component/Navigation/BottomNav';
import logo from "../../assets/images/smartcartlogo.png"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  min-height: 100vh;
  background-color: white;
  position: relative; 
  padding-bottom: 100px;
  box-sizing: border-box;

  @media (max-width: 390px) {
    padding: 15px;
  }

  @media (max-width: 360px) {
    padding: 10px;
  }
`;

const LogoContainer = styled.div`
  cursor: pointer;
  position: relative;
  right: -130px;
`;

const LogoImage = styled.img`
  width: 65px;
  height: auto;
  

  @media (max-width: 390px) {
    width: 50px;
  }

  @media (max-width: 360px) {
    width: 45px;
  }
`;

const ImageContainer = styled.div`
  text-align: center;
  margin-bottom: 15px;
  width: 75%;
  max-width: 300px;

  @media (max-width: 375px) {
    max-width: 280px;
    margin-bottom: 12px;
  }

  @media (max-width: 360px) {
    max-width: 260px;
    margin-bottom: 10px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 300px;

  @media (max-width: 375px) {
    max-width: 280px;
  }

  @media (max-width: 360px) {
    max-width: 260px;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 12px;
  text-align: left;

  @media (max-width: 375px) {
    margin-bottom: 10px;
  }

  @media (max-width: 360px) {
    margin-bottom: 8px;
  }
`;

const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  color: #888;
  margin-bottom: 4px;

  @media (max-width: 375px) {
    font-size: 13px;
  }

  @media (max-width: 360px) {
    font-size: 12px;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #E6EBF1;

  @media (max-width: 375px) {
    padding: 7px;
    font-size: 13px;
  }

  @media (max-width: 360px) {
    padding: 6px;
    font-size: 12px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #5271FF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background-color: #C7CCDF;
    color: black;
  }

  @media (max-width: 375px) {
    padding: 10px;
    font-size: 15px;
    margin-top: 12px;
  }

  @media (max-width: 360px) {
    padding: 8px;
    font-size: 14px;
    margin-top: 10px;
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
        <LogoImage src={logo} alt="Logo" />
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