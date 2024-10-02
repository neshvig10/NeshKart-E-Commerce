package com.neshkart.neshkart.service;


import com.neshkart.neshkart.model.Product;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface CartService {

    String addToCart(String jwt,Long productId);

    public List<Product> cartProducts(String jwt);

    public String removeFromCart(String jwt,Long productId);

    public Long cartProductQuantity(String jwt,Long productId);

    public void clearCart();

}
