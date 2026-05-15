import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Main from "./pages/Main/Main";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import AddProduct from "./pages/AddProduct/AddProduct"; 
import EditProduct from "./pages/EditProduct/EditProduct";
import AdminInit from "./pages/Admin/AdminInit"; // 관리자 초기화 페이지 임포트
import DeleteModal from "./components/DeleteModal";
import { deleteItem } from "./api/shop"; // 삭제 API 임포트

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const navigate = useNavigate(); 

  // [DELETE] 서버 데이터 삭제 연동
  const handleDelete = async () => {
    try {
      // 명세서 규격에 맞춰 "clothes" 카테고리로 삭제 요청
      await deleteItem("clothes", targetId);
      setIsModalOpen(false);
      alert("삭제가 완료되었습니다.");
      
      // 메인으로 이동하면서 페이지 새로고침 효과 (데이터 갱신)
      window.location.href = "/";
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Routes>
        <Route element={<RootLayout openModal={() => setIsModalOpen(true)} targetId={targetId} />}>
          {/* 이제 products={products} 같은 props 전달이 필요 없습니다 (각 페이지가 API 호출) */}
          <Route path="/" element={<Main />} />
          
          <Route 
            path="/product/:id" 
            element={<ProductDetail setTargetId={setTargetId} />} 
          /> 
          
          <Route path="/add" element={<AddProduct />} />
          
          <Route 
            path="/edit/:id" 
            element={<EditProduct />} 
          />
          
          {/* 관리자 전용 데이터 등록 페이지 (비밀 경로) */}
          <Route path="/admin-init" element={<AdminInit />} />
        </Route>
      </Routes>

      <DeleteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleDelete} 
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}