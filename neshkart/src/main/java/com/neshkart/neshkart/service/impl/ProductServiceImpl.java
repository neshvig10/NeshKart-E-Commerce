package com.neshkart.neshkart.service.impl;

import com.neshkart.neshkart.model.Product;
import com.neshkart.neshkart.repository.ProductRepository;
import com.neshkart.neshkart.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    ProductRepository productRepository;

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public String addProduct(Product product){
        Product product1 = productRepository.save(product);
        return "saved";
    }
}
