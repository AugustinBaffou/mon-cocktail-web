package com.augustinbaffou.mon_cocktail.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.augustinbaffou.mon_cocktail.dtos.UserDTO;
import com.augustinbaffou.mon_cocktail.entities.User;
import com.augustinbaffou.mon_cocktail.repositories.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    public User saveUser(UserDTO userDTO) {
        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setUsername(userDTO.getName());
        // Enregistrer l'entité dans la base de données
        return userRepository.save(user);
    }
}

