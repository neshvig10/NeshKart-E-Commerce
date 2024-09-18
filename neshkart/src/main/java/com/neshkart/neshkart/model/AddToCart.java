package com.neshkart.neshkart.model;


public class AddToCart {

    public String jwtToken;

    public Long productId;

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long product_id) {
        this.productId = product_id;
    }
}
