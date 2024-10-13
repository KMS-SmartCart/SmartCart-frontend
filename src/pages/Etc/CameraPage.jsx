import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Apis from "../../apis/Api"; 
import { BsArrowLeftShort } from "react-icons/bs";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
  min-height: 100vh;
  background-color: white;
  position: relative; 
  padding-bottom: 100px;
  box-sizing: border-box;
  width: 100%;
  max-width: 390px;
  margin: 0 auto;

  @media (max-width: 375px) {
    padding: 12px;
  }

  @media (max-width: 360px) {
    padding: 10px;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
`;

const Video = styled.video`
  width: 100%;
  height: auto;
  max-width: 350px;
  border-radius: 8px;
  margin-bottom: 20px;

  @media (max-width: 390px) {
    width: 75%;
  }

  @media (max-width: 360px) {
    width: 70%;
  }
`;

const Button = styled.button`
  width: 70%;
  max-width: 300px;
  padding: 10px;
  background-color: ${(props) => (props.disabled ? "#C7CCDF" : "#5271FF")};
  color: ${(props) => (props.disabled ? "black" : "white")};
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: #c7ccdf;
    color: black;
  }

  @media (max-width: 390px) {
    font-size: 15px;
    padding: 8px;
  }

  @media (max-width: 360px) {
    font-size: 14px;
    padding: 7px;
  }
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const stopCameraStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            aspectRatio: { ideal: 4 / 3 },
          },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera: ", error);
      }
    };

    getCameraStream();

    return () => {
      stopCameraStream();
    };
  }, []);

  const takePicture = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageUrl = canvas.toDataURL('image/png');
      const file = dataURLtoFile(imageUrl, 'photo.png');

      try {
        const formData = new FormData();
        formData.append('imageFile', file);

        stopCameraStream();
        setLoading(true);

        const response = await Apis.post('/products/image-processing', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const { productName, price, amount } = response.data.data;

        navigate('/iteminfo', { state: { imageUrl, productName, price, amount } });
      } catch (error) {
        console.error("Error processing image: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    stopCameraStream();
    navigate(-1);
  };

  return (
    <Container>
      <TopBar>
        <BackButton onClick={handleBack}>
          <BsArrowLeftShort />
        </BackButton>
      </TopBar>
      <h3>가격표를 찍어주세요 😊</h3>
      <Video ref={videoRef} autoPlay playsInline muted />
      <Button onClick={takePicture} disabled={loading}>
        {loading ? "로딩 중..." : "사진 촬영"}
      </Button>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Container>
  );
};

export default CameraPage;