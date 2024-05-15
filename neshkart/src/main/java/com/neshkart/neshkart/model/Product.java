package com.neshkart.neshkart.model;


import jakarta.persistence.*;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long productId;

    @Column(name = "productname")
    public String productName;

    @Column(name = "productprice")
    public double productPrice;



}
