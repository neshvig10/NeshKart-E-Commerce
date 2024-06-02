package com.neshkart.neshkart.controller;


import com.neshkart.neshkart.model.User;
import com.neshkart.neshkart.service.UserService;
import com.nimbusds.oauth2.sdk.auth.JWTAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping(value = "/signup")
    public String addUser(@RequestBody User user){
            return userService.register(user);
    }

    @PostMapping(value = "/login")
    public  userLogin(@RequestBody User user){
        System.out.println(user);
        return "Logged In";
    }
}
