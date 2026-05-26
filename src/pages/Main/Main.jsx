import { useEffect, useState } from "react";
import { getItems } from "../../api/shop";
import { useNavigate } from "react-router-dom";
import * as S from "./Main.style";

export default function Main() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                const res = await getItems("clothes");
                let data = res.data || res;

                if (!data || data.length === 0) {
                    const res2 = await getItems("shirt");
                    data = res2.data || res2;
                }

                if (Array.isArray(data)) {
                    setItems(data.slice(0, 10));
                }
            } catch (error) {
                console.error("데이터 로드 실패:", error);
                setItems([]);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    if (loading) return <S.Container>로딩 중...</S.Container>;

    return (
        <S.Container>
            <S.ProductGrid>
                {items.length > 0 ? (
                    items.map((item) => (
                        <S.ProductCard key={item.id} onClick={() => navigate(`/product/${item.id}`)}>
                            <S.ImageBox>
                                <img src={item.image} alt={item.name} />
                            </S.ImageBox>
                            <S.ItemName>{item.name}</S.ItemName>
                            <S.Price>{Number(item.price).toLocaleString()}원</S.Price>
                            <S.ReviewCount>리뷰 {item.reviews}</S.ReviewCount>
                        </S.ProductCard>
                    ))
                ) : (
                    <div style={{ padding: "100px", textAlign: "center", width: "100%" }}>
                        상품이 없습니다. /admin-init에서 등록해주세요.
                    </div>
                )}
            </S.ProductGrid>
        </S.Container>
    );
}