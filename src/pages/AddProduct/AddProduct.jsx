import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import uploadIconImg from "../../assets/icons/uploadicon.png";

// 전체 배경 및 중앙 정렬
const AddContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  background-color: #fff;
  padding: 40px 0;
`;

// 좌우 섹션을 묶어주는 래퍼
const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1300px; /* 전체 가용 범위를 늘림 */
  gap: 120px; /* 좌측 이미지와 우측 폼 사이의 간격 */
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 40px; 
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  border-left: 1px solid #f0f0f0;
  padding-left: 120px; 
`;

// 이미지 업로드 박스이름 통)
const ImageUploadBox = styled.label`
  width: 450px;
  height: 550px;
  border: 1px solid #eee;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  .preview {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .upload-text {
    position: absolute;
    bottom: 40px;
    font-size: 13px;
    color: #eb5757;
    font-weight: 500;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

// 상품 정보 입력 폼 박스
const FormBox = styled.div`
  width: 350px;
  padding: 30px;
  border: 1px solid #eee;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 15px;

  h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    text-align: center;
    font-weight: 700;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 12px;
    color: #888;
    font-weight: 600;
  }

  input {
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    transition: border 0.2s;
    &:focus {
      border-color: #000;
    }
  }
`;

const LabelText = styled.div`
  font-size: 12px;
  color: #888;
  font-weight: 600;
  margin-top: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const ColorButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
`;

const OptionBtn = styled.button`
  flex: 1;
  padding: 8px;
  font-size: 11px;
  border-radius: 6px;
  border: 1px solid #ffffff;
  background: ${(props) => (props.$selected ? "#e0e0e0" : "#f9f9f9")};
  color: ${(props) => (props.$selected ? "#272727" : "#272727")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.$selected ? "#797777" : "#f0f0f0")};
  }
`;

const SubmitBtn = styled.button`
  margin-top: 10px;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #eee;
  color: #666;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #e2e2e2;
  }
`;

const GENDERS = ["남성", "여성", "남녀공용"];
const COLORS = ["red", "pink", "blue", "gray", "black", "denim", "multi", "rainbow", "holographic"];

export default function AddProduct({ setProducts }) {
  const [category, setCategory] = useState("신발");
  const [gender, setGender] = useState("남녀공용");
  const [selectedColor, setSelectedColor] = useState("black");
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;

    if (!imagePreview || !productName || !productPrice) {
      alert("이미지, 상품명, 가격은 필수입니다.");
      return;
    }

    const newProduct = {
      itemid: Date.now(),
      name: productName,
      price: Number(productPrice) || 0,
      img: imagePreview,
      review: document.getElementById("productReviews").value || "0",
      rating: document.getElementById("productRating").value || "0.0",
      size: document.getElementById("productSize").value,
      category,
      gender,
      color: selectedColor,
    };

    setProducts((prev) => [newProduct, ...prev]);
    alert("상품 등록이 완료되었습니다.");
    navigate("/");
  };

  return (
    <AddContainer>
      <ContentWrapper>
        {/* 왼쪽 섹션: 이미지 업로드 */}
        <LeftSection>
          <ImageUploadBox htmlFor="productImage">
            {imagePreview ? (
              <img src={imagePreview} alt="미리보기" className="preview" />
            ) : (
              <img src={uploadIconImg} alt="upload icon" style={{ width: "60px", opacity: 0.2 }} />
            )}
          </ImageUploadBox>
          <HiddenFileInput id="productImage" type="file" accept="image/*" onChange={handleImageChange} />
        </LeftSection>

        {/* 오른쪽 섹션: 정보 입력 폼 */}
        <RightSection>
          <FormBox>
            <h2>상품 정보 등록</h2>

            <InputGroup>
              <label>상품명</label>
              <input type="text" id="productName" placeholder="상품명을 입력하세요" />
            </InputGroup>

            <InputGroup>
              <label>평점</label>
              <input type="text" id="productRating" placeholder="4.5" />
            </InputGroup>

            <InputGroup>
              <label>리뷰수</label>
              <input type="text" id="productReviews" placeholder="1,235" />
            </InputGroup>

            <InputGroup>
              <label>가격</label>
              <input type="number" id="productPrice" placeholder="39" />
            </InputGroup>

            <InputGroup>
              <label>사이즈</label>
              <input type="text" id="productSize" placeholder="9" />
            </InputGroup>

            <LabelText>종류</LabelText>
            <ButtonGroup>
              <OptionBtn type="button" $selected={category === "의류"} onClick={() => setCategory("의류")}>의류</OptionBtn>
              <OptionBtn type="button" $selected={category === "신발"} onClick={() => setCategory("신발")}>신발</OptionBtn>
            </ButtonGroup>

            <LabelText>성별</LabelText>
            <ButtonGroup>
              {GENDERS.map((g) => (
                <OptionBtn key={g} type="button" $selected={gender === g} onClick={() => setGender(g)}>
                  {g}
                </OptionBtn>
              ))}
            </ButtonGroup>

            <LabelText>색상</LabelText>
            <ColorButtonGroup>
              {COLORS.map((c) => (
                <OptionBtn key={c} type="button" $selected={selectedColor === c} onClick={() => setSelectedColor(c)}>
                  {c}
                </OptionBtn>
              ))}
            </ColorButtonGroup>

            <SubmitBtn type="button" onClick={handleSubmit}>
              상품 등록 완료
            </SubmitBtn>
          </FormBox>
        </RightSection>
      </ContentWrapper>
    </AddContainer>
  );
}