import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BottomNav from '../../Component/Navigation/BottomNav';
import { useLocation, useNavigate } from 'react-router-dom'; 
import Apis from "../../apis/Api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 30%;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;

  @media (max-width: 600px) {
    max-width: 100%;
    padding: 10px;
  }
`;

const Title = styled.h3`
  text-align: left;
  width: 100%;
  font-size: 20px;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const Option = styled.div`
  background-color: ${(props) => (props.selected ? '#5271FF' : '#f0f0f0')};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    padding: 8px;
    margin-bottom: 8px;
  }
`;

const OptionLink = styled.a`
  color: ${(props) => (props.selected ? 'white' : '#5271FF')};
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const ConfirmButton = styled.button`
  background-color: #5271FF;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 15px 35px;
  cursor: pointer;
  font-size: 15px;
  margin-top: 10%;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    padding: 8px 16px;
    margin-top: 15px;
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

  @media (max-width: 600px) {
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

  @media (max-width: 600px) {
    padding: 8px 16px;
    margin-top: 15px;
  }
`;

const LowestItemPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productName, amount, price } = location.state || {};

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchLowestPrices = async () => {
      try {
        const response = await Apis.post('/products/lowest-price', {
          productName,
          amount
        });

        const { data } = response.data;
        setOptions(data);
      } catch (error) {
        console.error("최저가 데이터를 가져오는 중 오류 발생: ", error);
      }
    };

    if (productName && amount) {
      fetchLowestPrices();
    }
  }, [productName, amount]);

  const offlineOption = { 
    mallName: '오프라인', 
    productName: productName || '상품명 없음', 
    amount: amount || '용량 없음', 
    price: Number(price) || 0 
  };

  const updatedOptionsWithOffline = [...options, offlineOption];

  const handleOptionClick = (id) => {
    setSelectedOption(id);
  };

  const handleConfirm = async () => {
    if (selectedOption !== null) {
      const selectedProduct = updatedOptionsWithOffline[selectedOption];
      const isSelectedOffline = selectedProduct.mallName === '오프라인';
      
      const selectType = isSelectedOffline ? 0 : 1;
      
      try {
        // 오프라인 상품
        const offlineProduct = {
          productName: offlineOption.productName,
          price: offlineOption.price,
          amount: offlineOption.amount
        };

        // 온라인 상품 (선택된 상품 또는 최저가 상품)
        const onlineProduct = isSelectedOffline
          ? options.reduce((min, option) => option.price < min.price ? option : min)
          : selectedProduct;

        const postData = {
          selectType: selectType,
          savedMoney: Math.max(0, Number(offlineProduct.price) - Number(onlineProduct.price)),
          offlineProductName: offlineProduct.productName,
          offlinePrice: Number(offlineProduct.price),
          offlineAmount: offlineProduct.amount,
          onlineProductName: onlineProduct.productName,
          onlinePrice: Number(onlineProduct.price),
          onlineAmount: onlineProduct.amount
        };

        console.log("savedMoney:",postData.savedMoney);

        await Apis.post("/products", postData);
        
        // selectType을 localStorage에 저장
        localStorage.setItem('selectType', selectType.toString());

        setIsModalOpen(true);
      } catch (error) {
        console.error("장바구니에 상품을 추가하는 중 오류 발생: ", error);
        alert("장바구니에 상품을 추가하는데 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/cart');
  };

  return (
    <>
      <Container>
        <Title>지금 찍은 상품의 최저가</Title>
        {updatedOptionsWithOffline.map((option, index) => (
          <Option 
            key={index} 
            selected={selectedOption === index}
            onClick={() => handleOptionClick(index)}
          >
            <div>{option.mallName}</div>
            <div>{option.productName} {option.amount}</div>
            <div>{option.price}원</div>
            {option.link && (
              <OptionLink href={option.link} target="_blank" selected={selectedOption === index}>
                상세보기
              </OptionLink>
            )}
          </Option>
        ))}
        <ConfirmButton onClick={handleConfirm} disabled={selectedOption === null}>
          확인
        </ConfirmButton>
        <BottomNav />
      </Container>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>장바구니에 담겼어요.😊</h3>
            <ModalButton onClick={handleCloseModal}>확인</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default LowestItemPage;