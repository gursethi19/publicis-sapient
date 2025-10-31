package com.example.publicis.sapient.service;

import com.example.publicis.sapient.dto.UserDTO;
import com.example.publicis.sapient.entity.User;
import com.example.publicis.sapient.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private UserRepository repo;
    private UserService service;

    @BeforeEach
    void setUp() {
        repo = mock(UserRepository.class);
        ModelMapper mapper = new ModelMapper();
        service = new UserService(repo, mapper, null);
    }

    @Test
    void searchUsersFiltersByFirstNameLastNameOrSsn() {
        User u1 = new User();
        u1.setId(1);
        u1.setFirstName("Alice");
        u1.setLastName("Smith");
        u1.setSsn("123-45-6789");

        User u2 = new User();
        u2.setId(2);
        u2.setFirstName("Bob");
        u2.setLastName("Jones");
        u2.setSsn("987-65-4321");

        when(repo.findAll()).thenReturn(Arrays.asList(u1, u2));

        List<UserDTO> result = service.searchUsers("Ali");
        assertEquals(1, result.size());
        assertEquals("Alice", result.get(0).getFirstName());

        result = service.searchUsers("987");
        assertEquals(1, result.size());
        assertEquals("Bob", result.get(0).getFirstName());
    }
}
