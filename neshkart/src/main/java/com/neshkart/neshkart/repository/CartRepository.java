package com.neshkart.neshkart.repository;

import com.neshkart.neshkart.model.Cart;
import com.neshkart.neshkart.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {


    @Query("SELECT productId FROM Cart WHERE userId = :user_id")
    List<Long> productsOfAUserFromCart(@Param("user_id") Long user_id);

}
