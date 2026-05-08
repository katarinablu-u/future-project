import styled from "styled-components";
import Button from "../../components/common/button/Button";



export const Container = styled.div`
    position: relative;
    width: 100%;
`;

// 상단 바
export const TopSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 160px;
    margin-top: 20px;
`;

export const FilterBar = styled.div` 
    display: flex; gap: 12px;
`;

export const FilterButton = styled(Button)`
    background-color: #f4f4f4; border-radius: 20px; padding: 10px 16px;
    font-size: 14px; color: #000; display: flex; align-items: center; border: none; cursor: pointer;
`;

// 정렬 버튼 영역
export const SortWrapper = styled.div`
    position: relative;
`;

export const SortButton = styled.button`
    background: none; border: none; cursor: pointer;
    font-size: 13px; color: #666;
    display: flex; align-items: center; gap: 4px;
`;

export const SortDropdown = styled.div`
    position: absolute; top: 25px; right: 0;
    background: white; border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    padding: 15px; width: 130px; z-index: 1000;
    display: flex; flex-direction: column; gap: 12px;
`;

export const SortOption = styled.div`
    font-size: 14px; color: ${props => props.active ? "#000" : "#BCBCBC"};
    font-weight: ${props => props.active ? "bold" : "normal"};
    cursor: pointer; display: flex; justify-content: space-between; align-items: center;
    &:hover { color: #000; }
`;

// 모달 스타일
export const ModalOverlay = styled.div`
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 9999;
`;

export const ModalContent = styled.div`
    background: white; padding: 30px; border-radius: 20px;
    width: fit-content; min-width: 296px; position: relative;
`;

export const ModalHeader = styled.div`
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 25px; font-size: 16px; font-weight: bold; padding: 0 10px;
`;

export const OptionContainer = styled.div`
    display: flex; flex-direction: column; gap: 12px;
`;

export const GridRow = styled.div`
    display: grid; grid-template-columns: repeat(3, 65px); gap: 8px; justify-content: flex-start;
`;

export const FlexRow = styled.div`
    display: flex; justify-content: flex-start; gap: 10px;
`;

export const FilterOption = styled.button`
    width: 100%; padding: 7px 15px; border-radius: 20px;
    background: #f8f8f8; font-size: 13px; color: #6C6C6C;
    border: none; cursor: pointer; white-space: nowrap; text-align: center;
    &:hover { background: #ededed; }
`;

// 상품 리스트 스타일
export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 40px 15px; 
  padding: 20px 160px 40px;
  width: 100%;
`;

export const ProductCard = styled.div`
  display: flex; flex-direction: column; cursor: pointer;
`;

export const ImageBox = styled.div`
  width: 181px; height: 237px;
  aspect-ratio: 3 / 4; background-color: #ffffff;
  border-radius: 8px; overflow: hidden; margin-bottom: 12px;
  img { width: 100%; height: 100%; object-fit: cover; }
`;

export const ItemName = styled.span` 
    font-size: 11px; color: #555; margin-bottom: 5px; 
    width: 181px; line-height: 1.4;
`;

export const Price = styled.span` 
    font-size: 12px; font-weight: bold; color: #000; 
    width: 181px; margin-bottom: 4px;
`;

export const ReviewCount = styled.span`
    font-size: 11px; color: #A0A0A0;
    width: 181px; height: 13px;
`;