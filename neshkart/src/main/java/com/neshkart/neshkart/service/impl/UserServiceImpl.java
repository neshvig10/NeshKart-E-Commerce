package com.neshkart.neshkart.service.impl;

import com.neshkart.neshkart.model.User;
import com.neshkart.neshkart.repository.UserRepository;
import com.neshkart.neshkart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    public String register(User user){
        if (userRepository.existsByuserName(user.userName)){
            return "User name already exists";
        }
        else{
            userRepository.save(user);
            return "Registered";
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
