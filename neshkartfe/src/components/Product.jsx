import {React} from "react"

const Product = (props)=> {
    <>
        <div className="border-blue-400 border-2">
            <img src="" alt=""/>
            <h3>{props.productname}</h3>
            <p>{props.price}</p>
            <p>{props.description}</p>
            <button>Add To Cart</button>


        </div>
        
    </>
};

export default Product;