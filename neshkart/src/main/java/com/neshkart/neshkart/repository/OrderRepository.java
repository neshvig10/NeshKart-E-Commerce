package com.neshkart.neshkart.repository;

import com.neshkart.neshkart.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders,Long> {

    @Query(value = "SELECT o FROM Orders AS o WHERE o.userId = :userId")
    List<Orders> findAllOrdersByUserId(Long userId);

}
