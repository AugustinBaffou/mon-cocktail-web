package com.augustinbaffou.mon_cocktail.auth.services;

import com.augustinbaffou.mon_cocktail.auth.dtos.PasswordResetRequestDto;
import com.augustinbaffou.mon_cocktail.auth.dtos.PasswordResetConfirmDto;
import com.augustinbaffou.mon_cocktail.entities.User;
import com.augustinbaffou.mon_cocktail.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class PasswordResetService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public PasswordResetService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            EmailService emailService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public void initiatePasswordReset(PasswordResetRequestDto request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            String resetCode = generateResetCode();
            
            user.setResetCode(resetCode);
            user.setResetCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
            userRepository.save(user);
            
            sendPasswordResetEmail(user);
        } else {
            throw new RuntimeException("Utilisateur non trouvé");
        }
    }

    public void confirmPasswordReset(PasswordResetConfirmDto request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            
            // Vérifier que le code de réinitialisation est valide et non expiré
            if (user.getResetCode() == null || 
                user.getResetCodeExpiresAt() == null || 
                user.getResetCodeExpiresAt().isBefore(LocalDateTime.now()) ||
                !user.getResetCode().equals(request.getResetCode())) {
                throw new RuntimeException("Code de réinitialisation invalide ou expiré");
            }
            
            // Réinitialiser le mot de passe
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            user.setResetCode(null);
            user.setResetCodeExpiresAt(null);
            
            userRepository.save(user);
        } else {
            throw new RuntimeException("Utilisateur non trouvé");
        }
    }

    private void sendPasswordResetEmail(User user) {
        String resetCode = user.getResetCode();
        String subject = resetCode + " - Réinitialisation de votre mot de passe Mon Cocktail";

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
                + "<h2 style=\"color: #333333; font-size: 22px; margin-top: 0;\">Réinitialisation de mot de passe</h2>"
                + "<p style=\"font-size: 16px; line-height: 1.5; color: #555555;\">Vous avez demandé à réinitialiser votre mot de passe. Utilisez le code ci-dessous pour finaliser le processus :</p>"
                + "<div style=\"background-color: #f7f7f7; border-radius: 6px; padding: 20px; margin: 25px 0; text-align: center;\">"
                + "<p style=\"font-size: 15px; color: #666666; margin: 0 0 10px;\">Votre code de réinitialisation :</p>"
                + "<p style=\"font-size: 28px; font-weight: bold; color: #F66372; letter-spacing: 2px; margin: 0;\">" + resetCode + "</p>"
                + "</div>"
                + "<p style=\"font-size: 16px; line-height: 1.5; color: #555555;\">Ce code est valable pendant 15 minutes. Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.</p>"
                + "</div>"
                + "<div style=\"text-align: center; margin-top: 30px; color: #999999; font-size: 14px;\">"
                + "<p>&copy; " + java.time.Year.now().getValue() + " Mon Cocktail. Tous droits r&eacute;serv&eacute;s.</p>"
                + "<p style=\"margin-top: 10px;\">Des questions ? Contactez notre support &agrave; <a href=\"mailto:augustinbaffou@gmail.com\" style=\"color: #F66372; text-decoration: none;\">augustinbaffou@gmail.com</a></p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";
        
        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            throw new RuntimeException("Erreur lors de l'envoi de l'email", e);
        }
    }

    private String generateResetCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }
}