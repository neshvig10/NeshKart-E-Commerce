import {React, useEffect, useState} from "react"
import SideBar from "./SideBar";
import SearchBar from "./SearchBar";


const Products = ()=> {

    const [data,setData] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/products")
        .then(response => response.json())
        .then((data) => setData(data))
        .catch((error) => console.log("Error fetching product data" ,error)
        )
    })
    
    return (
    <>   
        <div className="flex items-center min-h-screen">
            <div className="w-1/6 min-h-screen">
                <SideBar></SideBar>
            </div>
            <div>
                <div>
                    <SearchBar></SearchBar>
                </div>
                <div>

                </div>
            </div>
        </div>

    </>
    )
};

export default Products;