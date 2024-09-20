package com.neshkart.neshkart.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class OrderItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long orderItemId;

    @Column(name = "order_id")
    public Long orderId;

    @Column(name = "product_id")
    public Long productId;

    @Column(name = "quantity")
    public Long quantity;
}
