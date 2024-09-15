import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { FaUserAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { FaGoogle } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import BottomNav from '../../Component/Navigation/BottomNav';
import Apis from "../../apis/Api";
import Modal from '../../Component/Modal/DeleteUser';
import logo from "../../assets/images/smartcartlogo.png"

// 스타일 정의
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

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  // padding: 10px;
`;

const Header = styled.h1`
  font-size: 22px;
  color: black;
  margin: 0;
  font-weight: bold;
`;

const LogoContainer = styled.div`
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 150px;
  height: auto;

  @media (max-width: 768px) {
    width: 60px;
  }
`;

const UserInfoCard = styled.div`
  background-color: #E6EBF1;
  border-radius: 20px;
  padding-top: 60px;
  width: 100%;
  max-width: 350px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative; /* 부모 요소에 대해 inputwrapper를 절대적으로 위치시킴 */
  height: 320px;      /* 고정된 높이 */
  overflow-y: auto;   /* 내용이 많아지면 스크롤 처리 */
  align-items: center;
`;

const LogOutButton = styled.button`
  position: absolute;
  top: 15px;
  left: 15px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  transform: scaleX(-1);
`;
const EditButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
//   flex-grow: 1;
`;

const UserInfoComment = styled.text`
  font-size: 18px;
  margin-bottom: 18px;
  font-weight: bold;
`;

const ProfileWrapper = styled.div`
  margin: 18px 0;
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 가운데 정렬 */
`;

const GoogleAndLeave = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center; /* 수평 가운데 정렬 */
  margin-bottom: 30px;
`;

const UserName = styled.text`
  margin: 10px 0;
  font-size: 18px;
  text-align: center;
  background-color: #C7CCDF; /* 배경색 추가 */
  padding: 5px 30px; /* 텍스트 양쪽에 패딩 추가 */
  border-radius: 10px; /* 모서리를 둥글게 */
  display: inline-block; /* 컨텐츠 크기에 맞춰서 배경길이 조절 */
  font-weight: bold;
`;

const UserNameInput = styled.input`
  margin: 10px 0;
  border: none;
  border-radius: 10px;
  background-color: white;
  font-size: 18px;
  text-align: center;
  flex-grow: 1;
  outline: none;
  padding: 5px;
  line-height: 1;
  font-family: inherit;
`;

const LeaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto; /* 버튼을 가운데로 */
  margin-top: 15px;
  
  padding: 8px 15px;
  background-color: #7582B0;
  color: white;
//   font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: fit-content;

  svg {
    margin-right: 10px;
  }
`;

const AccumulatedAmount = styled.div`
  margin-top: 30px;
  font-size: 18px;
  color: #555;
  text-align: center;
`;

const Amount = styled.p`
  font-size: 16px;
  color: #007aff;
  margin-top: 5px;
  text-align: center;
`;

const MyPage = () => {
  const navigate = useNavigate();
  
  // 상태 관리
  const [userName, setUserName] = useState('');
  const [savedMoney, setSavedMoney] = useState(0); // 아낀 금액
  const [isEditing, setIsEditing] = useState(false);
  const [editNickName, setEditNickName] = useState(''); // 수정 중인 이름
  const [showModal, setShowModal] = useState(false); // 모달 상태 관리

  // 사용자 조회 API
  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    try {
      const response = await Apis.get('/users');
      console.log(response); // 응답 데이터 구조 확인
      setUserName(response.data.data.nickname);

      console.log('API에서 받은 금액:', response.data.data.saveMoney);
      setSavedMoney(response.data.data.savedMoney);
      setEditNickName(response.data.data.nickname);
    } catch (error) {
      console.error(error);
    }
  }

  // 사용자 닉네임 업데이트 API
  const handleNickName = async () => {
    try {
      await Apis.put('/users', { nickname: editNickName });
      getUserInfo(); // 재로딩
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle edit mode
  const toggleEdit = () => {
    if (isEditing) {
      handleNickName(); 
    } else {
      setIsEditing(true);
    }
  };

  // 회원 탈퇴 API
  const handleDeleteUser = async () => {
    await Apis.delete(`/users`)
      .then((response) => {
        localStorage.clear();  // 이때는 모두 비워주도록함.
        navigate("/login");  // 로그인 페이지로 이동
      })
      .catch((error) => {
        // console.log(error)
      });
  };
 
  // 모달창 열기
  const openModal = () => {
    setShowModal(true);
  };

  // 모달창 닫기
  const closeModal = () => {
    setShowModal(false);
  };
  
  const handlelogoClick = () => {
    navigate("/main");
  };

  const handleLogout = () => {
    localStorage.clear();  // 이때는 모두 비워주도록함.
    navigate("/login");
  }

  return (
    <Container>
      <HeaderContainer>
        <Header>{userName}님💙</Header>
        <LogoContainer onClick={handlelogoClick}>
          <LogoImage src={logo} alt="Logo" />
        </LogoContainer>
      </HeaderContainer>
    
      <UserInfoCard>
        <LogOutButton onClick={handleLogout}>
          <MdLogout size={20} />
        </LogOutButton>
        <EditButton onClick={toggleEdit}>
          {isEditing ? <IoMdCheckboxOutline size={20} /> : <FiEdit size={18}/>}
        </EditButton>
        <ContentWrapper>
          <UserInfoComment>회원 정보</UserInfoComment>
          <ProfileWrapper>
            <FaUserAlt size={45} />
            {isEditing ? (
              <UserNameInput
                type="text"
                value={editNickName}
                onChange={(e) => setEditNickName(e.target.value)}
              />
            ) : (
              <UserName>{userName}</UserName>
            )}
          </ProfileWrapper>

          <GoogleAndLeave>
            <FaGoogle size={25} />
            <LeaveButton onClick={openModal}>회원탈퇴</LeaveButton>
          </GoogleAndLeave>
        </ContentWrapper>
      </UserInfoCard>

      <AccumulatedAmount>
        그동안 SMARTCART로 절약한 금액
        <Amount>SMARTCART로 {savedMoney}원 절약했어요!💘</Amount>

      </AccumulatedAmount>

      <BottomNav />

      {/* 모달 렌더링 */}
      {showModal && (
        <Modal
          message="회원 탈퇴 하시겠습니까?"
          onConfirm={handleDeleteUser}
          onCancel={closeModal}
        />
      )}

    </Container>
  );
};

export default MyPage;
