import {React, useEffect, useState} from "react"


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
    
        <ul>
            { data }    
        </ul>         
    </>
    )
};

export default Products;