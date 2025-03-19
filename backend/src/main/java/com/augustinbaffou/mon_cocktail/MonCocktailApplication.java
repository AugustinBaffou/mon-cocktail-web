package com.augustinbaffou.mon_cocktail;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class MonCocktailApplication {

    public static void main(String[] args) {
        // Charger les variables d'environnement depuis le fichier .env
        Dotenv dotenv = Dotenv.configure().load();
        
        // Transférer les variables d'environnement du fichier .env vers System.properties
        dotenv.entries().forEach(e -> System.setProperty(e.getKey(), e.getValue()));
        
        SpringApplication.run(MonCocktailApplication.class, args);
    }
}