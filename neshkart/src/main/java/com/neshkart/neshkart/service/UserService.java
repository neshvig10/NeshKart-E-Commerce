package com.neshkart.neshkart.service;

import com.neshkart.neshkart.model.User;
import org.springframework.http.ResponseEntity;

public interface UserService{

    ResponseEntity<String> register(User user);
}
