package com.neshkart.neshkart.service;


import com.neshkart.neshkart.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface CartService {

    String addToCart(String jwt,Long productId);

    public List<Product> cartProducts(String jwt);

}
