package com.example.publicis.sapient.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private Integer age;
    private String phone;
    private String ssn;
    private String role;
}
