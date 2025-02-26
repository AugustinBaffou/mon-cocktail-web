package com.augustinbaffou.mon_cocktail.auth.controllers;

import com.augustinbaffou.mon_cocktail.auth.dtos.LoginResponse;
import com.augustinbaffou.mon_cocktail.auth.dtos.LoginUserDto;
import com.augustinbaffou.mon_cocktail.auth.dtos.RegisterUserDto;
import com.augustinbaffou.mon_cocktail.auth.dtos.VerifyUserDto;
import com.augustinbaffou.mon_cocktail.auth.services.AuthenticationService;
import com.augustinbaffou.mon_cocktail.auth.services.JwtService;
import com.augustinbaffou.mon_cocktail.entities.User;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.register(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto){
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verifyUserDto) {
        try {
            authenticationService.verifyUser(verifyUserDto);
            return ResponseEntity.ok("Account verified successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email) {
        try {
            authenticationService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code sent");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
