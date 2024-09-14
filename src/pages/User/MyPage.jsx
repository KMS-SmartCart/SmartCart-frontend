import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { FaUserAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { FaGoogle } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import BottomNav from '../../Component/Navigation/BottomNav';
import Apis from "../../apis/Api";
import Modal from '../../Component/Modal/DeleteUser';
//import logo from "../../assets/images/smartcartlogo.png"
import logo from "../../assets/images/google.png"

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

const Logo = styled.img`
  width: 80px;
  height: auto;
  align-self: flex-end; /* 오른쪽 상단에 배치 */
  margin-right: 10px;
`;

const Header = styled.text`
  font-size: 20px;
  color: black;
  text-align: left;
  margin-top: 10px;
  width: 100%;
`;

const UserInfoCard = styled.div`
  background-color: #eef2f6;
  border-radius: 20px;
  padding-top: 60px;
  margin-top: 40px;
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

const UserName = styled.h2`
  margin: 10px 0;
  font-size: 18px;
  text-align: center;
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
  padding: 0;
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
  const [saveMoney, setSaveMoney] = useState(''); // 아낀 금액
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
      setUserName(response.data.data.nickname);
      setSaveMoney(response.data.data.saveMoney);
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

  return (
    <Container>
      <Logo onClick={handlelogoClick} src={logo} alt="SmartCart" />
      <Header>{userName}님💙</Header>
      <hr style={{border: 'solid 1px black', width: '100%'}}></hr>

      <UserInfoCard>
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
        <Amount>SMARTCART로 {saveMoney}원 절약했어요!💸</Amount>
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
