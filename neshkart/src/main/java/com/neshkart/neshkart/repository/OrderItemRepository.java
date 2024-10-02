package com.neshkart.neshkart.repository;

import com.neshkart.neshkart.model.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItems,Long> {
}
