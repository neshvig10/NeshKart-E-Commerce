package com.neshkart.neshkart.repository;

import com.neshkart.neshkart.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByRoleName(String name);


}
