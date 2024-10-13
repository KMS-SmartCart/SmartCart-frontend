import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { FiUser } from "react-icons/fi";
import { FiEdit } from 'react-icons/fi';
import { FaGoogle } from "react-icons/fa";
import { SiKakao } from "react-icons/si";
import { SiNaver } from "react-icons/si";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import BottomNav from '../../components/Navigation/BottomNav';
import Apis from "../../apis/Api";
import DeleteUserModal from "../../components/Modal/DeleteUserModal";
import logo from "../../assets/images/smartcartlogo.png"
import { FaUserCircle } from "react-icons/fa";

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

const UserCircleIcon = styled(FaUserCircle)`

`;

const UserInfoCard = styled.div`
  background-color: #E6EBF1;
  border-radius: 20px;
  padding-top: 60px;
  margin: 8px;
  width: 100%;
  max-width: 360px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  height: 52vh;
  overflow-y: auto;
  align-items: center;

  @media (max-width: 390px) { /* IPhone SE */
    height: 45vh;
    padding-top: 50px;
    margin: 5px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    height: 53vh;
    padding-top: 52px;
    margin: 5px;
  }
`;

const LogOutButton = styled.button`
  position: absolute;
  top: 20px;
  left: 18px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  transform: scaleX(-1);

  @media (max-width: 390px) { /* IPhone SE */
    top: 18px;
    left: 15px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    top: 20px;
    left: 15px;
  }
`;

const EditButton = styled.button`
  position: absolute;
  top: 20px;
  right: 18px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;

  @media (max-width: 390px) { /* IPhone SE */
    top: 18px;
    right: 15px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    top: 20px;
    right: 15px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const UserInfoComment = styled.text`
  font-size: 22px;
  margin: 20px;
  font-weight: bold;
 
  @media (max-width: 390px) { /* IPhone SE */
    font-size: 19px;
    margin: 5px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    font-size: 20px;
    margin: 15px;
  }
`;

const ProfileWrapper = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
 
  @media (max-width: 390px) { /* IPhone SE */
    margin: 20px 0;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    margin: 30px 0;
  }
`;

const UserIcon = styled(FiUser)`
  width: 55px;
  height: auto;

  @media (max-width: 390px) { /* iPhone SE */
    width: 45px;
    height: auto;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    width: 50px;
    height: auto;
  }
`;

const SocialIconWrapper = styled.div`
  margin-top: -20px;
  margin-bottom: -30px;

  @media (max-width: 390px) { /* iPhone SE */
    margin-top: -15px;
    margin-bottom: -20px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    margin-top: -20px;
    margin-bottom: -25px;
  }
`;

const GoogleIcon = styled(FaGoogle)`
  width: 30px;
  height: auto;
  margin-top: 20px;
  margin-bottom: 20px;

  @media (max-width: 390px) { /* iPhone SE */
    width: 24px;
    margin-top: 25px;
    margin-bottom: 18px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    width: 28px;
    margin-top: 25px;
    margin-bottom: 18px;
  }
`;

const KakaoIcon = styled(SiKakao)`
  width: 70px;
  height: auto;

  @media (max-width: 390px) { /* iPhone SE */
    width: 55px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    width: 65px;
  }
`;

const NaverIcon = styled(SiNaver)`
  width: 26px;
  height: auto;
  margin-top: 20px;
  margin-bottom: 20px;

  @media (max-width: 390px) { /* iPhone SE */
    width: 20px;
    margin-top: 25px;
    margin-bottom: 18px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    width: 24px;
    margin-top: 20px;
    margin-bottom: 18px;
  }
`;

const GoogleAndLeave = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 390px) { /* IPhone SE */
    margin: 5px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    margin: 25px;
  }
