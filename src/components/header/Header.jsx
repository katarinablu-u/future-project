import styled from "styled-components";
import logoUrl from "../../assets/images/kream_image.png"
import homeUrl from "../../assets/icons/home_icon.png"
import {useLocation, useNavigate} from "react-router-dom";


export default function Header(){

    const {pathname} = useLocation(); // 현재 페이지 경로 불러오기
    const navigate = useNavigate();
    const buttonName = "상품등록";

    return(
        <div>
            <HeaderContainer>
                <LogoImage src={logoUrl} onClick={() => navigate("/")}/>
                <HeaderRight>
                    {pathname === "/" && (
                        <Button onClick={()=>navigate("/add")}>{buttonName}</Button>
                    )}
                    <HomeIcon src={homeUrl}/>
                </HeaderRight>
            </HeaderContainer>
        </div>
    );      
}
