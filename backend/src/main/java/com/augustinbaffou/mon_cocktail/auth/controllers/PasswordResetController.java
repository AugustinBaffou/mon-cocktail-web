package com.augustinbaffou.mon_cocktail.auth.controllers;

import com.augustinbaffou.mon_cocktail.auth.dtos.PasswordResetRequestDto;
import com.augustinbaffou.mon_cocktail.auth.dtos.PasswordResetConfirmDto;
import com.augustinbaffou.mon_cocktail.auth.services.PasswordResetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class PasswordResetController {
    private final PasswordResetService passwordResetService;

    public PasswordResetController(PasswordResetService passwordResetService) {
        this.passwordResetService = passwordResetService;
    }

    @PostMapping("/password-reset-request")
    public ResponseEntity<?> requestPasswordReset(@RequestBody PasswordResetRequestDto request) {
        try {
            passwordResetService.initiatePasswordReset(request);
            return ResponseEntity.ok("Code de réinitialisation envoyé");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/password-reset-confirm")
    public ResponseEntity<?> confirmPasswordReset(@RequestBody PasswordResetConfirmDto request) {
        try {
            passwordResetService.confirmPasswordReset(request);
            return ResponseEntity.ok("Mot de passe réinitialisé avec succès");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}