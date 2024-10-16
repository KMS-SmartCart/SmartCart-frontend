import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Apis from "../../apis/Api";
import '../../App.css';
import cartIcon from "../../assets/images/mainicon.png";
import google from "../../assets/images/google.png";
import naver from "../../assets/images/naver.png";
import kakao from "../../assets/images/kakao.png";
import ConfirmModal from "../../components/Modal/ConfirmModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 35px;
  min-height: 100vh;
  background-color: white;
  position: relative; 
  box-sizing: border-box;

  @media (max-width: 390px) {
    padding: 30px;
  }
`;

const HeaderContainer = styled.div`
  position: relative;
  left: -20px;
`;

const Header = styled.h2`
    text-align: left;
    width: 100%;
    // margin: 20px;
    font-size: 28px;

    @media (max-width: 390px) {
      font-size: 24px; /* iPhone 12 Pro에서 조금 작게 조정 */
    }

    @media (max-width: 375px) {
      font-size: 22px; /* iPhone SE에서 더 작게 조정 */
    }

    @media (max-width: 360px) {
      font-size: 22px; /* Galaxy S8에 맞춰 크기 조정 */
    }
`;

const Description = styled.p`
    text-align: left;
    margin: 10px 0 20px;
    white-space: pre-line;
    width: 100%;
    font-weight: bold;
    font-size: 26px;

    @media (max-width: 390px) {
      font-size: 22px; /* iPhone 12 Pro */
    }

    @media (max-width: 375px) {
      font-size: 20px; /* iPhone SE */
    }

    @media (max-width: 360px) {
      font-size: 20px; /* Galaxy S8 */
    }
`;

const ImageSeparator = styled.img`
    max-width: 360px;      /* 최대 너비를 제한 */
    width: 100%;           /* 부모 컨테이너 너비를 기준으로 크기 조정 */
    height: auto;          /* 이미지 비율 유지 */
    margin-top: 20px;
    margin-bottom: 150px;

    @media (max-width: 390px) {
      max-width: 280px;
    }

    @media (max-width: 360px) {
      max-width: 330px;
    }
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
`;

const LoginMethodText = styled.p`
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    margin-bottom: 8.5px; /* 여백 조정 */
    font-size: 19px; /* 글씨 크기 조정 (원하는 크기로 변경) */

    @media (max-width: 390px) {
      font-size: 15px;
    }

    @media (max-width: 360px) {
      font-size: 17px;
    }
`;

const SocialLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px 0;
  width: 100%;
  max-width: 360px;
  background-color: white;
  box-sizing: border-box;

  @media (max-width: 390px) {
    /* iPhone SE에서 아이콘 크기 조정 */
    padding: 6px 0;
  }

  @media (max-width: 360px) {
    /* Galaxy S8에서 여백 조정 */
    padding: 5px 0;
  }
`;

const SocialButton = styled.a`
    margin: 10px;
    cursor: pointer;

    img {
        width: 60px;
        height: 60px;
        border-radius: 50%;

        @media (max-width: 390px) {
          width: 45px; /* iPhone SE에서 아이콘 크기 조정 */
          height: 45px;
        }

        @media (max-width: 360px) {
          width: 50px; /* Galaxy S8에서 아이콘 크기 조정 */
          height: 50px;
        }
    }

    @media (max-width: 390px) {
        margin: 0px;
    }

    @media (max-width: 360px) {
        margin: 5px;
    }
`;

const AppButton = styled.button`
    margin-left: 7.5px;
    padding: 2.2px 4.5px;
    border: solid 0.9px black;
    border-radius: 4px;
    font-size: 10.5px;
    font-weight: bold;
    color: #4868fa;
    cursor: pointer;
    display: ${props => props.show ? 'block' : 'none'};
`;

function LoginPage(props) {
    const navigate = useNavigate();

    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    const [showModal, setShowModal] = useState(false);  // 모달 상태 관리
    const [modalMessage, setModalMessage] = useState("");  // 모달 메세지 관리

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { answer } = await deferredPrompt.userChoice;
            if (answer === 'accepted') {
                console.log('홈화면에 앱 설치 완료!');
            } else {
                console.log('앱 설치를 거부하셨습니다.');
            }
            setDeferredPrompt(null);
        }
    };

    // 모달창 열기
    const openModal = () => {
      setShowModal(true);
    };

    // 모달창 닫기
    const closeModal = () => {
      setShowModal(false);
    };

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");
        if (storedAccessToken && storedRefreshToken) {
            navigate(`/main`);
        }

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallPrompt(true);
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");
        if (storedAccessToken && storedRefreshToken) {
            navigate(`/main`);
        }

        const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream;  // iOS 기기인지 확인
        if (!(storedAccessToken && storedRefreshToken)) {
            setTimeout(() => {
                if (isIOS) {
                  setModalMessage("[홈 화면에 추가]로 앱을 설치하세요!");
                  openModal();
                }
                else if (showInstallPrompt) {
                  setModalMessage("[App ⬇️] 버튼으로 앱을 설치하세요!");
                  openModal();
                }
            }, 300);  // 0.3초 딜레이 후에 앱설치 모달 생성.
        }
    }, [showInstallPrompt]);

    return (
        <Container>
            <HeaderContainer>
              <Header>SM<span style={{ color: '#5271FF' }}>ART</span> C<span style={{ color: '#5271FF' }}>ART</span></Header>
              <Description>
                  이젠, 찍기만 하세요{"\n"}
                  알아서 비교해 드립니다.
              </Description>
            </HeaderContainer>
        
            <ImageSeparator src={cartIcon} alt="Separator" />

            <LoginContainer>
              <LoginMethodText>
                로그인 방법 선택
                <AppButton onClick={handleInstallClick} show={showInstallPrompt}>App ⬇️</AppButton>
              </LoginMethodText>
              <SocialLoginContainer>
                  <SocialButton href={`${process.env.REACT_APP_DB_HOST}/oauth2/authorization/google`}>
                      <img src={google} alt="Google" />
                  </SocialButton>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <SocialButton href={`${process.env.REACT_APP_DB_HOST}/oauth2/authorization/naver`}>
                      <img src={naver} alt="Naver" />
                  </SocialButton>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <SocialButton href={`${process.env.REACT_APP_DB_HOST}/oauth2/authorization/kakao`}>
                      <img src={kakao} alt="Kakao" />
                  </SocialButton>
              </SocialLoginContainer>
            </LoginContainer>

            {showModal && (
              <ConfirmModal
                message={modalMessage}
                onCancel={closeModal}
              />
            )}
        </Container>
    );
}

export default LoginPage;