import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import { IoMdCheckboxOutline } from "react-icons/io";
import { CheckToken } from "../../utils/CheckToken";
import Apis from "../../apis/Api";
import BottomNav from '../../Component/Navigation/BottomNav';
import logo from "../../assets/images/smartcartlogo.png"

// 스타일 정의
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

  @media (max-width: 390px) {
    padding: 15px;
  }

  @media (max-width: 360px) {
    padding: 10px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  // margin-bottom: 20px;
`;

const Header = styled.h1`
  font-size: 22px;
  color: black;
  margin: 0;
  font-weight: bold;

  @media (max-width: 375px) {
    font-size: 20px;
  }

  @media (max-width: 360px) {
    font-size: 18px;
  }
`;

const LogoContainer = styled.div`
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 120px;
  height: auto;

  @media (max-width: 390px) {
    width: 100px;
  }

  @media (max-width: 360px) {
    width: 80px;
  }
`;

const InputContainer = styled.div`
  background-color: #E8E6F0;
  border-radius: 20px;
  padding: 15px;
  width: 100%;
  max-width: 350px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  height: 280px;
  overflow-y: auto;

  @media (max-width: 390px) {
    height: 260px;
    padding: 12px;
  }

  @media (max-width: 375px) {
    height: 240px;
  }

  @media (max-width: 360px) {
    height: 220px;
    padding: 10px;
  }
`;

const ChecklistWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 10px;
`;

const ChecklistItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: none;
  padding: 2px;
  border-radius: 10px;
  margin-bottom: 5px;
  font-size: 14px;
  text-decoration: ${({ isChecked, isEditing }) => (isEditing ? 'none' : isChecked ? 'line-through' : 'none')};

  @media (max-width: 375px) {
    font-size: 13px;
  }

  @media (max-width: 360px) {
    font-size: 12px;
  }
`;

const InputWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 15px;
  right: 15px;
  display: flex;
  align-items: center;
  width: calc(100% - 30px);
  background-color: #CDD3EE;
  border-radius: 20px;

  @media (max-width: 375px) {
    bottom: 8px;
    left: 12px;
    right: 12px;
  }

  @media (max-width: 360px) {
    bottom: 6px;
    left: 10px;
    right: 10px;
  }
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  font-size: 12px;
  flex-grow: 1;
  outline: none;
  padding: 10px;

  @media (max-width: 375px) {
    font-size: 11px;
    padding: 8px;
  }

  @media (max-width: 360px) {
    font-size: 10px;
    padding: 6px;
  }
`;

const InputButton = styled.button`
  background-color: #7582B0;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 11px;
  cursor: pointer;
  font-size: 10px;
  margin-right: 10px;

  @media (max-width: 375px) {
    font-size: 9px;
    padding: 4px 8px;
  }

  @media (max-width: 360px) {
    font-size: 8px;
    padding: 3px 6px;
  }
`;

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

  @media (max-width: 375px) {
    font-size: 13px;
    margin-left: 22px;
  }

  @media (max-width: 360px) {
    font-size: 12px;
    margin-left: 18px;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;

  @media (max-width: 360px) {
    padding: 3px;
  }
`;

const RecommendedMenu = styled.div`
  background-color: #E6EBF1;
  border-radius: 20px;
  padding: 15px;
  width: 100%;
  max-width: 350px;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;

  @media (max-width: 375px) {
    padding: 12px;
  }

  @media (max-width: 360px) {
    padding: 10px;
  }
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
      <HeaderContainer>
        <Header>Hello, {userName.length > 5 ? <>{userName}</> : userName}✋</Header>
        <LogoContainer>
          <LogoImage src={logo} alt="Logo" />
        </LogoContainer>
      </HeaderContainer>

      <InputContainer>
        <ChecklistWrapper>
          {items.map((item) => (
            <ChecklistItem
              key={item.checkitemId}
              isChecked={item.isCheck === 1}
              isEditing={editItemId === item.checkitemId}
            >
              {editItemId === item.checkitemId ? (
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <EditInput
                    type="text"
                    value={editItemName}
                    onChange={(e) => setEditItemName(e.target.value)}
                    onBlur={handleEditSubmit}
                  />
                  <ActionButton onClick={handleEditSubmit}><IoMdCheckboxOutline size={18}/></ActionButton>
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
                    <ActionButton onClick={() => handleEditClick(item)}>
                      <PiNotePencil size={18} />
                    </ActionButton>
                    <ActionButton onClick={() => handleDeleteClick(item.checkitemId)}>
                      <IoTrashOutline size={18} />
                    </ActionButton>
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

      <RecommendedMenu>
        <h3 style={{ marginTop: 0, marginBottom: 10, fontSize: '16px' }}>추천 메뉴</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>Chat GPT 사용</p>
        <p style={{ margin: 5, fontSize: '14px' }}>→ 장바구니에 담긴 메뉴로 추천 레시피</p>
      </RecommendedMenu>
      <BottomNav />
    </Container>
  );
}

export default MainPage;
