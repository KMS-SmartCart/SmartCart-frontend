import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import { IoMdCheckboxOutline } from "react-icons/io";
import { CheckToken } from "../../utils/CheckToken";
import Apis from "../../apis/Api";
import BottomNav from '../../Component/Navigation/BottomNav';
//import logo from "../../assets/images/smartcartlogo.png"
import logo from "../../assets/images/google.png"

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
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   width: 30%;
//   margin: 0 auto;
//   background-color: white;
//   border-radius: 10px;
//   // height: calc(100vh - 60px);  /* 하단 바 높이를 제외한 전체 높이 */
//   overflow-y: auto;  /* 나머지 콘텐츠가 스크롤되도록 설정 */

//   @media (max-width: 600px) {
//     max-width: 100%;
//     padding: 10px;
//   }
// `;

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
  padding: 2px;
  border-radius: 10px;
  margin-bottom: 5px;
  font-size: 14px;
  text-decoration: ${({ isChecked, isEditing }) => (isEditing ? 'none' : isChecked ? 'line-through' : 'none')}; // 체크 여부와 수정 여부에 따라 취소선 적용
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

// 수정 버튼 스타일
const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px; /* 수정 버튼과 삭제 버튼 사이의 간격 */
`;

// 수정 입력 필드 스타일
const EditInput = styled.input`
  border: none;
  background-color: transparent;
  font-size: 14px;
  flex-grow: 1;
  outline: none;
  padding: 0;
  line-height: 1;
  font-family: inherit;
  margin-left: 27px;
`;

// 완료 버튼 스타일
const DoneButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

// 삭제 버튼 스타일
const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
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

  const [userName, setUserName] = useState('');
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editItemId, setEditItemId] = useState(null); // 수정 중인 아이템의 ID
  const [editItemName, setEditItemName] = useState(''); // 수정 중인 이름

  // 사용자 조회 API
  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    try {
      const response = await Apis.get('/users');
      setUserName(response.data.data.nickname);
    } catch (error) {
      console.error(error);
    }
  }

  // 체크리스트 조회 API
  async function getCheckList() {
    await Apis.get(`/checkitems`)
      .then((response) => {
        setItems(response.data.data);
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
        setNewItem(""); // 입력 필드 초기화
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

  // 체크리스트 항목 업데이트 API (체크 상태 토글)
  const handleCheckChange = async (item) => {
    const updatedCheckState = item.isCheck === 1 ? 0 : 1;

    await Apis.put(`/checkitems/${item.checkitemId}`, {
      checkitemName: null,
      isCheck: updatedCheckState
    })
    .then((response) => {
      getCheckList(); // 프론트엔드 체크리스트 재로딩
    })
    .catch((error) => {
      // console.log(error)
    });
  };

  // 항목 이름 수정 모드로 변경
  const handleEditClick = (item) => {
    setEditItemId(item.checkitemId);
    setEditItemName(item.checkitemName);
  };

  
  // 수정 완료 처리
  const handleEditSubmit = async () => {
    if (editItemName.trim() === '') {
      // 빈 이름을 방지
      alert("항목 이름을 입력하세요.");
      return;
    }

    await Apis.put(`/checkitems/${editItemId}`, {
      checkitemName: editItemName,
      isCheck: null,
    }).then(() => {
      setEditItemId(null); // 수정 모드 종료
      setEditItemName(''); // 입력 필드 초기화
      getCheckList();
    }).catch((error) => {
      console.error(error);
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
      <LogoImage src={logo} alt="Logo" />
      <Header>Hello, {userName}✋</Header>

      <InputContainer>
        <ChecklistWrapper>
          {items.map((item) => (
            <ChecklistItem
              key={item.checkitemId}
              isChecked={item.isCheck === 1}
              isEditing={editItemId === item.checkitemId} // 수정 중인지 여부를 전달
            >
              {editItemId === item.checkitemId ? (
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <EditInput
                    type="text"
                    value={editItemName}
                    onChange={(e) => setEditItemName(e.target.value)}
                    onBlur={handleEditSubmit} // 수정 완료
                  />
                  <DoneButton onClick={handleEditSubmit}><IoMdCheckboxOutline size={20}/></DoneButton>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={item.isCheck === 1}
                      onChange={() => handleCheckChange(item)}
                      style={{ marginRight: '10px' }}
                    />
                    <span>{item.checkitemName}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <EditButton onClick={() => handleEditClick(item)}>
                      <PiNotePencil size={20} />
                    </EditButton>
                    <DeleteButton onClick={() => handleDeleteClick(item.checkitemId)}>
                      <IoTrashOutline size={20} />
                    </DeleteButton>
                  </div>
                </div>
              )}
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
      <BottomNav />
    </Container>
  );
}

export default MainPage;
