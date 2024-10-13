import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import { IoMdCheckboxOutline } from "react-icons/io";
import { CheckToken } from "../../utils/CheckToken";
import Apis from "../../apis/Api";
import BottomNav from '../../components/Navigation/BottomNav';
import logo from "../../assets/images/smartcartlogo.png"
import { FaUserCircle } from "react-icons/fa";
import { BsArrowLeftShort } from "react-icons/bs";

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  margin: 35px;
  min-height: 100vh;
  background-color: white;
  position: relative; 
  padding-bottom: 100px;
  box-sizing: border-box;

  @media (max-width: 390px) { /* IPhone SE */
    padding: 10px;
    margin: 25px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    padding: 10px;
    margin: 25px;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 110%;
  margin-bottom: 20px;
`;
const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.div`
  cursor: pointer;
`;

const LogoImage = styled.img`
  cursor: pointer;
  width: 65px;
  height: auto;

  @media (max-width: 390px) { /* IPhone SE */
    width: 60px;
  }

  @media (max-width: 390px) { /* Galaxy S8 */
    width: 60px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 23px;
  max-width: 350px;
  width: 100%;
`;

const Header = styled.h1`
  margin: 0px;
  color: black;
  font-size: 20px;
  font-weight: bold;

  @media (max-width: 390px) { /* IPhone SE */
    font-size: 18px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    font-size: 18px;
  }
`;

const InputContainer = styled.div`
  // background-color: #E8E6F0;
  background-color: #E2E8FF;
  border-radius: 20px;
  padding: 20px;
  width: 98%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 65vh;
  margin-top: -5px;
  overflow-y: auto;

  @media (max-width: 390px) { /* IPhone SE */
    padding: 12px;
    height: 60vh; 
    margin-top: -5px;
    width: 100%;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    padding: 10px;
    height: 67vh;
    margin-top: -5px;
    width: 100%;
  }
`;

const ChecklistHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;

  @media (max-width: 390px) { /* IPhone SE */
    margin-bottom: 3px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    margin-bottom: 3px;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #4B4B4B;
  margin: 8px;

  @media (max-width: 390px) { /* IPhone SE */
    font-size: 18px;
    margin: 10px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    font-size: 18px;
    margin: 13px;
  }
`;

const DeleteAllButton = styled.button`
  background: none;
  border: none;
  color: #5271FF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;

  @media (max-width: 390px) { /* IPhone SE */
    padding: 12px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    padding: 12px;
  }
`;
const AllTrashIcon = styled(IoTrashOutline)`
  width: 22px;
  height: auto;

  @media (max-width: 390px) { /* IPhone SE */
    width: 18px;
    height: auto;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    width: 20px;
    height: auto;
  }
`;

const ChecklistWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 50px;

  @media (max-width: 390px) { /* IPhone SE */
    margin-bottom: 40px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    margin-bottom: 50px;
  }
`;

const ChecklistItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: none;
  padding: 2px;
  border-radius: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  text-decoration: ${({ isChecked, isEditing }) => (isEditing ? 'none' : isChecked ? 'line-through' : 'none')};

  @media (max-width: 390px) { /* IPhone SE */
    padding: 2px;
    margin: 5px;
    font-size: 15px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    padding: 2px;
    margin: 5px;
    font-size: 16px;
  }
`;

const CheckBox = styled(IoMdCheckboxOutline)`
  width: 22px;
  height: auto;

  @media (max-width: 390px) { /* IPhone SE */
    width: 18px;
  height: auto;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    width: 20px;
  height: auto;
  }
`;

const PencilIcon = styled(PiNotePencil)`
  width: 22px;
  height: auto;

  @media (max-width: 390px) { /* IPhone SE */
    width: 18px;
    height: auto;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    width: 20px;
    height: auto;
  }
`;

const TrashIcon = styled(IoTrashOutline)`
  width: 22px;
  height: auto;

  @media (max-width: 390px) { /* IPhone SE */
    width: 18px;
    height: auto;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    width: 20px;
    height: auto;
  }
`;

const InputWrapper = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  right: 15px;
  display: flex;
  align-items: center;
  width: calc(100% - 30px);
  // background-color: #F3EDF7;
  background-color: #F9FAFF;
  border-radius: 20px;

  @media (max-width: 390px) { /* IPhone SE */
    bottom: 12px;
    left: 14px;
    right: 12px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    bottom: 13px;
    left: 13px;
    right: 10px;
  }
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  font-size: 15px;
  flex-grow: 1;
  outline: none;
  padding: 15px;

  @media (max-width: 390px) { /* IPhone SE */
    font-size: 12px;
    padding: 11px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    font-size: 14px;
    padding: 13px;
  }
`;

const InputButton = styled.button`
  // background-color: #E8DEF8;
  background-color: #5271FF;
  color: #FFFFFF;
  border: none;
  padding: 0px 12px;
  border-radius: 11px;
  cursor: pointer;
  font-size: 25px;
  margin-right: 10px;

  @media (max-width: 390px) { /* IPhone SE */
    font-size: 20px;
    padding: 0px 10px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    font-size: 23px;
    padding: 0px 11px;
  }
`;

const EditInput = styled.input`
  border: none;
  background-color: transparent;
  font-size: 18px;
  flex-grow: 1;
  outline: none;
  padding: 0;
  line-height: 1;
  font-family: inherit;
  margin-left: 27px;

  @media (max-width: 390px) { /* IPhone SE */
    font-size: 15px;
    margin-left: 27px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    font-size: 16px;
    margin-left: 27px;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;

  @media (max-width: 390px) { /* IPhone SE */
    padding: 5px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    padding: 5px;
  }
`;


function MainPage() {
  const navigate = useNavigate();
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

  //체크리스트 모든 항목 삭제 API
  const handleAllDelete = async ( ) => {
    await Apis.delete(`/checkitems`)
      .then((response) => {
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

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogoClick = () => {
    navigate('/main');
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
      <TopBar>
        <BackButton onClick={handleBack}>
          <BsArrowLeftShort />
        </BackButton>
        <LogoContainer onClick={handleLogoClick}>
          <LogoImage src={logo} alt="Logo" />
        </LogoContainer>
      </TopBar>

      <NavContainer>
        <Header><FaUserCircle />&nbsp;{userName}님</Header>
        {/* <LogoImage src={logo} alt="Logo" /> */}
      </NavContainer>

      <InputContainer>
        <ChecklistHeader>
          <Title>체크리스트</Title>
          <DeleteAllButton onClick={handleAllDelete}>
            <AllTrashIcon />
          </DeleteAllButton>
        </ChecklistHeader>

        <ChecklistWrapper>
          {items.map((item) => (
            <ChecklistItem
              key={item.checkitemId}
              isChecked={item.isCheck === 1}
              isEditing={editItemId === item.checkitemId}
            >
              {editItemId === item.checkitemId ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <EditInput
                    type="text"
                    value={editItemName}
                    onChange={(e) => setEditItemName(e.target.value)}
                    onBlur={handleEditSubmit}
                  />
                  <ActionButton onClick={handleEditSubmit}>
                    <CheckBox />
                  </ActionButton>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={item.isCheck === 1}
                      onChange={() => handleCheckChange(item)}
                      style={{ marginRight: "10px" }}
                    />
                    <span>{item.checkitemName}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ActionButton onClick={() => handleEditClick(item)}>
                      <PencilIcon />
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleDeleteClick(item.checkitemId)}
                    >
                      <TrashIcon size={18} />
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
          <InputButton onClick={handleAddClick}>+</InputButton>
        </InputWrapper>

      </InputContainer>

      <BottomNav />

    </Container>
  );
}

export default MainPage;
