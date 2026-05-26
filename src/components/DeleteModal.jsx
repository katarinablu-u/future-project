import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex; justify-content: center; align-items: center;
  z-index: 10000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const ModalBtnGroup = styled.div`
  margin-top: 25px;
  display: flex; gap: 10px; justify-content: center;
`;

const ModalBtn = styled.button`
  padding: 8px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  background: ${props => props.confirm ? "#eee" : "#ccc"};
`;

// 컴포넌트
const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;/*모달 닫혀있음 암것도 안함*/

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <p style={{ fontWeight: "bold", fontSize: "14px" }}>상품을 삭제하시겠습니까?</p>
        <ModalBtnGroup>
          <ModalBtn confirm onClick={onConfirm}>확인</ModalBtn>
          <ModalBtn onClick={onClose}>취소</ModalBtn>
        </ModalBtnGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DeleteModal;