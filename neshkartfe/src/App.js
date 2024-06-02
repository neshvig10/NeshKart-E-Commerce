import React from "react";
import {Routes,Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import AddProduct from "./components/AddProduct";

const App = () => (
    <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
            <Route path="/" element = {<Home/>}></Route>
            <Route path="/products" element = {<Products/>}></Route>
            <Route path="/cart" element = {<Cart/>}></Route>
            <Route path="/login" element = {<Login/>}></Route>
            <Route path="/signup" element = {<Register/>}></Route>
            <Route path="/profile/{}" element = {<Profile/>}></Route>
            <Route path="/addProduct" element = {<AddProduct/>}></Route>
        </Routes>

    </BrowserRouter>
);

export default App;