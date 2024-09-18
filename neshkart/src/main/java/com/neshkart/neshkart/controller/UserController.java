package com.neshkart.neshkart.controller;


import com.neshkart.neshkart.model.LoginUser;
import com.neshkart.neshkart.model.User;
import com.neshkart.neshkart.repository.UserRepository;
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

    @Autowired
    UserRepository userRepository;

    @GetMapping("/user/{user_phone}")
    public User getUserById(@PathVariable("user_phone") Long userPhone) {
        return userService.getUserById(userPhone);
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<String> addUser(@RequestBody User user){
        return userService.register(user);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<String> userLogin(@RequestBody LoginUser loginUser){
        return userService.login(loginUser);
    }
}
