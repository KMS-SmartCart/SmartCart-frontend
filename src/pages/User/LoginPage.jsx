import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Apis from "../../apis/Api";
import '../../App.css';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
`;

const Header = styled.h2`
    text-align: left;      /* 왼쪽 정렬 */
    width: 100%;           /* 전체 너비를 사용하도록 설정 */
    max-width: 200px;      /* 최대 너비 설정 (필요시 조정) */
    margin: 0;
`;

const Description = styled.p`
    text-align: left;      /* 왼쪽 정렬 */
    margin: 10px 0 20px;
    white-space: pre-line; /* 줄바꿈 허용 */
    width: 100%;           /* 전체 너비를 사용하도록 설정 */
    max-width: 200px;      /* 최대 너비 설정 (필요시 조정) */
    font-weight: bold;     /* 두껍게 설정 */
`;

const ImageSeparator = styled.img`
    width: 100px; /* 이미지 크기 조정 */
    height: auto; /* 비율 유지 */
    margin: 20px 0; /* 위아래 여백 추가 */
`;

const LoginMethodText = styled.p`
    margin: 20px 0; /* 여백 조정 */
    text-align: center; /* 중앙 정렬 */
    font-size: 12px; /* 글씨 크기 조정 (원하는 크기로 변경) */
`;

const SocialLoginContainer = styled.div`
    display: flex;
    flex-direction: row; /* 수평으로 배치 */
    align-items: center;
`;

const SocialButton = styled.a`
    margin: 0 10px;         /* 아이콘 간 간격 조정 */
    cursor: pointer;

    img {
        width: 50px;        /* 아이콘 크기 조정 */
        height: 50px;
        border-radius: 50%; /* 원형으로 만들기 */
    }
`;

function LoginPage(props) {
    const navigate = useNavigate();

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        if (storedAccessToken && storedRefreshToken) {
            navigate(`/main`);
        }
    }, []);

    return (
        <Container>
            <Header>SM<span style={{ color: '#5271FF' }}>ART</span> C<span style={{ color: '#5271FF' }}>ART</span></Header>
            <Description>
                이젠, 찍기만 하세요{"\n"}
                알아서 비교해 드립니다.
            </Description>

            <ImageSeparator src="../../assets/images/carticon192.png" alt="Separator" />

            <LoginMethodText>로그인 방법 선택</LoginMethodText>

            <SocialLoginContainer>
                <SocialButton href={`${process.env.REACT_APP_DB_HOST}/oauth2/authorization/google`}>
                    <img src="../../assets/images/google.png" alt="Google" />
                </SocialButton>
                <SocialButton href={`${process.env.REACT_APP_DB_HOST}/oauth2/authorization/naver`}>
                    <img src="../../assets/images/naver.png" alt="Naver" />
                </SocialButton>
                <SocialButton href={`${process.env.REACT_APP_DB_HOST}/oauth2/authorization/kakao`}>
                    <img src="../../assets/images/kakao.png" alt="Kakao" />
                </SocialButton>
            </SocialLoginContainer>
        </Container>
    );
}

export default LoginPage;