package com.neshkart.neshkart.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Collection;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "product")
public class Product {
    public Product() {
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    public Long productId;

    @Column(name = "product_name")
    public String productName;

    @Column(name = "product_price")
    public Double productPrice;

    @Column(name = "product_description")
    public String productDescription;

    @Column(name = "product_quantity")
    public Long productQuantity;

    @Column(name = "jwt")
    public String userJwt;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    public User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product(long productId, String productName, Double productPrice, String productDescription, Long productQuantity) {
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productDescription = productDescription;
        this.productQuantity = productQuantity;
    }

    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(Double productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public Long getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(Long productQuantity) {
        this.productQuantity = productQuantity;
    }

    public String getUserJwt() {
        return userJwt;
    }

    public void setUserJwt(String userJwt) {
        this.userJwt = userJwt;
    }

}
