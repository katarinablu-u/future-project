import { useParams } from "react-router-dom"

export default function ProductDetail(){
    const {id} = useParams();
    return(
        <h1>상품 조회하기 페이지 {id} </h1>
    )
}