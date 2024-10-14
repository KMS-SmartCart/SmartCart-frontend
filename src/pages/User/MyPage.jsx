import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaUserCircle as UserCircleIcon } from "react-icons/fa";
import { FiUser as UserIcon } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { FaGoogle as GoogleIcon } from "react-icons/fa";
import { SiKakao as KakaoIcon } from "react-icons/si";
import { SiNaver as NaverIcon } from "react-icons/si";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import BottomNav from "../../components/Navigation/BottomNav";
import Apis from "../../apis/Api";
import DeleteUserModal from "../../components/Modal/DeleteUserModal";
import logo from "../../assets/images/smartcartlogo.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
  margin: 35px;
  min-height: 100vh;
  background-color: white;
  position: relative;
  padding-bottom: 100px;
  box-sizing: border-box;

  @media (max-width: 390px) {
    margin: 25px;
  }
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 23px;
  max-width: 350px;
  width: 100%;
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  margin: 0px;
  color: black;
  font-size: 22px;
  font-weight: bold;

  @media (max-width: 390px) {
    font-size: 20px;
  }

  @media (max-width: 360px) {
    font-size: 18px;
  }
`;

const LogoImage = styled.img`
  cursor: pointer;
  width: 65px;
  height: auto;

  @media (max-width: 390px) {
    width: 60px;
  }
`;

const UserInfoCard = styled.div`
  background-color: #e6ebf1;
  /* background-color: #ecebeb; */
  border-radius: 20px;
  margin: 15px;
  padding: 5px 0px;
  width: 100%;
  max-width: 350px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 61vh;
  overflow-y: auto;

  @media (max-width: 390px) {
    height: 58vh;
    margin: 10px;
  }

  @media (max-width: 360px) {
    height: 51vh;
    margin: 15px;
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

  @media (max-width: 390px) {
    top: 18px;
    left: 15px;
  }

  @media (max-width: 360px) {
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

  @media (max-width: 390px) {
    top: 18px;
    right: 15px;
  }

  @media (max-width: 360px) {
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

  @media (max-width: 390px) {
    font-size: 18px;
    margin: 5px;
  }

  @media (max-width: 360px) {
    font-size: 20px;
    margin: 20px;
  }
`;

const ProfileWrapper = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 390px) {
    margin: 20px 0;
  }

  @media (max-width: 360px) {
    margin: 30px 0;
  }
`;

const SocialAndLeave = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 390px) {
    margin: 5px;
  }

  @media (max-width: 360px) {
    margin: 25px;
  }
`;

const UserName = styled.text`
  margin: 12px 0;
  font-size: 16px;
  text-align: center;
  background-color: #c7ccdf;
  /* background-color: #d9d9d9; */
  padding: 5px 30px;
  border-radius: 10px;
  display: inline-block;

  @media (max-width: 390px) {
    font-size: 19px;
  }

  @media (max-width: 360px) {
    font-size: 16px;
  }
`;

const UserNameInput = styled.input`
  max-width: 100px;
  margin: 12px 0;
  border: none;
  border-radius: 10px;
  /* background-color: white; */
  background-color: #ffffff;
  font-size: 22px;
  text-align: center;
  flex-grow: 1;
  outline: none;
  padding: 5px;
  line-height: 1;
  font-family: inherit;

  @media (max-width: 390px) {
    font-size: 19px;
  }

  @media (max-width: 360px) {
    font-size: 16px;
  }
`;

const LeaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px 0;
  padding: 7px 15px;
  /* background-color: #7582b0; */
  background-color: #5271ff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: fit-content;
  font-size: 17px;

  svg {
    margin-right: 10px;
  }

  @media (max-width: 390px) {
    font-size: 15px;
  }

  @media (max-width: 360px) {
    font-size: 11px;
  }
`;

const AccumulatedAmount = styled.div`
  margin-top: 45px;
  font-size: 20px;
  color: #555;
  text-align: center;

  @media (max-width: 390px) {
    font-size: 16px;
    margin-top: 35px;
  }

  @media (max-width: 360px) {
    font-size: 18px;
    margin-top: 25px;
  }
`;

const Amount = styled.p`
  font-size: 18px;
  color: #007aff;
  margin-top: 5px;
  text-align: center;

  @media (max-width: 390px) {
    font-size: 15px;
  }

  @media (max-width: 360px) {
    font-size: 16px;
  }
`;

const MyPage = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [userName, setUserName] = useState("");
  const [savedMoney, setSavedMoney] = useState(0); // 아낀 금액
  const [socialType, setSocialType] = useState(0); // 소셜로그인 타입
  const [isEditing, setIsEditing] = useState(false);
  const [editNickName, setEditNickName] = useState(""); // 수정 중인 이름
  const [showModal, setShowModal] = useState(false); // 모달 상태 관리

  // 사용자 조회 API
  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    try {
      const response = await Apis.get("/users");
      console.log(response); // 응답 데이터 구조 확인
      setUserName(response.data.data.nickname);

      console.log("API에서 받은 금액:", response.data.data.savedMoney);
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
      await Apis.put("/users", { nickname: editNickName });
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
        localStorage.clear(); // 이때는 모두 비워주도록함.
        navigate("/login"); // 로그인 페이지로 이동
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
    localStorage.clear(); // 이때는 모두 비워주도록함.
    navigate("/login");
  };

  return (
    <Container>
      <TopBar>
        <Header><UserCircleIcon style={{ marginRight: '3px', marginBottom: '1px' }} />&nbsp;{userName}님</Header>
        <LogoImage src={logo} alt="Logo" onClick={handlelogoClick} />
      </TopBar>

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
            <UserIcon size={55} />
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

          <SocialAndLeave>
            {socialType === "GOOGLE" && <GoogleIcon size={28} />}
            {socialType === "KAKAO" && <KakaoIcon size={50} />}
            {socialType === "NAVER" && <NaverIcon size={26} />}
            <LeaveButton onClick={openModal}>회원탈퇴</LeaveButton>
          </SocialAndLeave>
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
