import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { CheckToken } from "../../utils/CheckToken";
import Apis from "../../apis/Api";

// 전체 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  height: 100vh;
  background-color: #f5f5f5;
`;

// 로고 스타일
const LogoImage = styled.img`
  width: 80px;
  height: auto;
  align-self: flex-end; /* 오른쪽 상단에 배치 */
  margin-right: 10px;
`;

// 인사말 텍스트 스타일
const Header = styled.h1`
  font-size: 24px;
  color: black;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
`;

// 입력창 컨테이너
const InputContainer = styled.div`
  background-color: #E8E6F0;
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative; /*부모 요소에 대해 inputwrapper를 절대적으로 위치시킴 */
  height: 300px;      /* 고정된 높이 */
  overflow-y: auto;   /* 내용이 많아지면 스크롤 처리 */
//   margin-bottom: 20px;
`;

// 체크리스트 스타일 (내용이 스크롤되는 영역)
const ChecklistWrapper = styled.div`
  flex-grow: 1; /* 스크롤 가능 영역 확장 */
  overflow-y: auto; /* 리스트가 길어질 때 스크롤 */
  margin-bottom: 10px; /* 아래쪽 여백 */
`;

// 체크리스트 아이템 스타일
const ChecklistItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: none;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  font-size: 14px;
`;

// 입력 필드와 버튼을 담는 래퍼 (고정된 영역)
const InputWrapper = styled.div`
  position: absolute;
  bottom: 15px;     /* InputContainer의 하단에 고정 */
  left: 20px;
  right: 15px;
  display: flex;
  align-items: center;
  width: 90%;
  background-color: #CDD3EE;
  border-radius: 20px;
//   margin-top: 210px;
`;

// 입력 필드 스타일
const Input = styled.input`
  border: none;
  background-color: transparent;
  font-size: 12px;
  flex-grow: 1;
  outline: none;
  padding: 12px;
`;

// 버튼 스타일
const InputButton = styled.button`
  background-color: #7582B0;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 11px;
  cursor: pointer;
  font-size: 10px;
  margin-right: 10px;
`;

const RecommendedMenu = styled.div`
  background-color: #E6EBF1;
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;


function MainPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  // 체크리스트 조회 API
  async function getCheckList() {
    await Apis.get(`/checkitems`)
      .then((response) => {
        setItems(response.data.data);

        // 경민아, 명세서에서 보다시피 각 item에 추가적인 속성으로,
        // isCheck 라는 체킹(체크리스트 줄긋는거) 여부도 보여줘야해. 추가 부탁해!
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  // 체크리스트 항목 추가 API
  const handleAddClick = async (e) => {
    await Apis.post("/checkitems", {
      checkitemName: newItem,
    })
      .then((response) => {
        // 백엔드 DB 내 항목 추가 완료.
        getCheckList(); // 재로딩
      })
      .catch((error) => {
        // console.log(error)
      });
  };

  // 체크리스트 항목 삭제 API
  const handleDeleteClick = async (id, e) => {
    await Apis.delete(`/checkitems/${id}`)
      .then((response) => {
        // 백엔드 DB 내 항목 삭제 완료.
        getCheckList(); // 프론트엔드 체크리스트 재로딩
      })
      .catch((error) => {
        // console.log(error)
      });
  };

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } else {
      CheckToken();
    }

    getCheckList(); // 페이지 첫 로딩시, 체크리스트 조회 API 호출.
  }, []);

  return (
    <Container>
      <LogoImage src="./assets/images/smartcartlogo.png" alt="Logo" />
      <Header>Hello, MKM KHW✋</Header>

      <InputContainer>
        <ChecklistWrapper>
          {items.map((item) => (
            <ChecklistItem key={item.checkitemId}>
              <span>{item.checkitemName}</span>
              <button
                onClick={() => handleDeleteClick(item.checkitemId)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {/* 🗑️ */}
                <IoTrashOutline size={20} />
              </button>
            </ChecklistItem>
          ))}
        </ChecklistWrapper>
        <InputWrapper>
          <Input
            type="text"
            placeholder="장 볼 항목을 입력해 주세요."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <InputButton onClick={handleAddClick}>추가</InputButton>
        </InputWrapper>
      </InputContainer>

      <h3>추천 메뉴</h3>
      <RecommendedMenu>
        <p>Chat GPT 사용</p>
        <p>→ 장바구니에 담긴 메뉴로 추천 레시피</p>
      </RecommendedMenu>
    </Container>
  );
}

export default MainPage;
