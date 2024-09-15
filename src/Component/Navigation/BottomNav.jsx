import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { BsCart, BsCartFill, BsPerson, BsFillPersonFill, BsUpcScan } from "react-icons/bs"; 

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 390px;
  background-color: white;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  box-sizing: border-box;

  @media (max-width: 375px) {
    padding: 6px 0;
  }

  @media (max-width: 360px) {
    padding: 5px 0;
  }
`;

const NavItem = styled.div`
  text-align: center;
  color: #888;
  font-size: 12px;
  cursor: pointer;
  flex: 1;

  &:hover {
    color: #5271FF;
  }

  div {
    margin-top: 4px;
  }

  @media (max-width: 375px) {
    font-size: 11px;
  }

  @media (max-width: 360px) {
    font-size: 10px;
  }
`;

const LensItem = styled(NavItem)`
  svg {
    width: 40px;
    height: 40px;
  }

  div {
    font-size: 14px;
    font-weight: bold;
  }

  @media (max-width: 375px) {
    svg {
      width: 36px;
      height: 36px;
    }
    div {
      font-size: 13px;
    }
  }

  @media (max-width: 360px) {
    svg {
      width: 32px;
      height: 32px;
    }
    div {
      font-size: 12px;
    }
  }
`;

const BottomNav = () => {
  const navigate = useNavigate();
  
  const [isCartActive, setIsCartActive] = useState(false); 
  const [isProfileActive, setIsProfileActive] = useState(false); 

  const handleCartClick = () => {
    setIsCartActive(true);
    navigate("/cart");
  };

  const handleProfileClick = () => {
    setIsProfileActive(true); 
    navigate("/mypage");
  };

  const handleLensClick = () => {
    navigate("/camera");
  };

  return (
    <NavContainer>
      <NavItem onClick={handleCartClick}>
        {isCartActive ? (
          <BsCartFill size={20} />
        ) : (
          <BsCart size={20} />
        )}
        <div>장바구니</div>
      </NavItem>

      <LensItem onClick={handleLensClick}>
        <BsUpcScan />
        <div>스마트 렌즈</div>
      </LensItem>

      <NavItem onClick={handleProfileClick}>
        {isProfileActive ? (
          <BsFillPersonFill size={20} />
        ) : (
          <BsPerson size={20} />
        )}
        <div>내 정보</div>
      </NavItem>
    </NavContainer>
  );
};

export default BottomNav;