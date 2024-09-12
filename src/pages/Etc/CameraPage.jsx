import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Apis from "../../apis/Api"; 

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
  padding: 20px;
`;

// dataURL을 File 객체로 변환하는 함수
const dataURLtoFile = (dataURL, filename) => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  
  return new File([u8arr], filename, { type: mime });
};

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

  const takePicture = async () => {
    console.log("사진 촬영 버튼 클릭 확인"); 
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageUrl = canvas.toDataURL('image/png');
      setCapturedImage(imageUrl);

      // dataURL을 File 객체로 변환
      const file = dataURLtoFile(imageUrl, 'photo.png');

      // API 호출하여 이미지 처리
      try {
        const formData = new FormData();
        formData.append('imageFile', file); 
        
        // 파일 확인
        console.log(formData.get('imageFile'));

        // API 호출 시 토큰을 헤더에 포함
        const response = await Apis.post('/products/image-processing', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // API 응답 데이터 확인
        console.log(response.data.data);

        const { productName, price, amount } = response.data.data;
        
        // ItemInfo 페이지로 상품 정보 전달
        navigate('/iteminfo', { state: { productName, price, amount } });
      } catch (error) {
        console.error("Error processing image: ", error);
      }
    } else {
      console.log("Canvas or video element가 존재하지 않음");
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
