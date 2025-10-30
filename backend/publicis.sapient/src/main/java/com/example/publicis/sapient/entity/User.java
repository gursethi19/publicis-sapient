package com.example.publicis.sapient.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private Integer age;
    private String phone;
    private String ssn;
    private String role;
}
