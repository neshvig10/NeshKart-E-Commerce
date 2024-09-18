package com.neshkart.neshkart.repository;

import com.neshkart.neshkart.model.Cart;
import com.neshkart.neshkart.model.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {


    @Query("SELECT productId FROM Cart WHERE userId = :user_id")
    List<Long> productsOfAUserFromCart(@Param("user_id") Long user_id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE cart SET quantity = quantity + 1 WHERE user_id = :user_id AND product_id = :product_id", nativeQuery = true)
    void increaseQuantity(@Param("user_id") Long user_id, @Param("product_id") Long product_id);


    @Query("SELECT COUNT(c) FROM Cart AS c WHERE userId = :user_id AND productId = :product_id")
    Long productAlreadyExist(@Param("user_id") Long user_id,@Param("product_id") Long product_id);


    @Query("SELECT quantity from Cart WHERE userId = :user_id AND productId = :product_id")
    Long getQuantityByProductId(@Param("user_id") Long user_id,@Param("product_id") Long product_id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE cart SET quantity = quantity - 1 WHERE user_id = :user_id AND product_id = :product_id", nativeQuery = true)
    void decreaseQuantity(@Param("user_id") Long user_id, @Param("product_id") Long product_id);


    @Query(value = "SELECT * FROM cart WHERE user_id = :user_id AND product_id = :product_id",nativeQuery = true)
    Cart getReferenceByUserIdAndProductId(@Param("user_id") Long user_id,@Param("product_id") Long product_id);
}
