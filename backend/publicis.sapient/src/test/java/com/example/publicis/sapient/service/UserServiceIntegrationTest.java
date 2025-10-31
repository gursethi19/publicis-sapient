package com.example.publicis.sapient.service;

import com.example.publicis.sapient.dto.UserListDTO;
import com.example.publicis.sapient.dto.UserDTO;
import com.example.publicis.sapient.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

import static org.mockito.Mockito.*;

class UserServiceIntegrationTest {

    @Test
    void loadUsersFromExternalApi_callsSaveAll() {
        UserRepository repo = mock(UserRepository.class);
        RestTemplate rest = mock(RestTemplate.class);
        ModelMapper mapper = new ModelMapper();

        UserDTO dto = new UserDTO();
        dto.setId(1);
        dto.setFirstName("Test");

        UserListDTO list = new UserListDTO();
        list.setUsers(Collections.singletonList(dto));

        when(rest.getForObject(anyString(), eq(UserListDTO.class))).thenReturn(list);

        UserService svc = new UserService(repo, mapper, rest);
        svc.loadUsersFromExternalApi();

        verify(repo, times(1)).saveAll(anyList());
    }
}
