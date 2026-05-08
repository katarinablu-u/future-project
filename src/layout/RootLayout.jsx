import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 30px 50px;
  background-color: #fff;
`;

const Logo = styled.div`
  margin-left: 120px;
  font-size: 24px;
  font-weight: 900;
  font-style: italic;
  letter-spacing: -1.5px;
  cursor: pointer;
  font-family: 'Arial Black', sans-serif;
  line-height: 1;
  color: #000;
  flex-shrink: 0;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  margin-right: 150px;
`;

const NavGroup = styled.div`
  display: flex;
  gap: 15px;
`;

const NavItem = styled.span`
  font-size: 11px;
  color: ${(props) => (props.$active ? "#000" : "#666")};
  font-weight: ${(props) => (props.$active ? "700" : "400")};
  /* 등록 페이지에서만 삭제/수정 버튼을 숨김 */
  display: ${(props) => (props.$hide ? "none" : "block")};
  cursor: pointer;
  &:hover {
    color: #000;
  }
`;

const HomeText = styled.div`
  font-size: 24px;
  font-weight: 400;
  cursor: pointer;
  color: #222;
  line-height: 1;
`;

export default function RootLayout({ openModal, targetId }) {
  const navigate = useNavigate(); // 이제 에러 없이 정상 작동합니다.
  const location = useLocation();

  const isAddPage = location.pathname === "/add";
  const isEditPage = location.pathname.includes("/edit");

  return (
    <>
      <HeaderContainer>
        <Logo onClick={() => navigate("/")}>KREAM</Logo>
        <RightSection>
          <NavGroup>
            {/* 상품등록 버튼 */}
            <NavItem $active={isAddPage} onClick={() => navigate("/add")}>
              상품등록
            </NavItem>

            {/* 상품삭제 버튼: 등록 페이지에서만 숨김*/}
            <NavItem
              $hide={isAddPage}
              onClick={() => (targetId ? openModal() : alert("상품을 선택해주세요."))}
            >
              상품삭제
            </NavItem>

            {/* 상품수정 버튼: 등록 페이지에서만 숨김*/}
            <NavItem
              $active={isEditPage}
              $hide={isAddPage}
              onClick={() =>
                targetId
                  ? navigate(`/edit/${targetId}`)
                  : alert("수정할 상품을 선택해주세요.")
              }
            >
              상품수정
            </NavItem>
          </NavGroup>
          <HomeText onClick={() => navigate("/")}>HOME</HomeText>
        </RightSection>
      </HeaderContainer>
      <main>
        <Outlet />
      </main>
    </>
  );
}