package com.neshkart.neshkart.service;

import com.neshkart.neshkart.model.Product;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.List;

@Service
public interface ProductService {

    List<Product> findAll();

    Product addProduct(Product product, MultipartFile imageFile);
    List<Product> productByUserId(Long id);

    public Product getProduct(Long id);

    InputStream getProductImage(String path) throws FileNotFoundException;
}
