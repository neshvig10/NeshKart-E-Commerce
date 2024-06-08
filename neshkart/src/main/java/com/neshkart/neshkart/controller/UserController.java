package com.neshkart.neshkart.controller;


import com.neshkart.neshkart.model.Role;
import com.neshkart.neshkart.model.User;
import com.neshkart.neshkart.repository.RoleRepository;
import com.neshkart.neshkart.service.RoleService;
import com.neshkart.neshkart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashSet;

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
        return userService.login(user);
    }
}
