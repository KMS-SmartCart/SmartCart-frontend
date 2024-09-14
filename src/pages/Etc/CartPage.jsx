import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../Component/Navigation/BottomNav';
import Apis from "../../apis/Api";

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

  @media (max-width: 1024px) {
    width: 60%; /* 태블릿 크기에서 너비 조정 */
  }

  @media (max-width: 768px) {
    width: 80%; /* 작은 태블릿 및 큰 스마트폰에서 너비 조정 */
  }

  @media (max-width: 480px) {
    width: 100%; /* 작은 스마트폰에서는 전체 너비로 변경 */
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

const SectionContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-grow: 1; 
  width: 100%;
  max-width: 600px;
  height: calc(100vh - 150px);
  overflow-y: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    height: auto;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 15px;
  }
`;

const Section = styled.div`
  background-color: ${(props) => (props.online ? '#CFD5EE' : '#E8E6F0')};
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 8px;
  }
`;

const ProductList = styled.div`
  flex-grow: 1;
  overflow-y: auto;  
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 8px;
  }
`;

const ProductName = styled.span`
  margin-left: 10px;
`;

const TotalAmount = styled.div`
  padding: 15px;
  border-radius: 10px;
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px;
  }
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

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 8px;
    margin-bottom: 100px;
  }
`;

const SavedMoney = styled.div`
  background-color: white;
  color: #5271ff;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px 20px;
  border-radius: 10px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const ModalButton = styled.button`
  background-color: #5271FF;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #405bbd;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    margin-top: 15px;
  }
`;

// Modal 컴포넌트
const Modal = ({ isOpen, onClose, actionText }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>결제완료😊</h3>
        <p>장바구니가 비워졌습니다.</p>
        <ModalButton onClick={onClose}>{actionText}</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};


const CartPage = () => {
  const navigate = useNavigate();
  const [offlineProducts, setOfflineProducts] = useState([]);
  const [onlineProducts, setOnlineProducts] = useState([]);
  const [offlinePriceSum, setOfflinePriceSum] = useState(0);
  const [onlinePriceSum, setOnlinePriceSum] = useState(0);
  const [allPriceSum, setAllPriceSum] = useState(0);
  const [savedMoneySum, setSavedMoneySum] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoClick = () => {
    navigate('/main');
  };

  // 장바구니 데이터 가져오기
  const fetchCartData = async () => {
    try {
      const response = await Apis.get("/products");
      if (response.data && response.data.data) {
        const { 
          offlineList, 
          onlineList, 
          offlinePriceSum, 
          onlinePriceSum, 
          allPriceSum, 
          savedMoneySum 
        } = response.data.data;
        
        setOfflineProducts(offlineList);
        setOnlineProducts(onlineList);
        setOfflinePriceSum(offlinePriceSum);
        setOnlinePriceSum(onlinePriceSum);
        setAllPriceSum(allPriceSum);
        setSavedMoneySum(savedMoneySum);
      }
    } catch (error) {
      console.error("장바구니 데이터 로딩 중 오류 발생:", error);
      alert("장바구니 데이터를 불러오는데 실패했습니다. 새로고침 후 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // 결제하기 버튼 클릭 시 장바구니 비우기
  const handleCheckout = async () => {
    try {
      const response = await Apis.delete("/products");
      console.log("결제완료:", response.data);
      setIsModalOpen(true); // 모달 열기
      fetchCartData();
    } catch (error) {
      console.error("결제 처리 중 오류 발생:", error);
      alert("결제를 처리하는데 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderProducts = (products) => (
    products.map((product) => (
      <Product key={product.productId}>
        {product.isSelect === 1 && <span>✔</span>}
        <ProductName>{product.productName} {product.amount} </ProductName>
        <span>{product.price}원</span>
      </Product>
    ))
  );

  return (
    <Container>
      <LogoContainer onClick={handleLogoClick}>
        <LogoImage src="./assets/images/smartcartlogo.png" alt="Logo" />
      </LogoContainer>

      <Title>ON, OFF 한눈에 비교💘</Title>
      <SectionContainer>
        <Section online>
          <SectionTitle>ON</SectionTitle>
          <ProductList>{renderProducts(onlineProducts)}</ProductList>
          <TotalAmount>합계: {onlinePriceSum}원</TotalAmount>
        </Section>
        <Section>
          <SectionTitle>OFF</SectionTitle>
          <ProductList>{renderProducts(offlineProducts)}</ProductList>
          <TotalAmount>합계: {offlinePriceSum}원</TotalAmount>
        </Section>
      </SectionContainer>
      <TotalAmount>총합: {allPriceSum}원</TotalAmount>
      <SavedMoney>SMARTCART로 절약했어요💘: {savedMoneySum}원</SavedMoney>
      <StyledButton onClick={handleCheckout}>결제하기</StyledButton>
      <BottomNav />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        actionText="확인"
      />
    </Container>
  );
};

export default CartPage;