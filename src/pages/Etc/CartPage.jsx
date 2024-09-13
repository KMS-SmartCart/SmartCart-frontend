import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BottomNav from '../../Component/Navigation/BottomNav';
import Apis from "../../apis/Api";

// 전체 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  height: 100vh;
  background-color: white;
  position: relative; 
  padding-bottom: 100px; /* 하단바 높이만큼 공간 확보 */
`;

// 섹션을 감싸는 컨테이너
const SectionContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-grow: 1; 
  width: 100%;
  max-width: 600px;
  height: calc(100vh - 150px); /* 전체 높이에서 버튼과 여백을 제외한 높이 */
  overflow-y: auto; /* 스크롤 추가 */
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
  margin-bottom: 150px; /* 추가: 버튼이 하단바와 겹치지 않도록 */
  
  &:hover {
    background-color: #c7ccdf;
    color: black;
  }
`;

const CartPage = () => {
  const [offlineProducts, setOfflineProducts] = useState([
    { id: 1, productName: "상품 A", price: 10000, checked: false },
    { id: 2, productName: "상품 B", price: 7500, checked: false },
  ]);

  const [onlineProducts, setOnlineProducts] = useState([
    { id: 3, productName: "상품 C", price: 9000, checked: false },
    { id: 4, productName: "상품 D", price: 6900, checked: false },
  ]);

  const [offlineTotal, setOfflineTotal] = useState(0);
  const [onlineTotal, setOnlineTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

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