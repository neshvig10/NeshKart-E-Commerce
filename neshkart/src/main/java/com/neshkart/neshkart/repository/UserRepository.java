package com.neshkart.neshkart.repository;

import com.neshkart.neshkart.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

    boolean existsByuserName(String userName);

    User findByUserName(String userName);

    boolean existsByuserPhone(long userPhone);

    boolean existsByuserEmail(String userEmail);
}
