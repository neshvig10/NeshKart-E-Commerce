package com.neshkart.neshkart.repository;

import com.neshkart.neshkart.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {


    @Query("SELECT p FROM Product p WHERE p.userId = :userId")
    List<Product> productSoldByUser(@Param("userId") Long userId);

}
