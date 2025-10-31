package com.example.publicis.sapient.controller;


import com.example.publicis.sapient.dto.UserDTO;
import com.example.publicis.sapient.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    private final UserService userService;
    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/load")
    @Operation(summary = "Load users from external API")
    public ResponseEntity<String> load(){
        userService.loadUsersFromExternalApi();
        return ResponseEntity.ok("Users loaded successfully");

    }

    @GetMapping("/search")
    @Operation(summary = "Search users by query")
    public ResponseEntity<List<UserDTO>> search(@RequestParam @NotBlank String query){
        log.info("Searching users with query={}", query);
        List<UserDTO> users = userService.searchUsers(query);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID")
    public ResponseEntity<UserDTO> getUserById(@PathVariable @Min(0) Integer id){
        UserDTO user = userService.getUserById(id);
        if(user == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/email/{email}")
    @Operation(summary = "Get user by email")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable @Email String email){
        UserDTO user = userService.getUserByEmail(email);
        if(user == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }
}
