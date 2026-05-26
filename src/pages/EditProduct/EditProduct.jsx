import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
// API 연동을 위해 추가
import { getItemDetail, updateItem, deleteItem } from "../../api/shop";

// --- 스타일 컴포넌트 (절대 수정 금지 - 그대로 유지) ---
const AddContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  background-color: #fff;
  padding: 40px 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1300px;
  gap: 120px;
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

const ImageUploadBox = styled.label`
  width: 450px;
  height: 550px;
  border: 1px solid #eee;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;

  .preview {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

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
    &:focus { border-color: #000; }
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
  color: #272727;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: ${(props) => (props.$selected ? "#d0d0d0" : "#f0f0f0")}; }
`;

const SubmitBtn = styled.button`
  margin-top: 10px;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: ${(props) => (props.$isDelete ? "#ff4d4d" : "#eee")};
  color: ${(props) => (props.$isDelete ? "#fff" : "#666")};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: ${(props) => (props.$isDelete ? "#e60000" : "#e2e2e2")}; }
`;

const GENDERS = ["남성", "여성", "남녀공용"];
const COLORS = ["red", "pink", "blue", "gray", "black", "denim", "multi", "rainbow", "holographic"];


export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // 1. [GET] 데이터 로드: 서버에서 해당 id 상품 가져오기
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getItemDetail("clothes", id);
        if (data) {
          setName(data.name);
          setRating(data.rating);
          setReviews(data.reviews || data.review);
          setPrice(data.price);
          setSize(data.size);
          setCategory(data.category || "의류");
          setGender(data.gender === "male" ? "남성" : data.gender === "female" ? "여성" : "남녀공용");
          setSelectedColor(data.color);
          setImagePreview(data.image || data.img);
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };
    fetchProduct();
  }, [id]);

  // 2. [PUT] 수정 처리: API 명세서 고정값 포함
  const handleUpdate = async () => {
    const updatedProduct = {
      image: imagePreview,
      name: name,
      rating: Number(rating),
      reviews: Number(reviews),
      price: Number(price),
      soldout: false, // 명세서 고정값
      color: selectedColor,
      size: size,
      gender: gender === "남성" ? "male" : gender === "여성" ? "female" : "unisex",
      type: "shirt",  // 명세서 고정값
    };

    try {
      await updateItem("clothes", id, updatedProduct);
      alert("수정이 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정 처리 중 에러가 발생했습니다.");
    }
  };

  // 3. [DELETE] 삭제 처리
  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteItem("clothes", id);
        alert("삭제되었습니다.");
        navigate("/");
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제 중 에러가 발생했습니다.");
      }
    }
  };

  return (
    <AddContainer>
      <ContentWrapper>
        <LeftSection>
          <ImageUploadBox>
            {imagePreview && <img src={imagePreview} alt="미리보기" className="preview" />}
          </ImageUploadBox>
        </LeftSection>

        <RightSection>
          <FormBox>
            <h2>상품 정보 수정</h2>
            
            <InputGroup>
              <label>상품명</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </InputGroup>

            <InputGroup>
              <label>평점</label>
              <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
            </InputGroup>

            <InputGroup>
              <label>리뷰수</label>
              <input type="text" value={reviews} onChange={(e) => setReviews(e.target.value)} />
            </InputGroup>

            <InputGroup>
              <label>가격</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </InputGroup>

            <InputGroup>
              <label>사이즈</label>
              <input type="text" value={size} onChange={(e) => setSize(e.target.value)} />
            </InputGroup>

            <LabelText>종류</LabelText>
            <ButtonGroup>
              <OptionBtn type="button" $selected={category === "의류"} onClick={() => setCategory("의류")}>의류</OptionBtn>
              <OptionBtn type="button" $selected={category === "신발"} onClick={() => setCategory("신발")}>신발</OptionBtn>
            </ButtonGroup>

            <LabelText>성별</LabelText>
            <ButtonGroup>
              {GENDERS.map((g) => (
                <OptionBtn key={g} type="button" $selected={gender === g} onClick={() => setGender(g)}>{g}</OptionBtn>
              ))}
            </ButtonGroup>

            <LabelText>색상</LabelText>
            <ColorButtonGroup>
              {COLORS.map((c) => (
                <OptionBtn key={c} type="button" $selected={selectedColor === c} onClick={() => setSelectedColor(c)}>{c}</OptionBtn>
              ))}
            </ColorButtonGroup>

            <SubmitBtn type="button" onClick={handleUpdate}>상품 수정 완료</SubmitBtn>
            <SubmitBtn type="button" $isDelete onClick={handleDelete}>상품 삭제</SubmitBtn>
          </FormBox>
        </RightSection>
      </ContentWrapper>
    </AddContainer>
  );
}