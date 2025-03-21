package com.augustinbaffou.mon_cocktail.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "cocktails")
public class Cocktail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String emoji;
    private String imageUrl;
    private String description;
    private String serviceDescription;
    private Integer preparationTime;
    private Integer difficulty;
    private String pairing;
    private Integer calories;
    private String alcoholPercentage;
    private String sugar;

    @OneToMany(mappedBy = "cocktail", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<PreparationStep> preparationSteps = new ArrayList<>();

    @OneToMany(mappedBy = "cocktail", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Tip> tips = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "cocktail_ingredients",
        joinColumns = @JoinColumn(name = "cocktail_id"),
        inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private List<Ingredient> ingredients = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "cocktail_types",
        joinColumns = @JoinColumn(name = "cocktail_id"),
        inverseJoinColumns = @JoinColumn(name = "type_id")
    )
    private List<Type> types = new ArrayList<>();

    @OneToMany(mappedBy = "cocktail", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Variant> variants = new ArrayList<>();
}
