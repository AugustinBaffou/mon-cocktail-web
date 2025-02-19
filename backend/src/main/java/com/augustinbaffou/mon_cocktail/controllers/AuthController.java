package com.augustinbaffou.mon_cocktail.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @PostMapping("/api/login")
    public String login() {
        // Spring Security gère la logique de connexion ici
        return "Login successful";
    }

    @PostMapping("/api/logout")
    public String logout() {
        // Spring Security gère la logique de déconnexion ici
        return "Logout successful";
    }
}
