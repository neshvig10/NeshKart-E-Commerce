package com.neshkart.neshkart.controller;


import com.neshkart.neshkart.model.User;
import com.neshkart.neshkart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {


    @Autowired
    UserService userService;

    @PostMapping(value = "/register")
    public String addUser(@RequestBody User user){
            return userService.register(user);
    }
}
