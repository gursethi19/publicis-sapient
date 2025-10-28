package com.example.publicis.sapient.repository;

import com.example.publicis.sapient.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}
