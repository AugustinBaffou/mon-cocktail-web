package com.augustinbaffou.mon_cocktail.services;

import org.springframework.stereotype.Service;

import com.augustinbaffou.mon_cocktail.entities.Cocktail;
import com.augustinbaffou.mon_cocktail.repositories.CocktailRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;

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
}
