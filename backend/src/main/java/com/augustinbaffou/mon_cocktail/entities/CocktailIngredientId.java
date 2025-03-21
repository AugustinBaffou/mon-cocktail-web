package com.augustinbaffou.mon_cocktail.entities;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class CocktailIngredientId implements Serializable {
    private Long cocktailId;
    private Long ingredientId;
}
