import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [quantity,setQuantity] = useState(0);

    async function addToCart(productId) {
        if (user) {
            const cartItem = {
                jwtToken: localStorage.getItem("jwtToken"),
                productId: productId
            };
            setQuantity(quantity+1);
            await axios.post('http://localhost:8080/api/addToCart', cartItem);
        } else {
            navigate("/login");
        }
    }

    async function removeFromCart(productId) {
        if (user) {
            const cartItem = {
                jwtToken: localStorage.getItem("jwtToken"),
                productId: productId
            };
            setQuantity(quantity-1);
            await axios.post('http://localhost:8080/api/removeFromCart', cartItem);
        } else {
            navigate("/login");
        }
    }

    async function getQuantity() {
        try {
            let cartProducts = (await axios.get(`http://localhost:8080/api/cartProducts?token=${localStorage.getItem("jwtToken")}`)).data;
            console.log(cartProducts);

            for (let i = 0; i < cartProducts.length; i++) { // Use .length instead of .size
                console.log("Checking product in cart...");

                if (cartProducts[i].productId === product.productId) {
                    console.log(cartProducts[i].productId);
                    
                    console.log("Product found in cart, setting quantity...");
                    setQuantity(cartProducts[i].productQuantity);
                    break; // Exit loop once matching product is found
                }
            }
        } catch (error) {
            console.error("Error fetching cart products:", error);
        }
    }

    // useEffect to call getQuantity when component mounts or when product.id changes
    useEffect(() => {
        if (user) {
            getQuantity();
        }
    },[user,product.productId]);

    


    return (
        <div key={product.id} className="border rounded-lg p-4 shadow-lg self-start">
            <img src={product.image} alt={product.productName} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-semibold">{product.productName}</h2>
            <p className="text-gray-500">Rs. {product.productPrice}</p>
            <div className="flex gap-2">

                {quantity === 0 ? (
                    <button onClick={() => addToCart(product.productId)} className="flex-1 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                        Add to Cart
                    </button>
                ) : (
                    <div className="flex items-center">
                        <button onClick={(e) => {removeFromCart(product.productId)}} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                            -
                        </button>

                        <span className="mx-2">{quantity}</span>

                        <button onClick={(e) => {addToCart(product.productId)}} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                            +
                        </button>
                    </div>
                )}

                <button className="flex-1 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default Product;
