import React, { useState } from 'react';
import styled from 'styled-components';
import { BsCart, BsCartFill, BsPerson, BsFillPersonFill, BsUpcScan } from "react-icons/bs"; 

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40%; /* 기본 너비 */
  background-color: white;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  box-shadow: 0 -1px 5px rgba(0,0,0,0.1);

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

const NavItem = styled.div`
  text-align: center;
  color: #888;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: #5271FF;
  }

  div {
    margin-top: 5px;
  }
`;

const BottomNav = () => {
  const [isCartActive, setIsCartActive] = useState(false); 
  const [isProfileActive, setIsProfileActive] = useState(false); 

  const handleCartClick = () => {
    setIsCartActive(true); 
    window.location.href = '/cart'; 
  };

  const handleProfileClick = () => {
    setIsProfileActive(true); 
    window.location.href = '/mypage'; 
  };

  const handleLensClick = () => {
    window.location.href = '/camera';
  };

  return (
    <NavContainer>
      <NavItem onClick={handleCartClick}>
        {isCartActive ? (
          <BsCartFill size={24} />
        ) : (
          <BsCart size={24} />
        )}
        <div>장바구니</div>
      </NavItem>

      <NavItem onClick={handleLensClick}>
        <BsUpcScan size={50} />
        <div>스마트 렌즈</div>
      </NavItem>

      <NavItem onClick={handleProfileClick}>
        {isProfileActive ? (
          <BsFillPersonFill size={24} />
        ) : (
          <BsPerson size={24} />
        )}
        <div>내 정보</div>
      </NavItem>
    </NavContainer>
  );
};

export default BottomNav;
