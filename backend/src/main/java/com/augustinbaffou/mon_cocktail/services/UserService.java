package com.augustinbaffou.mon_cocktail.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.augustinbaffou.mon_cocktail.dtos.UserDTO;
import com.augustinbaffou.mon_cocktail.entities.Role;
import com.augustinbaffou.mon_cocktail.entities.User;
import com.augustinbaffou.mon_cocktail.entities.UserRoles;
import com.augustinbaffou.mon_cocktail.repositories.UserRepository;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public User saveUser(UserDTO userDTO) {
        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setUsername(userDTO.getName());
        user.addRole(Role.USER);
        return userRepository.save(user);
    }

    public void addRoleToUser(String email, Role role) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        // Vérifier si l'utilisateur a déjà ce rôle
        boolean hasRole = user.getUserRoles().stream()
                .anyMatch(userRole -> userRole.getRole() == role);
                
        if (!hasRole) {
            user.addRole(role);
            userRepository.save(user);
        }
    }
    
    public void removeRoleFromUser(String email, Role role) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        // Trouver et supprimer le UserRole spécifique
        user.getUserRoles().removeIf(userRole -> userRole.getRole() == role);
        userRepository.save(user);
    }
    
    public List<Role> getUserRoles(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        // Extraire les rôles des UserRole
        return user.getUserRoles().stream()
                .map(UserRoles::getRole)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public void deleteUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        userRepository.deleteById(user.getId());
    }
}