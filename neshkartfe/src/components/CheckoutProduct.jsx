import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutProduct = ({ product }) => {
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
            //window.location.reload()
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
            //window.location.reload()
        } else {
            navigate("/login");
        }
    }

    async function getQuantity() {


        try {
            let cartProducts = (await axios.get(`http://localhost:8080/api/quantityOfProduct?jwt=${localStorage.getItem("jwtToken")}&productId=${product.productId}`)).data;
            console.log("hi"+cartProducts);
            setQuantity(cartProducts);
        } catch (error) {
            console.error("Error fetching cart products:", error);
        }
    }

    // useEffect to call getQuantity when component mounts or when product.id changes
    useEffect(() => {
        if (user) {
            getQuantity();

        }
    },[user]);

    


    return (
        <div key={product.id} className="border rounded-lg p-4 shadow-lg self-start">
            <img src={"http://localhost:8080/api/images/"+product.pathToImage} alt={product.productName} className="h-24 w-25" />
            <h2 className="text-xl font-semibold">{product.productName}</h2>
            <p className="text-gray-500">Rs. {product.productPrice}</p>
            <div className="flex gap-2">

                {quantity === 0 ? (
                    <button onClick={() => addToCart(product.productId)} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                        Removed from Cart
                    </button>
                ) : (
                    <div className="items-center">

                        <span className="mx-2">Nos. {quantity}</span>

                    </div>
                )}

            </div>
        </div>
    );
};

export default CheckoutProduct;
