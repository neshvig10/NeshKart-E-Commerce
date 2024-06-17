package com.neshkart.neshkart.service.impl;

import com.neshkart.neshkart.model.Product;
import com.neshkart.neshkart.model.User;
import com.neshkart.neshkart.repository.UserRepository;
import com.neshkart.neshkart.service.UserService;
import com.neshkart.neshkart.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<String> register(User user){
        if (userRepository.existsByuserPhone(user.userPhone)){
            return ResponseEntity.ok("Phone number already exists");
        }
        else if (userRepository.existsByuserEmail(user.userEmail)){
            return ResponseEntity.ok("Email already exists");
        }
        else{
            List<Product> productsList = new ArrayList<>();
            user.setUserProducts(productsList);
            userRepository.save(user);
            return ResponseEntity.ok("Registered");
        }
    }


    public ResponseEntity<String> login(User user) {

        if (!userRepository.existsByuserPhone(user.getUserPhone())) {
            return new ResponseEntity<>("Phone number doesn't exist", HttpStatus.NOT_FOUND);
        } else if (!userRepository.findByUserPhone(user.userPhone).userPassword.equals(user.userPassword)) {
            return new ResponseEntity<>("Wrong Password", HttpStatus.UNAUTHORIZED);
        }
        User user1 = userRepository.getByUserPhone(user.getUserPhone());
        return ResponseEntity.ok("jwtUtil.generateToken(user1)");
    }


}
