package com.neshkart.neshkart.service;

import com.neshkart.neshkart.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {

    List<Product> findAll();

    Product addProduct(Product product);
}
