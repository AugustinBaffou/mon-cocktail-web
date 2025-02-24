package com.augustinbaffou.mon_cocktail.auth.controllers;

import com.augustinbaffou.mon_cocktail.auth.config.JwtUtil;
import com.augustinbaffou.mon_cocktail.auth.dtos.LoginDto;
import com.augustinbaffou.mon_cocktail.entities.User;
import com.augustinbaffou.mon_cocktail.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        userRepository.save(user);
        return "Inscription réussie";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginDto login) {
        Optional<User> user = userRepository.findByEmail(login.getEmail());
        if (user.isPresent() && passwordEncoder.matches(login.getPassword(), user.get().getPasswordHash())) {
            return jwtUtil.generateToken(login.getEmail());
        }
        return "Identifiants invalides";
    }
}
