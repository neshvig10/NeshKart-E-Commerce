package com.neshkart.neshkart.service.impl;

import com.neshkart.neshkart.model.Cart;
import com.neshkart.neshkart.model.Product;
import com.neshkart.neshkart.repository.CartRepository;
import com.neshkart.neshkart.repository.ProductRepository;
import com.neshkart.neshkart.service.CartService;
import com.neshkart.neshkart.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    CartRepository cartRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    JwtUtil jwtUtil;

    public String addToCart(String jwt,Long productId){
        Cart cart = new Cart(jwtUtil.extractUserId(jwt),productId);
        cartRepository.save(cart);
        return "Added Successfully";
    }

    public List<Product> cartProducts(String jwt){
        List<Long> productsId = cartRepository.productsOfAUserFromCart(jwtUtil.extractUserId(jwt));
        List <Product> productList = new ArrayList<>();
        for (Long int1 : productsId){
            productList.add(productRepository.getReferenceById(int1));
        }
        return productList;
    }



}
