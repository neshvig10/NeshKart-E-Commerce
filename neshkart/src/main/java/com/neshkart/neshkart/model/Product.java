package com.neshkart.neshkart.model;


import jakarta.persistence.*;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long productId;

    @Column(name = "product_name")
    public String productName;

    @Column(name = "product_price")
    public Double productPrice;

    @Column(name = "product_description")
    public String productDescription;



    


}
