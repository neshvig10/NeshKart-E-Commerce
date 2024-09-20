import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Product from "./Product";
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);

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
        <div className="flex items-center min-h-screen">
            <div className="w-1/6 min-h-screen">
                <SideBar />
            </div>
            <div className="p-4 grid-container grid grid-cols-5 gap-7 self-start ml-10 mt-10">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
};

export default Products;
