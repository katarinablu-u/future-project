import { useState } from "react";
import RootLayout from "./layout/RootLayout";
import Main from "./pages/Main/Main";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import AddProduct from "./pages/AddProduct/AddProduct"; 
import EditProduct from "./pages/EditProduct/EditProduct"; // 1. 수정 페이지 임포트
import DeleteModal from "./components/DeleteModal";
import { productData } from "./pages/Main/productDummy";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function AppContent() {
  const [products, setProducts] = useState(productData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const navigate = useNavigate(); 

  const handleDelete = () => {
    const updatedProducts = products.filter(p => Number(p.itemid) !== Number(targetId));
    setProducts(updatedProducts);
    setIsModalOpen(false);
    navigate("/"); 
  };

  return (
    <>
      <Routes>
        <Route element={<RootLayout openModal={() => setIsModalOpen(true)} targetId={targetId} />}>
          <Route path="/" element={<Main products={products} />} />
          <Route 
            path="/product/:id" 
            element={<ProductDetail products={products} setTargetId={setTargetId} />} 
          /> 
          <Route path="/add" element={<AddProduct setProducts={setProducts} />} />
          {/* 2. 수정 페이지 라우트 추가 (기존 스타일 유지 위해 제품 데이터 전달) */}
          <Route 
            path="/edit/:id" 
            element={<EditProduct products={products} setProducts={setProducts} />} 
          />
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