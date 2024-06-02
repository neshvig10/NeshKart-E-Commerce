package com.neshkart.neshkart.service.impl;

import com.neshkart.neshkart.model.User;
import com.neshkart.neshkart.repository.UserRepository;
import com.neshkart.neshkart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

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
            userRepository.save(user);
            return ResponseEntity.ok("Registered");
        }
    }

    public String login(User user){
        if (userRepository.existsByuserName(user.userName)){
            return "Username doesn't exists";
        }
        else if (userRepository.findByUserName(user.userName).userPassword != user.userPassword) {
            return "Wrong Password";
        }
        return "Logged In";
    }

}
