package com.augustinbaffou.mon_cocktail.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "preparation_steps")
public class PreparationStep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int stepOrder;

    @Column(nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "cocktail_id", nullable = false)
    private Cocktail cocktail;
}
