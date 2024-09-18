package com.neshkart.neshkart.service.impl;

import com.neshkart.neshkart.model.Cart;
import com.neshkart.neshkart.model.LoginUser;
import com.neshkart.neshkart.model.Product;
import com.neshkart.neshkart.model.User;
import com.neshkart.neshkart.repository.CartRepository;
import com.neshkart.neshkart.repository.UserRepository;
import com.neshkart.neshkart.service.UserService;
import com.neshkart.neshkart.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public User getUserById(Long user_phone){
        return userRepository.getByUserPhone(user_phone);
    }

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
//            Cart cart1 = new Cart();
//            cart1.setUserId(user.getUserId());
//            Set<Long> productsList1 = new HashSet<>();
//            cart1.setProductList(productsList1);
//            cartRepository.save(cart1);
            return ResponseEntity.ok("Registered");
        }
    }


    public ResponseEntity<String> login(LoginUser loginUser) {

        User user1 = userRepository.getByUserPhone(loginUser.getUserPhone());

        if (user1 == null) {
            return new ResponseEntity<>("Phone number doesn't exist", HttpStatus.BAD_REQUEST);
        } else if (!user1.getUserPassword().equals(loginUser.getUserPassword())) {
            return new ResponseEntity<>("Wrong Password", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(jwtUtil.generateToken(user1),HttpStatus.OK);
    }

}
