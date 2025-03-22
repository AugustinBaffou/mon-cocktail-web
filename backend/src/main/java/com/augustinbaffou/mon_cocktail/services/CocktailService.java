package com.augustinbaffou.mon_cocktail.services;

import org.springframework.stereotype.Service;

import com.augustinbaffou.mon_cocktail.dtos.CocktailSummary;
import com.augustinbaffou.mon_cocktail.dtos.TypeDto;
import com.augustinbaffou.mon_cocktail.entities.Cocktail;
import com.augustinbaffou.mon_cocktail.entities.Type;
import com.augustinbaffou.mon_cocktail.repositories.CocktailRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CocktailService {
    private final CocktailRepository cocktailRepository;

    public CocktailService(CocktailRepository cocktailRepository) {
        this.cocktailRepository = cocktailRepository;
    }

    public Cocktail getCocktailById(Long id) {
        return cocktailRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cocktail introuvable avec l'ID " + id));
    }

    public List<Cocktail> getAllCocktails() {
        return cocktailRepository.findAll();
    }

    /**
     * Récupère uniquement les résumés de tous les cocktails (optimisé)
     */
    public List<CocktailSummary> getAllCocktailSummaries() {
        return cocktailRepository.findAll().stream()
                .map(this::convertToSummary)
                .collect(Collectors.toList());
    }

    /**
     * Recherche des cocktails par nom, description ou type
     */
    public List<CocktailSummary> searchCocktails(String query, String typeName) {
        List<Cocktail> results;

        // Si aucun paramètre de recherche n'est fourni, retourne tous les cocktails
        if ((query == null || query.isEmpty()) && (typeName == null || typeName.isEmpty())) {
            results = cocktailRepository.findAll();
        } 
        // Si uniquement le type est fourni
        else if (query == null || query.isEmpty()) {
            results = cocktailRepository.findByTypesNameContainingIgnoreCase(typeName);
        } 
        // Si uniquement la requête de recherche est fournie
        else if (typeName == null || typeName.isEmpty()) {
            results = cocktailRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query);
        } 
        // Si les deux paramètres sont fournis
        else {
            results = cocktailRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseAndTypesNameContainingIgnoreCase(
                    query, query, typeName);
        }

        return results.stream()
                .map(this::convertToSummary)
                .collect(Collectors.toList());
    }

    /**
     * Convertit une entité Cocktail en CocktailSummary
     */
    private CocktailSummary convertToSummary(Cocktail cocktail) {
        CocktailSummary summary = new CocktailSummary();
        summary.setId(cocktail.getId());
        summary.setName(cocktail.getName());
        summary.setEmoji(cocktail.getEmoji());
        summary.setDescription(cocktail.getDescription());
        summary.setPreparationTime(cocktail.getPreparationTime());
        summary.setDifficulty(cocktail.getDifficulty());
        
        // Convertir les types
        List<TypeDto> typeDtos = cocktail.getTypes().stream()
                .map(this::convertToTypeDto)
                .collect(Collectors.toList());
        summary.setTypes(typeDtos);
        
        return summary;
    }

    /**
     * Convertit une entité Type en TypeDto
     */
    private TypeDto convertToTypeDto(Type type) {
        TypeDto dto = new TypeDto();
        dto.setId(type.getId());
        dto.setName(type.getName());
        dto.setEmoji(type.getEmoji());
        return dto;
    }
}
