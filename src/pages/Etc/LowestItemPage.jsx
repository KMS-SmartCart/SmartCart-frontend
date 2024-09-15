import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BottomNav from '../../Component/Navigation/BottomNav';
import { useLocation, useNavigate } from 'react-router-dom'; 
import Apis from "../../apis/Api";
import logo from "../../assets/images/smartcartlogo.png"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
  min-height: 100vh;
  background-color: white;
  position: relative; 
  padding-bottom: 80px;
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 375px) {
    padding: 12px;
    padding-bottom: 70px;
  }

  @media (max-width: 360px) {
    padding: 10px;
    padding-bottom: 60px;
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

const Title = styled.h3`
  text-align: center;
  width: 100%;
  font-size: 18px;
  margin-bottom: 20px;

  @media (max-width: 360px) {
    font-size: 16px;
    margin-bottom: 15px;
  }
`;

const Option = styled.div`
  background-color: ${(props) => (props.selected ? '#5271FF' : '#f0f0f0')};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  max-width: 300px;

  @media (max-width: 375px) {
    padding: 10px;
    margin-bottom: 8px;
    max-width: 280px;
  }
    @media (max-width: 360px) {
    max-width: 260px;
  }
`;

const OptionLink = styled.a`
  color: ${(props) => (props.selected ? 'white' : '#5271FF')};
  text-decoration: none;
  font-weight: bold;
  font-size: 15px;
  width: 25%;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 375px) {
    font-size: 13px;
  }

  @media (max-width: 360px) {
    font-size: 12px;
  }
`;

const ConfirmButton = styled.button`
  background-color: #5271FF;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 15px 35px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 375px) {
    padding: 12px 30px;
    font-size: 14px;
    margin-top: 15px;
  }

  @media (max-width: 360px) {
    padding: 9px 25px;
    font-size: 13px;
    margin-top: 10px;
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
  width: 80%;
  max-width: 200px;

  @media (max-width: 360px) {
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
  font-size: 14px;

  &:hover {
    background-color: #405bbd;
  }

  @media (max-width: 360px) {
    padding: 8px 16px;
    font-size: 12px;
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

  const handleLogoClick = () => {
    navigate('/main');
  };

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
        const offlineProduct = offlineOption;

        // 온라인 상품 (선택된 상품 또는 최저가 상품)
        const onlineProduct = isSelectedOffline
          ? options.reduce((min, option) => option.price < min.price ? option : min)
          : selectedProduct;

        const postData = {
          selectType: selectType,
          savedMoney: Math.max(0, offlineProduct.price - onlineProduct.price),
          offlineProductName: offlineProduct.productName,
          offlinePrice: offlineProduct.price,
          offlineAmount: offlineProduct.amount,
          onlineProductName: onlineProduct.productName,
          onlinePrice: onlineProduct.price,
          onlineAmount: onlineProduct.amount
        };

        await Apis.post("/products", postData);
        
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
      <LogoContainer onClick={handleLogoClick}>
        <LogoImage src={logo} alt="Logo" />
      </LogoContainer>
      
        <Title>지금 찍은 상품의 최저가💘</Title>
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