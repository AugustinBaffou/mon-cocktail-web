package com.augustinbaffou.mon_cocktail.repositories;

import com.augustinbaffou.mon_cocktail.entities.Cocktail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CocktailRepository extends JpaRepository<Cocktail, Long> {
    
    // Recherche par nom ou description
    List<Cocktail> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description);
    
    // Recherche par type
    List<Cocktail> findByTypesNameContainingIgnoreCase(String typeName);
    
    // Recherche combinée
    List<Cocktail> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseAndTypesNameContainingIgnoreCase(
            String name, String description, String typeName);
}