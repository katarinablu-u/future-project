import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";


const DetailWrapper = styled.div`
  display: flex;
  min-height: calc(100vh - 120px); /* 화면 전체 높이 확보 */
`;


const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end; /* 이미지를 중앙선 쪽으로 붙임 */
  padding: 60px 100px;
  border-right: 1px solid #ebebeb; /* 가운데 세로 구분선 */
`;

const ProductImg = styled.img`
  width: 450px;
  height: 450px;
  object-fit: cover;
`;

/* 오른쪽 정보 영역 */
const InfoSection = styled.div`
  flex: 1;
  padding: 60px 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const PriceText = styled.h1`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 10px;
`;

const NameText = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
`;

const ReviewText = styled.p`
  font-size: 13px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export default function ProductDetail({ products, setTargetId }) {
    const { id } = useParams();
    const product = products?.find(item => item.itemid === Number(id));

    useEffect(() => {
        setTargetId(Number(id));
        return () => setTargetId(null);
    }, [id, setTargetId]);

    if (!product) return <div style={{padding: "100px"}}>상품을 찾을 수 없습니다.</div>;

    return (
        <DetailWrapper>
            {/* 왼쪽: 이미지 영역 */}
            <ImageSection>
                <ProductImg src={product.img} alt={product.name} />
            </ImageSection>

            {/* 오른쪽: 상세 정보 영역 */}
            <InfoSection>
                <PriceText>{product.price.toLocaleString()}원</PriceText>
                <NameText>{product.name}</NameText>
                <ReviewText>★ 4.6 <span style={{marginLeft: "5px"}}>리뷰 {product.review.toLocaleString()}</span></ReviewText>
            </InfoSection>
        </DetailWrapper>
    );
}