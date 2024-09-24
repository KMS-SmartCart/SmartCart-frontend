// Modal.jsx
import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  border: solid 1.7px #545353;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 253px;
  height: 98px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => props.confirm ? 'red' : '#e0e0e0'};
  color: ${(props) => props.confirm ? 'white' : '#333'};
  font-weight: bold;
`;

const DeleteUserModal = ({ message, onConfirm, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <p>{message}</p>
        <ModalButtons>
          <ModalButton confirm onClick={onConfirm}>확인</ModalButton>
          <ModalButton onClick={onCancel}>취소</ModalButton>
        </ModalButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DeleteUserModal;
