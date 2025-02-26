package com.augustinbaffou.mon_cocktail.auth.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.augustinbaffou.mon_cocktail.auth.dtos.LoginUserDto;
import com.augustinbaffou.mon_cocktail.auth.dtos.RegisterUserDto;
import com.augustinbaffou.mon_cocktail.auth.dtos.VerifyUserDto;
import com.augustinbaffou.mon_cocktail.entities.User;
import com.augustinbaffou.mon_cocktail.repositories.UserRepository;

import jakarta.mail.MessagingException;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            EmailService emailService
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    // Signup without email verification (for dev)
    public User register(RegisterUserDto input) {
        User user = new User(input.getUsername(), input.getEmail(), passwordEncoder.encode(input.getPassword()));
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
        user.setEnabled(true);
        return userRepository.save(user);
    }

    public User signup(RegisterUserDto input) {
        User user = new User(input.getUsername(), input.getEmail(), passwordEncoder.encode(input.getPassword()));
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
        user.setEnabled(false);
        sendVerificationEmail(user);
        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
        User user = userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        input.getPassword()
                )
        );

        return user;
    }

    public void verifyUser(VerifyUserDto input) {
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Verification code has expired");
            }
            if (user.getVerificationCode().equals(input.getVerificationCode())) {
                user.setEnabled(true);
                user.setVerificationCode(null);
                user.setVerificationCodeExpiresAt(null);
                userRepository.save(user);
            } else {
                throw new RuntimeException("Invalid verification code");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void resendVerificationCode(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.isEnabled()) {
                throw new RuntimeException("Account is already verified");
            }
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiresAt(LocalDateTime.now().plusHours(1));
            sendVerificationEmail(user);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    private void sendVerificationEmail(User user) {
        String verificationCode = user.getVerificationCode();

        String subject = verificationCode + " - Vérification de votre compte Mon Cocktail";
        
        String htmlMessage = "<!DOCTYPE html>"
                + "<html lang=\"fr\">"
                + "<head>"
                + "<meta charset=\"UTF-8\">"
                + "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">"
                + "</head>"
                + "<body style=\"font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; color: #F66372;\">"
                + "<div style=\"max-width: 600px; margin: 0 auto; padding: 20px;\">"
                + "<div style=\"text-align: center; margin-bottom: 30px;\">"
                + "<h1 style=\"color: #F66372; margin: 0; font-size: 28px;\">Mon Cocktail &#127864;</h1>"
                + "</div>"
                + "<div style=\"background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); padding: 30px; border-top: 4px solid #F66372;\">"
                + "<h2 style=\"color: #333333; font-size: 22px; margin-top: 0;\">Bienvenue chez Mon Cocktail !</h2>"
                + "<p style=\"font-size: 16px; line-height: 1.5; color: #555555;\">Merci d'avoir cr&eacute;&eacute; votre compte. Pour finaliser votre inscription et acc&eacute;der &agrave; votre espace personnel, veuillez utiliser le code de v&eacute;rification suivant :</p>"
                + "<div style=\"background-color: #f7f7f7; border-radius: 6px; padding: 20px; margin: 25px 0; text-align: center;\">"
                + "<p style=\"font-size: 15px; color: #666666; margin: 0 0 10px;\">Votre code de v&eacute;rification :</p>"
                + "<p style=\"font-size: 28px; font-weight: bold; color: #F66372; letter-spacing: 2px; margin: 0;\">" + verificationCode + "</p>"
                + "</div>"
                + "<p style=\"font-size: 16px; line-height: 1.5; color: #555555;\">Ce code est valable pendant 30 minutes. Si vous n'avez pas demand&eacute; ce code, vous pouvez ignorer cet email.</p>"
                + "</div>"
                + "<div style=\"text-align: center; margin-top: 30px; color: #999999; font-size: 14px;\">"
                + "<p>&copy; " + java.time.Year.now().getValue() + " Mon Cocktail. Tous droits r&eacute;serv&eacute;s.</p>"
                + "<p style=\"margin-top: 10px;\">Des questions ? Contactez notre support &agrave; <a href=\"mailto:augustinbaffou@gmail.com\" style=\"color: #F66372; text-decoration: none;\">augustinbaffou@gmail.com</a></p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";
    
        try {
            // Assurez-vous que votre service d'email est configuré avec l'encodage UTF-8
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }
}