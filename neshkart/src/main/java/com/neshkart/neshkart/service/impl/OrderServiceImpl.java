package com.neshkart.neshkart.service.impl;


import com.neshkart.neshkart.model.Orders;
import com.neshkart.neshkart.model.OrderItems;
import com.neshkart.neshkart.model.Product;
import com.neshkart.neshkart.repository.OrderItemRepository;
import com.neshkart.neshkart.repository.OrderRepository;
import com.neshkart.neshkart.service.OrderService;
import com.neshkart.neshkart.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    JwtUtil jwtUtil;

    public Long orderRegister(Orders order){
        Orders order1 = orderRepository.save(order);
        return order1.getOrderId();
    }

    public void orderProductRegister(OrderItems orderItems){
        orderItemRepository.save(orderItems);
    }

    public List<Orders> listOfOrders(String jwt){
        Long userId = jwtUtil.extractUserId(jwt);
        return orderRepository.findAllOrdersByUserId(userId);
    }

    public List<Long> productByOrderId(Long orderId){
        return orderRepository.findProductByOrderId(orderId);
    }

}
