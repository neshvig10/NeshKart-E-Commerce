import React, { createContext, useContext, useState } from "react";
import {Routes,Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import AddProduct from "./components/AddProduct";
import SellProduct from "./components/SellProduct";
import { AuthProvider } from "./contexts/AuthContext";


const App = () => {

    return (

                    <BrowserRouter>
                    <Navbar></Navbar>
                        <Routes>
                            <Route path="/" element = {<Home/>}></Route>
                            <Route path="/products" element = {<Products/>}></Route>
                            <Route path="/cart" element = {<Cart/>}></Route>
                            <Route path="/login" element = {<Login/>}></Route>
                            <Route path="/signup" element = {<Register/>}></Route>
                            <Route path="/user/:userId" element = {<Profile/>}></Route>
                            <Route path="/addProduct" element = {<AddProduct/>}></Route>
                            <Route path="/sellProduct" element = {<SellProduct/>}></Route>
                        </Routes>
                    </BrowserRouter>

        
    )

};

export default App;