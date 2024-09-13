import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BottomNav from '../../Component/Navigation/BottomNav';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  height: 100vh;
  background-color: white;
  position: relative; 
  padding-bottom: 100px;
`;

const SectionContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-grow: 1; 
  width: 100%;
  max-width: 600px;
  height: calc(100vh - 150px);
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Section = styled.div`
  background-color: ${(props) => (props.online ? '#CFD5EE' : '#E8E6F0')};
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const ProductList = styled.div`
  flex-grow: 1;
  overflow-y: auto;  
  margin-bottom: 20px;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CheckBox = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ProductName = styled.span`
  margin-left: 10px;
`;

const TotalAmount = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  width: 100%;
  max-width: 400px;
  background-color: #5271ff;
  padding: 10px;
  border-radius: 5px;
  font-size: 18px;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 150px;
  
  &:hover {
    background-color: #c7ccdf;
    color: black;
  }
`;

const CartPage = () => {
  const [offlineProducts, setOfflineProducts] = useState([]);
  const [onlineProducts, setOnlineProducts] = useState([]);
  const [offlineTotal, setOfflineTotal] = useState(0);
  const [onlineTotal, setOnlineTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    const offline = cartItems.filter(item => !item.isOnline);
    const online = cartItems.filter(item => item.isOnline);

    setOfflineProducts(offline.map(item => ({ ...item, checked: false })));
    setOnlineProducts(online.map(item => ({ ...item, checked: false })));
  }, []);

  useEffect(() => {
    const newOfflineTotal = offlineProducts.reduce(
      (sum, product) => (product.checked ? sum + product.price : sum),
      0
    );
    const newOnlineTotal = onlineProducts.reduce(
      (sum, product) => (product.checked ? sum + product.price : sum),
      0
    );
    setOfflineTotal(newOfflineTotal);
    setOnlineTotal(newOnlineTotal);
    setTotalAmount(newOfflineTotal + newOnlineTotal);
  }, [offlineProducts, onlineProducts]);

  const handleToggle = (isOnline, id) => {
    const updateProducts = (products) =>
      products.map((product) =>
        product.id === id ? { ...product, checked: !product.checked } : product
      );

    if (isOnline) {
      setOnlineProducts(updateProducts);
    } else {
      setOfflineProducts(updateProducts);
    }
  };

  const renderProducts = (products, isOnline) => (
    <ProductList>
      {products.map((product) => (
        <Product key={product.id}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CheckBox onClick={() => handleToggle(isOnline, product.id)}>
              {product.checked && '✔'}
            </CheckBox>
            <ProductName>{product.productName}</ProductName>
          </div>
          <span>{product.price.toLocaleString()}원</span>
        </Product>
      ))}
    </ProductList>
  );

  return (
    <Container>
      <Title>ON, OFF 한번에 비교💘</Title>
      <SectionContainer>
        <Section>
          <SectionTitle>OFF</SectionTitle>
          {renderProducts(offlineProducts, false)}
          <p>누적 금액: {offlineTotal.toLocaleString()}원</p>
        </Section>
        <Section online>
          <SectionTitle>ON</SectionTitle>
          {renderProducts(onlineProducts, true)}
          <p>누적 금액: {onlineTotal.toLocaleString()}원</p>
        </Section>
      </SectionContainer>
      <TotalAmount>총 금액: {totalAmount.toLocaleString()}원</TotalAmount>
      <StyledButton>결제완료</StyledButton>
      <BottomNav />
    </Container>
  );
};

export default CartPage;