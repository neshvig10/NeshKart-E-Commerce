import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const SearchContext = createContext();




export const SearchProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [products1, setProducts1] = useState([]);
    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                setProducts(response.data);
                setProducts1(response.data);
            } catch (err) {
                console.error(err);
            }
        };
    
        fetchProducts();
    }, []);

    function searchFilter(searchText){

            if (searchText===""){
                setProducts(products1);
            }
            console.log(products);
            

            
            const products2 =products1.filter((product) => {
                return (product.productName.toLowerCase().includes(searchText.toLowerCase()) || product.productDescription.toLowerCase().includes(searchText.toLowerCase()));
            })
            console.log("searchText"+searchText);
            
            console.log(products2);
            setProducts(products2);
    }

    return (
        <SearchContext.Provider value={{ products,searchFilter }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    return useContext(SearchContext);
};
