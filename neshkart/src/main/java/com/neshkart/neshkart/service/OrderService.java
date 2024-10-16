package com.neshkart.neshkart.service;


import com.neshkart.neshkart.model.Orders;
import com.neshkart.neshkart.model.OrderItems;
import com.neshkart.neshkart.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface OrderService {

    public Long orderRegister(Orders order);

    public void orderProductRegister(OrderItems orderItems);

    public List<Orders> listOfOrders(String jwt);

    public List<Long> productByOrderId(Long orderId);


}
