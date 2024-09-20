package com.neshkart.neshkart.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

public class Order {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long orderId;

    @Column(name = "user_id")
    public Long userId;

    @Column(name = "address")
    public String address;

    @Column(name = "date_time")
    public LocalDateTime dateTime;

}
