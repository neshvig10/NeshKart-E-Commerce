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


    @PostMapping(value = "/signup")
    public ResponseEntity<String> addUser(@RequestBody User user){
        return userService.register(user);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<String> userLogin(@RequestBody LoginUser loginUser){
        User user = userRepository.findByUserPhone(loginUser.getUserPhone());
        user.setUserPassword(loginUser.getUserPassword());
        return userService.login(user);
    }
}
