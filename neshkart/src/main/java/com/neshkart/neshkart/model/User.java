package com.neshkart.neshkart.model;

import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long userId;

    @Column(name = "username")
    public String userName;

    @Column(name = "userphone")
    public long userPhone;

    @Column(name = "useremail")
    public String userEmail;

    @Column(name = "password")
    public String password;
}
