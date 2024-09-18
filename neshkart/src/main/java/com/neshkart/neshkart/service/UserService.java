package com.neshkart.neshkart.service;

import com.neshkart.neshkart.model.LoginUser;
import com.neshkart.neshkart.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


public interface UserService{

    ResponseEntity<String> register(User user);

    ResponseEntity<String> login(LoginUser loginUser);
    User getUserById(Long userPhone);

}
