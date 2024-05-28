package com.neshkart.neshkart.service.impl;

import com.neshkart.neshkart.model.Product;
import com.neshkart.neshkart.repository.ProductRepository;
import com.neshkart.neshkart.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {


    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Product addProduct(Product product){
        Product productSaved = productRepository.save(product);
        return productSaved;
    }
}
