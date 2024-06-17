package com.neshkart.neshkart.service;

import com.neshkart.neshkart.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService{

    ResponseEntity<String> register(User user);

    ResponseEntity<String> login(User user);

}
