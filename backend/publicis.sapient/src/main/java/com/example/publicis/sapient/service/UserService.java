package com.example.publicis.sapient.service;


import com.example.publicis.sapient.dto.UserDTO;
import com.example.publicis.sapient.dto.UserListDTO;
import com.example.publicis.sapient.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.example.publicis.sapient.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final RestTemplate restTemplate = new RestTemplate();
    private static final String USERS_API = "https://dummyjson.com/users";

    @Autowired
    public UserService(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    public void loadUsersFromExternalApi(){
        UserListDTO apiResult = restTemplate.getForObject(USERS_API, UserListDTO.class);
        if(apiResult != null && apiResult.getUsers() != null){
            List<User> users = apiResult.getUsers()
                    .stream()
                    .map(dto-> modelMapper.map(dto,User.class))
                    .collect(Collectors.toList());
                    userRepository.saveAll(users);
        }
    }

    public List<UserDTO> searchUsers(String query) {
        String lowerCase = query.toLowerCase();
        return userRepository.findAll().stream()
                .filter(user -> user.getFirstName().toLowerCase().contains(lowerCase) ||
                        user.getLastName().toLowerCase().contains(lowerCase) ||
                        (user.getSsn() != null && user.getSsn().contains(query)))
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(Integer id){
        return userRepository.findById(id)
                .map(user-> modelMapper.map(user, UserDTO.class))
                .orElse(null);
    }

    public UserDTO getUserByEmail(String email){
        User user = userRepository.findByEmail(email);
        return user != null ? modelMapper.map(user, UserDTO.class) : null;
    }
}
