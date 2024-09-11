import React, { useState } from 'react';
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
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
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

const options = [
  { id: 1, name: '홈플러스', product: '해태 홈런볼 소금우유', amount: '49g', price: 1500 },
  { id: 2, name: '이마트', product: '해태 홈런볼 소금우유', amount: '49g', price: 1600 },
  { id: 3, name: '롯데마트', product: '해태 홈런볼 소금우유', amount: '49g', price: 1700 }
];

const LowestItemPage = () => {
  const location = useLocation(); // useLocation 훅으로 상태 가져오기
  const navigate = useNavigate(); // useNavigate 훅으로 페이지 이동
  const { productName, price, amount } = location.state || {}; // 전달된 상태

  // 기존 옵션에 product와 amount를 결합한 새로운 배열 생성
  const updatedOptions = options.map(option => ({
    ...option,
    product: `${option.product} (${option.amount})` // 상품명과 용량 결합
  }));

  // 새로운 옵션 추가
  const newOption = { 
    id: 4, 
    name: '오프라인', 
    product: `${productName || '상품명 없음'} (${amount || '용량 없음'})`, // 상품명과 용량 결합
    price: price 
  };

  // 업데이트된 옵션에 새로운 옵션 추가
  const updatedOptionsWithNew = [...updatedOptions, newOption];

  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const handleOptionClick = (id) => {
    setSelectedOption(id);
  };

  const handleConfirm = () => {
    if (selectedOption) {
      setIsModalOpen(true); // 모달 열기
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
    navigate('/cart'); // CartPage로 이동
  };

  return (
    <>
      <Container>
        <Title>지금 찍은 상품의 최저가</Title>
        {updatedOptionsWithNew.map(option => (
          <Option 
            key={option.id} 
            selected={selectedOption === option.id}
            onClick={() => handleOptionClick(option.id)}
          >
            <div>{option.name}</div>
            <div>{option.product}</div> {/* 결합된 상품명과 용량 */}
            <div>{option.price}원</div> {/* 가격을 숫자로 표시 */}
          </Option>
        ))}
        <ConfirmButton onClick={handleConfirm} disabled={!selectedOption}>
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
