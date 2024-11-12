import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNav from "../../components/Navigation/BottomNav";
import Apis from "../../apis/Api";
import logo from "../../assets/images/smartcartlogo.png";
import { BsArrowLeftShort } from "react-icons/bs";

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

  @media (max-width: 375px) {
    padding: 15px;
  }

  @media (max-width: 360px) {
    padding: 10px;
  }
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 23px;
  max-width: 300px;
  width: 100%;

  @media (max-width: 375px) {
    max-width: 280px;
  }
  @media (max-width: 360px) {
    max-width: 260px;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;

const LogoImage = styled.img`
  cursor: pointer;
  width: 65px;
  height: auto;

  @media (max-width: 375px) {
    width: 60px;
  }
`;

const ImageContainer = styled.div`
  margin-bottom: 15px;
  width: 100%;
  max-width: 300px;

  // 모바일 후면 카메라 촬영 시, 사진이 세로로 출력되어 크기 조절함. (가로로 펴서 찌그러트림)
  // text-align: center;
  // max-height: 225px;

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

  // 모바일 후면 카메라 촬영 시, 사진이 세로로 출력되어 크기 조절함. (가로로 펴서 찌그러트림)
  // max-height: 225px;
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
  background-color: #e6ebf1;

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
  background-color: ${(props) => (props.disabled ? "#C7CCDF" : "#5271FF")};
  color: ${(props) => (props.disabled ? "black" : "white")};
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-top: 15px;

  margin-bottom: 90px; // 모바일 세로 사진으로 인해, 잘리는 밑의 버튼을 보여주기위한 마진값 부여.

  &:hover {
    background-color: #c7ccdf;
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
  const {
    imageUrl,
    productName: initialProductName,
    price: initialPrice,
    amount: initialAmount,
  } = location.state || {};

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialProductName) setProductName(initialProductName);
    if (initialPrice) setPrice(initialPrice);
    if (initialAmount) setAmount(initialAmount);
  }, [initialProductName, initialPrice, initialAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 로딩 시작

    try {
      const response = await Apis.post("/products/lowest-price", {
        productName,
        amount,
      });
      const options = response.data.data;

      navigate("/Lowest", {
        state: { productName, price, amount, options },
      });
    } catch (error) {
      console.error("최저가 데이터를 가져오는 중 오류 발생: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoClick = () => {
    navigate("/main");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <TopBar>
        <BackButton onClick={handleBack}>
          <BsArrowLeftShort />
        </BackButton>
        <LogoImage src={logo} alt="Logo" onClick={handleLogoClick} />
      </TopBar>

      <ImageContainer>
        <ProductImage src={imageUrl || "#"} alt="Product" />
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

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "로딩 중..." : "확인"}
        </SubmitButton>
      </FormContainer>

      <BottomNav />
    </Container>
  );
}

export default ItemInfoPage;