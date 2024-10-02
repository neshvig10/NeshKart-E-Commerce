package com.neshkart.neshkart.controller;


import com.neshkart.neshkart.model.Orders;
import com.neshkart.neshkart.model.OrderItems;
import com.neshkart.neshkart.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping(value = "/orderRegister")
    public Long orderRegister(@RequestBody Orders order){
        return orderService.orderRegister(order);
    }

    @PostMapping(value = "/orderProductRegister")
    public void orderProductRegister(@RequestBody OrderItems orderItems){
        orderService.orderProductRegister(orderItems);
    }

    @GetMapping(value = "/orders")
    public List<Orders> ordersList(String jwt){
        return orderService.listOfOrders(jwt);
    }


}
