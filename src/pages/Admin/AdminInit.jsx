import React from "react";
import { productData } from "../Main/productDummy"; 
import { addItem, getItems, deleteItem } from "../../api/shop";
import { useNavigate } from "react-router-dom";

export default function AdminInit() {
    const navigate = useNavigate();

    const handleClearAllZombies = async () => {
        if (!window.confirm("서버(clothes)에 쌓인 중복 데이터를 삭제할까요?")) return;
        
        try {
            console.log("데이터 확인 중 (clothes)...");
            const res = await getItems("clothes");
            const allItems = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);

            if (allItems.length === 0) {
                alert("삭제할 데이터가 없습니다.");
                return;
            }

            console.log(`총 ${allItems.length}개의 데이터 발견. 삭제 시작...`);

            // 루프 돌면서 하나씩 삭제
            for (const item of allItems) {
                // item.id가 서버 DB의 고유 ID인지 확인하며 삭제
                await deleteItem("clothes", item.id);
            }
            
            alert("✅ 데이터 정리 성공!");
            window.location.reload();
        } catch (error) {
            console.error("삭제 실패 상세:", error);
            alert("❌ 삭제 실패!");
        }
    };

    const handleFreshStart = async () => {
        if (!window.confirm("깨끗해진 서버에 새 상품 10개만 등록할까요?")) return;
        try {
            for (const item of productData) {
                await addItem("clothes", {
                    ...item,
                    soldout: false,
                    type: "clothes"
                });
            }
            alert("✅ 10개 등록 완료!");
            navigate("/");
        } catch (e) {
            alert("등록 실패!");
        }
    };

    return (
        <div style={{ padding: "100px", textAlign: "center" }}>
            <h1>데이터 관리</h1>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "30px" }}>
                <button 
                    onClick={handleClearAllZombies} 
                    style={{ padding: "20px", backgroundColor: "#ff4d4d", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer" }}
                >
                    데이터 모두 삭제
                </button>
                <button 
                    onClick={handleFreshStart} 
                    style={{ padding: "20px", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer" }}
                >
                    새 상품 10개 등록
                </button>
            </div>
        </div>
    );
}