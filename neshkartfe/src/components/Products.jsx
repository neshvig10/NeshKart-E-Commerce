import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Product from "./Product";
import axios from "axios";
import { useSearch } from "../contexts/SearchContext";

const Products = () => {

    const {products} = useSearch();



    return (
        <div className="flex items-center min-h-screen">
            <div className="w-1/6 h-full min-h-screen">
            <SideBar />
            </div>
            <div className="p-4 grid-container grid grid-cols-5 gap-7 self-start  mt-10">
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
