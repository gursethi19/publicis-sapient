package com.example.publicis.sapient.service;

import com.example.publicis.sapient.dto.UserDTO;
import com.example.publicis.sapient.dto.UserListDTO;
import com.example.publicis.sapient.entity.User;
import com.example.publicis.sapient.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final RestTemplate restTemplate;
    private static final String USERS_API = "https://dummyjson.com/users";

    public UserService(UserRepository userRepository, ModelMapper modelMapper, RestTemplate restTemplate) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.restTemplate = restTemplate;
    }

    @Retryable(value = {RestClientException.class}, maxAttempts = 3, backoff = @Backoff(delay = 2000))
    @Transactional
    @CircuitBreaker(name = "externalUserApi", fallbackMethod = "loadUsersFallback")
    public void loadUsersFromExternalApi(){
        try {
            log.info("Loading users from external API: {}", USERS_API);
            UserListDTO apiResult = restTemplate.getForObject(USERS_API, UserListDTO.class);
            if(apiResult != null && apiResult.getUsers() != null){
                List<User> users = apiResult.getUsers()
                        .stream()
                        .map(dto-> modelMapper.map(dto,User.class))
                        .collect(Collectors.toList());
                userRepository.saveAll(users);
                log.info("Saved {} users to database", users.size());
            } else {
                log.warn("No users returned from external API");
            }
        } catch (RestClientException ex) {
            log.error("Failed to load users from external API", ex);
            throw ex;
        }
    }

    public void loadUsersFallback(Throwable t) {
        log.warn("Fallback triggered for loadUsersFromExternalApi: {}", t.getMessage());
    }

    

    public List<UserDTO> searchUsers(String query) {
        if (query == null || query.trim().isEmpty()) {
            return Collections.emptyList();
        }
        String lowerCase = query.toLowerCase();
        return userRepository.findAll().stream()
                .filter(user -> (user.getFirstName() != null && user.getFirstName().toLowerCase().contains(lowerCase)) ||
                        (user.getLastName() != null && user.getLastName().toLowerCase().contains(lowerCase)) ||
                        (user.getSsn() != null && user.getSsn().contains(query)))
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    @Cacheable(value = "users", key = "#id")
    public UserDTO getUserById(Integer id){
        return userRepository.findById(id)
                .map(user-> modelMapper.map(user, UserDTO.class))
                .orElse(null);
    }

    @Cacheable(value = "users", key = "#email")
    public UserDTO getUserByEmail(String email){
        User user = userRepository.findByEmail(email);
        return user != null ? modelMapper.map(user, UserDTO.class) : null;
    }
}
