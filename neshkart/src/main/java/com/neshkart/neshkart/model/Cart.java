package com.neshkart.neshkart.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long cartId;

    @Column(name = "user_id")
    private Long userId;

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "quantity")
    private Long quantity = 1L;

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Cart(){

    }


    public Cart(long userId, long productId) {
        this.userId = userId;
        this.productId = productId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }



}
