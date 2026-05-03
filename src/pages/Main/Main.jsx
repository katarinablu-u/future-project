import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productData } from "./productDummy.js";
import * as S from "./Main.style";
import VectorIcon from "../../assets/icons/Vector.png";
import FilterModal from "./FilterModal"; // 1. 새로 만든 모달 불러오기

export const FILTER_DATA = {
    "성별": [["남성", "여성", "남녀공용"]],
    "색상": [["red", "pink", "blue"], ["black", "gray", "denim"], ["multi", "rainbow", "holographic"]],
    "사이즈": [["9", "10"], ["S", "M", "L", "XL"]],
    "가격대": [["0~30", "31~60", "60~90"]],
    "종류": [["의류", "신발"]]  
};

// TopActionBar 부분
const TopActionBar = ({ activeFilter, setActiveFilter, isSortOpen, setIsSortOpen, selectedSort, setSelectedSort }) => (
    <S.TopSection>
        <S.FilterBar>
            {Object.keys(FILTER_DATA).map((f) => (
                <S.FilterButton key={f} onClick={() => setActiveFilter(f)}>
                    {f}
                    <img src={VectorIcon} alt="v" style={{ marginLeft: "8px", width: "10px" }} />
                </S.FilterButton>
            ))}
        </S.FilterBar>
        {/* ... 정렬 바 코드는 동일 ... */}
    </S.TopSection>
);

export default function Main() {
    const [activeFilter, setActiveFilter] = useState(null);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("기본 정렬순");
    const navigate = useNavigate();

    return (
        <S.Container>
            <TopActionBar 
                activeFilter={activeFilter} setActiveFilter={setActiveFilter}
                isSortOpen={isSortOpen} setIsSortOpen={setIsSortOpen}
                selectedSort={selectedSort} setSelectedSort={setSelectedSort}
            />

            {/* 분리된 모달 사용(FILTER_DATA를 꼭 넘겨줘야 함) */}
            <FilterModal 
                filter={activeFilter} 
                onClose={() => setActiveFilter(null)} 
                FILTER_DATA={FILTER_DATA} 
            />

            <S.ProductGrid>
                {productData.map((item) => (
                    <S.ProductCard key={item.itemid} onClick={() => navigate(`/product/${item.itemid}`)}>
                        <S.ImageBox><img src={item.img} alt={item.name} /></S.ImageBox>
                        <S.ItemName>{item.name}</S.ItemName>
                        <S.Price>{item.price.toLocaleString()}원</S.Price>
                        <S.ReviewCount>리뷰 {item.review}</S.ReviewCount>
                    </S.ProductCard>
                ))}
            </S.ProductGrid>
        </S.Container>
    );
}