package com.neshkart.neshkart.service.impl;

import com.neshkart.neshkart.model.Role;
import com.neshkart.neshkart.repository.RoleRepository;
import com.neshkart.neshkart.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;

public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleRepository roleRepository;

    Role addRole(String roleName){
        Role role = new Role(roleName);
        return roleRepository.save(role);
    }




}
