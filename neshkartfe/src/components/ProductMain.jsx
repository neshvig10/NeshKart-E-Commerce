import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const ProductMain = () => {

  const { user } = useAuth();
  const navigate = useNavigate();
  const { productId } = useParams(); // Get productId from URL parameters
  const [product, setProduct] = useState(null); // State to store product details
  const [loading, setLoading] = useState(true);
  const [quantity,setQuantity] = useState(0); // State to handle loading

  async function buyNow(productId) {
    if (user) {
        const cartItem = {
            jwtToken: localStorage.getItem("jwtToken"),
            productId: productId
        };
        console.log(quantity+"hi1");
        
        if (quantity===0 || !quantity){
            console.log(quantity+"hi2");
            
            setQuantity(quantity*1+1);
            await axios.post('http://localhost:8080/api/addToCart', cartItem);
        }
        navigate("/cart");
    } else {
        navigate("/login");
    }
}


  async function addToCart(productId) {
    if (user) {
        const cartItem = {
            jwtToken: localStorage.getItem("jwtToken"),
            productId: productId
        };
        setQuantity(quantity*1+1);
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

  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${productId}`);
        const data = response.data;
        setProduct(data); // Set the product data
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false); // Stop loading once the fetch is done
      }
    };

    fetchProduct(); // Call the function to fetch product details
  }, [productId]);

  if (loading) return <p>Loading product details...</p>; // Show loading state

  if (!product) return <p>Product not found</p>; // Show if product is not available

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      {/* Product Image */}
      <img
        src={`http://localhost:8080/api/images/${product.pathToImage}`}
        alt={product.productName}
        className="w-full max-w-lg h-auto object-cover mb-4"
      />

      {/* Product Name */}
      <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>

      {/* Product Price */}
      <p className="text-xl text-gray-700 mb-2">Price: Rs. {product.productPrice}</p>

      {/* Product Description */}
      <p className="text-gray-600 mb-4">{product.productDescription}</p>

      {/* Action Buttons */}
      <div className="flex gap-4">
      {quantity === 0 ||  (!quantity) ? (
                    <button onClick={() => addToCart(product.productId)} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                        Add to Cart
                    </button>
                ) : (
                    <div className="items-center">
                        <button onClick={(e) => {removeFromCart(product.productId)}} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                            -
                        </button>

                        <span className="mx-2">{quantity}</span>

                        <button onClick={(e) => {addToCart(product.productId)}} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                            +
                        </button>
                    </div>
                )}
                <button onClick={(e) => {buyNow(product.productId)}} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                    Buy Now
                </button>
      </div>
    </div>
  );
};

export default ProductMain;
