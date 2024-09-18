package com.neshkart.neshkart.controller;


import com.neshkart.neshkart.model.AddToCart;
import com.neshkart.neshkart.model.Cart;
import com.neshkart.neshkart.model.Product;
import com.neshkart.neshkart.service.CartService;
import com.neshkart.neshkart.service.impl.CartServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class CartController {


    @Autowired
    CartService cartService;

    @PostMapping("/addToCart")
    public String addToCart(@RequestBody AddToCart addToCart){
        return cartService.addToCart(addToCart.getJwtToken(),addToCart.getProductId());
    }

    @PostMapping("/removeFromCart")
    public String removeFromCart(@RequestBody AddToCart addToCart){
        return cartService.removeFromCart(addToCart.getJwtToken(),addToCart.getProductId());
    }

    @GetMapping("/cartProducts")
    public List<Product> getCartProducts(@RequestParam String token){
        return cartService.cartProducts(token);
    }
}
