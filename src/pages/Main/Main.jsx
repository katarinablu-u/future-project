import { useState } from "react";
import styled from "styled-components";
import VectorIcon from "../../assets/icons/Vector.png";
import Button from "../../components/common/button/Button";
import iabWhiteGray from "../../assets/images/iabwhitegray.png";
import iabLightBlue from "../../assets/images/iablightblue.png";
import adidasBlack from "../../assets/images/adidasblack.png";
import supreme from "../../assets/images/supremehoody.png";
import nikeAir from "../../assets/images/nikeair.png";

// --- 스타일 컴포넌트 ---
const Container = styled.div`
    position: relative;
    width: 100%;
`;

// 상단 바
const TopSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 160px;
    margin-top: 20px;
`;

const FilterBar = styled.div` 
    display: flex; gap: 12px;
`;

const FilterButton = styled(Button)`
    background-color: #f4f4f4; border-radius: 20px; padding: 10px 16px;
    font-size: 14px; color: #000; display: flex; align-items: center; border: none; cursor: pointer;
`;

// 정렬 버튼 영역
const SortWrapper = styled.div`
    position: relative;
`;

const SortButton = styled.button`
    background: none; border: none; cursor: pointer;
    font-size: 13px; color: #666;
    display: flex; align-items: center; gap: 4px;
`;

const SortDropdown = styled.div`
    position: absolute; top: 25px; right: 0;
    background: white; border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    padding: 15px; width: 130px; z-index: 1000;
    display: flex; flex-direction: column; gap: 12px;
`;

const SortOption = styled.div`
    font-size: 14px; color: ${props => props.active ? "#000" : "#BCBCBC"};
    font-weight: ${props => props.active ? "bold" : "normal"};
    cursor: pointer; display: flex; justify-content: space-between; align-items: center;
    &:hover { color: #000; }
`;

// 모달 스타일
const ModalOverlay = styled.div`
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 9999;
`;

const ModalContent = styled.div`
    background: white; padding: 30px; border-radius: 20px;
    width: fit-content; min-width: 296px; position: relative;
`;

const ModalHeader = styled.div`
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 25px; font-size: 16px; font-weight: bold; padding: 0 10px;
`;

const OptionContainer = styled.div`
    display: flex; flex-direction: column; gap: 12px;
`;

const GridRow = styled.div`
    display: grid; grid-template-columns: repeat(3, 65px); gap: 8px; justify-content: flex-start;
`;

const FlexRow = styled.div`
    display: flex; justify-content: flex-start; gap: 10px;
`;

const FilterOption = styled.button`
    width: 100%; padding: 7px 15px; border-radius: 20px;
    background: #f8f8f8; font-size: 13px; color: #6C6C6C;
    border: none; cursor: pointer; white-space: nowrap; text-align: center;
    &:hover { background: #ededed; }
`;

// 상품 리스트 스타일
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 40px 15px; 
  padding: 20px 160px 40px;
  width: 100%;
`;

const ProductCard = styled.div`
  display: flex; flex-direction: column; cursor: pointer;
`;

const ImageBox = styled.div`
  width: 181px; height: 237px;
  aspect-ratio: 3 / 4; background-color: #ffffff;
  border-radius: 8px; overflow: hidden; margin-bottom: 12px;
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const ItemName = styled.span` 
    font-size: 11px; color: #555; margin-bottom: 5px; 
    width: 181px; line-height: 1.4;
`;

const Price = styled.span` 
    font-size: 12px; font-weight: bold; color: #000; 
    width: 181px; margin-bottom: 4px;
`;

const ReviewCount = styled.span`
    font-size: 11px; color: #A0A0A0;
    width: 181px; height: 13px;
`;

//데이터 설정

const FILTER_DATA = {
    "성별": [["남성", "여성", "남녀공용"]],
    "색상": [["red", "pink", "blue"], ["black", "gray", "denim"], ["multi", "rainbow", "holographic"]],
    "사이즈": [["9", "10"], ["S", "M", "L", "XL"]],
    "가격대": [["0~30", "31~60", "60~90"]],
    "종류": [["의류", "신발"]]  
};

const SINGLE_LINE_DATA = [
    { id: 1, name: "아이앱 스튜디오 25 후드 라이트 그레이", price: "145,000", review: "1,561", img: iabWhiteGray },
    { id: 2, name: "아이앱 스튜디오 25 후드 라이트 블루", price: "145,000", review: "1,732", img: iabLightBlue },
    { id: 3, name: "아디다스 블랙 져지 2016", price: "255,000", review: "781", img: adidasBlack },
    { id: 4, name: "슈프림 후드집업 30 딥블루", price: "458,000", review: "2,567", img: supreme },
    { id: 5, name: "나이키 에어 그레이 하운드 25", price: "235,000", review: "231", img: nikeAir }
];

const PRODUCT_DATA = [...SINGLE_LINE_DATA, ...SINGLE_LINE_DATA.map(item => ({...item, id: item.id + 5}))];

export default function Main() {
    const [activeFilter, setActiveFilter] = useState(null);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("기본 정렬순");

    return (
        <Container>
            <TopSection>
                <FilterBar>
                    {Object.keys(FILTER_DATA).map((f) => (
                        <FilterButton key={f} buttonName={f} onClick={() => setActiveFilter(f)}>
                            <img src={VectorIcon} alt="v" style={{ marginLeft: "8px", width: "10px" }} />
                        </FilterButton>
                    ))}
                </FilterBar>

                {/* 정렬순 버튼 */}
                <SortWrapper>
                    <SortButton onClick={() => setIsSortOpen(!isSortOpen)}>
                        정렬순 ↓↑
                    </SortButton>
                    {isSortOpen && (
                        <SortDropdown>
                            {["기본 정렬순", "평점 높은순", "리뷰 많은순"].map(option => (
                                <SortOption 
                                    key={option} 
                                    active={selectedSort === option}
                                    onClick={() => {
                                        setSelectedSort(option);
                                        setIsSortOpen(false);
                                    }}
                                >
                                    {option}
                                    {selectedSort === option && <span>✓</span>}
                                </SortOption>
                            ))}
                        </SortDropdown>
                    )}
                </SortWrapper>
            </TopSection>

            {/* 필터 모달 */}
            {activeFilter && (
                <ModalOverlay onClick={() => setActiveFilter(null)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <span>{activeFilter}</span>
                            <button onClick={() => setActiveFilter(null)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}>✕</button>
                        </ModalHeader>
                        <OptionContainer>
                            {FILTER_DATA[activeFilter].map((row, idx) => {
                                if (idx < 2 && activeFilter === "색상") {
                                    return (
                                        <GridRow key={idx}>
                                            {row.map((opt) => (<FilterOption key={opt} onClick={() => setActiveFilter(null)}>{opt}</FilterOption>))}
                                        </GridRow>
                                    );
                                }
                                return (
                                    <FlexRow key={idx}>
                                        {row.map((opt) => (<FilterOption key={opt} style={{ width: "auto" }} onClick={() => setActiveFilter(null)}>{opt}</FilterOption>))}
                                    </FlexRow>
                                );
                            })}
                        </OptionContainer>
                    </ModalContent>
                </ModalOverlay>
            )}

            <ProductGrid>
                {PRODUCT_DATA.map((item) => (
                    <ProductCard key={item.id}>
                        <ImageBox><img src={item.img} alt={item.name} /></ImageBox>
                        <ItemName>{item.name}</ItemName>
                        <Price>{item.price}원</Price>
                        <ReviewCount>리뷰 {item.review}</ReviewCount>
                    </ProductCard>
                ))}
            </ProductGrid>
        </Container>
    );
}