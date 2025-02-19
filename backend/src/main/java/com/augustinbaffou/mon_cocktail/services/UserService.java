package com.augustinbaffou.mon_cocktail.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.augustinbaffou.mon_cocktail.dtos.UserDTO;
import com.augustinbaffou.mon_cocktail.entities.User;
import com.augustinbaffou.mon_cocktail.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public Optional<UserDTO> findByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(user -> new UserDTO(user.getId(), user.getEmail(), user.getName()));
    }

    public User saveUser(UserDTO userDTO) {
        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setName(userDTO.getName());
        // Enregistrer l'entité dans la base de données
        return userRepository.save(user);
    }
}

