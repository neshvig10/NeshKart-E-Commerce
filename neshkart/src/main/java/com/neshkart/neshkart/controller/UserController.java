package com.neshkart.neshkart.controller;


import com.neshkart.neshkart.model.User;
import com.neshkart.neshkart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping(value = "/signup")
    public ResponseEntity<String> addUser(@RequestBody User user){
        return userService.register(user);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<String> userLogin(@RequestBody User user){
        System.out.println(user);
        return ResponseEntity.ok("Logged In");
    }
}
