import axios from 'axios';
import {React, useState} from 'react';


const SellProduct = ()=> {

    const [productName,setProductName] = useState("");
    const [productDescription,setProductDescription] = useState("");
    const [productPrice,setProductPrice] = useState();
    const [productQuantity,setProductQuantity] = useState();
    const [productImage,setProductImage] = useState(null);

    const addProduct = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('productPrice', productPrice);
        formData.append('productQuantity',productQuantity);
        formData.append('userJwt', localStorage.getItem("jwtToken"));
        formData.append('productImage', productImage);
    
        // Log FormData entries
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    
        try {
            const response = await axios.post("http://localhost:8080/api/addProduct", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Ensure the right content type is set
                }
            });
            console.log(response);
            if (response.status === 200) {
                alert("Product Added Successfully");
                window.location.reload();
            } else {
                alert("Failed to add product");
            } 
        } catch (error) {
            console.error("Error adding product", error);
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

        <label htmlFor="">Quantity</label>
        <input className='border-2' type="number" value={productQuantity} onChange={(e) => {setProductQuantity(e.target.value)}}/>
    
        <label htmlFor="">Product Image</label>
        <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => {
                const file = e.target.files[0]; // Access the selected file
                if (file) {
                    setProductImage(file); // Set the file to state
                }
            }} 
        />


        <button className='bg-blue-400 text-white h-7 w-[110px] rounded mx-14 mt-4'>Add Product</button>
        </form>
        </div>

        </>
    )
}

export default SellProduct;