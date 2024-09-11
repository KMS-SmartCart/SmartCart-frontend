import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 스타일 버튼 컴포넌트
const Button = styled.button`
  width: 15%;
  padding: 10px;
  background-color: #5271FF;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #C7CCDF;
    color: black;
  }
`;

// 전체 컨테이너 스타일
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
  padding: 20px;
`;

const CameraPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera: ", error);
      }
    };

    getCameraStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const takePicture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageUrl = canvas.toDataURL('image/png');
      setCapturedImage(imageUrl);

      // ItemInfo 페이지로 이미지 전달
      navigate('/iteminfo', { state: { imageUrl } });
    }
  };

  return (
    <Container>
      <h3>가격표를 찍어주세요.😊</h3>
      <video ref={videoRef} autoPlay playsInline style={{ width: '50%' }} />
      <Button onClick={takePicture}>사진 촬영</Button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </Container>
  );
};

export default CameraPage;
