package com.neshkart.neshkart.controller;


import com.neshkart.neshkart.model.Product;
import com.neshkart.neshkart.repository.ProductRepository;
import com.neshkart.neshkart.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/products")
    public List<Product> productList(){
        return productService.findAll();
    }

    @PostMapping("/addProduct")
    public Product addProduct(@RequestBody Product product){
        return productService.addProduct(product);
    }


}
