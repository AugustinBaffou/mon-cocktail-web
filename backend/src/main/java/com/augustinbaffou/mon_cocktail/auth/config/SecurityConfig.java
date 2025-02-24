package com.augustinbaffou.mon_cocktail.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Désactiver CSRF si tu utilises une API REST
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll()  // Permettre l'inscription et connexion
                .requestMatchers("/public/**").authenticated() // Accessible aux utilisateurs connectés
                .requestMatchers("/admin/**").hasRole("ADMIN") // Accessible uniquement aux admins
                .anyRequest().denyAll() // Bloquer le reste par défaut
            )
            .httpBasic(httpBasic -> httpBasic.disable()) // Désactiver HTTP Basic si JWT utilisé
            .formLogin(form -> form.disable()); // Pas de formulaire de login

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
