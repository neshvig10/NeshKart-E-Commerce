import {React, useEffect, useState} from "react"
import SideBar from "./SideBar";
import SearchBar from "./SearchBar";
import Product from "./Product";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


const Products = ()=> {

    const [products,setProducts] = useState([]);
    const {login,user} = useAuth();
    const navigate = useNavigate();



    async function addToCart(productId) {
        if (user){
        var cartItem={
            jwtToken : localStorage.getItem("jwtToken"),
            productId : productId
        }
        const response = await axios.post('http://localhost:8080/api/addToCart',cartItem);
        }
        else{
            navigate("/login");

        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                setProducts(response.data);
            } catch (err) {
                console.error(err);
            } 
        };

        fetchProducts();
    }, []);
    return (
    <>   
        <div className="flex items-center min-h-screen">
            <div className="w-1/6 min-h-screen">
                <SideBar></SideBar>
            </div>
            <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mx-10 items-start gap-6">
                {products.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 shadow-lg self-start">
                    <img src={product.image} alt={product.productName} className="w-full h-48 object-cover mb-4" />
                    <h2 className="text-xl font-semibold">{product.productName}</h2>
                    <p className="text-gray-500">Rs. {product.productPrice}</p>
                    <div className="flex gap-2">
                                    <button onClick={(e)=> {addToCart(product.productId)}} className="flex-1 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 ">Add to Cart</button>
                                    <button className="flex-1 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 ">Buy Now</button>
                </div>
            </div>
        ))}
      </div>

            </div>
        </div>

    </>
    )
};

export default Products;