package com.neshkart.neshkart.controller;


import com.neshkart.neshkart.model.Product;
import com.neshkart.neshkart.model.User;
import com.neshkart.neshkart.repository.ProductRepository;
import com.neshkart.neshkart.service.ProductService;
import com.neshkart.neshkart.service.UserService;
import com.neshkart.neshkart.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {

    @Autowired
    ProductService productService;

    @Autowired
    UserService userService;

    @Autowired
    JwtUtil jwtUtil;

    @GetMapping("/products")
    public List<Product> productList(){
        return productService.findAll();
    }

    @PostMapping("/addProduct")
    public Product addProduct(@RequestBody Product product){

        String jwt = product.getUserJwt();
        User user = userService.getUserById(jwtUtil.extractUserId(jwt));
        product.setUser(user);
        return productService.addProduct(product);


    }


}