`;

const UserName = styled.text`
  margin: 15px 0;
  font-size: 19px;
  text-align: center;
  background-color: #C7CCDF;
  padding: 5px 30px;
  border-radius: 10px;
  display: inline-block;

  @media (max-width: 390px) { /* IPhone SE */
    font-size: 16px;
    padding: 5px 30px;
    margin: 10px 0;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    font-size: 16px;
    padding: 5px 30px;
    margin: 15px 0;
  }
`;

const UserNameInput = styled.input`
  margin: 15px 0;
  border: none;
  border-radius: 10px;
  background-color: #F5F5F5;
  font-size: 19px;
  text-align: center;
  flex-grow: 1;
  outline: none;
  padding: 5px;
  line-height: 1;
  font-family: inherit;

  @media (max-width: 390px) { /* IPhone SE */
    font-size: 16px;
    margin: 10px 0;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    font-size: 16px;
    margin: 15px 0;
  }
`;

const LeaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto 0;
  padding: 8px 16px;
  background-color: #7582B0;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: fit-content;
  font-size: 15px;

  svg {
    margin-right: 10px;
  }

  @media (max-width: 390px) { /* IPhone SE */
    padding: 7px 15px;
    font-size: 12px;
    margin: 10px auto 0;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    padding: 7px 15px;
    font-size: 14px;
    margin: 20px auto 0;  
  }
`;

const AccumulatedAmount = styled.div`
  margin-top: 45px;
  font-size: 18px;
  color: #555;
  text-align: center;

  @media (max-width: 390px) { /* IPhone SE */
    font-size: 18px;
    margin-top: 35px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    font-size: 17px;
    margin-top: 38px;
  }
`;

const Amount = styled.p`
  font-size: 17px;
  color: #007aff;
  margin-top: 5px;
  text-align: center;

  @media (max-width: 390px) { /* IPhone SE */
    font-size: 16px;
  }

  @media (max-width: 360px) { /* Galaxy S8 */
    font-size: 15px;
  }
`;

const MyPage = () => {
  const navigate = useNavigate();
  
  // 상태 관리
  const [userName, setUserName] = useState('');
  const [savedMoney, setSavedMoney] = useState(0); // 아낀 금액
  const [socialType, setSocialType] = useState(0); // 소셜로그인 타입
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

      console.log('API에서 받은 금액:', response.data.data.savedMoney);
      
      setSavedMoney(response.data.data.savedMoney);
      setEditNickName(response.data.data.nickname);
      setSocialType(response.data.data.socialType);
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
      <NavContainer>
        <Header><UserCircleIcon />&nbsp;{userName}님</Header>
        <LogoImage src={logo} alt="Logo" onClick={handlelogoClick} />
      </NavContainer>

      <UserInfoCard>
        <LogOutButton onClick={handleLogout}>
          <MdLogout size={22} />
        </LogOutButton>
        <EditButton onClick={toggleEdit}>
          {isEditing ? <IoMdCheckboxOutline size={22} /> : <FiEdit size={20} />}
        </EditButton>
        <ContentWrapper>
          <UserInfoComment>회원 정보</UserInfoComment>
          <ProfileWrapper>
            <UserIcon />
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
            <SocialIconWrapper>
              {socialType === "GOOGLE" && <GoogleIcon />}
              {socialType === "KAKAO" && <KakaoIcon />}
              {socialType === "NAVER" && <NaverIcon />}
            </SocialIconWrapper>
            <LeaveButton onClick={openModal}>회원탈퇴</LeaveButton>
          </GoogleAndLeave>
        </ContentWrapper>
      </UserInfoCard>

      <AccumulatedAmount>
        그동안 SMARTCART로 절약한 금액
        <Amount>SMARTCART로 {savedMoney}원 절약했어요! 💵</Amount>
      </AccumulatedAmount>

      <BottomNav />

      {showModal && (
        <DeleteUserModal
          message="회원 탈퇴 하시겠습니까?"
          onConfirm={handleDeleteUser}
          onCancel={closeModal}
        />
      )}
    </Container>
  );
};

export default MyPage;
