package com.neshkart.neshkart.repository;

import com.neshkart.neshkart.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User,Long> {


    boolean existsByuserPhone(long userPhone);

    boolean existsByuserEmail(String userEmail);

    User getByUserPhone(long userPhone);

}
