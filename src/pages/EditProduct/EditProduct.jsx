import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";


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
  background: #eee;
  color: #666;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #e2e2e2; }
`;

const GENDERS = ["남성", "여성", "남녀공용"];
const COLORS = ["red", "pink", "blue", "gray", "black", "denim", "multi", "rainbow", "holographic"];

// --- 메인 컴포넌트 ---
export default function EditProduct({ products, setProducts }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // 기존 정보를 담을 State
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // 데이터 로드: products 배열에서 id가 일치하는 상품 찾기
  useEffect(() => {
    const target = products.find((p) => String(p.itemid) === String(id));
    if (target) {
      setName(target.name);
      setRating(target.rating);
      setReviews(target.review);
      setPrice(target.price);
      setSize(target.size);
      setCategory(target.category);
      setGender(target.gender);
      setSelectedColor(target.color);
      setImagePreview(target.img);
    }
  }, [id, products]);

  const handleUpdate = () => {
    const updatedProduct = {
      itemid: Number(id),
      name,
      price: Number(price),
      img: imagePreview,
      review: reviews,
      rating,
      size,
      category,
      gender,
      color: selectedColor,
    };

    setProducts(products.map((p) => (String(p.itemid) === String(id) ? updatedProduct : p)));
    alert("수정이 완료되었습니다.");
    navigate("/"); 
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
          </FormBox>
        </RightSection>
      </ContentWrapper>
    </AddContainer>
  );
}   