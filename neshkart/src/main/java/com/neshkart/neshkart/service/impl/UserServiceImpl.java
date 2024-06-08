package com.neshkart.neshkart.service.impl;

import com.neshkart.neshkart.model.Product;
import com.neshkart.neshkart.model.Role;
import com.neshkart.neshkart.model.User;
import com.neshkart.neshkart.repository.RoleRepository;
import com.neshkart.neshkart.repository.UserRepository;
import com.neshkart.neshkart.service.UserService;
import com.neshkart.neshkart.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    public ResponseEntity<String> register(User user){
        if (userRepository.existsByuserName(user.userName)){
            return ResponseEntity.ok("Username already exists");
        }
        else if (userRepository.existsByuserPhone(user.userPhone)){
            return ResponseEntity.ok("Phone number already exists");
        }
        else if (userRepository.existsByuserEmail(user.userEmail)){
            return ResponseEntity.ok("Email already exists");
        }
        else{
            Role userRoleFromRepo = roleRepository.findByRoleName("USER");
            List<Role> userRoleInList = new ArrayList<>();
            user.setUserRoles(userRoleInList);
            if (userRoleFromRepo == null) {
                Role userRole = new Role("USER");
                roleRepository.save(userRole);
                user.userRoles.add(userRole);
            }
            else{
                user.userRoles.add(userRoleFromRepo);
            }
            List<Product> productsList = new ArrayList<>();
            user.setUserProducts(productsList);
            userRepository.save(user);
            return ResponseEntity.ok("Registered");
        }
    }


    public ResponseEntity<String> login(User user) {
        if (!userRepository.existsByuserName(user.userName)) {
            System.out.println(user.userName);
            System.out.println("nousername");
            return new ResponseEntity<>("Username doesn't exist", HttpStatus.NOT_FOUND);
        } else if (!userRepository.findByUserName(user.userName).userPassword.equals(user.userPassword)) {
            System.out.println(userRepository.findByUserName(user.userName).userPassword);
            System.out.println(user.userPassword);
            System.out.println("wrongpassword");
            return new ResponseEntity<>("Wrong Password", HttpStatus.UNAUTHORIZED);
        }
        String token = JwtUtil.generateToken(user.userName);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }


}
