package com.neshkart.neshkart.controller;


import com.neshkart.neshkart.model.Product;
import com.neshkart.neshkart.model.User;
import com.neshkart.neshkart.repository.ProductRepository;
import com.neshkart.neshkart.service.ProductService;
import com.neshkart.neshkart.service.UserService;
import com.neshkart.neshkart.util.JwtUtil;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
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


    @GetMapping("product/{id}")
    public List<Product> productOfUser(@PathVariable Long id){
        return productService.productByUserId(id);
    }

    @PostMapping("/addProduct")
    public Product addProduct(@RequestParam("productName") String productName,
                              @RequestParam("productDescription") String productDescription,
                              @RequestParam("productPrice") Double productPrice,
                              @RequestParam("userJwt") String userJwt,
                              @RequestParam("productImage") MultipartFile productImage){

        Product product = new Product();
        product.setProductName(productName);
        product.setProductDescription(productDescription);
        product.setProductPrice(productPrice);
        String jwt = userJwt;
        product.setUserId(jwtUtil.extractUserId(jwt));
        Product product1 =  productService.addProduct(product,productImage);

        return product1;
    }


    @GetMapping("/images/{imagePath}")
    public void image(@PathVariable("imagePath") String imagePath, HttpServletResponse response) throws IOException {
        InputStream resource = productService.getProductImage(imagePath);
        response.setContentType(MediaType.IMAGE_PNG_VALUE);
        StreamUtils.copy(resource,response.getOutputStream());
    }




}
