package com.augustinbaffou.mon_cocktail.dtos;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CocktailSummary {
    private Long id;
    private String name;
    private String emoji;
    private String description;
    private Integer preparationTime;
    private Integer difficulty;
    private List<TypeDto> types;
}