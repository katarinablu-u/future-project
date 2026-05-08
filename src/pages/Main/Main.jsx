import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Main.style";
import VectorIcon from "../../assets/icons/Vector.png";
import FilterModal from "./FilterModal";

export const FILTER_DATA = {
    "성별": [["남성", "여성", "남녀공용"]],
    "색상": [["red", "pink", "blue"], ["black", "gray", "denim"], ["multi", "rainbow", "holographic"]],
    "사이즈": [["9", "10"], ["S", "M", "L", "XL"]],
    "가격대": [["0~30", "31~60", "60~90"]],
    "종류": [["의류", "신발"]]  
};

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
    </S.TopSection>
);

export default function Main({ products }) { 
    const [activeFilter, setActiveFilter] = useState(null);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("기본 정렬순");
    const navigate = useNavigate();

    if (!products) return <div>로딩 중...</div>;

    return (
        <S.Container>
            <TopActionBar 
                activeFilter={activeFilter} setActiveFilter={setActiveFilter}
                isSortOpen={isSortOpen} setIsSortOpen={setIsSortOpen}
                selectedSort={selectedSort} setSelectedSort={setSelectedSort}
            />

            <FilterModal filter={activeFilter} onClose={() => setActiveFilter(null)} FILTER_DATA={FILTER_DATA} />

            <S.ProductGrid>
                {products.map((item) => (
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