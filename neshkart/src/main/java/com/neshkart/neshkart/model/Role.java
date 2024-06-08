package com.neshkart.neshkart.model;

import jakarta.persistence.*;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    public Long roleId;

    @Column(name = "role_name")
    public String roleName;

    @ManyToMany(mappedBy = "userRoles",fetch = FetchType.LAZY)
    public List<User> users;

    public Role() {
    }

    public Role(String roleName) {
        super();
        this.roleName = roleName;
    }
}
