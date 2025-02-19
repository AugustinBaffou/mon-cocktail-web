package com.augustinbaffou.mon_cocktail.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.augustinbaffou.mon_cocktail.dtos.UserDTO;
import com.augustinbaffou.mon_cocktail.entities.User;
import com.augustinbaffou.mon_cocktail.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        return userService.findByEmail(email)
                .map(userDTO -> ResponseEntity.ok(userDTO))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        User savedUser = userService.saveUser(userDTO);
        UserDTO responseDTO = new UserDTO(savedUser.getId(), savedUser.getEmail(), savedUser.getName());
        return ResponseEntity.ok(responseDTO);
    }
}
