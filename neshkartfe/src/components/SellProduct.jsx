import axios from 'axios';
import {React, useState} from 'react';


const SellProduct = ()=> {

    const [productName,setProductName] = useState("");
    const [productDescription,setProductDescription] = useState("");
    const [productPrice,setProductPrice] = useState("");
    const [productImage,setProductImage] = useState("");

    const addProduct = async (e)=>{
        e.preventDefault();

        const product = {
            productName : productName,
            productDescription : productDescription,
            productPrice : productPrice,
            userJwt : localStorage.getItem("jwtToken")
        }

        

        try{
            const response = await axios.post("http://localhost:8080/api/addProduct",product);;
            console.log(response);
            console.log(response.status);
            if(response.status === 200){
                alert("Product Added Successfully");
                window.location.reload();
            }
            else{
                alert("Failed to add product");
            } 
        }
        catch(error){
            console.error("Error registering user",error);
        }


    }


    return (
        <>
        <div className='border-2 border-blue-400 w-[300px] mx-[700px] my-[300px] py-5 px-5'>
        <form onSubmit={addProduct}>

        <label htmlFor="">Product Name</label>
        <input className='border-2' type="text" value={productName} onChange={(e) => {setProductName(e.target.value)}}/>

        <label htmlFor="">Price (in Rs)</label>
        <input className='border-2' type="number" value={productPrice} onChange={(e) => {setProductPrice(e.target.value)}} />

        <label htmlFor="">Description</label>
        <input className='border-2 h-20' type="text" value={productDescription} onChange={(e) => {setProductDescription(e.target.value)}}/>

        <label htmlFor="">Product Image</label>
        <input type="file" value={productImage} onChange={(e) => {setProductImage(e.target.value)}}/>

        <button className='bg-blue-400 text-white h-7 w-[110px] rounded mx-14 mt-4'>Add Product</button>



        </form>

        </div>

        </>
    )
}

export default SellProduct;