import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getItems } from "../../api/shop";

const DetailWrapper = styled.div`
  display: flex;
  min-height: calc(100vh - 120px);
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding: 60px 100px;
  border-right: 1px solid #ebebeb;
`;

const ProductImg = styled.img`
  width: 450px;
  height: 450px;
  object-fit: cover;
`;

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

export default function ProductDetail({ setTargetId }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTargetId(id);

    const fetchProduct = async () => {
      try {
        setLoading(true);
        // 서버에서 'clothes' 카테고리 데이터 가져오기
        const res = await getItems("clothes"); 
        const data = res.data || res;

        // URL의 id와 서버 데이터의 id 매칭 (둘 다 문자열로 변환해서 비교)
        const found = data.find((item) => String(item.id) === String(id));
        setProduct(found);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    return () => setTargetId(null);
  }, [id, setTargetId]);

  if (loading) return <div style={{ padding: "100px" }}>로딩 중...</div>;
  if (!product) return <div style={{ padding: "100px" }}>상품을 찾을 수 없습니다.</div>;

  return (
    <DetailWrapper>
      <ImageSection>
        <ProductImg src={product.image} alt={product.name} />
      </ImageSection>
      <InfoSection>
        <PriceText>{Number(product.price).toLocaleString()}원</PriceText>
        <NameText>{product.name}</NameText>
        <ReviewText>
          ★ {product.rating || "4.5"} 
          <span style={{ marginLeft: "5px" }}>리뷰 {product.reviews?.toLocaleString()}</span>
        </ReviewText>
      </InfoSection>
    </DetailWrapper>
  );
}