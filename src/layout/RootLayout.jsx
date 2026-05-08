import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";


const HeaderContainer = styled.header`
  display: flex; justify-content: space-between; align-items: flex-start; padding: 30px 50px; background-color: #fff;
`;
const Logo = styled.div`
  margin-left: 120px; font-size: 24px; font-weight: 900; font-style: italic; letter-spacing: -1.5px; cursor: pointer; font-family: 'Arial Black', sans-serif; line-height: 1; color: #000; flex-shrink: 0;
`;
const RightSection = styled.div`
  display: flex; flex-direction: column; align-items: flex-end; gap: 20px; margin-right: 150px; 
`;
const NavGroup = styled.div` display: flex; gap: 15px; `;
const NavItem = styled.span`
  font-size: 11px; color: ${(props) => (props.$active ? "#000" : "#666")}; font-weight: ${(props) => (props.$active ? "700" : "400")}; display: ${(props) => (props.$hide ? "none" : "block")}; cursor: pointer; &:hover { color: #000; }
`;
const HomeText = styled.div`
  font-size: 24px; font-weight: 400; cursor: pointer; color: #222; line-height: 1;
`;

export default function RootLayout({ openModal, targetId }) { // App에서 targetId를 넘겨받음
  const navigate = useNavigate();
  const location = useLocation();

  const isAddPage = location.pathname === "/add";
  /*수정 페이지에서 수정 버튼같은걸 가리기 위해 추가*/
  const isEditPage = location.pathname.includes("/edit");

  return (
    <>
      <HeaderContainer>
        <Logo onClick={() => navigate("/")}>KREAM</Logo>
        <RightSection>
          <NavGroup>
            <NavItem $active={isAddPage} onClick={() => navigate("/add")}>
              상품등록
            </NavItem>
            <NavItem
              $hide={isAddPage || isEditPage}
              onClick={() => targetId ? openModal() : alert("상품을 선택해주세요.")}
            >
              상품삭제
            </NavItem>
            {/* targetId가 있을 때 해당 ID의 수정 페이지로 이동함 */}
            <NavItem 
              $hide={isAddPage || isEditPage}
              onClick={() => targetId ? navigate(`/edit/${targetId}`) : alert("수정할 상품을 선택해주세요.")}
            >
              상품수정
            </NavItem>
          </NavGroup>
          <HomeText onClick={() => navigate("/")}>HOME</HomeText>
        </RightSection>
      </HeaderContainer>
      <main><Outlet /></main>
    </>
  );
}