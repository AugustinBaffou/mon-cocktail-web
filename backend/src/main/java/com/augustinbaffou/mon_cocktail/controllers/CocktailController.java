package com.augustinbaffou.mon_cocktail.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.augustinbaffou.mon_cocktail.entities.Cocktail;
import com.augustinbaffou.mon_cocktail.services.CocktailService;

import java.util.List;

@RestController
@RequestMapping("/public/cocktails")
public class CocktailController {
    private final CocktailService cocktailService;

    public CocktailController(CocktailService cocktailService) {
        this.cocktailService = cocktailService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cocktail> getCocktailById(@PathVariable Long id) {
        Cocktail cocktail = cocktailService.getCocktailById(id);
        return ResponseEntity.ok(cocktail);
    }

    @GetMapping
    public ResponseEntity<List<Cocktail>> getAllCocktails() {
        return ResponseEntity.ok(cocktailService.getAllCocktails());
    }
}
