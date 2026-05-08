import * as S from "./Main.style";

const FilterModal = ({ filter, onClose, FILTER_DATA }) => {
    if (!filter) return null;

    return (
        <S.ModalOverlay onClick={onClose}>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
                <S.ModalHeader>
                    <span>{filter}</span>
                    <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}>✕</button>
                </S.ModalHeader>
                <S.OptionContainer>
                    {FILTER_DATA[filter].map((row, idx) => (
                        idx < 2 && filter === "색상" 
                        ? <S.GridRow key={idx}>
                            {row.map(opt => <S.FilterOption key={opt} onClick={onClose}>{opt}</S.FilterOption>)}
                          </S.GridRow>
                        : <S.FlexRow key={idx}>
                            {row.map(opt => <S.FilterOption key={opt} style={{ width: "auto" }} onClick={onClose}>{opt}</S.FilterOption>)}
                          </S.FlexRow>
                    ))}
                </S.OptionContainer>
            </S.ModalContent>
        </S.ModalOverlay>
    );
};

export default FilterModal;